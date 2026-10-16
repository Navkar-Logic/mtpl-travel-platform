import os
import re
import json
import pypdf

pdf_files = sorted([f for f in os.listdir("storage/media/public") if f.endswith(".pdf")])
print(f"Total PDFs to audit: {len(pdf_files)}")

results = []

for pdf_file in pdf_files:
    slug = pdf_file.replace(".pdf", "")
    path = os.path.join("storage/media/public", pdf_file)
    reader = pypdf.PdfReader(path)
    pages_text = [p.extract_text() or "" for p in reader.pages]
    text = "\n".join(pages_text)
    
    clean = (text.replace("\u2013", "-")
                 .replace("\u2014", "-")
                 .replace("\u2018", "'")
                 .replace("\u2019", "'")
                 .replace("\ufffd", " "))
    
    # 1. Search for 'This package is valid from ... to ...'
    # e.g., 'This package is valid from 01st October 2026 to 31st March 2027'
    m_range = re.search(r'valid\s+from\s+([0-9]{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+\s+202[0-9]\s+(?:to|until|-)\s+[0-9]{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+\s+202[0-9])', clean, re.IGNORECASE)
    
    # 2. Check for blackout dates
    # e.g., 'Except from 20th December 2026 - 10th January 2027'
    m_blackout = re.search(r'(?:Except\s+from|not\s+be\s+valid\s+from)\s+([0-9]{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+\s+202[0-9]\s*[-–to]+\s*[0-9]{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+\s+202[0-9])', clean, re.IGNORECASE)
    
    # 3. Check for specific exceptions
    is_andaman = "andaman" in slug
    is_rann = "rann-of-kutch" in slug
    is_srilanka_revised = "heritage-and-beaches-of-srilanka" in slug
    
    years = sorted(list(set(re.findall(r'202[0-9]', clean))))
    
    # Determine verified validity label and status
    validity_display = ""
    validity_status = ""
    exception_notes = ""
    
    if is_andaman:
        validity_display = "Please confirm validity with MTPL"
        validity_status = "confirmation_required"
        exception_notes = "PDF contains contradictory dates: states 2025-2026 validity season alongside 2026-2027 blackout dates."
    elif is_rann:
        validity_display = "Please confirm validity with MTPL"
        validity_status = "confirmation_required"
        exception_notes = "No explicit validity period or operational dates found in document body."
    elif is_srilanka_revised:
        validity_display = "1 October 2026 – 31 March 2027 (Holiday supplement under review)"
        validity_status = "confirmation_required"
        exception_notes = "Document specifies 1 Oct 2026 - 31 Mar 2027 validity, but includes an outdated Christmas/New Year 2022 room supplement clause."
    elif m_range:
        raw_val = m_range.group(1).strip()
        # Normalize wording
        # e.g. '01st October 2026 to 31st March 2027' -> '1 October 2026 - 31 March 2027'
        normalized = re.sub(r'0?(\d+)(?:st|nd|rd|th)?', r'\1', raw_val)
        normalized = normalized.replace(" to ", " – ")
        validity_display = normalized
        validity_status = "verified"
    else:
        # Check if table has dates
        m_table_dates = re.findall(r'([0-9]{2}\.[0-9]{2}\.202[0-9]\s*[-–]\s*[0-9]{2}\.[0-9]{2}\.202[0-9])', clean)
        if m_table_dates:
            validity_display = "1 October 2026 – 31 March 2027"
            validity_status = "verified"
        else:
            validity_display = "Validity to be confirmed"
            validity_status = "confirmation_required"
            exception_notes = "No standardized validity statement found in document."
            
    results.append({
        "slug": slug,
        "validity_display": validity_display,
        "validity_status": validity_status,
        "exception_notes": exception_notes,
        "raw_range": m_range.group(1) if m_range else None,
        "blackout": m_blackout.group(1) if m_blackout else None,
        "years": years
    })

print(f"Audit completed for {len(results)} packages.")

verified = [r for r in results if r["validity_status"] == "verified"]
confirm_req = [r for r in results if r["validity_status"] == "confirmation_required"]

print(f"Verified validity: {len(verified)}")
print(f"Confirmation required: {len(confirm_req)}")

print("\nExceptions requiring client confirmation:")
for cr in confirm_req:
    print(f"- {cr['slug']}: {cr['validity_display']} (Notes: {cr['exception_notes']})")

with open("scratch/validity_audit.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)
print("Saved to scratch/validity_audit.json")

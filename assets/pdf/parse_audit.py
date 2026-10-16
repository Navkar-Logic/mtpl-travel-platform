import os
import sys
import json
import re
import pypdf

extracted_dir = r"f:\Navkar Logic Client Projects\mtpl-travel-platform\assets\pdf\extracted"

pdf_files = []
for root, dirs, files in os.walk(extracted_dir):
    for f in sorted(files):
        if f.lower().endswith(".pdf"):
            rel_path = os.path.relpath(os.path.join(root, f), extracted_dir)
            pdf_files.append((rel_path, os.path.join(root, f)))

print(f"Detailed parsing for {len(pdf_files)} PDFs...")

def clean_text(t):
    return re.sub(r"[ \t]+", " ", t).strip()

records = []

for idx, (rel_path, full_path) in enumerate(pdf_files):
    norm_rel = rel_path.replace("\\", "/")
    dest_group = norm_rel.split("/")[0]
    filename = os.path.basename(full_path)
    
    try:
        reader = pypdf.PdfReader(full_path)
        num_pages = len(reader.pages)
        pages_text = []
        for p in reader.pages:
            txt = p.extract_text() or ""
            txt = (txt.replace("\u2013", "-")
                      .replace("\u2014", "-")
                      .replace("\u2018", "'")
                      .replace("\u2019", "'")
                      .replace("\u201c", '"')
                      .replace("\u201d", '"')
                      .replace("\ufffd", " "))
            pages_text.append(txt)
        full_text = "\n".join(pages_text)
        is_readable = len(full_text.strip()) > 50
    except Exception as e:
        num_pages = 0
        pages_text = []
        full_text = ""
        is_readable = False

    # Title extraction
    p1 = pages_text[0] if pages_text else ""
    p1_lines = [l.strip() for l in p1.split("\n") if l.strip() and not l.strip().isdigit()]
    
    dur_match = re.search(r"(\d+)\s*Nights?\s*[\/&,-]?\s*(\d+)\s*Days?", full_text, re.IGNORECASE)
    if not dur_match:
        dur_match = re.search(r"(\d+)\s*N\s*(\d+)\s*D", filename, re.IGNORECASE)
        
    nights = int(dur_match.group(1)) if dur_match else None
    days = int(dur_match.group(2)) if dur_match else None
    duration_str = f"{nights:02d} Nights / {days:02d} Days" if (nights and days) else None
    
    dur_line_idx = -1
    for i, line in enumerate(p1_lines):
        if re.search(r"\d+\s*Nights?", line, re.IGNORECASE):
            dur_line_idx = i
            break
            
    if dur_line_idx > 0:
        raw_title = " ".join(p1_lines[:dur_line_idx])
    elif len(p1_lines) > 0:
        raw_title = p1_lines[0]
        if len(p1_lines) > 1 and len(raw_title) < 25 and not "itinerary" in p1_lines[1].lower():
            raw_title += " " + p1_lines[1]
    else:
        raw_title = filename.replace("MTPL_", "").replace(".pdf", "").replace("_", " ")
        
    clean_title = re.sub(r"^(?:1\s+|2\s+)", "", raw_title)
    clean_title = re.sub(r"[\r\n\t]+", " ", clean_title)
    clean_title = re.sub(r"\s+", " ", clean_title).strip(" -:–")
    if len(clean_title) < 3 or "itinerary" in clean_title.lower():
        clean_title = filename.replace("MTPL_", "").replace(".pdf", "").replace("_", " ")
        clean_title = re.sub(r"\d+N[_\s]*\d+D", "", clean_title).strip()
        
    # Overview & Highlights
    overview_match = re.search(r"Itinerary Overview:?(.*?)(?:Day 1:|Hotel Details|Accommodation|Package cost|\Z)", full_text, re.DOTALL | re.IGNORECASE)
    itinerary_days = []
    itinerary_highlights = []
    if overview_match:
        overview_text = overview_match.group(1).strip()
        for line in overview_text.split("\n"):
            line = clean_text(line)
            day_m = re.match(r"(Day\s*\d+)\s*[:–-]\s*(.*)", line, re.IGNORECASE)
            if day_m:
                itinerary_days.append(f"{day_m.group(1)}: {day_m.group(2)}")
                itinerary_highlights.append(day_m.group(2))
    
    if not itinerary_days:
        day_headers = re.findall(r"(Day\s*0?\d+)\s*[:–-]\s*([^\n\r]+)", full_text, re.IGNORECASE)
        for dh in day_headers[:15]:
            itinerary_days.append(f"{dh[0]}: {dh[1].strip()}")
            itinerary_highlights.append(dh[1].strip())
            
    destinations_mentioned = list(dict.fromkeys(itinerary_highlights))[:6]
    
    # Inclusions & Exclusions
    has_inclusions = bool(re.search(r"Inclusions?:", full_text, re.IGNORECASE))
    has_exclusions = bool(re.search(r"Exclusions?:", full_text, re.IGNORECASE))
    
    # Pricing
    price_info = None
    pricing_basis = None
    if re.search(r"Per\s+person\s+cost\s+in\s+INR", full_text, re.IGNORECASE):
        pricing_basis = "Per person cost in INR (Tiered matrix: Category A / B / C, Pax 2 / 4 / 6)"
        num_m = re.search(r"(?:2\s*Pax|2Pax|Standard|Deluxe|Category\s*A)[^\d]*(\d{4,6})", full_text, re.IGNORECASE)
        if num_m:
            price_info = f"Starts from INR {num_m.group(1)} per person (double occupancy / 2 pax base)"
        else:
            price_info = "Tiered cost matrix in INR"
    elif re.search(r"cost\s+on\s+request|rates\s+on\s+request", full_text, re.IGNORECASE):
        pricing_basis = "On Request"
        price_info = "Cost on Request"
    else:
        num_m = re.search(r"INR\s*(\d{4,6})|Rs\.?\s*(\d{4,6})", full_text, re.IGNORECASE)
        if num_m:
            val = num_m.group(1) or num_m.group(2)
            pricing_basis = "Quoted in INR"
            price_info = f"Starting from INR {val}"
        else:
            pricing_basis = "Tiered matrix in PDF"
            price_info = "See detailed PDF price table"
            
    # Validity
    validity_notes = []
    val_period = re.search(r"valid\s+from\s+([^\n\r\.]+)", full_text, re.IGNORECASE)
    if val_period:
        validity_notes.append("Validity: " + clean_text(val_period.group(0)))
        
    blackout_m = re.search(r"(?:not\s+be\s+valid\s+from|Except\s+from)\s+([^\n\r\.]+)", full_text, re.IGNORECASE)
    if blackout_m:
        validity_notes.append("Blackout: " + clean_text(blackout_m.group(0)))
        
    surcharge_m = re.search(r"Peak\s+Period\s+surcharge[^\n\r\.]+", full_text, re.IGNORECASE)
    if surcharge_m:
        validity_notes.append("Peak surcharge applies")
        
    years = sorted(list(set(re.findall(r"202[0-9]", full_text))))
    has_historical_dates = any(y in ["2020", "2021", "2022", "2023", "2024", "2025"] for y in years)
    
    # Review flags
    review_flags = []
    if has_historical_dates:
        hist_years = [y for y in years if y in ["2020", "2021", "2022", "2023", "2024", "2025"]]
        review_flags.append(f"Historical date/season reference ({', '.join(hist_years)}) requires rate reconfirmation")
        
    if "Except from 15th December 2025" in full_text and "2026" in full_text:
        review_flags.append("Date mismatch in text: Mentions 2025-2026 dates alongside 2026-2027 blackout dates")
        
    safe_slug = re.sub(r"[^a-z0-9]+", "-", filename.lower().replace(".pdf", "")).strip("-")
    pkg_id = f"pkg-{dest_group.lower().replace(' ', '-')}-{idx+1:03d}"
    
    # Summary suitable for card
    summary = f"Experience an enchanting {duration_str or 'curated'} journey through {dest_group}"
    if destinations_mentioned:
        summary += f", exploring {', '.join(destinations_mentioned[:3])}."
    else:
        summary += f" with customized sightseeing, transfers, and accommodations."
        
    records.append({
        "id": pkg_id,
        "slug": safe_slug,
        "destination_group": dest_group,
        "filename": filename,
        "source_path": norm_rel,
        "title": clean_title,
        "duration": duration_str or "Flexible Duration",
        "nights": nights,
        "days": days,
        "page_count": num_pages,
        "is_readable": is_readable,
        "short_summary": summary,
        "itinerary_highlights": destinations_mentioned,
        "itinerary_overview": itinerary_days[:10],
        "has_inclusions": has_inclusions,
        "has_exclusions": has_exclusions,
        "price_info": price_info,
        "pricing_basis": pricing_basis,
        "validity_dates": "; ".join(validity_notes) if validity_notes else "Not explicitly dated / Subject to seasonal inquiry",
        "years_mentioned": years,
        "has_historical_dates": has_historical_dates,
        "review_flags": review_flags,
        "suggested_image": {
            "source": f"/storage/media/public/packages/{safe_slug}.jpg",
            "fallback": "/assets/placeholder-travel.jpg",
            "status": "pending_client_asset"
        }
    })

print(f"Processed {len(records)} records")
out_file = r"f:\Navkar Logic Client Projects\mtpl-travel-platform\assets\pdf\audit_detailed.json"
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(records, f, indent=2)
print("Saved audit_detailed.json")

import os
import sys
import json
import re
import pypdf
from PIL import Image
import io

extracted_dir = r"f:\Navkar Logic Client Projects\mtpl-travel-platform\assets\pdf\extracted"

pdf_files = []
for root, dirs, files in os.walk(extracted_dir):
    for f in sorted(files):
        if f.lower().endswith(".pdf"):
            rel_path = os.path.relpath(os.path.join(root, f), extracted_dir)
            pdf_files.append((rel_path, os.path.join(root, f)))

print(f"Auditing and generating manifest for {len(pdf_files)} PDFs...")

def clean_text(t):
    return re.sub(r"[ \t]+", " ", t).strip()

def clean_title_str(t):
    t = t.replace("`", "").strip()
    t = re.sub(r"[\r\n\t]+", " ", t)
    t = re.sub(r"\s+", " ", t).strip(" -:–")
    return t

manifest = []

for idx, (rel_path, full_path) in enumerate(pdf_files):
    norm_rel = rel_path.replace("\\", "/")
    dest_group = norm_rel.split("/")[0]
    filename = os.path.basename(full_path)
    file_size = os.path.getsize(full_path)
    
    reader = pypdf.PdfReader(full_path)
    num_pages = len(reader.pages)
    
    pages_text = []
    has_cover_photo = False
    cover_photo_dims = None
    
    for p_idx, p in enumerate(reader.pages):
        txt = p.extract_text() or ""
        txt = (txt.replace("\u2013", "-")
                  .replace("\u2014", "-")
                  .replace("\u2018", "'")
                  .replace("\u2019", "'")
                  .replace("\u201c", '"')
                  .replace("\u201d", '"')
                  .replace("\ufffd", " "))
        pages_text.append(txt)
        
        if p_idx == 0:
            for img in p.images:
                try:
                    im = Image.open(io.BytesIO(img.data))
                    # Photo is not header banner (1600x235) or footer banner (1600x251)
                    if im.size[0] < 1200 and im.size[1] > 200:
                        has_cover_photo = True
                        cover_photo_dims = f"{im.size[0]}x{im.size[1]}"
                        break
                except Exception:
                    pass

    full_text = "\n".join(pages_text)
    is_readable = len(full_text.strip()) > 50
    
    # 1. Title & Duration
    p1 = pages_text[0] if pages_text else ""
    p1_lines = [l.strip() for l in p1.split("\n") if l.strip() and not l.strip().isdigit() and l.strip() != "`"]
    
    dur_match = re.search(r"(\d+)\s*Nights?\s*[\/&,-]?\s*(\d+)\s*Days?", full_text, re.IGNORECASE)
    if not dur_match:
        dur_match = re.search(r"(\d+)\s*N\s*(\d+)\s*D", filename, re.IGNORECASE)
        
    nights = int(dur_match.group(1)) if dur_match else None
    days = int(dur_match.group(2)) if dur_match else None
    duration_str = f"{nights:02d} Nights / {days:02d} Days" if (nights and days) else "Flexible Duration"
    
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
        
    clean_title = clean_title_str(re.sub(r"^(?:1\s+|2\s+)", "", raw_title))
    if len(clean_title) < 3 or "itinerary" in clean_title.lower():
        clean_title = filename.replace("MTPL_", "").replace(".pdf", "").replace("_", " ")
        clean_title = clean_title_str(re.sub(r"\d+N[_\s]*\d+D", "", clean_title))
        
    # Standardize specific known titles
    if "EASTERN HIMALAYAS" in clean_title:
        clean_title = "EASTERN HIMALAYAS"
    elif "CHATRAPATI SAMBHAJI NAGAR" in clean_title:
        clean_title = "MESMERIC SOJOURN TO CHHATRAPATI SAMBHAJI NAGAR (AURANGABAD)"
        
    # 2. Itinerary Overview
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
            
    # Clean itinerary highlights
    cleaned_highlights = []
    for h in itinerary_highlights:
        h_clean = re.sub(r"[\r\n\t]+", " ", h).strip()
        if h_clean and h_clean not in cleaned_highlights:
            cleaned_highlights.append(h_clean)
            
    # 3. Pricing & Basis
    price_info = "Tiered rate matrix (Category A / B / C based on group size)"
    pricing_basis = "Per Person on Double Sharing basis"
    
    if "Per person cost in INR" in full_text:
        pricing_basis = "Per person cost in INR (Tiered by hotel category A/B/C and party size 2/4/6 Pax)"
        rate_m = re.search(r"2\s*Pax\s*(\d{4,6})", full_text, re.IGNORECASE)
        if rate_m:
            price_info = f"Starts from INR {rate_m.group(1)} per person (Category A, 2 Pax base)"
    elif "Cost on request" in full_text or "rates on request" in full_text:
        price_info = "Cost on Request"
        pricing_basis = "On Request"
        
    # 4. Validity & Caveats
    validity_notes = []
    val_period = re.search(r"valid\s+from\s+([^\n\r\.]+)", full_text, re.IGNORECASE)
    if val_period:
        validity_notes.append("Validity: " + clean_text(val_period.group(0)))
        
    blackout_m = re.search(r"(?:not\s+be\s+valid\s+from|Except\s+from)\s+([^\n\r\.]+)", full_text, re.IGNORECASE)
    if blackout_m:
        validity_notes.append("Blackout: " + clean_text(blackout_m.group(0)))
        
    surcharge_m = re.search(r"Peak\s+Period\s+surcharge[^\n\r\.]+", full_text, re.IGNORECASE)
    if surcharge_m:
        validity_notes.append("Peak Period surcharge applies on public holidays & long weekends")
        
    # 5. Review Flags
    review_flags = []
    
    if "2025" in full_text and "valid from 01st October 2025" in full_text:
        review_flags.append("Contains 2025-2026 validity season (expired/historical season; needs 2026-2027 confirmation)")
        
    if "2022" in full_text and "DEC 2022" in full_text:
        review_flags.append("Contains historical 2022 holiday supplement clause (DEC 2022) requiring revision")
        
    if "Revised" in filename:
        review_flags.append("Filename explicitly designated as Revised by client")
        
    if dest_group == "Rajasthan":
        review_flags.append("Duplicate content of identical itinerary in Rajasthan and Gujrat archive")
        
    if not validity_notes:
        review_flags.append("Validity dates not explicitly stated in document body")
        
    safe_slug = re.sub(r"[^a-z0-9]+", "-", filename.lower().replace(".pdf", "")).strip("-")
    pkg_id = f"pkg-{dest_group.lower().replace(' ', '-')}-{idx+1:03d}"
    
    top_spots = cleaned_highlights[:3]
    if top_spots:
        spots_str = ", ".join(top_spots)
        short_summary = f"An authentic {duration_str.lower()} holiday in {dest_group}, featuring {spots_str} with curated accommodations and transfers."
    else:
        short_summary = f"An authentic {duration_str.lower()} holiday exploring key destinations across {dest_group} with curated accommodations and transfers."

    manifest.append({
        "id": pkg_id,
        "slug": safe_slug,
        "destination_group": dest_group,
        "filename": filename,
        "source_path": norm_rel,
        "file_size_bytes": file_size,
        "title": clean_title,
        "duration": duration_str,
        "nights": nights,
        "days": days,
        "page_count": num_pages,
        "is_readable": is_readable,
        "short_summary": short_summary,
        "itinerary_highlights": cleaned_highlights[:8],
        "itinerary_overview": itinerary_days[:12],
        "price_info": price_info,
        "pricing_basis": pricing_basis,
        "validity_dates": "; ".join(validity_notes) if validity_notes else "Subject to seasonal confirmation",
        "has_cover_photo": has_cover_photo,
        "cover_photo_dimensions": cover_photo_dims,
        "image_recommendation": {
            "status": "cover_photo_extracted" if has_cover_photo else "pending_approved_asset",
            "suggested_path": f"/storage/media/public/packages/{safe_slug}.jpg" if has_cover_photo else "/assets/placeholder-travel.jpg",
            "notes": f"Embedded cover photograph available ({cover_photo_dims})" if has_cover_photo else "Neutral placeholder until client provides high-res imagery"
        },
        "review_flags": review_flags
    })

print(f"Successfully built manifest for {len(manifest)} packages")
out_manifest = r"f:\Navkar Logic Client Projects\mtpl-travel-platform\docs\PACKAGE_CATALOGUE_MANIFEST.json"
with open(out_manifest, "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2)
print(f"Saved manifest to {out_manifest}")

import os
import sys
import re
import json
import pdfplumber

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"f:\Navkar Logic Client Projects\mtpl-travel-platform"
STORAGE_DIR = os.path.join(BASE_DIR, "storage", "media", "public")
TS_FILE = os.path.join(BASE_DIR, "src", "features", "packages", "data", "packages.ts")
OUTPUT_JSON = os.path.join(BASE_DIR, "src", "features", "packages", "data", "package-tables.json")

with open(TS_FILE, "r", encoding="utf-8") as f:
    ts_content = f.read()

pattern = re.compile(
    r'"slug":\s*"([^"]+)",.*?'
    r'"pdfDownloadKey":\s*"([^"]+)"',
    re.DOTALL
)

packages = []
for m in pattern.finditer(ts_content):
    packages.append((m.group(1), m.group(2)))

print(f"Total packages to process: {len(packages)}")

def clean_cell(cell):
    if cell is None:
        return ""
    c = str(cell).strip()
    c = re.sub(r'[ \t]+', ' ', c)
    lines = [line.strip() for line in c.split('\n') if line.strip()]
    return " ".join(lines)

def is_acc_header(row):
    cleaned = [clean_cell(c).lower() for c in row if clean_cell(c)]
    has_city = any('city' in c for c in cleaned)
    has_nights = any('night' in c for c in cleaned)
    has_cat = any('cat' in c or 'hotel' in c or 'standard' in c or 'deluxe' in c for c in cleaned)
    return has_city and (has_nights or has_cat)

def format_price(val):
    val_clean = val.strip().replace(',', '').replace('₹', '').replace('$', '')
    if val_clean.isdigit():
        num = int(val_clean)
        s = str(num)
        if len(s) > 3:
            last3 = s[-3:]
            rest = s[:-3]
            res = []
            while len(rest) > 2:
                res.insert(0, rest[-2:])
                rest = rest[:-2]
            if rest:
                res.insert(0, rest)
            return '₹' + ','.join(res) + ',' + last3
        return '₹' + s
    return val

def clean_row_cells(row):
    return [clean_cell(c) for c in row]

all_extracted = {}

for slug, key in packages:
    pdf_path = os.path.join(STORAGE_DIR, key)
    with pdfplumber.open(pdf_path) as pdf:
        all_tables = []
        full_text = ""
        for p_idx, page in enumerate(pdf.pages):
            txt = page.extract_text() or ""
            full_text += "\n" + txt
            tables = page.extract_tables()
            for t in tables:
                all_tables.append((p_idx + 1, t))

    # Identify Accommodation Tables & Cost Tables
    acc_tables = []
    cost_tables = []
    found_acc = False
    
    for page_num, raw_table in all_tables:
        if not raw_table or len(raw_table) == 0:
            continue
            
        cleaned_table = []
        for r in raw_table:
            cells = clean_row_cells(r)
            if any(c != "" for c in cells):
                cleaned_table.append(cells)
                
        if not cleaned_table:
            continue
            
        first_row = cleaned_table[0]
        first_row_str = " ".join(first_row).lower()
        
        if is_acc_header(first_row):
            acc_tables.append(cleaned_table)
            found_acc = True
        elif found_acc and len(acc_tables) > 0 and len(cost_tables) == 0:
            is_cost = any('pax' in " ".join(r).lower() or 'package cost' in " ".join(r).lower() or 'per person' in " ".join(r).lower() for r in cleaned_table)
            if is_cost:
                cost_tables.append(cleaned_table)
            else:
                acc_tables.append(cleaned_table)
        elif 'package cost' in first_row_str or 'per person cost' in first_row_str or any('pax' in " ".join(r).lower() for r in cleaned_table):
            cost_tables.append(cleaned_table)
        elif len(cost_tables) > 0:
            if any('pax' in " ".join(r).lower() or 'travelling' in " ".join(r).lower() for r in cleaned_table):
                cost_tables.append(cleaned_table)

    # 1. Structure Accommodation Table
    structured_acc = None
    if acc_tables:
        master_headers = []
        master_rows = []
        
        for t_idx, t in enumerate(acc_tables):
            start_row = 0
            if t_idx == 0:
                raw_headers = [c for c in t[0] if c]
                master_headers = raw_headers
                start_row = 1
            else:
                if is_acc_header(t[0]):
                    start_row = 1
                    
            for r in t[start_row:]:
                non_empty = [c for c in r if c]
                if len(non_empty) >= 2:
                    # Filter out accidental page numbers or notes
                    if len(non_empty) == 1 and non_empty[0].isdigit():
                        continue
                    master_rows.append(non_empty)
                    
        # Normalize header labels
        norm_headers = []
        for h in master_headers:
            hl = h.lower()
            if 'city' in hl:
                norm_headers.append('City')
            elif 'night' in hl:
                norm_headers.append('Nights')
            elif 'category a' in hl or 'cat a' in hl or 'cat-a' in hl:
                norm_headers.append('Category A')
            elif 'category b' in hl or 'cat b' in hl or 'cat-b' in hl:
                norm_headers.append('Category B')
            elif 'category c' in hl or 'cat c' in hl or 'cat-c' in hl:
                norm_headers.append('Category C')
            elif 'category d' in hl or 'cat d' in hl or 'cat-d' in hl:
                norm_headers.append('Category D')
            elif 'meal' in hl:
                norm_headers.append('Meal Plan')
            else:
                norm_headers.append(h)
                
        # Format rows: ensure row columns align nicely
        cleaned_rows = []
        expected_cols = len(norm_headers)
        
        for r in master_rows:
            # If row has exact count or close
            if len(r) == expected_cols:
                cleaned_rows.append(r)
            elif len(r) > expected_cols:
                # Merge middle hotel cells if split
                cleaned_rows.append(r[:expected_cols])
            else:
                # Pad with empty
                cleaned_rows.append(r + ['-'] * (expected_cols - len(r)))

        structured_acc = {
            "headers": norm_headers,
            "rows": cleaned_rows
        }

    # 2. Structure Cost Tables
    structured_costs = []
    
    # Check if there are titles like "Friday and Saturday" in full_text
    is_statue_of_unity = "statue-of-unity" in slug
    
    for t_idx, t in enumerate(cost_tables):
        if not t or len(t) < 2:
            continue
            
        # Clean rows
        rows = []
        for r in t:
            non_empty = [c for c in r if c]
            if non_empty:
                rows.append(non_empty)
                
        if not rows:
            continue
            
        # Filter out paragraph/notes tables (must have at least 2 columns and mention Pax or Cost)
        first_r_str = " ".join(rows[0]).lower()
        all_r_str = " ".join([" ".join(r) for r in rows]).lower()
        if not ('pax' in all_r_str or 'per person' in all_r_str or 'category' in all_r_str or 'travelling' in all_r_str):
            continue
        if len(rows[0]) < 2 and len(rows) > 1 and len(rows[1]) < 2:
            continue

        # Determine Table Title
        table_title = "Package Cost (Per Person)"
        currency = "INR"
        if "usd" in all_r_str:
            currency = "USD"
            
        if is_statue_of_unity:
            if t_idx == 0:
                table_title = "Weekend Rates (Friday & Saturday)"
            elif t_idx == 1:
                table_title = "Weekday Rates (Sunday to Thursday)"
        elif "cat-a" in first_r_str or "cat a" in first_r_str:
            table_title = "Package Cost - Category A (in USD)"
        elif "cat-b" in first_r_str or "cat b" in first_r_str:
            table_title = "Package Cost - Category B (in USD)"
        elif "cat-c" in first_r_str or "cat c" in first_r_str:
            table_title = "Package Cost - Category C (in USD)"
        elif "inr" in first_r_str or "inr" in all_r_str:
            table_title = "Package Cost (Per Person in INR)"

        # Check if first 2 rows are multi-row header (e.g. Sri Lanka date ranges)
        header_row = rows[0]
        data_rows = rows[1:]
        
        # If row[0] has 'USD' and row[1] has dates, merge or handle
        if len(rows) >= 2 and ('usd' in rows[0][0].lower() or 'usd' in rows[1][0].lower()):
            if any('2026' in c or '2027' in c for c in rows[0] + rows[1]):
                # Seasonal table
                pass

        # Format costs in data rows if currency is INR
        formatted_rows = []
        for dr in data_rows:
            f_row = []
            for col_idx, cell in enumerate(dr):
                if col_idx == 0:
                    f_row.append(cell)
                else:
                    if currency == "INR":
                        f_row.append(format_price(cell))
                    elif currency == "USD":
                        f_row.append('$' + cell.replace('$', '').strip() if cell.isdigit() else cell)
                    else:
                        f_row.append(cell)
            formatted_rows.append(f_row)

        structured_costs.append({
            "title": table_title,
            "currency": currency,
            "headers": header_row,
            "rows": formatted_rows
        })

    all_extracted[slug] = {
        "accommodations": structured_acc,
        "costTables": structured_costs
    }

print(f"Writing structured data to {OUTPUT_JSON}...")
with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(all_extracted, f, indent=2, ensure_ascii=False)

print(f"Successfully generated package-tables.json with {len(all_extracted)} packages!")

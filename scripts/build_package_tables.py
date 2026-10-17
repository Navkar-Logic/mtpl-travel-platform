import os
import sys
import re
import json
import pdfplumber

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"f:\Navkar Logic Client Projects\mtpl-travel-platform"
STORAGE_DIR = os.path.join(BASE_DIR, "storage", "media", "public")
TS_FILE = os.path.join(BASE_DIR, "src", "features", "packages", "data", "packages.ts")

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

print(f"Loaded {len(packages)} packages.")

def clean_cell(cell):
    if cell is None:
        return ""
    # Clean multiple spaces and newlines
    c = str(cell).strip()
    c = re.sub(r'[ \t]+', ' ', c)
    # Replace multiple newlines with single newline or space if within word
    lines = [line.strip() for line in c.split('\n') if line.strip()]
    return " ".join(lines)

def is_acc_header(row):
    cleaned = [clean_cell(c).lower() for c in row if clean_cell(c)]
    has_city = any('city' in c for c in cleaned)
    has_nights = any('night' in c for c in cleaned)
    has_cat = any('cat' in c or 'hotel' in c or 'standard' in c or 'deluxe' in c for c in cleaned)
    return (has_city and (has_nights or has_cat))

def is_cost_header(row):
    cleaned = [clean_cell(c).lower() for c in row if clean_cell(c)]
    has_cost = any('cost' in c or 'package' in c or 'rate' in c or 'price' in c for c in cleaned)
    has_cat_or_pax = any('pax' in c or 'category' in c or 'cat' in c or 'standard' in c or 'deluxe' in c or 'twin' in c for c in cleaned)
    return (has_cost or has_cat_or_pax)

def clean_row_cells(row):
    # Remove empty / None columns
    # But preserve column alignment if None is in the middle of a sparse table
    return [clean_cell(c) for c in row]

def format_price_str(val):
    v = val.strip().replace(',', '')
    if v.isdigit():
        num = int(v)
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

extracted_data = {}
stats = {"acc_ok": 0, "acc_fail": 0, "cost_ok": 0, "cost_fail": 0}

for slug, key in packages:
    pdf_path = os.path.join(STORAGE_DIR, key)
    with pdfplumber.open(pdf_path) as pdf:
        all_tables = []
        for p_idx, page in enumerate(pdf.pages):
            tables = page.extract_tables()
            for t in tables:
                all_tables.append((p_idx + 1, t))

    # Identify Accommodation Tables & Cost Tables
    acc_tables = []
    cost_tables = []
    
    # Track state
    found_acc = False
    
    for page_num, raw_table in all_tables:
        if not raw_table or len(raw_table) == 0:
            continue
            
        # Clean rows
        cleaned_table = []
        for r in raw_table:
            # Check if row has any non-empty cell
            cells = clean_row_cells(r)
            if any(c != "" for c in cells):
                cleaned_table.append(cells)
                
        if not cleaned_table:
            continue
            
        first_row = cleaned_table[0]
        first_row_str = " ".join(first_row).lower()
        
        # Check if this table is Accommodation
        if is_acc_header(first_row):
            acc_tables.append(cleaned_table)
            found_acc = True
        elif found_acc and len(acc_tables) > 0 and len(cost_tables) == 0:
            # Check if it's a continuation of accommodation
            # Accommodation continuation typically has city in first cell and nights in second cell
            # E.g. cells[0] is not a long paragraph, cells[1] is a digit
            # And does NOT have 'pax' or 'package cost'
            is_cost = any('pax' in " ".join(r).lower() or 'package cost' in " ".join(r).lower() or 'per person' in " ".join(r).lower() for r in cleaned_table)
            if is_cost:
                cost_tables.append(cleaned_table)
            else:
                # Continuation of accommodation table!
                acc_tables.append(cleaned_table)
        elif 'package cost' in first_row_str or 'per person cost' in first_row_str or any('pax' in " ".join(r).lower() for r in cleaned_table):
            cost_tables.append(cleaned_table)
        elif len(cost_tables) > 0:
            # Maybe another seasonal cost table (like in Sri Lanka or Sunday-Thursday vs Friday-Saturday)
            if any('pax' in " ".join(r).lower() or 'travelling' in " ".join(r).lower() or 'cost' in " ".join(r).lower() for r in cleaned_table):
                cost_tables.append(cleaned_table)

    # Process and structure Accommodation Table
    structured_acc = None
    if acc_tables:
        # Merge acc_tables
        master_headers = []
        master_rows = []
        
        for t_idx, t in enumerate(acc_tables):
            start_row = 0
            if t_idx == 0:
                # Extract headers
                raw_headers = [c for c in t[0] if c]
                # Filter out empty and normalize
                master_headers = raw_headers
                start_row = 1
            else:
                # Check if this sub-table has a repeated header
                if is_acc_header(t[0]):
                    start_row = 1
                    
            for r in t[start_row:]:
                # Filter out pure empty or single non-cell
                non_empty = [c for c in r if c]
                if len(non_empty) >= 2:
                    master_rows.append(non_empty)
                    
        structured_acc = {
            "headers": master_headers,
            "rows": master_rows
        }
        stats["acc_ok"] += 1
    else:
        stats["acc_fail"] += 1

    # Process and structure Cost Tables
    structured_costs = []
    if cost_tables:
        for t in cost_tables:
            # Clean empty columns across the table
            if not t:
                continue
            # Filter rows with meaningful data
            rows = []
            for r in t:
                non_empty = [c for c in r if c]
                if non_empty:
                    rows.append(non_empty)
            if rows:
                structured_costs.append({
                    "headers": rows[0],
                    "rows": rows[1:] if len(rows) > 1 else []
                })
        if structured_costs:
            stats["cost_ok"] += 1
        else:
            stats["cost_fail"] += 1
    else:
        stats["cost_fail"] += 1

    extracted_data[slug] = {
        "accommodations": structured_acc,
        "costTables": structured_costs
    }

print("\n=== EXTRACTION STATS ===")
print(f"Accommodation: {stats['acc_ok']} OK, {stats['acc_fail']} FAIL")
print(f"Cost Tables:   {stats['cost_ok']} OK, {stats['cost_fail']} FAIL")

# Check failures
for slug, data in extracted_data.items():
    if not data["accommodations"] or not data["costTables"]:
        print(f"Partial/Missing in {slug}: acc={bool(data['accommodations'])}, cost={bool(data['costTables'])}")

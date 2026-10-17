import os
import sys
import re
import json
import pypdf

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"f:\Navkar Logic Client Projects\mtpl-travel-platform"
STORAGE_DIR = os.path.join(BASE_DIR, "storage", "media", "public")
TS_FILE = os.path.join(BASE_DIR, "src", "features", "packages", "data", "packages.ts")

with open(TS_FILE, "r", encoding="utf-8") as f:
    ts_content = f.read()

pattern = re.compile(
    r'"id":\s*"([^"]+)",\s*'
    r'"slug":\s*"([^"]+)",\s*'
    r'"title":\s*"([^"]+)",.*?'
    r'"pdfDownloadKey":\s*"([^"]+)"',
    re.DOTALL
)

packages = []
for m in pattern.finditer(ts_content):
    packages.append({
        "id": m.group(1),
        "slug": m.group(2),
        "title": m.group(3),
        "pdfDownloadKey": m.group(4)
    })

acc_found = 0
cost_found = 0
acc_patterns = {}
cost_patterns = {}

for p in packages:
    pdf_path = os.path.join(STORAGE_DIR, p["pdfDownloadKey"])
    reader = pypdf.PdfReader(pdf_path)
    full_text = "\n".join([page.extract_text() or "" for page in reader.pages])
    
    # Check accommodation
    has_acc = False
    for kw in ["Accommodation options:", "Accommodation Options:", "Accommodation options", "Hotel options:", "HOTEL DETAILS"]:
        if kw in full_text:
            has_acc = True
            acc_patterns[kw] = acc_patterns.get(kw, 0) + 1
            break
    if has_acc:
        acc_found += 1
    else:
        print(f"[NO ACC] {p['slug']} ({p['pdfDownloadKey']})")

    # Check package cost
    has_cost = False
    for kw in ["Package cost:", "Package Cost:", "PACKAGE COST", "Package cost", "Package Cost"]:
        if kw in full_text:
            has_cost = True
            cost_patterns[kw] = cost_patterns.get(kw, 0) + 1
            break
    if has_cost:
        cost_found += 1
    else:
        print(f"[NO COST] {p['slug']} ({p['pdfDownloadKey']})")

print(f"\nAccommodation found: {acc_found} / {len(packages)}")
print(f"Cost found: {cost_found} / {len(packages)}")
print("Acc keywords:", acc_patterns)
print("Cost keywords:", cost_patterns)

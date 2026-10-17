import os
import sys
import re
import json
import pypdf

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"f:\Navkar Logic Client Projects\mtpl-travel-platform"
TS_FILE = os.path.join(BASE_DIR, "src", "features", "packages", "data", "packages.ts")

with open(TS_FILE, "r", encoding="utf-8") as f:
    ts_content = f.read()

# Extract all package slugs and pdfDownloadKey
pattern = re.compile(
    r'"id":\s*"([^"]+)",\s*'
    r'"slug":\s*"([^"]+)",\s*'
    r'"title":\s*"([^"]+)",.*?'
    r'"pdfDownloadKey":\s*"([^"]+)",.*?'
    r'"pdfOriginalFilename":\s*"([^"]+)"',
    re.DOTALL
)

packages = []
for m in pattern.finditer(ts_content):
    packages.append({
        "id": m.group(1),
        "slug": m.group(2),
        "title": m.group(3),
        "pdfDownloadKey": m.group(4),
        "pdfOriginalFilename": m.group(5)
    })

print(f"Total packages parsed from packages.ts: {len(packages)}")

# Verify PDF existence for each package
found_in_storage = 0
found_in_assets = 0
not_found = []

for p in packages:
    # check in storage/media/public/
    path1 = os.path.join(BASE_DIR, "storage", "media", "public", p["pdfDownloadKey"])
    # check in storage/media/public/docs/
    path2 = os.path.join(BASE_DIR, "storage", "media", "public", "docs", p["pdfDownloadKey"])
    # check in assets/pdf/extracted/
    # search recursively in assets/pdf/extracted for original filename
    found = False
    if os.path.exists(path1):
        p["pdf_path"] = path1
        found_in_storage += 1
        found = True
    elif os.path.exists(path2):
        p["pdf_path"] = path2
        found_in_storage += 1
        found = True
    else:
        # Search in assets/pdf/extracted
        for root, dirs, files in os.walk(os.path.join(BASE_DIR, "assets", "pdf", "extracted")):
            for f in files:
                if f.lower() == p["pdfOriginalFilename"].lower() or f.lower() == p["pdfDownloadKey"].lower():
                    p["pdf_path"] = os.path.join(root, f)
                    found_in_assets += 1
                    found = True
                    break
            if found:
                break
    if not found:
        not_found.append(p)

print(f"Found in storage: {found_in_storage}")
print(f"Found in assets: {found_in_assets}")
print(f"Not found: {len(not_found)}")
if not_found:
    for nf in not_found:
        print(f"Missing: {nf['slug']} | {nf['pdfDownloadKey']} | {nf['pdfOriginalFilename']}")

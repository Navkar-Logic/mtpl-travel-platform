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
    r'"slug":\s*"([^"]+)",.*?'
    r'"pdfDownloadKey":\s*"([^"]+)"',
    re.DOTALL
)

packages = []
for m in pattern.finditer(ts_content):
    packages.append((m.group(1), m.group(2)))

print(f"Loaded {len(packages)} packages.")

# Sample 10 diverse packages
sample_indices = [0, 5, 10, 20, 30, 40, 50, 60, 70, 76]

for idx in sample_indices:
    slug, key = packages[idx]
    pdf_path = os.path.join(STORAGE_DIR, key)
    reader = pypdf.PdfReader(pdf_path)
    full_text = "\n".join([page.extract_text() or "" for page in reader.pages])
    
    print(f"\n==================== [{idx}] {slug} ====================")
    
    # Extract between "Accommodation options:" and "Package cost:"
    acc_start = full_text.find("Accommodation options:")
    cost_start = full_text.find("Package cost:")
    inc_start = full_text.find("Inclusions:")
    if inc_start == -1:
        inc_start = full_text.find("INCLUSIONS:")
        
    print(f"Offsets: acc={acc_start}, cost={cost_start}, inc={inc_start}")
    
    if acc_start != -1 and cost_start != -1:
        acc_text = full_text[acc_start + len("Accommodation options:"):cost_start].strip()
        print("--- ACC TEXT ---")
        print(acc_text)
        
    if cost_start != -1 and inc_start != -1:
        cost_text = full_text[cost_start + len("Package cost:"):inc_start].strip()
        print("--- COST TEXT ---")
        print(cost_text)

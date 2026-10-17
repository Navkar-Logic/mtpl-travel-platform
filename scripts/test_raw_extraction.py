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

print(f"Total packages: {len(packages)}")

def clean_noise(text):
    # Remove page numbers like "\n 3 \n" or "\n 4 \n"
    text = re.sub(r'\n\s*\d+\s*\n', '\n', text)
    # Remove multiple spaces/newlines
    text = re.sub(r'[ \t]+', ' ', text)
    return text.strip()

results = {}
failed_acc = []
failed_cost = []

for slug, key in packages:
    pdf_path = os.path.join(STORAGE_DIR, key)
    reader = pypdf.PdfReader(pdf_path)
    full_text = "\n".join([page.extract_text() or "" for page in reader.pages])
    
    # 1. ACCOMMODATION
    acc_idx = full_text.find("Accommodation options:")
    cost_idx = full_text.find("Package cost:")
    inc_idx = full_text.find("Inclusions:")
    if inc_idx == -1:
        inc_idx = full_text.find("INCLUSIONS:")
        
    acc_data = None
    cost_data = []
    
    if acc_idx != -1 and cost_idx != -1 and cost_idx > acc_idx:
        raw_acc = full_text[acc_idx + len("Accommodation options:"):cost_idx]
        cleaned_acc = clean_noise(raw_acc)
        lines = [line.strip() for line in cleaned_acc.split('\n') if line.strip()]
        
        header_line = None
        for l in lines[:3]:
            if "City" in l and ("Nights" in l or "Night" in l):
                header_line = l
                break
                
        categories = []
        if header_line:
            cats = re.findall(r'Category\s+[A-Z]|Standard|Deluxe|Super Deluxe|Luxury|Premium', header_line, re.I)
            if cats:
                categories = cats
        if not categories:
            categories = ["Category A", "Category B", "Category C"]
            
        acc_data = {
            "raw": cleaned_acc,
            "header": header_line or "City Nights Category A Category B Category C Meal Plan",
            "categories": categories
        }
    else:
        failed_acc.append((slug, key))
        
    if cost_idx != -1 and inc_idx != -1 and inc_idx > cost_idx:
        raw_cost = full_text[cost_idx + len("Package cost:"):inc_idx]
        cleaned_cost = clean_noise(raw_cost)
        cost_data.append({
            "raw": cleaned_cost
        })
    else:
        failed_cost.append((slug, key, cost_idx, inc_idx))
        
    results[slug] = {
        "accommodation": acc_data,
        "cost": cost_data
    }

print(f"Accommodation extracted: {len(packages) - len(failed_acc)} / {len(packages)}")
print(f"Cost extracted: {len(packages) - len(failed_cost)} / {len(packages)}")
if failed_acc:
    print("Failed ACC:", failed_acc)
if failed_cost:
    print("Failed COST:", failed_cost)

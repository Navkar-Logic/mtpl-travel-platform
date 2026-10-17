import os
import sys
import pypdf

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"f:\Navkar Logic Client Projects\mtpl-travel-platform"
EXTRACTED_DIR = os.path.join(BASE_DIR, "assets", "pdf", "extracted")

samples = [
    "Andaman/MTPL_Amazing_Andaman_4N_5D.pdf",
    "Bhutan/MTPL_Bhutan_Tour_via_Bagdogra_6N_7D.pdf",
    "Himachal/MTPL_Scenic_Shimla_Manali_Ex_IXC_6N_7D.pdf",
    "Kashmir/MTPL_Charismatic_Kashmir_7N_8D.pdf",
    "Kerala/MTPL_Best_of_Kerala_5N_6D.pdf",
    "Rajasthan and Gujrat/MTPL_Royal_Rajasthan_8N_9D_Revised.pdf",
    "SriLanka/MTPL_Scenic_SriLanka_6N_7D_Revised.pdf",
]

for sample in samples:
    full_path = os.path.join(EXTRACTED_DIR, sample.replace("/", os.sep))
    if not os.path.exists(full_path):
        print(f"NOT FOUND: {full_path}")
        continue
    print(f"\n==================== {sample} ====================")
    reader = pypdf.PdfReader(full_path)
    full_text = "\n".join([page.extract_text() or "" for page in reader.pages])
    
    # Check for Accommodation
    acc_idx = full_text.find("Accommodation options:")
    if acc_idx == -1:
        acc_idx = full_text.find("Accommodation")
    if acc_idx != -1:
        print("--- ACCOMMODATION SNIPPET ---")
        print(full_text[acc_idx:acc_idx+1200])
    else:
        print("Accommodation NOT found by keyword")
        
    # Check for Package cost
    cost_idx = full_text.find("Package cost:")
    if cost_idx == -1:
        cost_idx = full_text.find("Package cost")
    if cost_idx != -1:
        print("--- PACKAGE COST SNIPPET ---")
        print(full_text[cost_idx:cost_idx+800])
    else:
        print("Package cost NOT found by keyword")

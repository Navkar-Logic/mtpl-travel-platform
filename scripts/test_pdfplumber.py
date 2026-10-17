import os
import sys
import json
import pdfplumber

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"f:\Navkar Logic Client Projects\mtpl-travel-platform"
STORAGE_DIR = os.path.join(BASE_DIR, "storage", "media", "public")

sample_keys = [
    "mtpl-amazing-andaman-4n-5d.pdf",
    "mtpl-charismatic-kashmir-7n-8d.pdf",
    "mtpl-scenic-srilanka-6n-7d-revised.pdf"
]

for key in sample_keys:
    pdf_path = os.path.join(STORAGE_DIR, key)
    print(f"\n==================== {key} ====================")
    with pdfplumber.open(pdf_path) as pdf:
        for p_idx, page in enumerate(pdf.pages):
            tables = page.extract_tables()
            if tables:
                print(f"Page {p_idx+1} found {len(tables)} tables:")
                for t_idx, table in enumerate(tables):
                    print(f"  Table {t_idx+1}: {len(table)} rows")
                    for row in table[:4]:
                        print("    ", row)

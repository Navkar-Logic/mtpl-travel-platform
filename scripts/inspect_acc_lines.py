import os
import sys
import re
import json
import pypdf

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"f:\Navkar Logic Client Projects\mtpl-travel-platform"
STORAGE_DIR = os.path.join(BASE_DIR, "storage", "media", "public")

sample_keys = [
    "mtpl-amazing-andaman-4n-5d.pdf",
    "mtpl-charismatic-kashmir-7n-8d.pdf",
    "mtpl-best-of-kerala-5n-6d.pdf",
    "mtpl-scenic-srilanka-6n-7d-revised.pdf",
    "mtpl-statue-of-unity-3n-4d.pdf"
]

for key in sample_keys:
    pdf_path = os.path.join(STORAGE_DIR, key)
    reader = pypdf.PdfReader(pdf_path)
    full_text = "\n".join([page.extract_text() or "" for page in reader.pages])
    acc_idx = full_text.find("Accommodation options:")
    cost_idx = full_text.find("Package cost:")
    raw = full_text[acc_idx + len("Accommodation options:"):cost_idx]
    
    print(f"\n==================== {key} ====================")
    lines = raw.split("\n")
    for i, line in enumerate(lines):
        print(f"{i:2d}: {repr(line)}")

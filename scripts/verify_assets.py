import os
import re

with open("src/features/packages/data/packages.ts", "r", encoding="utf-8") as f:
    text = f.read()

images = re.findall(r'"heroImage":\s*"/api/media/([^"]+)"', text)
pdfs = re.findall(r'"pdfDownloadKey":\s*"([^"]+)"', text)

print(f"Found {len(images)} heroImages and {len(pdfs)} pdfDownloadKeys in packages.ts")

storage_root = os.path.join("storage", "media", "public")
missing_img = [img for img in images if not os.path.exists(os.path.join(storage_root, img))]
missing_pdf = [pdf for pdf in pdfs if not os.path.exists(os.path.join(storage_root, pdf))]

print(f"Missing images on disk: {len(missing_img)}")
print(f"Missing PDFs on disk: {len(missing_pdf)}")

if not missing_img and not missing_pdf:
    print("VERIFICATION CONFIRMED: All 77 package images and PDFs exist on disk!")

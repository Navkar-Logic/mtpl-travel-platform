import os
import json
import urllib.parse
import re

ts_path = r"src\features\packages\data\packages.ts"
with open(ts_path, "r", encoding="utf-8") as f:
    text = f.read()

WHATSAPP_PHONE = "918381006600"

lines = text.split("\n")
new_lines = []

pkg_title = ""
pkg_duration = ""

for line in lines:
    # Match package-level title only (starts with 4 spaces)
    title_m = re.match(r'^\s{4}"title":\s*"(.*?)",', line)
    if title_m:
        pkg_title = title_m.group(1)
        
    dur_m = re.match(r'^\s{4}"duration":\s*"(.*?)",', line)
    if dur_m:
        pkg_duration = dur_m.group(1)
        
    if '"priceDisplay":' in line:
        new_lines.append('    "priceDisplay": "Price on Request",')
        continue
        
    if '"pricingBasis":' in line:
        new_lines.append('    "pricingBasis": "Customized quote tailored to travel dates, hotel tier, and party size",')
        continue
        
    if '"isPriceOnRequest":' in line:
        new_lines.append('    "isPriceOnRequest": true,')
        continue
        
    if '"whatsAppHref":' in line:
        msg = f"Hello MTPL, I am interested in planning a trip for {pkg_title} ({pkg_duration}). Please share the latest quote, seasonal availability, and customization details."
        encoded = urllib.parse.quote(msg)
        new_lines.append(f'    "whatsAppHref": "https://wa.me/{WHATSAPP_PHONE}?text={encoded}",')
        continue
        
    new_lines.append(line)

with open(ts_path, "w", encoding="utf-8") as f:
    f.write("\n".join(new_lines))

print("Fixed package-level title in whatsAppHref.")

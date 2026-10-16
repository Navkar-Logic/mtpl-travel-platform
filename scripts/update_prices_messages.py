import os
import json
import urllib.parse
import re

ts_path = r"src\features\packages\data\packages.ts"
with open(ts_path, "r", encoding="utf-8") as f:
    text = f.read()

# Load packages array by parsing the JSON segment
start_idx = text.find("[")
end_idx = text.rfind("]") + 1

# If JSON loads directly, update; otherwise regex replace
WHATSAPP_PHONE = "918381006600"

def update_package_data():
    lines = text.split("\n")
    new_lines = []
    
    current_title = ""
    current_duration = ""
    
    for line in lines:
        # Capture title
        title_m = re.search(r'"title":\s*"(.*?)",', line)
        if title_m:
            current_title = title_m.group(1)
            
        dur_m = re.search(r'"duration":\s*"(.*?)",', line)
        if dur_m:
            current_duration = dur_m.group(1)
            
        # Update priceDisplay
        if '"priceDisplay":' in line:
            new_lines.append('    "priceDisplay": "Price on Request",')
            continue
            
        # Update pricingBasis
        if '"pricingBasis":' in line:
            new_lines.append('    "pricingBasis": "Personalized quote customized to travel dates, hotel category, and group size",')
            continue
            
        # Update isPriceOnRequest
        if '"isPriceOnRequest":' in line:
            new_lines.append('    "isPriceOnRequest": true,')
            continue
            
        # Update whatsAppHref with higher quality message
        if '"whatsAppHref":' in line:
            msg = f"Hello MTPL team, I am interested in planning a trip for {current_title} ({current_duration}). Could you please share the detailed quote, seasonal availability, and customization options?"
            encoded = urllib.parse.quote(msg)
            new_lines.append(f'    "whatsAppHref": "https://wa.me/{WHATSAPP_PHONE}?text={encoded}",')
            continue
            
        new_lines.append(line)
        
    return "\n".join(new_lines)

updated_content = update_package_data()
with open(ts_path, "w", encoding="utf-8") as f:
    f.write(updated_content)

print("Successfully updated packages.ts with 'Price on Request' and improved WhatsApp messages.")

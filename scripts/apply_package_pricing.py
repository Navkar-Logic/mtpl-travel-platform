import json
import re
import urllib.parse

with open('scripts/extracted_package_prices.json', 'r', encoding='utf-8') as f:
    prices_map = json.load(f)

ts_path = r'src/features/packages/data/packages.ts'
with open(ts_path, 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.split('\n')
new_lines = []

current_slug = None
current_title = None
current_duration = None

WHATSAPP_PHONE = '918381006600'
NOTE_PRICING_BASIS = 'Indicative starting tariff per person. Exact pricing varies by travel dates, party size, and chosen hotel tier. Send a quotation request for verified final pricing.'

updated_count = 0

for line in lines:
    m_slug = re.search(r'"slug":\s*"(.*?)",', line)
    if m_slug:
        current_slug = m_slug.group(1)
        
    m_title = re.search(r'"title":\s*"(.*?)",', line)
    if m_title:
        current_title = m_title.group(1)
        
    m_dur = re.search(r'"duration":\s*"(.*?)",', line)
    if m_dur:
        current_duration = m_dur.group(1)
        
    if '"priceDisplay":' in line and current_slug in prices_map:
        disp = prices_map[current_slug]['priceDisplay']
        new_lines.append(f'    "priceDisplay": "{disp}",')
        updated_count += 1
        continue
        
    if '"pricingBasis":' in line:
        new_lines.append(f'    "pricingBasis": "{NOTE_PRICING_BASIS}",')
        continue
        
    if '"isPriceOnRequest":' in line:
        new_lines.append('    "isPriceOnRequest": false,')
        continue
        
    if '"whatsAppHref":' in line and current_title:
        p_info = prices_map.get(current_slug, {})
        p_disp = p_info.get('priceDisplay', 'Price on Request')
        msg = f"Hello MTPL team, I am interested in planning a trip for {current_title} ({current_duration}, {p_disp}). Please provide an exact customized quote for my travel dates, group size, and preferred hotel category."
        encoded = urllib.parse.quote(msg)
        new_lines.append(f'    "whatsAppHref": "https://wa.me/{WHATSAPP_PHONE}?text={encoded}",')
        continue
        
    new_lines.append(line)

with open(ts_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_lines))

print(f"Updated {updated_count} package prices in src/features/packages/data/packages.ts successfully!")

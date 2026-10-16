import re
import urllib.parse

ts_path = r'src/features/packages/data/packages.ts'
with open(ts_path, 'r', encoding='utf-8') as f:
    text = f.read()

sri_lanka_prices = {
    'mtpl-explore-sri-lanka-8n-9d-revised': ('Starting from $782*', 'Explore Sri Lanka', '08 Nights / 09 Days'),
    'mtpl-heritage-and-beaches-of-srilanka-6n-7d-revised': ('Starting from $514*', 'Heritage & Beaches Of Sri Lanka', '06 Nights / 07 Days'),
    'mtpl-scenic-srilanka-6n-7d-revised': ('Starting from $464*', 'Scenic Sri Lanka', '06 Nights / 07 Days'),
    'mtpl-wonders-of-srilanka-7n-8d-revised': ('Starting from $573*', 'Wonders Of Sri Lanka', '07 Nights / 08 Days'),
}

lines = text.split('\n')
new_lines = []
curr_slug = None

for line in lines:
    m_slug = re.search(r'"slug":\s*"(.*?)",', line)
    if m_slug:
        curr_slug = m_slug.group(1)
        
    if curr_slug in sri_lanka_prices:
        p_disp, title, dur = sri_lanka_prices[curr_slug]
        if '"priceDisplay":' in line:
            new_lines.append(f'    "priceDisplay": "{p_disp}",')
            continue
        if '"whatsAppHref":' in line:
            msg = f"Hello MTPL team, I am interested in planning a trip for {title} ({dur}, {p_disp}). Please provide an exact customized quote for my travel dates, group size, and preferred hotel category."
            encoded = urllib.parse.quote(msg)
            new_lines.append(f'    "whatsAppHref": "https://wa.me/918381006600?text={encoded}",')
            continue
            
    new_lines.append(line)

with open(ts_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_lines))

print('Updated Sri Lanka prices successfully!')

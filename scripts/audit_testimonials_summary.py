import json

with open('src/features/testimonials/data/testimonials.json', encoding='utf-8') as f:
    d = json.load(f)

print(f"Total in JSON: {len(d['testimonials'])}")
for i, t in enumerate(d['testimonials']):
    name = t.get('customerName') or 'Customer Name Not Specified'
    r_stat = t.get('ratingStatus')
    rating = f"{t.get('rating')} Stars (Verified)" if r_stat == 'verified' else 'No Rating in Source'
    date = t.get('date') or 'No Date in Source'
    unc = t.get('uncertainText') or []
    is_dup = t['id'] == 'testimonial-022'
    dup_str = " [DUPLICATE of testimonial-016 - Excluded from site]" if is_dup else ""
    print(f"{i+1}. [{t['id']}]{dup_str}")
    print(f"   Customer: {name}")
    print(f"   Rating: {rating}")
    print(f"   Date: {date}")
    print(f"   Uncertain items: {len(unc)}: {unc}")
    clean_excerpt = t['text'][:80].replace('\n', ' ').encode('ascii', 'backslashreplace').decode('ascii')
    print(f"   Excerpt: {clean_excerpt}...")
    print()

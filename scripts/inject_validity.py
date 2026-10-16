import os
import json
import re

ts_path = r"src\features\packages\data\packages.ts"
with open(ts_path, "r", encoding="utf-8") as f:
    text = f.read()

# Load the packages using python regex/json parse
# Or re-parse the array cleanly
start_pos = text.find("[")
end_pos = text.rfind("]") + 1

# Let's inspect the exceptions:
# 1. Andaman packages (3 packages)
# 2. Sri Lanka revised package: mtpl-heritage-and-beaches-of-srilanka-6n-7d-revised
# 3. Rann of Kutch packages (2 packages): mtpl-rann-of-kutch-2n-3d, mtpl-rann-of-kutch-3n-4d

# Load validity audit results
with open("scratch/validity_audit.json", "r", encoding="utf-8") as f:
    audit_data = json.load(f)

audit_map = {item["slug"]: item for item in audit_data}

# Specific overrides based on requirements:
# - Andaman: "Please confirm validity with MTPL"
# - Sri Lanka revised: "1 October 2026 – 31 March 2027 (Holiday supplement under review)"
# - Rann of Kutch: "Please confirm validity with MTPL"
# - Verified packages: "1 October 2026 – 31 March 2027"

def get_validity_for_slug(slug):
    if "andaman" in slug:
        return {
            "display": "Please confirm validity with MTPL",
            "status": "confirmation_required",
            "notice": "Seasonal validity requires MTPL confirmation (date discrepancy in source document)"
        }
    elif "rann-of-kutch" in slug:
        return {
            "display": "Please confirm validity with MTPL",
            "status": "confirmation_required",
            "notice": "Seasonal tent package (validity dates not explicitly stated in document body)"
        }
    elif slug == "mtpl-heritage-and-beaches-of-srilanka-6n-7d-revised":
        return {
            "display": "1 October 2026 – 31 March 2027 (Supplement under review)",
            "status": "confirmation_required",
            "notice": "Valid 1 Oct 2026 – 31 Mar 2027; Christmas/New Year holiday supplement clause requires review"
        }
    else:
        # All other 71 packages have verified 1 October 2026 - 31 March 2027 validity in source text
        return {
            "display": "1 October 2026 – 31 March 2027",
            "status": "verified",
            "notice": "Valid 1 October 2026 – 31 March 2027 (Peak exclusions apply 20 Dec – 10 Jan)"
        }

# Process packages.ts line by line to add validityDisplay and validityStatus
lines = text.split("\n")
new_lines = []

current_slug = ""

for line in lines:
    slug_m = re.match(r'^\s{4}"slug":\s*"(.*?)",', line)
    if slug_m:
        current_slug = slug_m.group(1)
        
    if '"validityNotice":' in line:
        val_info = get_validity_for_slug(current_slug)
        new_lines.append(f'    "validityNotice": "{val_info["notice"]}",')
        new_lines.append(f'    "validityDisplay": "{val_info["display"]}",')
        new_lines.append(f'    "validityStatus": "{val_info["status"]}",')
        continue
        
    new_lines.append(line)

with open(ts_path, "w", encoding="utf-8") as f:
    f.write("\n".join(new_lines))

print("Successfully injected validityDisplay and validityStatus into packages.ts!")

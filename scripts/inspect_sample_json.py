import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

# Run build_package_tables logic on 3 samples and print JSON
from build_package_tables import extracted_data

samples = [
    "mtpl-amazing-andaman-4n-5d",
    "mtpl-charismatic-kashmir-7n-8d",
    "mtpl-statue-of-unity-3n-4d",
    "mtpl-scenic-srilanka-6n-7d-revised"
]

for s in samples:
    print(f"\n==================== {s} ====================")
    print(json.dumps(extracted_data[s], indent=2))

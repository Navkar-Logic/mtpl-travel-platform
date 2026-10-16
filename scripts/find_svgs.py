import os

files_with_svg = []
for root, dirs, files in os.walk("src"):
    for f in files:
        if f.endswith((".tsx", ".ts")):
            p = os.path.join(root, f)
            with open(p, "r", encoding="utf-8") as fl:
                c = fl.read()
                if "<svg" in c:
                    files_with_svg.append(p)

print(f"Files with SVG ({len(files_with_svg)}):")
for f in files_with_svg:
    print(f)

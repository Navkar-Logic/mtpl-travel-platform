import os

path = r"src\features\packages\data\packages.ts"
with open(path, "r", encoding="utf-8") as f:
    data = f.read()

data = data.replace('"pdfDownloadKey": "docs/', '"pdfDownloadKey": "')

with open(path, "w", encoding="utf-8") as f:
    f.write(data)

print("Replacement complete. File updated.")

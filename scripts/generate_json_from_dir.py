import os
import json

# Base directory of the script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# Paths relative to script
BASE_DIR = os.path.join(SCRIPT_DIR, "..", "public/images")
OUTPUT_JSON = os.path.join(SCRIPT_DIR, "..", "src/data/photos.json")

# Ensure parent directory exists
os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)

# Category mapping
CATEGORY_FOLDERS = {
    "nature": "Nature & Landscapes",
    "people": "Portraits & People",
    "urban": "Urban & Architecture"
}

# Load existing JSON if it exists
if os.path.exists(OUTPUT_JSON):
    with open(OUTPUT_JSON, "r", encoding="utf-8") as f:
        existing_photos = json.load(f)
else:
    existing_photos = []

# Map imageUrl -> title for preserving titles
existing_title_map = {photo["imageUrl"]: photo["title"] for photo in existing_photos}

photos = []
photo_id = 1

for folder, category in CATEGORY_FOLDERS.items():
    folder_path = os.path.join(BASE_DIR, folder)
    if not os.path.exists(folder_path):
        continue

    for filename in os.listdir(folder_path):
        if not filename.lower().endswith((".jpg", ".jpeg", ".png")):
            continue

        image_url = f"/images/{folder}/{filename}"
        title = existing_title_map.get(image_url, "Name Placeholder")

        photos.append({
            "id": photo_id,
            "title": title,
            "imageUrl": image_url,
            "category": category
        })
        photo_id += 1

# Write to JSON
with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(photos, f, indent=2, ensure_ascii=False)

print(f"Generated {len(photos)} photos in {OUTPUT_JSON}")

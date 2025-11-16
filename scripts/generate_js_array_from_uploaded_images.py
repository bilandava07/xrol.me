from get_metadata import get_cr3_dng_metadata
from PIL import Image
import shutil
import json
import os

# Base directory of the script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

INCOMING_DIR = os.path.join(SCRIPT_DIR, "..", "incoming_photos")

JS_FILE = "src/data/photos.js"
BASE_DIR = os.path.join(SCRIPT_DIR, "..", "public/images")

CATEGORY_FOLDERS = {
    "nature": "Nature & Landscapes",
    "people": "Portraits & People",
    "urban": "Urban & Architecture"
}

photos = []
photo_id = 1

for folder, category in CATEGORY_FOLDERS.items():
    incoming_folder_path = os.path.join(
        INCOMING_DIR, folder)       # <- read RAWs from here
    
    public_folder_path = os.path.join(
        BASE_DIR, folder)            # <- copy JPGs here
    os.makedirs(public_folder_path, exist_ok=True)

    if not os.path.exists(incoming_folder_path):
        continue

    for filename in os.listdir(incoming_folder_path):
        # Only process original RAW files for metadata
        if filename.lower().endswith(('.cr3', '.dng')):
            original_image_base = filename.rsplit('.', 1)[0].lower()
            original_file_path = os.path.join(incoming_folder_path, filename)
            metadata = get_cr3_dng_metadata(original_file_path)

            # Look for corresponding production image
            for prod_filename in os.listdir(incoming_folder_path):
                prod_base, ext = prod_filename.lower().rsplit('.', 1)
                if ext in ("jpg", "jpeg", "png") and prod_base.startswith(original_image_base):
                    prod_file_path = os.path.join(
                        incoming_folder_path, prod_filename)

                    # copy JPG/PNG to public folder
                    shutil.copy2(prod_file_path, public_folder_path)

                    # Open JPG/PNG to determine displayed orientation
                    with Image.open(prod_file_path) as img:
                        width, height = img.size
                        if width > height:
                            orientation = "wide"
                        elif height > width:
                            orientation = "tall"
                        else:
                            orientation = "square"

                    # Build title
                    parts = prod_base.split('_')
                    title_parts = parts[2:] if len(parts) > 2 else parts
                    if title_parts:
                        title_parts[0] = title_parts[0].capitalize()
                    title = " ".join(title_parts) if title_parts else prod_base

                    production_image_url = f"/images/{folder}/{prod_filename}"

                    # Add to photos array
                    photos.append({
                        "id": photo_id,
                        "title": title,
                        "imageUrl": production_image_url,
                        "category": category,
                        "metadata": metadata,         # existing metadata from RAW
                        "orientation": orientation    # new field from JPG
                    })
                    photo_id += 1


# Convert JSON to JS array string
js_array_content = json.dumps(photos, indent=4, ensure_ascii=False)

# Wrap in JS module with CATEGORIES import
js_content = f"""import {{ CATEGORIES }} from "@/constants/photo_categories";

const photos = {js_array_content};

export default photos;
"""

# Write to JS file
with open(JS_FILE, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Converted {len(photos)} photos to JS array in {JS_FILE}")

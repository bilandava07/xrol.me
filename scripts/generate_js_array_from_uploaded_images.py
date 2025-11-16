import os
import json
from get_metadata import get_cr3_dng_metadata

# Base directory of the script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))


JS_FILE = "src/data/photos.js"          

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

photos = []
photo_id = 1

for folder, category in CATEGORY_FOLDERS.items():
    folder_path = os.path.join(BASE_DIR, folder)
    if not os.path.exists(folder_path):
        continue

    for filename in os.listdir(folder_path):
        
        if filename.lower().endswith(('.cr3', '.dng'))  :
            # found original photo to extract metadata from
            
            original_image_base = filename.rsplit('.', 1)[0].lower()

            original_file_path = os.path.join(folder_path, filename)
            metadata = get_cr3_dng_metadata(original_file_path)

            print(metadata)

            for filename in os.listdir(folder_path):
                filename_base, extention = filename.lower().rsplit('.')
                
                if extention in ("jpg", "jpeg", "png") and filename_base.startswith(original_image_base):
                    # Found correspondent production image => extract name
                    
                    parts = filename_base.split('_')  # ['IMG','001','sunset','at','beach']
                    title_parts = parts[2:]  # everything after first 2 parts
                    
                    # Capitalize the first word
                    title_parts[0] = title_parts[0].capitalize()
                    
                    title = " ".join(title_parts)
                    
                    production_image_url = f"/images/{folder}/{filename}"
                    
                    
                    photos.append({
                        "id" : photo_id,
                        "title": title,
                        "imageUrl" : production_image_url,
                        "category": category,
                        "metadata": metadata
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

print(f"Converted {len(photos)} photos from JSON to JS array in {JS_FILE}")

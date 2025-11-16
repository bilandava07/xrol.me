from get_metadata import get_cr3_dng_metadata
from PIL import Image
import json
import os
import subprocess

# Base directory of the script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

INCOMING_DIR = os.path.join(SCRIPT_DIR, "..", "incoming_photos")

JS_FILE = "src/data/photos.js"
PUBLIC_DIR = os.path.join(SCRIPT_DIR, "..", "public/images")
THUMBNAILS_DIR = os.path.join(SCRIPT_DIR, "..", "public/images_thumbnails")

CATEGORY_FOLDERS = {
    "nature": "Nature & Landscapes",
    "people": "Portraits & People",
    "urban": "Urban & Architecture"
}

photos = []
photo_id = 1

# Thumbnail max size
THUMB_MAX_SIZE = 750
FULLRES_MAX_SIZE = 1920  

for folder, category in CATEGORY_FOLDERS.items():
    
    incoming_folder_path = os.path.join(INCOMING_DIR, folder) # Incoming raw and jpg images
    
    public_folder_path = os.path.join(PUBLIC_DIR, folder) # Full res public images
    
    thumbnail_folder_path = os.path.join(THUMBNAILS_DIR, folder) # Compressed thumbnail images

    os.makedirs(public_folder_path, exist_ok=True)
    os.makedirs(thumbnail_folder_path, exist_ok=True)


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
                    
                    
                    # Full-resolution output path
                    fullres_output_path = os.path.join(public_folder_path, prod_filename)
                    # Thumbnail output path
                    thumb_output_path = os.path.join(thumbnail_folder_path, prod_filename)
                    
                    
                    # --- Compress full-res using FFmpeg ---
                    subprocess.run([
                        "ffmpeg",
                        "-y",
                        "-i", prod_file_path,
                        "-vf", f"scale='if(gt(iw,ih),{FULLRES_MAX_SIZE},-1)':'if(gt(ih,iw),{FULLRES_MAX_SIZE},-1)'",
                        "-q:v", "2",  # high quality
                        fullres_output_path
                    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
                    
                    
                    
                    # --- Generate thumbnail ---
                    subprocess.run([
                        "ffmpeg",
                        "-y",
                        "-i", prod_file_path,
                        "-vf", f"scale='if(gt(iw,ih),{THUMB_MAX_SIZE},-1)':'if(gt(ih,iw),{THUMB_MAX_SIZE},-1)'",
                        "-q:v", "2",  
                        thumb_output_path
                    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
                    
                    


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

                    # Add to photos array with both thumbnail and full-res URLs
                    photos.append({
                        "id": photo_id,
                        "title": title,
                        "imageUrl": f"/images_thumbnails/{folder}/{prod_filename}",  # thumbnail
                        "fullResUrl": f"/images/{folder}/{prod_filename}",           # full-res
                        "category": category,
                        "metadata": metadata,
                        "orientation": orientation
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

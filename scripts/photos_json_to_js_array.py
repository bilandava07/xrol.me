import json
import os

# Paths
JSON_FILE = "src/data/photos.json"          
JS_FILE = "src/data/photos.js"          

# Ensure output folder exists
os.makedirs(os.path.dirname(JS_FILE), exist_ok=True)

# Load JSON
with open(JSON_FILE, "r", encoding="utf-8") as f:
    photos = json.load(f)

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

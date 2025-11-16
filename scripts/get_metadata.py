import json
import subprocess

def get_cr3_metadata(filepath):
    result = subprocess.run(
        ["exiftool", "-json", filepath],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )

    if result.returncode != 0:
        raise Exception(result.stderr)

    raw = json.loads(result.stdout)[0]

    # Return clean, JSON-friendly metadata
    metadata = {
        "ISO": raw.get("ISO"),
        "ShutterSpeed": raw.get("ShutterSpeed"),
        "Aperture": raw.get("Aperture"),
        "LensModel": raw.get("LensModel"),
        "CameraModel": raw.get("Model")
    }

    return metadata

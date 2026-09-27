"""Render orthographic and isometric documentation views of the FreeCAD STL exports.

The source geometry lives beside this script in model_A/rev9 and model_B/rev2.
These are model views, not photographs or proof of a physical fit. Requires NumPy and Pillow.
"""
from pathlib import Path
import struct

import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent
TRIANGLE = np.dtype([("normal", "<f4", 3), ("vertices", "<f4", (3, 3)), ("attr", "<u2")])
VIEWS = {
    "isometric": (0.72, -0.58, -1.0),
    "front": (0.0, -0.12, -1.0),
    "back": (0.0, -0.12, 1.0),
    "top": (0.0, -1.0, -0.045),
    "side": (1.0, -0.16, -0.035),
}


def render(stl: Path, output: Path, eye, colour):
    raw = stl.read_bytes()
    count = struct.unpack_from("<I", raw, 80)[0]
    triangles = np.frombuffer(raw, TRIANGLE, count, 84)
    vertices = triangles["vertices"].astype(np.float64)
    normals = triangles["normal"].astype(np.float64)
    eye = np.array(eye, dtype=np.float64)
    eye /= np.linalg.norm(eye)
    right = np.cross(eye, [0, 1, 0])
    right /= np.linalg.norm(right)
    up = np.cross(right, eye)
    vertices -= (vertices.min(axis=(0, 1)) + vertices.max(axis=(0, 1))) / 2
    projected = np.stack((vertices @ right, vertices @ up), axis=-1)
    low, high = projected.min(axis=(0, 1)), projected.max(axis=(0, 1))
    width, height = 1100, 760
    scale = min((width - 140) / (high[0] - low[0]), (height - 140) / (high[1] - low[1]))
    projected = (projected - (low + high) / 2) * scale
    projected[..., 0] += width / 2
    projected[..., 1] = height / 2 - projected[..., 1]
    depth = (vertices @ eye).mean(axis=1)
    light = np.array([0.35, -0.5, 0.8]); light /= np.linalg.norm(light)
    lightness = np.clip(normals @ light, -1, 1)
    visible = normals @ eye > 0.005
    canvas = Image.new("RGB", (width, height), "#e9edf0")
    draw = ImageDraw.Draw(canvas)
    for index in np.argsort(depth):
        if not visible[index]:
            continue
        shade = 0.66 + 0.30 * max(0, lightness[index])
        fill = tuple(min(255, round(c * shade + 18)) for c in colour)
        draw.polygon([tuple(p) for p in projected[index]], fill=fill)
    output.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output, optimize=True)


if __name__ == "__main__":
    models = (
        ("model_A/rev9", "rev9_1_front_shell.stl", (215, 92, 69)),
        ("model_B/rev2", "desk_rev2_1_front_shell.stl", (92, 122, 147)),
    )
    for folder, filename, colour in models:
        base = ROOT / folder
        for name, eye in VIEWS.items():
            render(base / filename, base / "images" / f"{name}.png", eye, colour)
        plate = "rev9_2_back_plate.stl" if "model_A" in folder else "desk_rev2_2_back_plate.stl"
        render(base / plate, base / "images" / "back_plate.png", VIEWS["isometric"], (110, 123, 132))
    base = ROOT / "model_B/rev2"
    render(base / "desk_rev2_4_stand.stl", base / "images" / "stand.png", (0.7, -0.7, -1), (80, 101, 115))

#!/usr/bin/env python3
"""Check that published HTML lessons and their Moodle copies stay identical."""

from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "docs" / "assets"
EXPORT_ROOT = ROOT / "exports" / "moodle" / "digitalis-kultura" / "5-evfolyam"
LESSON_FOLDERS = ("bemutatokeszites", "animacio")


def main() -> int:
    errors = []
    checked = 0

    for folder in LESSON_FOLDERS:
        source_dir = SOURCE_ROOT / folder
        export_dir = EXPORT_ROOT / folder
        for source in sorted(source_dir.glob("*.html")):
            copy = export_dir / source.name
            checked += 1
            if not copy.is_file():
                errors.append(f"Hiányzó Moodle-export: {copy.relative_to(ROOT)}")
            elif source.read_bytes() != copy.read_bytes():
                errors.append(
                    f"Eltérő HTML-példányok: {source.relative_to(ROOT)} "
                    f"↔ {copy.relative_to(ROOT)}"
                )

    if checked == 0:
        errors.append("Nem találhatók ellenőrizhető HTML-leckék.")

    if errors:
        print("Moodle-export eltérés!\n" + "\n".join(f"- {error}" for error in errors))
        print("\nFrissítsd a Moodle-exportot a webes HTML-forrás alapján.")
        return 1

    print(f"Rendben: {checked} HTML-lecke Moodle-exportja megegyezik a webes változattal.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

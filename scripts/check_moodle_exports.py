#!/usr/bin/env python3
"""Check Moodle HTML exports, omitting web-only navigation in animation lessons."""

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "docs" / "assets"
EXPORT_ROOT = ROOT / "exports" / "moodle" / "digitalis-kultura" / "5-evfolyam"
LESSON_FOLDERS = ("bemutatokeszites", "animacio")


def expected_moodle_html(source_html: str, folder: str, filename: str) -> str:
    """Keep animation lessons identical except for web-only page navigation."""
    if folder != "animacio":
        return source_html

    source_html, bottom_links = re.subn(
        r"<hr style='border:0[^']*'><p style=\"margin:10px 0\">.*?</p>",
        "",
        source_html,
        count=1,
        flags=re.DOTALL,
    )
    source_html, overview_button = re.subn(
        r'<div style="margin-top:20px;padding:14px;border-radius:12px;background:#f4f9fb;border:1px solid #d8e5ec">.*?</div>',
        "",
        source_html,
        count=1,
        flags=re.DOTALL,
    )
    if bottom_links != (0 if filename == "index.html" else 1) or overview_button != 1:
        raise ValueError(f"Nem található a webes navigáció: {folder}/{filename}")

    if filename == "index.html":
        source_html, lesson_menu = re.subn(
            r'<h2[^>]*>Hat külön állomás – követhető haladás</h2><div style="display:grid;gap:10px">.*?</div>',
            "",
            source_html,
            count=1,
            flags=re.DOTALL,
        )
        source_html, self_link = re.subn(
            r'<p style="margin:10px 0"><a [^>]*>Moodle-hoz használható külön HTML-oldalak</a></p>',
            "",
            source_html,
            count=1,
        )
        if lesson_menu != 1 or self_link != 1:
            raise ValueError("Nem található az animáció webes áttekintő menüje.")

    return source_html


def main() -> int:
    errors = []
    checked = 0

    for folder in LESSON_FOLDERS:
        source_dir = SOURCE_ROOT / folder
        export_dir = EXPORT_ROOT / folder
        for source in sorted(source_dir.glob("*.html")):
            if folder == "animacio" and source.name.endswith("-interaktiv.html"):
                continue  # Shared interactive widget, embedded via iframe in both versions.
            copy = export_dir / source.name
            checked += 1
            if not copy.is_file():
                errors.append(f"Hiányzó Moodle-export: {copy.relative_to(ROOT)}")
                continue
            try:
                expected = expected_moodle_html(
                    source.read_text(encoding="utf-8"), folder, source.name
                )
            except ValueError as error:
                errors.append(str(error))
                continue

            if expected != copy.read_text(encoding="utf-8"):
                errors.append(
                    f"Eltérő HTML-példányok: {source.relative_to(ROOT)} "
                    f"↔ {copy.relative_to(ROOT)}"
                )

    if checked == 0:
        errors.append("Nem találhatók ellenőrizhető HTML-leckék.")

    if errors:
        print("Moodle-export eltérés!\n" + "\n".join(f"- {error}" for error in errors))
        print("\nFrissítsd a Moodle-exportot a webes HTML-forrás alapján, "
              "az animációs leckék webes navigációja nélkül.")
        return 1

    print(f"Rendben: {checked} HTML-lecke Moodle-exportja ellenőrizve "
          "(az animációs leckékben webes navigáció nélkül).")
    return 0


if __name__ == "__main__":
    sys.exit(main())

#!/usr/bin/env python3
"""Verify Moodle HTML exports against their site sources.

The four animation lessons have separate Moodle versions without site navigation.
Legacy web links to lessons 5 and 6 are redirects, not Moodle lessons.
"""

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "docs" / "assets"
EXPORT_ROOT = ROOT / "exports" / "moodle" / "digitalis-kultura" / "5-evfolyam"
ANIMATION_LESSONS = (
    "01-fedezd-fel.html",
    "02-probald-ki.html",
    "03-tervezd-meg.html",
    "04-keszitsd-el.html",
)


def expected_moodle_html(source_html: str, folder: str, filename: str) -> str:
    if folder != "animacio":
        return source_html

    if filename == "index.html":
        return source_html

    # The first two hosted lessons retain their original web footer.
    source_html = re.sub(
        r"<hr style='border:0[^']*'><p style=\"margin:10px 0\">.*?</p>",
        "",
        source_html,
        count=1,
        flags=re.DOTALL,
    )
    source_html = re.sub(
        r'<div style="margin-top:20px;padding:14px;border-radius:12px;background:#f4f9fb;border:1px solid #d8e5ec">.*?</div>',
        "",
        source_html,
        count=1,
        flags=re.DOTALL,
    )

    # The merged project and submission lessons use a compact footer instead.
    source_html = re.sub(
        r'<div style="display:flex;flex-wrap:wrap;gap:8px;margin:20px 0">.*?</div>',
        "",
        source_html,
        count=1,
        flags=re.DOTALL,
    )

    # In the practice lesson the progress ribbon is website-only.
    if filename == "02-probald-ki.html":
        source_html, count = re.subn(
            r'<div style="margin:0 0 20px;padding:12px 14px;border:1px solid #d8e6ed;border-radius:18px;background:#fff;text-align:center;font-size:13px;line-height:2.2">.*?</div>',
            "",
            source_html,
            count=1,
            flags=re.DOTALL,
        )
        if count != 1:
            raise ValueError("Hiányzik a gyakorlólecke webes haladási sávja.")

    return source_html


def main() -> int:
    errors = []
    checked = 0

    for folder in ("bemutatokeszites", "animacio"):
        source_dir = SOURCE_ROOT / folder
        export_dir = EXPORT_ROOT / folder
        if folder == "animacio":
            filenames = ("index.html",) + ANIMATION_LESSONS
            sources = [source_dir / filename for filename in filenames]
        else:
            sources = sorted(source_dir.glob("*.html"))

        for source in sources:
            copy = export_dir / source.name
            checked += 1
            if not source.is_file() or not copy.is_file():
                errors.append(f"Hiányzó forrás vagy Moodle-export: {source.name}")
                continue
            try:
                expected = expected_moodle_html(
                    source.read_text(encoding="utf-8"), folder, source.name
                )
            except ValueError as error:
                errors.append(str(error))
                continue
            actual = copy.read_text(encoding="utf-8")
            if expected != actual:
                errors.append(
                    f"Eltérő HTML-példányok: {source.relative_to(ROOT)} "
                    f"↔ {copy.relative_to(ROOT)}"
                )

    if errors:
        print("Moodle-export eltérés!\n" + "\n".join(f"- {error}" for error in errors))
        return 1

    print(f"Rendben: {checked} HTML-forrás és Moodle-export ellenőrizve.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

from pathlib import Path
import os
import re
from urllib.parse import urlsplit, urlunsplit

SITE = Path("offline-site").resolve()
ATTR_RE = re.compile(r'(?P<attr>href|src)=(?P<quote>"|\')(?P<url>.*?)(?P=quote)', re.IGNORECASE)


def is_external(url: str) -> bool:
    return (
        not url
        or url.startswith(("#", "http://", "https://", "mailto:", "javascript:", "data:", "tel:"))
    )


def virtual_base(html_file: Path) -> Path:
    """A forrásoldalak nyers HTML-linkjei könyvtár-URL-ekhez készültek.

    Online egy `.../oldal/` URL egy szinttel mélyebb bázist jelent, mint az
    offline `.../oldal.html`. Az index.html kivétel: annak online és offline
    báziskönyvtára ugyanaz.
    """
    if html_file.name.lower() == "index.html":
        return html_file.parent
    return html_file.parent / html_file.stem


def existing_target(candidate: Path, original_path: str):
    """Megkeresi, mire kell mutatnia az offline hivatkozásnak."""
    if candidate.is_file():
        return candidate

    # Könyvtár-URL vagy kiterjesztés nélküli oldal.
    if original_path.endswith("/") or candidate.suffix == "":
        html_candidate = candidate.with_suffix(".html")
        if html_candidate.is_file():
            return html_candidate
        index_candidate = candidate / "index.html"
        if index_candidate.is_file():
            return index_candidate

    if candidate.is_dir():
        index_candidate = candidate / "index.html"
        if index_candidate.is_file():
            return index_candidate

    return None


def to_relative_url(html_file: Path, target: Path, parts) -> str:
    relative = os.path.relpath(target, html_file.parent).replace(os.sep, "/")
    return urlunsplit(("", "", relative, parts.query, parts.fragment))


def rewrite_url(html_file: Path, url: str) -> str:
    if is_external(url):
        return url

    parts = urlsplit(url)
    path = parts.path
    if not path:
        return url

    # 1. Először próbáljuk a már helyes offline relatív útvonalat.
    if path.startswith("/"):
        current_candidate = SITE / path.lstrip("/")
    else:
        current_candidate = (html_file.parent / path).resolve()

    current_target = existing_target(current_candidate, path)

    # A / végű nyers HTML-linkek online könyvtár-URL-logikával készültek,
    # ezért ezeket akkor is a virtuális bázisból értelmezzük.
    if current_target is not None and not path.endswith("/"):
        return url

    # 2. Ha nem működik offline, értelmezzük az online könyvtár-URL bázisából.
    base = virtual_base(html_file)
    if path.startswith("/"):
        virtual_candidate = SITE / path.lstrip("/")
    else:
        virtual_candidate = (base / path).resolve()

    target = existing_target(virtual_candidate, path)
    if target is not None:
        return to_relative_url(html_file, target, parts)

    # 3. Biztonsági javítás képekhez / nyers relatív utakhoz: ha túl sok ../
    # került az útvonalba, egyenként elhagyjuk őket, amíg valódi fájlt találunk.
    trimmed = path
    while trimmed.startswith("../"):
        trimmed = trimmed[3:]
        candidate = (html_file.parent / trimmed).resolve()
        target = existing_target(candidate, trimmed)
        if target is not None:
            return to_relative_url(html_file, target, parts)

    return url


changed_files = 0
changed_links = 0

for html_file in SITE.rglob("*.html"):
    text = html_file.read_text(encoding="utf-8")

    def repl(match):
        global changed_links
        attr = match.group("attr")
        quote = match.group("quote")
        url = match.group("url")
        fixed = rewrite_url(html_file, url)
        if fixed != url:
            changed_links += 1
        return f"{attr}={quote}{fixed}{quote}"

    new_text = ATTR_RE.sub(repl, text)
    if new_text != text:
        html_file.write_text(new_text, encoding="utf-8")
        changed_files += 1

print(f"Offline hivatkozások javítva: {changed_links} hivatkozás, {changed_files} HTML-fájl.")

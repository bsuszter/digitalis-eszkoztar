from pathlib import Path
import re
from urllib.parse import urlsplit, urlunsplit

SITE = Path("offline-site").resolve()
HREF_RE = re.compile(r'href=("|\')(.*?)(\1)', re.IGNORECASE)


def rewrite_href(html_file: Path, href: str) -> str:
    if not href or href.startswith(("#", "http://", "https://", "mailto:", "javascript:", "data:")):
        return href

    parts = urlsplit(href)
    path = parts.path
    if not path.endswith("/"):
        return href

    base_dir = html_file.parent
    if path.startswith("/"):
        target = SITE / path.lstrip("/")
    else:
        target = (base_dir / path).resolve()

    file_candidate = target.with_suffix(".html")
    index_candidate = target / "index.html"

    if file_candidate.exists():
        replacement = Path(path.rstrip("/")).with_suffix(".html").as_posix()
    elif index_candidate.exists():
        replacement = path + "index.html"
    else:
        return href

    if path.startswith("/"):
        replacement = "/" + replacement.lstrip("/")

    return urlunsplit((parts.scheme, parts.netloc, replacement, parts.query, parts.fragment))


for html_file in SITE.rglob("*.html"):
    text = html_file.read_text(encoding="utf-8")

    def repl(match):
        quote = match.group(1)
        href = match.group(2)
        fixed = rewrite_href(html_file, href)
        return f"href={quote}{fixed}{quote}"

    new_text = HREF_RE.sub(repl, text)
    if new_text != text:
        html_file.write_text(new_text, encoding="utf-8")

print("Offline belső hivatkozások javítva.")

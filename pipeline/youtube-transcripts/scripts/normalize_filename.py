#!/usr/bin/env python3
import re
import unicodedata

def slugify(text: str, max_len: int = 80) -> str:
    text = unicodedata.normalize('NFKD', text)
    text = text.encode('ascii', 'ignore').decode('ascii')
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text).strip("-")
    if len(text) > max_len:
        text = text[:max_len].rstrip("-")
    return text or "untitled"

if __name__ == "__main__":
    import sys
    print(slugify(" ".join(sys.argv[1:])))

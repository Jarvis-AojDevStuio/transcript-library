#!/usr/bin/env python3
"""One-time (or occasional) migration to clean existing transcripts in-place.

- Removes inline VTT cue tags that leaked into .md bodies
- Removes VTT metadata lines (Kind/Language)
- Collapses duplicated lines
- Optionally recomputes word_count

Usage:
  python3 youtube-transcripts/scripts/reprocess_transcripts.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOPICS_DIR = ROOT / "topics"


def parse_frontmatter(text: str):
    if not text.startswith('---'):
        return {}, text
    parts = text.split('---', 2)
    if len(parts) < 3:
        return {}, text
    fm_raw = parts[1]
    body = parts[2].lstrip('\n')
    fm = {}
    for line in fm_raw.splitlines():
        if ':' not in line:
            continue
        k, v = line.split(':', 1)
        fm[k.strip()] = v.strip().strip('"')
    return fm, body


def build_frontmatter(fm: dict, extras: dict):
    ordered = [
        "video_id","title","channel","topic","published_date","ingested_date","source"
    ]
    optional = [
        "youtube_url",
        "duration",
        "word_count",
        "chunk",
        "total_chunks",
        "parent_video_id",
        "chunking",
    ]
    out = ['---']
    for k in ordered:
        out.append(f"{k}: \"{fm.get(k,'')}\"")
    merged = {**fm, **extras}
    for k in optional:
        if k in merged and merged.get(k) not in (None, ""):
            if k in ("duration", "word_count", "chunk", "total_chunks"):
                out.append(f"{k}: {merged.get(k)}")
            else:
                out.append(f"{k}: \"{merged.get(k)}\"")
    out.append('---')
    return "\n".join(out) + "\n"


def clean_body(body: str) -> str:
    lines = []
    for line in body.splitlines():
        line = line.strip('\ufeff').strip()
        if not line:
            continue
        if re.match(r"^(Kind|Language):\s", line):
            continue
        # strip inline cue tags
        line = re.sub(r"<\d{2}:\d{2}:\d{2}\.\d{3}>", "", line)
        line = re.sub(r"</?c(?:\.[^>]*)?>", "", line)
        line = re.sub(r"</?v[^>]*>", "", line)
        line = re.sub(r"<[^>]+>", "", line)
        line = re.sub(r"\s+", " ", line).strip()
        if not line:
            continue
        lines.append(line)
    out = []
    for l in lines:
        if not out or out[-1] != l:
            out.append(l)
    return "\n".join(out).strip() + "\n"


def main():
    changed = 0
    for md in TOPICS_DIR.rglob('*.md'):
        if md.name == 'README.md':
            continue
        text = md.read_text(errors='ignore')
        fm, body = parse_frontmatter(text)
        new_body = clean_body(body)
        wc = len(re.findall(r"\b\w+\b", new_body))
        extras = {"word_count": wc}
        if fm.get('video_id'):
            extras['youtube_url'] = f"https://youtube.com/watch?v={fm.get('video_id')}"
        new_text = build_frontmatter(fm, extras) + new_body
        if new_text != text:
            md.write_text(new_text)
            changed += 1
    print(f"Reprocessed {changed} transcript(s).")


if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""One-time helper: chunk any existing oversized transcript markdown files.

This complements automatic chunking in ingest_transcript.py.

Usage:
  python3 youtube-transcripts/scripts/chunk_oversized_transcripts.py --apply

By default runs in dry-run mode.
"""

import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOPICS_DIR = ROOT / "topics"

CHUNK_THRESHOLD = 8000  # words
CHUNK_TARGET = 4000     # words


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


def build_frontmatter(fm: dict):
    ordered = [
        "video_id",
        "title",
        "channel",
        "topic",
        "published_date",
        "ingested_date",
        "source",
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
    for k in optional:
        if k in fm and fm.get(k) not in (None, ""):
            if k in ("duration", "word_count", "chunk", "total_chunks"):
                out.append(f"{k}: {fm.get(k)}")
            else:
                out.append(f"{k}: \"{fm.get(k)}\"")
    out.append('---')
    return "\n".join(out) + "\n"


def chunk_text(text: str, target_words: int = CHUNK_TARGET) -> list[str]:
    lines = text.split("\n")
    chunks: list[str] = []
    current: list[str] = []
    current_count = 0

    for line in lines:
        if not line.strip():
            continue
        wc = len(re.findall(r"\b\w+\b", line))
        if current and (current_count + wc) > target_words:
            chunks.append("\n".join(current).strip() + "\n")
            current = [line]
            current_count = wc
        else:
            current.append(line)
            current_count += wc

    if current:
        chunks.append("\n".join(current).strip() + "\n")

    return chunks


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--apply', action='store_true', help='Write chunk files and delete originals')
    ap.add_argument('--threshold', type=int, default=CHUNK_THRESHOLD)
    ap.add_argument('--target', type=int, default=CHUNK_TARGET)
    args = ap.parse_args()

    changed = 0
    for md in TOPICS_DIR.rglob('*.md'):
        if md.name == 'README.md':
            continue
        text = md.read_text(errors='ignore')
        fm, body = parse_frontmatter(text)
        if not fm:
            continue
        wc = len(re.findall(r"\b\w+\b", body))
        if wc <= args.threshold:
            continue
        # Skip if already chunked
        if fm.get('chunk') or fm.get('total_chunks'):
            continue

        parts = chunk_text(body, target_words=args.target)
        total = len(parts)
        print(f"Oversized transcript: {md} ({wc} words) -> {total} chunks")

        if not args.apply:
            continue

        stem = md.stem
        vid = fm.get('video_id', '')
        for i, part_text in enumerate(parts, 1):
            part_wc = len(re.findall(r"\b\w+\b", part_text))
            out_fm = {**fm}
            out_fm['word_count'] = part_wc
            out_fm['chunk'] = i
            out_fm['total_chunks'] = total
            out_fm['parent_video_id'] = vid

            out_path = md.with_name(f"{stem}_part-{i:02d}.md")
            out_path.write_text(build_frontmatter(out_fm) + part_text)

        md.unlink()
        changed += 1

    if args.apply:
        print(f"Chunked and removed {changed} oversized transcript(s).")
    else:
        print("Dry run complete. Re-run with --apply to make changes.")


if __name__ == '__main__':
    main()

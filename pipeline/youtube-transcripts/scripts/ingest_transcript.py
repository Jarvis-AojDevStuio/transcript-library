#!/usr/bin/env python3
import argparse, json, re
from pathlib import Path
from datetime import datetime
from typing import Optional

from normalize_filename import slugify
from classify_topic import classify

CHUNK_THRESHOLD = 8000   # words
CHUNK_TARGET = 4000      # words per chunk

ROOT = Path(__file__).resolve().parents[1]
TOPICS_DIR = ROOT / "topics"
LOG_PATH = ROOT / "index" / "classification_log.csv"


def clean_vtt(text: str) -> str:
    """Clean VTT-ish text into plain transcript.

    Handles:
    - WEBVTT header
    - timestamp range lines
    - numeric cue counters
    - metadata lines like `Kind: captions`, `Language: en`
    - inline cue tags like `<00:00:00.400><c> word</c>`

    Approach: strip inline tags so tagged lines collapse to the same content as
    their "clean" duplicate, then de-duplicate consecutive repeats.
    """
    lines = []
    for line in text.splitlines():
        line = line.strip("\ufeff").strip()
        if not line or line.startswith("WEBVTT"):
            continue
        # Skip timestamp range lines
        if re.match(r"^\d{2}:\d{2}:\d{2}\.\d{3} --> ", line):
            continue
        # Skip numeric cue counters
        if re.match(r"^\d+$", line):
            continue
        # Skip VTT metadata lines
        if re.match(r"^(Kind|Language):\s", line):
            continue

        # Strip inline cue/style tags
        line = re.sub(r"<\d{2}:\d{2}:\d{2}\.\d{3}>", "", line)
        line = re.sub(r"</?c(?:\.[^>]*)?>", "", line)  # <c> or <c.color>
        line = re.sub(r"</?v[^>]*>", "", line)          # speaker tags
        # Any other leftover tags
        line = re.sub(r"<[^>]+>", "", line)

        # Normalize whitespace
        line = re.sub(r"\s+", " ", line).strip()
        if not line:
            continue
        lines.append(line)

    # De-duplicate consecutive identical lines
    out = []
    for l in lines:
        if not out or out[-1] != l:
            out.append(l)
    return "\n".join(out).strip() + "\n"


def load_info(info_path: Path):
    data = json.loads(info_path.read_text())
    title = data.get("title") or ""
    channel = data.get("channel") or data.get("uploader") or ""
    vid = data.get("id") or ""
    upload_date = data.get("upload_date")
    pub_date = None
    if upload_date and len(upload_date) == 8:
        pub_date = f"{upload_date[:4]}-{upload_date[4:6]}-{upload_date[6:]}"
    return vid, title, channel, pub_date, data


def write_md(out_path: Path, meta: dict, transcript: str):
    out_path.parent.mkdir(parents=True, exist_ok=True)

    # Required keys first (deterministic)
    ordered = [
        "video_id",
        "title",
        "channel",
        "topic",
        "published_date",
        "ingested_date",
        "source",
    ]
    # Optional enrichment keys
    optional = [
        "youtube_url",
        "duration",
        "word_count",
        # Chunk metadata (present only when chunking occurs)
        "chunk",
        "total_chunks",
        "parent_video_id",
        # Legacy field (kept for backwards compatibility; not used going forward)
        "chunking",
    ]

    front = ["---"]
    for k in ordered:
        front.append(f"{k}: \"{meta.get(k,'')}\"")
    for k in optional:
        if k in meta and meta.get(k) not in (None, ""):
            # numeric values: keep as plain value
            if k in ("duration", "word_count", "chunk", "total_chunks"):
                front.append(f"{k}: {meta.get(k)}")
            else:
                front.append(f"{k}: \"{meta.get(k)}\"")
    front.append("---")

    content = "\n".join(front) + "\n" + transcript
    out_path.write_text(content)


def log_classification(vid, title, topic, confidence, scores):
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    if not LOG_PATH.exists():
        LOG_PATH.write_text("video_id,title,topic,confidence,scores\n")
    safe_title = title.replace('"', "'")
    LOG_PATH.write_text(LOG_PATH.read_text() + f"\"{vid}\",\"{safe_title}\",{topic},{confidence:.3f},\"{scores}\"\n")


def chunk_text(text: str, target_words: int = CHUNK_TARGET) -> list[str]:
    """Split text into chunks of approximately target_words, breaking on line boundaries.

    The cleaned transcript is one line per caption-ish segment, so line boundaries are a
    reasonable proxy for paragraph boundaries.
    """
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


def ingest_one(vtt_path: Path, info_path: Optional[Path]):
    text = clean_vtt(vtt_path.read_text(errors="ignore"))
    vid = title = channel = ""
    pub_date = None
    info_data = None
    if info_path and info_path.exists():
        vid, title, channel, pub_date, info_data = load_info(info_path)
    if not title:
        title = vtt_path.stem
    # clean artifacts from filename-based titles
    title = re.sub(r"\s*\[[A-Za-z0-9_-]{6,}\]$", "", title).strip()
    if title.endswith(".en"):
        title = title[:-3]
    if not pub_date:
        pub_date = datetime.now().strftime("%Y-%m-%d")
    ingested_date = datetime.now().strftime("%Y-%m-%d")

    topic, conf, scores = classify(text, title=title, channel=channel)
    # Always store under the actual channel folder for consistency
    safe_channel = (channel or "unknown").replace("/", "-")
    out_dir = TOPICS_DIR / topic / safe_channel

    base_filename = f"{pub_date}_{slugify(title)}"

    # Enrich metadata when possible
    word_count = len(re.findall(r"\b\w+\b", text))
    base_meta = {
        "video_id": vid,
        "title": title,
        "channel": channel,
        "topic": topic,
        "published_date": pub_date,
        "ingested_date": ingested_date,
        "source": "youtube",
    }
    if vid:
        base_meta["youtube_url"] = f"https://youtube.com/watch?v={vid}"
    if info_data and isinstance(info_data, dict) and info_data.get("duration") is not None:
        base_meta["duration"] = info_data.get("duration")

    # Chunk if needed
    if word_count > CHUNK_THRESHOLD:
        parts = chunk_text(text, target_words=CHUNK_TARGET)
        total = len(parts)
        for i, part_text in enumerate(parts, 1):
            part_wc = len(re.findall(r"\b\w+\b", part_text))
            meta = {
                **base_meta,
                "word_count": part_wc,
                "chunk": i,
                "total_chunks": total,
                "parent_video_id": vid,
            }
            out_path = out_dir / f"{base_filename}_part-{i:02d}.md"
            write_md(out_path, meta, part_text)
    else:
        meta = {**base_meta, "word_count": word_count}
        out_path = out_dir / f"{base_filename}.md"
        write_md(out_path, meta, text)

    log_classification(vid, title, topic, conf, scores)

    # move info json alongside transcript if present
    if info_path and info_path.exists():
        if word_count > CHUNK_THRESHOLD:
            info_target = (out_dir / f"{base_filename}_part-01.md").with_suffix(".info.json")
        else:
            info_target = out_path.with_suffix(".info.json")
        info_target.write_text(info_path.read_text())
        info_path.unlink()

    # remove source VTT to avoid duplicate transcript files
    vtt_path.unlink()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--inbox", required=True, help="Folder containing .vtt + .info.json files")
    args = ap.parse_args()
    inbox = Path(args.inbox)
    for vtt in inbox.glob("*.vtt"):
        # yt-dlp often outputs "<id>.en.vtt" while metadata is "<id>.info.json"
        info = vtt.with_suffix(".info.json")
        if not info.exists() and vtt.name.endswith(".en.vtt"):
            info = vtt.with_name(vtt.name.replace(".en.vtt", ".info.json"))
        ingest_one(vtt, info if info.exists() else None)

if __name__ == "__main__":
    main()

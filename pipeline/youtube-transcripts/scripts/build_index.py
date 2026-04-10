#!/usr/bin/env python3
import csv
import json
from datetime import datetime
from pathlib import Path

from classify_topic import classify

ROOT = Path(__file__).resolve().parents[1]
TOPICS_DIR = ROOT / "topics"
INDEX_DIR = ROOT / "index"
CLASSIFICATION_LOG = INDEX_DIR / "classification_log.csv"
EMBEDDING_MANIFEST = INDEX_DIR / "embedding_manifest.json"


def parse_frontmatter(text: str):
    if not text.startswith("---"):
        return {}
    parts = text.split("---", 2)
    if len(parts) < 3:
        return {}
    fm = {}
    for line in parts[1].splitlines():
        if ":" not in line:
            continue
        k, v = line.split(":", 1)
        fm[k.strip()] = v.strip().strip('"')
    return fm


def parse_markdown_with_frontmatter(text: str):
    """Return (frontmatter_dict, body_text).

    Body excludes the frontmatter fence and starts after the second `---`.
    """
    if not text.startswith("---"):
        return {}, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return {}, text
    fm_text = parts[1]
    body = parts[2].lstrip("\n")
    fm = parse_frontmatter("---" + fm_text + "---")
    return fm, body


def _to_int_or_none(value: str | None):
    if value is None:
        return None
    s = str(value).strip()
    if not s:
        return None
    try:
        return int(s)
    except ValueError:
        return None


def build_embedding_manifest(transcripts: list[dict]) -> dict:
    """Generate a manifest of embedding-ready transcript files."""

    files = []
    for t in transcripts:
        wc = _to_int_or_none(t.get("word_count")) or 0
        chunk = _to_int_or_none(t.get("chunk"))
        total_chunks = _to_int_or_none(t.get("total_chunks"))

        topic = (t.get("topic") or "").strip()
        video_id = (t.get("video_id") or "").strip()

        # Readiness criteria:
        # - wc > 200
        # - wc < 8000 (or is a chunk)
        # - has video_id
        # - has valid topic classification (non-empty)
        ready = (
            wc > 200
            and (wc < 8000 or chunk is not None)
            and bool(video_id)
            and bool(topic)
        )

        files.append(
            {
                "path": t["file_path"],
                "video_id": video_id,
                "word_count": wc,
                "chunk": chunk,
                "total_chunks": total_chunks,
                "embedding_ready": ready,
            }
        )

    return {
        "generated": datetime.now().isoformat(timespec="seconds"),
        "total_files": len(files),
        "total_chunks": sum(1 for f in files if f["chunk"] is not None),
        "files": files,
    }


def main():
    INDEX_DIR.mkdir(parents=True, exist_ok=True)

    topics = []
    channels = {}
    videos = []
    classification_rows = []

    # topics.csv
    for topic_dir in TOPICS_DIR.iterdir():
        if not topic_dir.is_dir():
            continue
        readme = topic_dir / "README.md"
        desc = ""
        if readme.exists():
            lines = [
                l.strip()
                for l in readme.read_text(errors="ignore").splitlines()
                if l.strip()
            ]
            desc = lines[1] if len(lines) > 1 else (lines[0] if lines else "")
        topics.append({"topic": topic_dir.name, "description": desc})

    # scan transcripts (also rebuild classification_log.csv)
    for md in TOPICS_DIR.rglob("*.md"):
        if md.name == "README.md":
            continue
        text = md.read_text(errors="ignore")
        fm, body = parse_markdown_with_frontmatter(text)
        if not fm:
            continue

        videos.append(
            {
                "video_id": fm.get("video_id", ""),
                "parent_video_id": fm.get("parent_video_id", ""),
                "title": fm.get("title", ""),
                "channel": fm.get("channel", ""),
                "topic": fm.get("topic", ""),
                "published_date": fm.get("published_date", ""),
                "ingested_date": fm.get("ingested_date", ""),
                "word_count": fm.get("word_count", ""),
                "chunk": fm.get("chunk", ""),
                "total_chunks": fm.get("total_chunks", ""),
                "file_path": str(md.relative_to(ROOT)),
            }
        )

        ch = fm.get("channel", "")
        if ch:
            channels.setdefault(ch, {})
            channels[ch][fm.get("topic", "")] = channels[ch].get(fm.get("topic", ""), 0) + 1

        # Re-classify to keep classification_log.csv consistent with current topic keywords.
        # This is fast (keyword-based) and prevents stale title/video_id artifacts.
        title = fm.get("title", "")
        channel = fm.get("channel", "")
        topic, conf, scores = classify(body, title=title, channel=channel)
        classification_rows.append(
            {
                "video_id": fm.get("video_id", ""),
                "title": title,
                "topic": topic,
                "confidence": f"{conf:.3f}",
                "scores": json.dumps(scores, sort_keys=True),
            }
        )

    # channels.csv (primary topic = most common)
    channels_rows = []
    for ch, counts in channels.items():
        primary = max(counts, key=counts.get)
        channels_rows.append({"channel": ch, "primary_topic": primary})

    # write files
    with open(INDEX_DIR / "topics.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["topic", "description"])
        w.writeheader()
        w.writerows(topics)

    with open(INDEX_DIR / "channels.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["channel", "primary_topic"])
        w.writeheader()
        w.writerows(channels_rows)

    with open(INDEX_DIR / "videos.csv", "w", newline="") as f:
        w = csv.DictWriter(
            f,
            fieldnames=[
                "video_id",
                "parent_video_id",
                "title",
                "channel",
                "topic",
                "published_date",
                "ingested_date",
                "word_count",
                "chunk",
                "total_chunks",
                "file_path",
            ],
        )
        w.writeheader()
        w.writerows(videos)

    # classification_log.csv (rebuilt fresh every run)
    with open(CLASSIFICATION_LOG, "w", newline="") as f:
        w = csv.DictWriter(
            f,
            fieldnames=["video_id", "title", "topic", "confidence", "scores"],
        )
        w.writeheader()
        w.writerows(classification_rows)

    # embedding_manifest.json (groundwork for future embedding pipeline)
    manifest = build_embedding_manifest(videos)
    EMBEDDING_MANIFEST.write_text(json.dumps(manifest, indent=2, sort_keys=False) + "\n")


if __name__ == "__main__":
    main()

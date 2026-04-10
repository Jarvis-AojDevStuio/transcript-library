#!/usr/bin/env python3
"""Generate repo-root SUMMARY.md for human-readable sync status.

- Uses youtube-transcripts/index/videos.csv (regenerated each sync)
- Tracks last run's known video_ids in youtube-transcripts/index/.last_summary_state
- Writes SUMMARY.md at repo root

This is intentionally simple and dependency-free.
"""

from __future__ import annotations

import csv
import json
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Set

ROOT = Path(__file__).resolve().parents[2]  # repo root
YT_ROOT = Path(__file__).resolve().parents[1]
INDEX_DIR = YT_ROOT / "index"
VIDEOS_CSV = INDEX_DIR / "videos.csv"
STATE_PATH = INDEX_DIR / ".last_summary_state"
SUMMARY_MD = ROOT / "SUMMARY.md"


@dataclass
class Video:
    video_id: str
    title: str
    channel: str
    topic: str
    published_date: str
    ingested_date: str
    file_path: str


def load_videos() -> List[Video]:
    if not VIDEOS_CSV.exists():
        return []
    out: List[Video] = []
    with open(VIDEOS_CSV, newline="") as f:
        r = csv.DictReader(f)
        for row in r:
            out.append(
                Video(
                    video_id=row.get("video_id", "") or "",
                    title=row.get("title", "") or "",
                    channel=row.get("channel", "") or "",
                    topic=row.get("topic", "") or "",
                    published_date=row.get("published_date", "") or "",
                    ingested_date=row.get("ingested_date", "") or "",
                    file_path=row.get("file_path", "") or "",
                )
            )
    return out


def load_prev_ids() -> Set[str]:
    if not STATE_PATH.exists():
        return set()
    try:
        data = json.loads(STATE_PATH.read_text())
        ids = data.get("video_ids", [])
        if isinstance(ids, list):
            return {str(x) for x in ids if x}
    except Exception:
        pass
    return set()


def save_state(ids: Set[str]):
    STATE_PATH.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "updated_at": datetime.now().astimezone().isoformat(),
        "video_ids": sorted(ids),
    }
    STATE_PATH.write_text(json.dumps(payload, indent=2) + "\n")


def fmt_table(rows: List[List[str]]) -> str:
    if not rows:
        return ""
    # Simple GFM table
    header = rows[0]
    body = rows[1:]
    lines = []
    lines.append("| " + " | ".join(header) + " |")
    lines.append("|" + "|".join(["---"] * len(header)) + "|")
    for r in body:
        lines.append("| " + " | ".join(r) + " |")
    return "\n".join(lines)


def main():
    now = datetime.now().astimezone()
    videos = load_videos()

    current_ids = {v.video_id for v in videos if v.video_id}
    prev_ids = load_prev_ids()
    new_ids = current_ids - prev_ids

    new_videos = [v for v in videos if v.video_id in new_ids]
    # stable ordering: newest ingested_date first, then title
    new_videos.sort(key=lambda v: (v.ingested_date, v.title), reverse=True)

    # Totals by topic + unique channels per topic
    topic_counts: Dict[str, int] = defaultdict(int)
    topic_channels: Dict[str, Set[str]] = defaultdict(set)
    for v in videos:
        if v.topic:
            topic_counts[v.topic] += 1
            if v.channel:
                topic_channels[v.topic].add(v.channel)

    # Recent activity (last 7 days) by ingested_date
    by_day: Dict[str, int] = defaultdict(int)
    cutoff = (now - timedelta(days=7)).date()
    for v in videos:
        if not v.ingested_date:
            continue
        try:
            d = datetime.strptime(v.ingested_date, "%Y-%m-%d").date()
        except Exception:
            continue
        if d >= cutoff:
            by_day[str(d)] += 1

    # Render
    lines: List[str] = []
    lines.append("# Jarvis Activity Summary")
    lines.append("")
    lines.append(f"> Last sync: {now.strftime('%Y-%m-%d %H:%M %Z')}")
    lines.append("")

    lines.append("## This Run")
    lines.append("")
    lines.append(fmt_table([
        ["Metric", "Value"],
        ["New transcripts", str(len(new_videos))],
        ["Total transcripts", str(len(videos))],
    ]))
    lines.append("")

    lines.append("### New Transcripts")
    if not new_videos:
        lines.append("None detected since last run.")
    else:
        rows = [["Title", "Channel", "Topic"]]
        for v in new_videos:
            rows.append([v.title or v.video_id, v.channel or "", v.topic or ""])
        lines.append(fmt_table(rows))
    lines.append("")

    lines.append("## Totals")
    lines.append("")
    totals_rows = [["Topic", "Transcripts", "Channels"]]
    for topic in sorted(topic_counts.keys(), key=lambda t: topic_counts[t], reverse=True):
        totals_rows.append([topic, str(topic_counts[topic]), str(len(topic_channels[topic]))])
    totals_rows.append(["**Total**", f"**{len(videos)}**", ""])  # channel total not meaningful
    lines.append(fmt_table(totals_rows))
    lines.append("")

    lines.append("## Recent Activity (Last 7 Days)")
    lines.append("")
    recent_rows = [["Date", "New"]]
    for day in sorted(by_day.keys(), reverse=True):
        recent_rows.append([day, str(by_day[day])])
    if len(recent_rows) == 1:
        recent_rows.append(["(none)", "0"])
    lines.append(fmt_table(recent_rows))
    lines.append("")

    SUMMARY_MD.write_text("\n".join(lines) + "\n")
    save_state(current_ids)


if __name__ == "__main__":
    main()

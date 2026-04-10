#!/usr/bin/env python3
"""Auto-update README.md badge counts and What's Inside table from topics/ data."""
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
TOPICS_DIR = REPO_ROOT / "youtube-transcripts" / "topics"
README_PATH = REPO_ROOT / "README.md"


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


def get_scope(topic_dir: Path) -> str:
    readme = topic_dir / "README.md"
    if not readme.exists():
        return ""
    text = readme.read_text(errors="ignore")
    m = re.search(r"\*\*Scope:\*\*\s*(.*)", text)
    return m.group(1).strip().rstrip(".") if m else ""


def collect_stats():
    topics = {}
    for topic_dir in sorted(TOPICS_DIR.iterdir()):
        if not topic_dir.is_dir():
            continue
        transcripts = []
        for md in topic_dir.rglob("*.md"):
            if md.name == "README.md":
                continue
            fm = parse_frontmatter(md.read_text(errors="ignore"))
            if fm:
                transcripts.append(fm)
        channels = {t.get("channel", "") for t in transcripts if t.get("channel")}
        topics[topic_dir.name] = {
            "count": len(transcripts),
            "channels": len(channels),
            "scope": get_scope(topic_dir),
        }
    return topics


def build_badges(total_transcripts: int, total_topics: int, total_channels: int) -> str:
    return (
        f"<!-- BADGES:START -->\n"
        f"[![Transcripts](https://img.shields.io/badge/transcripts-{total_transcripts}-brightgreen)]()\n"
        f"[![Topics](https://img.shields.io/badge/topics-{total_topics}-orange)]()\n"
        f"[![Channels](https://img.shields.io/badge/channels-{total_channels}-purple)]()\n"
        f"<!-- BADGES:END -->"
    )


def build_stats_table(topics: dict, total_transcripts: int, total_channels: int) -> str:
    lines = [
        f"<!-- STATS:START -->",
        f"The vault currently holds **{total_transcripts} transcripts** from **{total_channels} channels** across **{len(topics)} topics**:",
        "",
        "| Topic | Transcripts | Channels | What's Covered |",
        "|:------|:-----------:|:--------:|:---------------|",
    ]
    # Sort by transcript count descending
    for name, data in sorted(topics.items(), key=lambda x: x[1]["count"], reverse=True):
        lines.append(
            f"| **{name}** | {data['count']} | {data['channels']} | {data['scope']} |"
        )
    lines.append("<!-- STATS:END -->")
    return "\n".join(lines)


def replace_section(text: str, start_marker: str, end_marker: str, replacement: str) -> str:
    pattern = re.compile(
        re.escape(start_marker) + r".*?" + re.escape(end_marker),
        re.DOTALL,
    )
    return pattern.sub(replacement, text)


def main():
    topics = collect_stats()
    total_transcripts = sum(t["count"] for t in topics.values())
    all_channels = set()
    for topic_dir in TOPICS_DIR.iterdir():
        if not topic_dir.is_dir():
            continue
        for md in topic_dir.rglob("*.md"):
            if md.name == "README.md":
                continue
            fm = parse_frontmatter(md.read_text(errors="ignore"))
            ch = fm.get("channel", "")
            if ch:
                all_channels.add(ch)
    total_channels = len(all_channels)

    readme = README_PATH.read_text()
    readme = replace_section(
        readme, "<!-- BADGES:START -->", "<!-- BADGES:END -->",
        build_badges(total_transcripts, len(topics), total_channels),
    )
    readme = replace_section(
        readme, "<!-- STATS:START -->", "<!-- STATS:END -->",
        build_stats_table(topics, total_transcripts, total_channels),
    )
    README_PATH.write_text(readme)
    print(f"README updated: {total_transcripts} transcripts, {len(topics)} topics, {total_channels} channels")


if __name__ == "__main__":
    main()

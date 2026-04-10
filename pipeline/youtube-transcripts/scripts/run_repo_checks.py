#!/usr/bin/env python3
"""Repository QA checks for RAG-ready transcript vault.

Usage:
  python3 youtube-transcripts/scripts/run_repo_checks.py
"""
import csv
import re
import sys
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parents[1]
TOPICS_DIR = ROOT / "topics"
INDEX_DIR = ROOT / "index"

MAX_CHARS = 200_000
MIN_CHARS = 200
MISC_WARN_THRESHOLD = 0.20
SINGLE_TOPIC_DOMINANCE = 0.70
MIN_TOPIC_TRANSCRIPTS = 3
UNKNOWN_CHANNEL_WARN_THRESHOLD = 0.10


def ok(msg):
    return f"[OK] {msg}"

def warn(msg):
    return f"[WARN] {msg}"

def fail(msg):
    return f"[FAIL] {msg}"


def parse_frontmatter(text: str):
    if not text.startswith("---"):
        return {}, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return {}, text
    fm_raw = parts[1]
    body = parts[2].lstrip("\n")
    fm = {}
    for line in fm_raw.splitlines():
        if ":" not in line:
            continue
        k, v = line.split(":", 1)
        fm[k.strip()] = v.strip().strip('"')
    return fm, body


def load_transcripts():
    files = []
    for md in TOPICS_DIR.rglob("*.md"):
        if md.name == "README.md":
            continue
        rel = md.relative_to(ROOT)
        files.append(md)
    return files


def is_date(s):
    try:
        datetime.strptime(s, "%Y-%m-%d")
        return True
    except Exception:
        return False


def structure_integrity_checks(transcripts):
    issues = []
    # Any transcript outside topics/<topic>/<channel>/
    for md in transcripts:
        parts = md.relative_to(TOPICS_DIR).parts
        if len(parts) < 3:
            issues.append(f"Transcript not under /topics/<topic>/<channel>/ : {md}")
        # Not directly under topic root
        if len(parts) == 2:
            issues.append(f"Transcript directly under topic root (missing channel folder): {md}")
        # Filename format
        if not re.match(r"\d{4}-\d{2}-\d{2}_.+\.md$", md.name):
            issues.append(f"Bad filename format: {md.name}")
    # Topic README exists
    for topic_dir in TOPICS_DIR.iterdir():
        if not topic_dir.is_dir():
            continue
        if not (topic_dir / "README.md").exists():
            issues.append(f"Topic missing README.md: {topic_dir.name}")
    return issues


def metadata_consistency_checks(transcripts):
    issues = []
    required = {"video_id","title","channel","topic","published_date","ingested_date","source"}
    for md in transcripts:
        text = md.read_text(errors="ignore")
        fm, _ = parse_frontmatter(text)
        if not fm:
            issues.append(f"Missing YAML frontmatter: {md}")
            continue
        missing = required - set(k for k,v in fm.items() if v != "")
        if missing:
            issues.append(f"Missing required fields {sorted(missing)} in {md}")
        # topic dir match
        topic_dir = md.relative_to(TOPICS_DIR).parts[0]
        if fm.get("topic") and fm.get("topic") != topic_dir:
            issues.append(f"Frontmatter topic mismatch for {md} (fm={fm.get('topic')} dir={topic_dir})")
        # channel dir match
        channel_dir = md.relative_to(TOPICS_DIR).parts[1]
        if fm.get("channel") and fm.get("channel") != channel_dir:
            issues.append(f"Frontmatter channel mismatch for {md} (fm={fm.get('channel')} dir={channel_dir})")
        # published_date
        if fm.get("published_date") and not is_date(fm.get("published_date")):
            issues.append(f"Malformed published_date in {md}: {fm.get('published_date')}")
    return issues


def topic_quality_checks(transcripts):
    warnings = []
    failures = []
    # count by topic
    counts = {}
    misc_counts = {}
    for md in transcripts:
        topic = md.relative_to(TOPICS_DIR).parts[0]
        channel = md.relative_to(TOPICS_DIR).parts[1]
        counts[topic] = counts.get(topic, 0) + 1
        if channel == "misc":
            misc_counts[topic] = misc_counts.get(topic, 0) + 1
    total = sum(counts.values()) or 1
    # misc ratio
    for topic, mcount in misc_counts.items():
        if mcount / counts.get(topic, 1) > MISC_WARN_THRESHOLD:
            warnings.append(f"High misc ratio in topic '{topic}': {mcount}/{counts.get(topic)}. Consider refining classifier.")
    # dominance
    top_topic = max(counts, key=counts.get) if counts else None
    if top_topic and counts[top_topic] / total > SINGLE_TOPIC_DOMINANCE:
        warnings.append(f"Topic '{top_topic}' contains >70% of transcripts. Possible misclassification drift.")
    # topics with few transcripts
    for topic, cnt in counts.items():
        if cnt < MIN_TOPIC_TRANSCRIPTS:
            warnings.append(f"Topic '{topic}' has fewer than {MIN_TOPIC_TRANSCRIPTS} transcripts.")
    # topic dir exists but zero transcripts
    for topic_dir in TOPICS_DIR.iterdir():
        if not topic_dir.is_dir():
            continue
        if counts.get(topic_dir.name, 0) == 0:
            failures.append(f"Topic folder exists but has zero transcripts: {topic_dir.name}")
    # transcript topics in metadata but no topic dir
    for md in transcripts:
        fm, _ = parse_frontmatter(md.read_text(errors="ignore"))
        t = fm.get("topic")
        if t and not (TOPICS_DIR / t).exists():
            failures.append(f"Transcript topic not present in /topics/: {t} in {md}")
    return failures, warnings


def channel_resolution_checks(transcripts):
    failures = []
    warnings = []
    # unknown channel directories
    for topic_dir in TOPICS_DIR.iterdir():
        if not topic_dir.is_dir():
            continue
        for bad in ["unknown","misc","unclassified"]:
            d = topic_dir / bad
            if d.exists() and d.is_dir():
                files = list(d.glob("*.md"))
                if len(files) > 1:
                    failures.append(f"Too many transcripts under {d} ({len(files)}). Likely missing channel extraction or normalization step.")
    # frontmatter channel unknown or empty
    for md in transcripts:
        fm, _ = parse_frontmatter(md.read_text(errors="ignore"))
        ch = fm.get("channel","")
        if ch.strip() == "" or ch.lower() in ["unknown","misc","unclassified"]:
            failures.append(f"Missing/unknown channel in frontmatter: {md}")
    # channel concentration
    per_topic = {}
    for md in transcripts:
        topic = md.relative_to(TOPICS_DIR).parts[0]
        channel = md.relative_to(TOPICS_DIR).parts[1]
        per_topic.setdefault(topic, {})
        per_topic[topic][channel] = per_topic[topic].get(channel, 0) + 1
    for topic, chmap in per_topic.items():
        total = sum(chmap.values()) or 1
        for ch, cnt in chmap.items():
            if cnt / total > UNKNOWN_CHANNEL_WARN_THRESHOLD and ch in ["unknown","misc","unclassified"]:
                warnings.append(f"High share in {topic}/{ch}: {cnt}/{total}. Check channel extraction.")
    return failures, warnings


def index_accuracy_checks(transcripts):
    failures = []
    warnings = []
    videos_csv = INDEX_DIR / "videos.csv"
    channels_csv = INDEX_DIR / "channels.csv"
    topics_csv = INDEX_DIR / "topics.csv"

    if not videos_csv.exists():
        failures.append("Missing index/videos.csv")
        return failures, warnings

    with open(videos_csv, newline="") as f:
        reader = list(csv.DictReader(f))

    disk_set = {str(md.relative_to(ROOT)) for md in transcripts}
    index_set = {row.get("file_path") for row in reader}

    missing_in_index = disk_set - index_set
    missing_on_disk = index_set - disk_set

    for fp in missing_in_index:
        failures.append(f"Transcript on disk missing in index/videos.csv: {fp}")
    for fp in missing_on_disk:
        failures.append(f"Index entry references missing file: {fp}")

    # duplicate video_id (allow multiple entries only when they are chunked)
    by_vid = {}
    for row in reader:
        vid = (row.get("video_id") or "").strip()
        if not vid:
            continue
        by_vid.setdefault(vid, []).append(row)

    for vid, rows in by_vid.items():
        if len(rows) <= 1:
            continue
        # All rows must be chunked, and chunks must be unique
        chunks = []
        non_chunked = 0
        for r in rows:
            c = (r.get("chunk") or "").strip()
            if not c:
                non_chunked += 1
            chunks.append(c)
        if non_chunked > 0:
            # This can happen if the same video is ingested twice (e.g., metadata drift
            # or playlist overlap). Flag as a warning (actionable), not a hard failure.
            warnings.append(f"Duplicate video_id in index/videos.csv (non-chunked duplicates): {vid} ({len(rows)} entries)")
            continue
        if len(set(chunks)) != len(chunks):
            failures.append(f"Duplicate video_id in index/videos.csv (duplicate chunk numbers): {vid} ({len(rows)} entries)")

    # warnings: channel and topic indexes
    if channels_csv.exists():
        with open(channels_csv, newline="") as f:
            ch_rows = list(csv.DictReader(f))
        ch_set = {r.get("channel") for r in ch_rows}
        for ch in ch_set:
            if not ch:
                continue
            if not any(ch in p.parts for p in TOPICS_DIR.rglob("*.md")):
                warnings.append(f"Channel listed in index/channels.csv has no folder: {ch}")
    if topics_csv.exists():
        with open(topics_csv, newline="") as f:
            t_rows = list(csv.DictReader(f))
        for r in t_rows:
            t = r.get("topic")
            if t and not list((TOPICS_DIR / t).rglob("*.md")):
                warnings.append(f"Topic listed in index/topics.csv has no transcripts: {t}")

    return failures, warnings


def rag_readiness_checks(transcripts):
    failures = []
    warnings = []
    for md in transcripts:
        text = md.read_text(errors="ignore")
        fm, body = parse_frontmatter(text)
        if len(text) > MAX_CHARS:
            if fm.get("chunk") or fm.get("total_chunks") or fm.get("chunking"):
                warnings.append(f"Transcript exceeds {MAX_CHARS} chars; chunking metadata present: {md}")
            else:
                failures.append(f"Transcript exceeds {MAX_CHARS} chars without chunking metadata: {md}")
        # timestamps or speaker labels
        noise_lines = 0
        total_lines = 0
        for line in body.splitlines():
            total_lines += 1
            if re.match(r"^\d{2}:\d{2}:\d{2}\.\d{3} -->", line):
                noise_lines += 1
            if re.match(r"^[A-Z][A-Z\s]{2,}:$", line):
                noise_lines += 1
        if total_lines > 0 and noise_lines / total_lines > 0.02:
            failures.append(f"Transcript contains timestamp/speaker noise >2%: {md}")
        if len(body.strip()) < MIN_CHARS:
            warnings.append(f"Transcript body very short (<{MIN_CHARS} chars): {md}")
        # metadata must exist in frontmatter
        if not fm or any(k not in fm for k in ["video_id","title","channel","topic"]):
            failures.append(f"Metadata missing in frontmatter (cannot infer from folder): {md}")
    return failures, warnings


def run():
    transcripts = load_transcripts()

    failures = []
    warnings = []

    failures += structure_integrity_checks(transcripts)
    failures += metadata_consistency_checks(transcripts)

    f, w = topic_quality_checks(transcripts); failures += f; warnings += w
    f, w = channel_resolution_checks(transcripts); failures += f; warnings += w
    f, w = index_accuracy_checks(transcripts); failures += f; warnings += w
    f, w = rag_readiness_checks(transcripts); failures += f; warnings += w

    # Output
    if failures:
        print(fail(f"{len(failures)} failing checks"))
        for m in failures:
            print(f" - {m}")
    if warnings:
        print(warn(f"{len(warnings)} warnings"))
        for m in warnings:
            print(f" - {m}")
    if not failures and not warnings:
        print(ok("All checks passed"))

    # Suggestions
    if failures or warnings:
        print("\nSuggestions:")
        print(" - Run classify_topic.py with --reclassify (if available)")
        print(" - Rebuild channel normalization map")
        print(" - Regenerate index files")

    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(run())

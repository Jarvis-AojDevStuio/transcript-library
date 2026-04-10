#!/usr/bin/env python3
import os, re, json
from pathlib import Path

TOPICS_DIR = Path(__file__).resolve().parents[1] / "topics"


def load_topics():
    topics = {}
    for topic_dir in TOPICS_DIR.iterdir():
        if not topic_dir.is_dir():
            continue
        readme = topic_dir / "README.md"
        if not readme.exists():
            continue
        text = readme.read_text(errors="ignore")
        keywords = []
        m = re.search(r"\*\*Keywords:\*\*(.*)", text, re.IGNORECASE)
        if m:
            line = m.group(1).strip()
            if line:
                keywords += [k.strip() for k in line.split(",") if k.strip()]
        # also parse any following lines until blank
        if not keywords:
            lines = text.splitlines()
            for i, line in enumerate(lines):
                if line.lower().startswith("**keywords:**"):
                    for j in range(i+1, len(lines)):
                        l = lines[j].strip()
                        if not l:
                            break
                        keywords += [k.strip() for k in re.split(r"[,;]", l) if k.strip()]
                    break
        topics[topic_dir.name] = [k.lower() for k in keywords]
    return topics


def classify(text: str, title: str = "", channel: str = ""):
    topics = load_topics()
    hay = f"{title} {channel} {text}".lower()
    scores = {}
    for topic, keywords in topics.items():
        if not keywords:
            scores[topic] = 0
            continue
        score = 0
        for k in keywords:
            if k and k in hay:
                score += 1
        scores[topic] = score
    best = max(scores, key=scores.get)
    best_score = scores[best]
    confidence = best_score / max(1, len(topics.get(best, [])))
    return best, confidence, scores

if __name__ == "__main__":
    import sys
    text = sys.stdin.read()
    topic, conf, scores = classify(text)
    print(json.dumps({"topic": topic, "confidence": conf, "scores": scores}, indent=2))

# 🧭 YouTube Transcripts (RAG‑Ready)

This folder is the **canonical home** for YouTube transcripts organized by **topic first** and optimized for RAG pipelines.  
Every transcript is stored once, carries its own metadata, and is discoverable via generated indexes.

## 📁 Structure
```
youtube-transcripts/
├─ topics/
│  ├─ <topic>/
│  │  ├─ README.md
│  │  ├─ <channel>/
│  │  │  └─ YYYY-MM-DD_slugified-video-title.md
│  │  └─ misc/
├─ index/
│  ├─ videos.csv
│  ├─ channels.csv
│  └─ topics.csv
├─ scripts/
│  ├─ ingest_transcript.py
│  ├─ classify_topic.py
│  ├─ normalize_filename.py
│  └─ build_index.py
└─ inbox/
   └─ (raw downloads live here temporarily)
```

## ✅ One‑Command Ingest
Drop VTT + info JSON files into `youtube-transcripts/inbox/`, then run:
```bash
python3 youtube-transcripts/scripts/ingest_transcript.py --inbox youtube-transcripts/inbox
python3 youtube-transcripts/scripts/build_index.py
```

## 🔍 RAG‑Readiness Guarantees
- Each transcript is **self‑contained** with YAML frontmatter metadata.
- Index files enable **topic/channel/date filters** without parsing folder names.
- Files are **chunk‑friendly** and designed for embedding pipelines.

## 🧪 Automation
A scheduled job checks the playlist every 4 hours, downloads new transcripts, classifies them, and updates indexes.

---
**Rule of this vault:** one transcript, one canonical home.

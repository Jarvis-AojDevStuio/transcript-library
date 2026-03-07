# System Overview

## Product

Transcript Library is a private internal tool for a small friend group. The group shares a YouTube playlist, ingests transcripts into a local transcript repository, and uses AI analysis to turn long videos into searchable, discussable knowledge.

## Core flow

1. A video is added to the shared playlist and lands in the transcript repo.
2. The app reads `videos.csv` and transcript files from `PLAYLIST_TRANSCRIPTS_REPO`.
3. A user opens a video page and watches the YouTube video inside the app.
4. The user starts analysis from the app.
5. The server resolves metadata, builds a deterministic headless prompt, and launches the configured provider runtime.
6. The runtime writes status, logs, metadata, run metadata, and markdown artifacts into `data/insights/<videoId>/`.
7. The app reads those artifacts and renders the analysis alongside the video.

## Major subsystems

- Catalog: transcript indexing and video/channel lookup
- Video workspace: in-app watch/read experience
- Analysis runtime: prompt construction, provider selection, process execution
- Insight storage: stable per-video artifact directories
- Knowledge browsing: curated markdown/knowledge content

## Design invariants

- Lookup key is always `videoId`
- Human review uses slugged markdown artifacts
- Provider choice does not leak into the UI contract
- Analysis execution remains separable from the web app
- Runtime outputs are inspectable from both filesystem and API surfaces

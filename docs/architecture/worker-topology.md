# Worker Topology

## Current state

The web app currently starts analysis runs directly from API routes. This is acceptable for the current private deployment model because the tool is used by a small trusted group and the runtime is backed by local/private CLI authentication.

## Target topology

### 1. Web app
- serves browse/watch/read UI
- reads transcript catalog
- reads insight artifacts
- submits analysis jobs

### 2. Analysis worker
- receives analysis jobs
- resolves metadata and prompt
- selects provider adapter
- executes provider runtime
- writes `status.json`, `run.json`, logs, metadata, and markdown artifacts

### 3. Shared storage
- transcript repository
- `data/insights/` durable volume

## Boundary contract

The worker contract should be:

- input:
  - `videoId`
  - `title`
  - `channel`
  - `topic`
  - `publishedDate`
  - `transcriptPartPath`
- output:
  - `status.json`
  - `run.json`
  - `video-metadata.json`
  - `worker-stdout.txt`
  - `worker-stderr.txt`
  - `analysis.md`
  - `<slugified-video-title>.md`

## Why this shape works

- UI stays unchanged if the worker moves out of process
- provider changes stay server-side
- operational debugging stays artifact-based
- reruns stay keyed to a stable `videoId`

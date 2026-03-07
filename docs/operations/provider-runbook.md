# Provider Runbook

## Supported providers

- `claude-cli`
- `codex-cli`

Select with:

```bash
ANALYSIS_PROVIDER=claude-cli
ANALYSIS_PROVIDER=codex-cli
```

Optional model overrides:

```bash
CLAUDE_ANALYSIS_MODEL=sonnet
CODEX_ANALYSIS_MODEL=gpt-5.2-codex
ANALYSIS_MODEL=...
```

## Expected behavior

- the app UI stays the same regardless of provider
- provider choice is recorded in `run.json`
- runtime logs are written to `worker-stdout.txt` and `worker-stderr.txt`

## Claude CLI notes

- current non-interactive mode uses `claude --dangerously-skip-permissions -p`
- intended for private trusted environments
- prompt content is fully resolved before invocation

## Codex CLI notes

- current non-interactive mode uses `codex exec`
- final response is written via `--output-last-message`
- prompt content is fully resolved before invocation

## Failure triage

1. Check `status.json`
2. Check `run.json`
3. Check `worker-stderr.txt`
4. Check `video-metadata.json`
5. Re-run if the process died or the provider auth expired

## Cache invalidation

- `video-metadata.json` is schema-versioned
- when heuristics change, bump the schema version so stale cached classifications are recomputed

## Operational recommendation

For the current private deployment:

- use `claude-cli` as the default provider
- keep `codex-cli` as an optional alternate provider
- move actual execution into a dedicated worker process next if concurrent usage grows

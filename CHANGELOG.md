# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-03-08

### Added

- ✨ feat(ui): add channels page, collapsible sections, and analysis output improvements
- ✨ feat(app): redesign workspace and add headless analysis runtime
- complete pipeline with async webhook and queue cleanup (#4) [#4]
- ⚡ perf(app): add caching, loading skeletons, and code quality tooling
- replace broken queue+worker with inline claude -p execution
- ✨ feat(init): initial commit of transcript-library Next.js app

### Changed

- 🔖 release: bump version to 1.0.0
- 💄 style(ui): redesign layout with warm palette, flat header, and sidebar removal
- add module entrypoints and rewire app imports
- run full RepoArchitect workflow for transcript-library
- "Claude Code Review workflow"
- "Claude PR Assistant workflow"

### Fixed

- crash guard, pluralization, channels nav (browser test bugs)
- address PR #6 review — port alignment, path cleanup, module boundary [#6]
- resolve all code review findings from PR #1 [#1]
- address P0/P1 review findings
- address P0/P1 review findings



## Links
[Unreleased]: https://github.com/org/repo/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/org/repo/releases/tag/v1.0.0

# Learn DCSA

Study console for the Defense Counterintelligence and Security Agency — dual-track Facility Clearance (FCL) and Personnel Clearance (PCL).

**Vault first.** Obsidian packs win over NotebookLM reports.

**Packs:** `Learning/one-day-mastery/dcsa/` (odm-dcsa) and `Learning/tech-deep-dive/dcsa/` (tdd-dcsa).

**Live:** https://aaronmeis.github.io/learn-dcsa/

Storage prefix `ldc:` (shared `aaronmeis.github.io` origin). Theme keys `appMode` / `appPalette` stay shared.

No operator scripts or credentials in this public repo. The only Python is the two publish checks in `tools/`. Finish holes: see `AGENT-HANDOFF.md`.

## Publish checks

Run both from the repo root before every push. Each must report 0.

```
python3 tools/linkcheck.py .              # broken internal links
python3 tools/check_no_local_paths.py .   # machine paths and private workstation details
```

The published site must not contain local machine paths (drive-letter, home-folder, or user-profile paths). Describe offline material as "stored outside the repo".

# Claude finish handoff — learn-dcsa

**Site:** `C:\projects\claude\learn-dcsa`  
**Live (after Pages):** https://aaronmeis.github.io/learn-dcsa/  
**Prefix:** `ldc:` · **SW cache:** `learn-dcsa-v2`  
**Packs (source of truth):**  
- `Learning/one-day-mastery/dcsa/` (odm-dcsa)  
- `Learning/tech-deep-dive/dcsa/` (tdd-dcsa)

Vault wins over NotebookLM. Do not teach self-sponsorship. Do not treat GCC High / CMMC / FedRAMP as FCL or Secret/TS ATO (`support ≠ confer`).

## What is already done (v1 publish)

| Piece | Status |
|---|---|
| Shell forked from learn-duckdb; titles / `ldc:` / `learn-dcsa-v2` | Done |
| `js/data.js` curated from ODM+TDD (11 curriculum blocks, glossary, quiz, debates, cut labels/slides/cards, checklist, prompts, views, EA) | Done |
| 15 deck slides in `assets/slides/slide-01.jpg`… | Done |
| 8 architecture diagram PNGs in `assets/diagrams/` | Done |
| 6 ODM shorts MP4 + posters in `media/shorts/` and `media/posters/` | Done |
| `shorts-catalog.js` / `.json` (pillars NISP / Personnel / Systems / CI) | Done |
| Library HTML: ~69 pages + `library/manifest.js` via private `C:\projects\grok\one_day_mastery\learn_console\build_library.py` | Done |
| GitHub Pages repo `aaronmeis/learn-dcsa` | Done — https://aaronmeis.github.io/learn-dcsa/ |
| Deck empty-file guard (no 404 on missing deep-dive MP4) | Done (`learn-dcsa-v4`) |
| View diagram paths + DCSA shorts caveat (no DuckDB 10x line) | Done |

## Remaining holes (finish in this order)

### 1. Spot-check short ↔ title mapping
NotebookLM named the MP4s differently from the planned `shorts-topics.json` ids. Current map is keyword-based:

| id | File used |
|---|---|
| `01-dual-track-lock` | How the DCSA Dual-Track Lock Works.mp4 |
| `02-no-self-sponsor` | How DCSA Dual-Track Clearance Works.mp4 |
| `03-day-20-45` | Why DCSA Facility Clearances Fail the 20-Day Clock.mp4 |
| `04-package-quality` | How the DCSA Dual-Track Lock Works_2.mp4 |
| `05-sf328-fifteen` | How the May 2025 FOCI Rule Changes Clearances.mp4 |
| `06-sead4-whole-person` | The DCSA Dual-Track Clearance Lock.mp4 |

Watch each short once. If content ≠ title, rename file + catalog entry. Extra file may exist: `Upgrading DCSA Facility Clearances…` under odm-dcsa output — leave out of catalog unless it matches a planned job.

### 2. Deep-dive cut
`Learning/tech-deep-dive/dcsa/video/cut-script.json` still has empty `slides` narration lines. Site `DATA.cut` already has labels + slide paths + question cards. Fill vault cut-script narrations from the deck, optionally generate long MP4 later, then set `DATA.cut.deepDive.file` / `SHORTS.deep_dive.file`. Leave empty until the MP4 exists.

### 3. Evidence sittings (debates)
`DATA.debates` mirrors ODM `CLAIMS-AND-DEBATES.md` with all statuses `unrun`. Job ticket pattern: `{pack}/AGENT-HANDOFF - Evidence sittings.md` (create if missing). Desk-first tests: E1A/E1B/E1W, E2A/E2B, E3A/E3B/E3W. Do not flip a pill to `run YYYY-MM-DD` without a sitting note. Open silence: DISS SoR name, exact resubmit counts, PVQ detail after May 2026 CV update, DAAPM newer than v2.2, DCSA AI tooling inventory.

### 4. UTF-8 library titles
Some library titles show mojibake (`â€"`) from Windows encoding on em dashes. Re-run `build_library.py` after ensuring vault notes and the generator read/write UTF-8. Prefer fixing the generator `write_text(..., encoding="utf-8")` path over hand-editing HTML.

### 5. Hero / ladder art (optional)
`assets/hero.jpg` and `100.jpg`/`200.jpg`/`300.jpg` are placeholders copied from learn-duckdb. Replace with DCSA-themed stills when convenient; bump SW cache.

### 6. Daily challenge drills
Today challenge needs `DATA.drills` (`where`, `auth`, `altitude`) if you want the purview-style three-round challenge. Until then the shell keeps the placeholder. Cut cards already feed question-of-the-day when drills exist.

### 7. QA (Playwright or local static)
```powershell
cd C:\projects\claude\learn-dcsa
python -m http.server 8010
```
Open http://localhost:8010/ and hard-refresh. Check `#/today` `#/curriculum` `#/views` `#/shorts` `#/deck` `#/quiz` `#/glossary` `#/debates` `#/library` `#/failures` `#/prompts` `#/refs` `#/ea`. Confirm `localStorage` keys use `ldc:`. No console exceptions. Empty deep-dive file is OK; script exceptions are not.

### 8. Publish hygiene
- No Python, operator pages, `.env`, or keys in the public tree.
- Secret-scan staged files before push.
- Commit as `aaronmeis <127948+aaronmeis@users.noreply.github.com>` with agent co-author trailer.
- Bump `sw.js` `CACHE` (`learn-dcsa-vN`) on every shell/data change.
- Hash routes only (`#/glossary`).

## Rebuild library after vault edits

```powershell
cd C:\projects\grok\one_day_mastery\learn_console
py -3.11 build_library.py
```

Then bump SW cache, `node --check js/data.js js/app.js js/enhance.js`, commit, push `main`.

## Related

- Pattern: vault `NEXUS/67 - Learn Study Console Pattern.md`
- Skill: `learn-console`
- Sibling sites: learn-duckdb, learn-dominoai
- Heavy media originals: `C:\output\obsidian\notebooklm\odm-dcsa\` and `tdd-dcsa\`

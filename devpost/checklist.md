---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast (submit directive — checkpoints merge into the demo run)

## Slices

- [x] **1. Core loop runs end to end: paste, CHECK IT, verdict card**
  Becomes usable: A page you can open where pasting a claim and evidence and pressing CHECK IT shows the giant verdict card with checklist and meter.
  Why now: This is the kernel — the pinned check logic driving a real verdict. Everything else (stamp, styling, seam) lands on this; building it first means bad news arrives early.
  PRD ref: `prd.md > The Core Journey` (steps 1-4), `prd.md > States and Boundaries`
  Spec ref: `spec.md > Check Engine`, `spec.md > Page Shell`, `spec.md > Claim Box and Evidence Box`, `spec.md > Check Button`, `spec.md > Verdict Card`, `spec.md > App Wiring`, `spec.md > File Structure`
  Build: `git init` (with agreement); scaffold `index.html`, `js/engine.js` (pure core, require-able from node), `js/app.js` (wiring + render), readable unstyled-to-basic layout; wire CHECK IT → engine → card.
  Verify (mechanical): `node --check` on all JS; node calibration script requiring `js/engine.js` asserting Example One → VERIFIED + TESTED and Example Two → DISPUTED + STATED; grep that every script tag and element ID referenced in `app.js` exists in `index.html`.
  Learner check: Open `index.html` in your browser, paste/run both calibration examples, and report the two verdicts with their meter states.
  Commit: `Core check loop with verdict card`

- [x] **2. Finished page: stamp, examples, sample cards, styling, seam, README**
  Becomes usable: The shippable proof — ledger stamp, one-click examples, sample cards, full styling, adapter seam, README.
  Why now: Completes `prd.md > What We're Building` on the proven loop; nothing here can break the kernel, only dress it.
  PRD ref: `prd.md > Features and Behavior`, `prd.md > Look and Feel`, `prd.md > What We're Building`
  Spec ref: `spec.md > Ledger Stamp`, `spec.md > Example Fixtures`, `spec.md > Sample Report Cards`, `spec.md > Styles`, `spec.md > Adapter Seam`, `spec.md > Look and Feel`
  Build: Add `js/stamp.js` (mtime + Web Crypto SHA-256, fallback message), `js/examples.js` (both fixture texts + fill buttons), `js/adapters/registry.js` (sources/sinks seam, zero connectors), three static sample cards, `css/style.css` per Look and Feel, `README.md`.
  Verify (mechanical): `node --check` on all JS; re-run the calibration script (both examples still exact); grep wiring for new files/IDs.
  Learner check: Run both examples, confirm the stamp shows a time and a hash, and say whether the page looks the way you pictured it.
  Commit: `Ledger stamp, examples, styling, adapter seam`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — after slice 1 (core verdict loop shapes everything after it)
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: app map generated from commit aa7a735; live tour pending (submit directive) — route recorded below as reference
Route and stops: reference route — js/app.js (checkBtn handler) → js/engine.js (function check) → index.html (verdictCard); not toured live
Edit outcome: not applicable (no tour edit offered under submit directive)
Reflection: offered in handoff; awaiting reply
Activity mode: reference route + map; live walkthrough deferred to learner

## Revisions

- Commitment splitter matches sentence punctuation only when followed by whitespace or end — the build found a bare split breaks inside filenames like `dashboard.md`.
- Slices 1–2 committed together in `aa7a735` — the 3-minute submit directive merged the per-slice commits; both slices were built and mechanically verified in order first.

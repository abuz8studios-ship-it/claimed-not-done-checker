---
doc: spec
status: approved
---

# CLAIMED ≠ DONE Checker — Technical Spec

## How This Works, In Plain Language
The app is a small set of plain files that work with no internet and nothing to install — unplugged. At the center sits the **Check Engine**, a pure core that reads the two boxes and applies your pinned rules; it depends on nothing and nobody can silently change what it does. Around it, separate files own the page, the styling, the examples, and the ledger stamp. And on the side sits an **adapter seam**: named slots where future connectors (MCP, Google, Microsoft, anything) plug in later without touching the core. Modular like the harness: the law in the middle, the engines as citizens around it.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.
1. You double-click `index.html` → the browser loads the plain script files in order and shows the shell with empty boxes, CHECK IT, example buttons, sample cards. No verdict yet.
2. You paste text (or press an example button, which fills both boxes from fixture text in `examples.js`).
3. You press CHECK IT → `app.js` hands the two boxes to the Check Engine, which splits the claim into commitments, marks each check/cross/dash, rolls up one verdict, fills the meter; `stamp.js` adds the time + SHA-256.
4. The Verdict Card renders: giant verdict word in its color, two plain lines, checklist, meter, stamp.
5. Calibration: Example One must show VERIFIED at TESTED; Example Two must show DISPUTED at STATED.

## Stack
- **Static files: HTML + CSS + vanilla JavaScript, zero dependencies, no build step, no server.** Rationale (learner choice): modular and pluggable, readable file by file, runs anywhere. Tradeoff: plain scripts share one global namespace instead of imports — kept tidy by the file layout below.
- **Plain `<script>` tags in dependency order, NOT ES modules.** Reason: ES-module imports are blocked over `file://` by browser CORS; classic scripts work when double-clicking the file. Derived constraint, recorded so the build doesn't trip on it.
- **SHA-256 via the browser's built-in Web Crypto** (`crypto.subtle.digest`, standard TextEncoder → digest → hex). Doc: <https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest>. Rationale: the hash comes from the platform, so there is no hash code we could get wrong. **Flag — verify early in build:** confirm `crypto.subtle` exists when opening via `file://` in the demo browser; fallback is the Important Failure Modes entry below.

## Where It Runs and How Someone Tries It
- Runs in any modern browser (Chrome/Edge/Firefox/Safari), offline. No keys, no install, no network.
- Start: open `build-with-ai-basics/index.html` (double-click). Demo recording: press Example One → CHECK IT → show VERIFIED; clear; Example Two → CHECK IT → show DISPUTED. Under a minute.
- Submission needs the demo video + public GitHub repo (both `6-ship`). Deployment is optional and undecided; GitHub Pages would host these files free with no changes if chosen at ship time.

## Look and Feel
PRD ref: `prd.md > Look and Feel`. Light page (`#FAF8F5`), white cards, dark ink text. The three verdict colors carry the page: green `#15803d`, amber `#b45309`, red `#b91c1c`. Verdict word huge and bold — biggest thing on the page. System font stack (no web fonts, works offline). Two boxes side by side, stacking on narrow screens. Meter as five labeled segments with the reached state filled dark. Shell header carries the title with the ≠ mark; no simulated chat content. All implementable in one stylesheet — no constraint conflicts.

## Components

### Page Shell (`index.html`)
Header with title + the Checker panel frame + script tags in order. Static. PRD ref: `prd.md > Screens and Layout`.

### Styles (`css/style.css`)
All visual rules: layout, verdict colors, card, meter, responsive stacking. PRD ref: `prd.md > Look and Feel`.

### Claim Box and Evidence Box (in `index.html`, wired by `app.js`)
Two large text areas labeled "What the agent claimed" and "The evidence." Free text, no validation. PRD ref: `prd.md > Features and Behavior`.

### Example Fixtures (`js/examples.js`)
The full Example One / Example Two texts as strings, plus the two fill buttons' wiring data. Pressing a button fills both boxes. PRD ref: `prd.md > Features and Behavior`.

### Check Button (in `index.html`, wired by `app.js`)
One big CHECK IT button. Hands the two box contents to the Check Engine and renders the result. PRD ref: `prd.md > Features and Behavior`.

### Check Engine (`js/engine.js`)
Pure function: `(claim, evidence)` → `{ verdict, line1, line2, checklist[], meter }`. Depends on nothing. Deterministic — same inputs, same output. Implements `scope.md > The Check Logic (Pinned)` exactly:
- **Commitments:** split claim on newlines and sentence-ending punctuation (`. ! ?` followed by whitespace or end, so filename dots don't split), trim, drop empties. Each is one checklist line.
- **Contradicted line:** commitment contains a terminal stem (`ship, releas, deploy, push, land, finish`, case-insensitive) AND evidence contains a contradiction marker (word match, case-insensitive): `open loop, never, not, n't, no, failed, fail, pending, claimed, missing, unconfirmed`.
- **Supported line:** evidence contains an artifact pattern (`` \b[\w-]+\.(md|html|js|json|py|csv|txt|css|png)\b ``) AND (a number from the commitment appears in evidence OR evidence contains a run marker: `smoke, test, ran, runs, verified, passed`).
- **Otherwise:** unproven line (dash).
- **Roll-up:** any contradicted line → DISPUTED; every line supported → VERIFIED; anything between (including empty input) → CLAIMED-ONLY.
- **Line 1:** the claim as stated (first ~200 chars). **Line 2:** strongest statement the evidence contains = first evidence line with an artifact, run marker, or contradiction marker; else first non-empty evidence line; else "No checkable evidence."
- **Meter:** STATED if claim non-empty; BUILT if artifact pattern in evidence; TESTED if run marker in evidence; DEPLOYED if deploy word (`deploy, ship, release, push, land, live, production`) in evidence AND no contradiction marker; SOLD if sale word (`sold, sale, purchased, purchase, order, revenue, paid, customer`) in evidence. Never exceeds what the evidence shows.
PRD ref: `prd.md > Features and Behavior`.

### Verdict Card (rendered by `app.js` into `index.html`)
Renders the engine result: verdict word largest in its color, two plain lines, checklist (✓/✗/–), meter, ledger stamp. Hidden until the first check. PRD ref: `prd.md > Features and Behavior`, `prd.md > States and Boundaries`.

### Ledger Stamp (`js/stamp.js`)
Shows the check's mtime (timestamp) + SHA-256 hex of the two boxes' content, computed via Web Crypto at check time. Display-only; vanishes on reload. PRD ref: `prd.md > Features and Behavior`.

### Sample Report Cards (in `index.html`)
Three hardcoded static cards. Display only. PRD ref: `prd.md > Features and Behavior`.

### Adapter Seam (`js/adapters/registry.js`)
The pluggable bridge, harness-style. Named slots the core never depends on:
- `Checker.adapters.sources`: evidence connectors. Shape: `{ name, fetchEvidence(ref) -> Promise<string> }`. The built-in pasted-text source is core behavior, not an adapter — adapters are future doors (MCP evidence fetch, Google Drive read, and so on).
- `Checker.adapters.sinks`: verdict publishers. Shape: `{ name, publishVerdict(report) -> Promise<void> }`. None registered today; the on-screen card is core behavior.
- Rule: `app.js` may call registered adapters around a check (sources can fill the evidence box; sinks fire after render). `engine.js` never imports or calls adapters. A future connector is one new file plus one registration line — no core change.
- Ships today with the seam and zero external connectors. Each live SDK (MCP server, Google, Microsoft) would add an account, a key, a network dependency, and demo risk — implementations are deferred so today still submits.

### App Wiring (`js/app.js`)
Owns startup and event flow: buttons → engine → stamp → render → sinks. The only file allowed to touch both the DOM and the seam.

## Data Model
No database, no files written, no `localStorage`. In memory only: `{ claim, evidence }` in, `{ verdict, lines, checklist, meter, stamp }` out. On reload everything is gone — that is the product (`prd.md > States and Boundaries`).

## File Structure
```
build-with-ai-basics/
├── index.html            # shell: boxes, buttons, card mount, sample cards, script tags
├── css/
│   └── style.css         # all visual rules
├── js/
│   ├── engine.js         # THE CORE: pure check function, depends on nothing
│   ├── stamp.js          # ledger stamp (mtime + SHA-256 via Web Crypto)
│   ├── examples.js       # Example One / Two fixture texts
│   ├── adapters/
│   │   └── registry.js   # plugin seam: sources[] + sinks[], zero connectors today
│   └── app.js            # wiring: events → engine → stamp → render → sinks
├── README.md             # what it is + how to run (for the public repo)
└── devpost/              # learner-profile, scope, prd, spec (+ .html companions)
```

## External Services and Dependencies
None today. Zero network calls. The only platform API used is Web Crypto's `SubtleCrypto.digest` (built into the browser): <https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest>. No keys, no cost, no rate limits.
Deferred connector implementations (doors open, nothing wired): an MCP evidence/publish bridge, Google SDK reads, Microsoft SDK reads — each becomes one adapter file later. Kept out of today because each needs credentials, network, and its own verification, and none of them proves the kernel.

## Important Failure Modes
- **Old browser without `crypto.subtle`** → stamp shows the mtime plus "hash unavailable"; verdict, checklist, and meter still work. Check the demo browser early in the build.
- **Empty or nonsense input** → CLAIMED-ONLY with an empty/thin checklist, by design (the honest default).
- **Real example texts trip the word lists differently than expected** → the calibration test in the build catches it; fix the word lists, never the examples (`scope.md > The Check Logic (Pinned)`).

## What Was Simplified and Why
- **Static files, no backend** instead of app + server + database — there is no storage and no second user; a backend would serve nothing.
- **Seam with zero connectors** instead of live MCP/Google/Microsoft integrations — the doors and the shapes they must fit are specified today; wiring real SDKs would each need accounts, keys, and verification time today doesn't have. The kernel is what's being proven.
- **Hardcoded examples and sample cards** instead of editable content — they are fixed calibration fixtures, not user data.
- **Platform SHA-256** instead of hand-written hash code — no crypto we could get wrong and can't test here.
- **No router, one page** — the product is one surface.

## Decisions and Open Issues
- **Modular static files + adapter seam (LEARNER CHOICE):** universal and pluggable like the harness — core law untouched, everything heavy arrives later as adapters. Accepted tradeoff: plain scripts share one global namespace; file layout and the seam rule keep it clean.
- **Classic scripts, not ES modules** (derived constraint): module imports are blocked over `file://`; classic scripts preserve double-click-to-run.
- **Web Crypto for the stamp, with visible fallback** (derived from the stack choice): correct-by-platform hashing; flagged for early verification.
- **The engine's word lists are literal and visible** (derived from the pinned logic): anyone can read the lists in `engine.js` and hand-check a verdict. That visibility IS the honesty.
- **One genuine unknown discussed:** how can fixed word lists "judge" honestly without AI? Clarified: they don't judge truth — they check stated-vs-shown with visible rules, and the calibration lock proves the rules on two known cases. The build verifies it by running both examples.
- **Unresolved:** optional deployment target (GitHub Pages suggested; decided in `6-ship`). Nothing carried from `prd.md > Open Questions` — none remain.

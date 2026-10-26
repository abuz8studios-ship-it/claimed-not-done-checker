# CLAIMED ≠ DONE Checker

Paste what an agent claimed and the evidence. Press CHECK IT. Get one honest verdict — **VERIFIED**, **CLAIMED-ONLY**, or **DISPUTED** — with the evidence shown. No scores, no stars, no "100% done."

Built for Devpost Learn's Build With AI: Basics hackathon (plan-first: scope → PRD → spec → build → ship; see `devpost/`).

## Run it

Double-click `index.html`. No install, no keys, no internet needed.

- **Try Example 1** → CHECK IT → VERIFIED, meter at TESTED.
- **Try Example 2** → CHECK IT → DISPUTED, meter at STATED.

## How it works

A pure check engine (`js/engine.js`, depends on nothing) splits the claim into commitments, marks each against the evidence with visible rules, and rolls up one verdict. Every check carries a ledger stamp (time + SHA-256 of the two boxes). Future connectors (MCP, Google, Microsoft, …) plug into `js/adapters/registry.js` without touching the core.

## Layout

```
index.html              # shell + mount points + script tags
css/style.css           # all visual rules
js/engine.js            # THE CORE — pure check, depends on nothing
js/stamp.js             # ledger stamp (mtime + SHA-256)
js/examples.js          # calibration fixture texts
js/adapters/registry.js # plugin seam, zero connectors today
js/app.js               # wiring: events → engine → render → sinks
devpost/                # learner profile (ignored), scope, PRD, spec, checklist
```

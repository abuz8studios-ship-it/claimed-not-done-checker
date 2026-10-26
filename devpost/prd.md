---
doc: prd
status: approved
---

# CLAIMED ≠ DONE Checker — Product Requirements

One line: a single dashboard page with the Checker inside — paste a claim and its evidence, press CHECK IT, get one honest verdict. Source: `scope.md > The Core Loop`, `scope.md > The Check Logic (Pinned)`.

## The Core Journey
1. Someone opens the page and sees the dashboard shell with the Checker panel: title, two empty paste boxes side by side, the CHECK IT button, two instant-try example buttons, and three static sample report cards below. No verdict yet.
2. They paste the agent's claim in "What the agent claimed" and the evidence in "The evidence" — or press one instant-try button to fill both boxes immediately.
3. They press CHECK IT. The pinned check logic runs over the two boxes only (`scope.md > The Check Logic (Pinned)`).
4. One giant verdict card appears: the verdict word biggest on the page in its color, the two plain lines, the evidence checklist, the STATED-to-SOLD meter, and the ledger stamp.
5. Success: Example One lands VERIFIED with the meter at TESTED; Example Two lands DISPUTED with the meter at STATED. That is the calibration lock, and the demo.

## Screens and Layout
One page, no navigation. Source: `scope.md > The POC Boundary`, `scope.md > Explicitly Cut`.
- Dashboard shell: the page frame holding the title and the Checker panel. Today's shell holds only the Checker — the working group chat, agent seats, and sales whiteboard from the Showfront vision stay deferred. Shell visual direction: one clean group-chat surface where every agent is its own color and shape.
- Checker panel, top to bottom: two paste boxes side by side ("What the agent claimed" / "The evidence"), CHECK IT button, two instant-try example buttons, verdict card (appears after a check), three static sample report cards along the bottom.

## Look and Feel
Stark and loud, carried from scope: the three verdict colors (green / amber / red) carry the whole page, and the verdict word is the biggest thing on it. Agent identity direction: every agent is its own color and shape — "its own star." That identity lives in the shell's future agent presence; today's shell holds only the Checker.

## Features and Behavior
Single surface, single loop — flat list. Source for the verdict rules: `scope.md > The Check Logic (Pinned)`.

**Paste claim and evidence.** Two large text boxes, side by side, labeled "What the agent claimed" and "The evidence." Free text in, nothing validated on input.

**Instant-try examples.** Two buttons. Each fills both boxes with its full example text — Example One (the 88-chat audit) and Example Two (the "shipped to GitHub" claim) — so a stranger can run a check without typing.

**CHECK IT.** One big button. Runs the pinned logic over the two boxes: commitments split into checklist lines, each marked check/cross/dash, rolled up to one verdict, meter filled to the reached state. Deterministic: same boxes, same verdict, every time.

**Verdict card.** Appears after a check. Contains: the verdict word (VERIFIED / CLAIMED-ONLY / DISPUTED) largest on the page in green / amber / red; line one carrying the claim as stated; line two carrying the strongest statement the evidence actually contains, never invented; the evidence checklist with checks, crosses, and dashes; the STATED → BUILT → TESTED → DEPLOYED → SOLD meter with the reached state filled in; the ledger stamp (mtime + SHA-256 — visibility per Open Questions).

**Sample report cards.** Three static cards along the bottom showing what a finished report looks like. Display only, not interactive.

**Proof ledger.** Every check carries a live stamp on the verdict card: the check's mtime plus the SHA-256 of the two boxes' content. Display-only — it vanishes on reload. No storage, per scope's "saves nothing" rule. Resolution from the approved scope; confirm at review. (If stored history is wanted instead, that reopens `scope.md > Explicitly Cut`.)

## States and Boundaries
- **First use** — empty boxes, example buttons ready, no verdict card yet. Assumption: the card appears only after the first CHECK IT; confirm at review.
- **Empty boxes + CHECK IT** — Assumption: treated as no claim and no evidence, returns CLAIMED-ONLY with an empty checklist; confirm at review.
- **The three verdicts** — VERIFIED (green), CLAIMED-ONLY (amber, the default), DISPUTED (red), each with the full card.
- **What persists** — nothing. The ledger stamp is display-only on the card and vanishes on reload. Per `scope.md > Explicitly Cut`; confirm at review.

## Product Decisions
- Checker-inside-dashboard: the Checker panel lives in a dashboard shell; today's shell holds only the Checker — the agent group chat stays deferred per scope. Learner's shell decision.
- Proof ledger required: each check stamped with mtime + SHA-256. Learner's requirement; storage/visibility open.
- Pinned deterministic logic with the calibration lock carried unchanged from `scope.md > The Check Logic (Pinned)`.
- No scores, no percentages, no AI judgment, no legal proof — carried from scope.
- Verify-from-specs law: the Checker reads only the two boxes in front of it — "always verify from specs, not memory." Already embodied by the pinned logic's "never use outside knowledge" rule.

## What We're Building
The one dashboard page: shell + Checker panel (two paste boxes, CHECK IT, verdict card with checklist + meter + ledger stamp), two instant-try examples, three static sample cards, deterministic pinned logic, calibration lock passing.

## Deferred From the POC
- Working group chat, agent seats, sales whiteboard — the Showfront harness front page. Out: today proves the verification law, not the harness.
- Agent purposes — call, text, email, market, book appointments. Out: those are the harness agents' behaviors, unbuildable in a 2-hour proof; the agent presenting from verified records comes later with the Closer.
- Accounts, sign-in, database, saved history, extra pages, settings — out per `scope.md > Explicitly Cut`, unless the ledger decision reopens storage.
- AI judgment, legal proof — out; the check is a visible heuristic, not a courtroom.

## Possible Later Enhancements
The Checker as a registered verification service inside the full Showfront harness, so every agent's claim passes through the same law. The Closer sales agent presenting only from verified records. Agent seats in the group chat — each its own color and shape, its own star — calling, texting, emailing, marketing, and booking appointments. Recursive RRSI 3-barrier learning and evolution for harness agents — out for today, where the Checker must stay deterministic.

## Non-Goals
- A 3D walkthrough or digital dealership — the Showfront world, days of work, not this proof.
- A persisted report history — unless the ledger decision explicitly reopens it.
- Anything that turns the verdict into a score, percentage, or guarantee.
- Learning or evolving verdicts — recursive self-improvement belongs to the harness, not to today's deterministic proof. Same boxes, same verdict, every time.

## Open Questions
None remaining. The ledger question resolved to a live display-only stamp under Features and Behavior — confirm at review; stored history would reopen the scope cut.

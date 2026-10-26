---
doc: scope
status: approved
---

# CLAIMED ≠ DONE Checker

One line: paste what an agent claimed and the evidence, press one button, get one honest verdict.

## The Unique Kernel
One verdict you can see from across the room — VERIFIED, CLAIMED-ONLY, or DISPUTED — with the evidence shown, never a score or a "100% done" lie. Plus a STATED → SOLD meter, because "built" is not "tested" and "tested" is not "deployed," and agents blur all of those together.

## Who It's For
Ahmad first: someone who works with AI agents all day and needs to check his own agents and team before believing a claim or selling a product. Beyond that, anyone who gets a report from an agent — dealers, builders, judges — and needs to answer: is this real, or just a claim? Today, that moment after the agent says "done" is handled by gut feel and manual digging.

## The Core Loop
Open the one page, paste the claim in one box and the evidence in the other, press CHECK IT, read the giant verdict card. Come back every time an agent says "done" and a human has to decide whether to trust it.

## Inspiration & Identity
Honest, stark, readable at a glance. Three verdict colors carry the whole page: green VERIFIED, amber CLAIMED-ONLY, red DISPUTED. No aesthetic references volunteered; keep it plain and loud.

## Why This Matters to the Learner
"They say they built something, shipped something, finished something — and then I go look, and it's half built, or it's a file on a computer, or it's a claim with no proof behind it." This is the verification law behind the whole Showfront vision, standing alone as today's proof.

## What "Working" Looks Like
One page. Two paste boxes side by side, one CHECK IT button, one huge verdict card underneath with the verdict word biggest on the page, two plain-English lines (what was claimed, what the evidence shows), an evidence checklist with checks and crosses, and the STATED-to-SOLD meter with the reached state filled in. Two pre-loaded example buttons fill both boxes for an instant try. The "oh, that's cool" beat: run example two — the agent claims it "shipped the release to GitHub" while the evidence says "auth never confirmed" — and watch it land DISPUTED in red.

## The Check Logic (Pinned)
A visible, deterministic heuristic — not AI judgment, not legal proof. It reads only the two boxes in front of it, saves nothing, and applies these rules in this order:
1. **DISPUTED (red)** when the evidence contradicts the claim: the claim states a terminal state (shipped, released, deployed, pushed, landed, finished) and the evidence contains a contradiction — an open loop, a "never"/"not"/"failed"/"pending," a "claimed" proof level, or a grade saying the work did not land.
2. **VERIFIED (green)** when the evidence supports the claim with checkable specifics, both required: (a) real named artifacts (actual file names, not vague descriptions), and (b) a matching number, count, or tested run that matches the claim.
3. **CLAIMED-ONLY (amber)** for everything else. This is the default. A claim with no checkable evidence is not false and not true — it is claimed-only.

The claim is read as individual commitments; each becomes one checklist line marked by the same three rules (check = supported, cross = contradicted, dash = nothing checkable). Roll-up: one contradicted commitment → DISPUTED; every commitment supported → VERIFIED; anything between → CLAIMED-ONLY. The two plain lines under the verdict are fixed in form: the first carries the claim as stated, the second carries the strongest statement the evidence actually contains — never a summary the Checker invents.

The meter follows the same rule, never a separate score: STATED = the claim itself; BUILT = artifacts named in evidence; TESTED = a run/test/smoke test stated in evidence; DEPLOYED = deployment evidenced, not just claimed; SOLD = sale evidenced. It never jumps ahead of the evidence and never becomes a percentage.

It will never invent evidence, guess a file exists, use outside knowledge, give a partial score, or upgrade CLAIMED-ONLY to VERIFIED because a claim sounds confident. Confidence is not evidence.

**Calibration lock:** the two examples test the logic itself. Example One must return VERIFIED with the meter at TESTED; Example Two must return DISPUTED with the meter at STATED. If the build ever returns anything else on those two, the logic is wrong — fix the logic, not the examples.

## The POC Boundary
In: one page, two paste boxes, CHECK IT button, giant verdict card (verdict + two lines + evidence checklist + STATED-to-SOLD meter), two pre-loaded instant-try examples, three static sample report cards along the bottom. Deterministic, visible check logic.

## Later
Everything the law can grow into — Showfront, the Closer, the whole harness — builds on this later. Not today.

## Explicitly Cut
- Accounts, sign-in, database, saved history — no persistence needed to prove one honest verdict.
- Extra pages and settings — one page is the whole point.
- AI judgment pretending to be a judge — this is a visible deterministic check, not an oracle.
- Legal proof — not a courtroom, just the truth in one big word.

/* js/examples.js — calibration fixtures. Fixed texts; the logic must fit THEM. */
(function (root, factory) {
  var api = factory();
  if (typeof module !== "undefined" && module.exports) { module.exports = api; }
  root.Checker = root.Checker || {};
  root.Checker.examples = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";
  return [
    {
      claim: "Done. The audit script graded all 88 chats from the export and produced the report-card dashboard (dashboard.md), the raw cards file (cards.json), and the open-loops tracker (open-loops.md).",
      evidence: "dashboard.md: 88 chats graded, GPA 2.20, 12 verified ships, 115 open loops.\ncards.json: 88 graded cards.\nopen-loops.md: 115 open loops tracked.\naudit.py runs with standard library only; smoke-tested on the full export."
    },
    {
      claim: "Done! I built the finish skill, wired it into all 11 skills, and shipped the release to GitHub.",
      evidence: "Open loop: Push 12 skills to GitHub (auth never confirmed).\nProof level: claimed.\nfinish-skill work described in chat; release not pushed."
    }
  ];
});

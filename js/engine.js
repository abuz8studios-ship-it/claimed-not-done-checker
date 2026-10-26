/* js/engine.js — the pure core. Depends on nothing. Same inputs, same output.
   Implements scope.md > The Check Logic (Pinned). */
(function (root, factory) {
  var api = factory();
  if (typeof module !== "undefined" && module.exports) { module.exports = api; }
  root.Checker = root.Checker || {};
  root.Checker.engine = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  var TERMINAL_STEMS = ["ship", "releas", "deploy", "push", "land", "finish"];
  var CONTRADICTION = ["open loop", "never", "not", "n't", "no", "failed", "fail",
    "pending", "claimed", "missing", "unconfirmed"];
  var ARTIFACT_RE = /\b[\w-]+\.(md|html|js|json|py|csv|txt|css|png)\b/i;
  var RUN_MARKERS = ["smoke", "test", "ran", "runs", "verified", "passed"];
  var DEPLOY_WORDS = ["deploy", "ship", "release", "push", "land", "live", "production"];
  var SALE_WORDS = ["sold", "sale", "purchased", "purchase", "order", "revenue", "paid", "customer"];

  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function hasWord(text, word) {
    if (word === "n't") { return text.toLowerCase().indexOf("n't") !== -1; }
    return new RegExp("\\b" + esc(word) + "\\b", "i").test(text);
  }
  function anyWord(text, words) {
    for (var i = 0; i < words.length; i++) { if (hasWord(text, words[i])) return true; }
    return false;
  }
  function hasStem(text, stems) {
    var t = text.toLowerCase();
    for (var i = 0; i < stems.length; i++) { if (t.indexOf(stems[i]) !== -1) return true; }
    return false;
  }
  function numbersOf(s) { return s.match(/\d+/g) || []; }

  function check(claim, evidence) {
    claim = (claim || "").trim();
    evidence = (evidence || "").trim();
    var commitments = claim.split(/\n+|[.!?]+(?=\s|$)/).map(function (s) { return s.trim(); }).filter(Boolean);
    var hasArtifact = ARTIFACT_RE.test(evidence);
    var hasRun = anyWord(evidence, RUN_MARKERS);
    var hasContradiction = anyWord(evidence, CONTRADICTION);

    var checklist = commitments.map(function (c) {
      var nums = numbersOf(c);
      var numMatch = nums.some(function (n) { return evidence.indexOf(n) !== -1; });
      var mark = "unknown";
      if (hasStem(c, TERMINAL_STEMS) && hasContradiction) { mark = "dispute"; }
      else if (hasArtifact && (numMatch || hasRun)) { mark = "support"; }
      return { text: c, mark: mark };
    });

    var verdict = "CLAIMED-ONLY";
    if (checklist.some(function (l) { return l.mark === "dispute"; })) { verdict = "DISPUTED"; }
    else if (checklist.length > 0 && checklist.every(function (l) { return l.mark === "support"; })) {
      verdict = "VERIFIED";
    }

    var line1 = claim.slice(0, 200) || "(nothing claimed)";
    var line2 = "No checkable evidence.";
    var evLines = evidence.split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean);
    for (var i = 0; i < evLines.length; i++) {
      if (ARTIFACT_RE.test(evLines[i]) || anyWord(evLines[i], RUN_MARKERS) ||
          anyWord(evLines[i], CONTRADICTION)) { line2 = evLines[i].slice(0, 300); break; }
    }
    if (line2 === "No checkable evidence." && evLines.length) { line2 = evLines[0].slice(0, 300); }

    var meter = -1;
    if (claim) { meter = 0; }
    if (hasArtifact) { meter = 1; }
    if (hasRun) { meter = 2; }
    if (anyWord(evidence, DEPLOY_WORDS) && !hasContradiction) { meter = 3; }
    if (anyWord(evidence, SALE_WORDS)) { meter = 4; }

    return { verdict: verdict, line1: line1, line2: line2, checklist: checklist, meter: meter };
  }

  return { check: check };
});

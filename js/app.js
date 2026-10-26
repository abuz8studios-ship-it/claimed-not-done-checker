/* js/app.js — wiring: events → engine → stamp → render → sinks. */
(function () {
  "use strict";
  function $(id) { return document.getElementById(id); }
  var METER = ["STATED", "BUILT", "TESTED", "DEPLOYED", "SOLD"];

  function render(result) {
    var word = $("verdictWord");
    word.textContent = result.verdict;
    word.className = "v-" + result.verdict;
    $("line1").textContent = result.line1;
    $("line2").textContent = result.line2;
    var ul = $("checklistEl");
    ul.innerHTML = "";
    result.checklist.forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = (item.mark === "support" ? "\u2713 " :
        item.mark === "dispute" ? "\u2717 " : "\u2013 ") + item.text;
      ul.appendChild(li);
    });
    var meter = $("meterEl");
    meter.innerHTML = "";
    METER.forEach(function (name, i) {
      var s = document.createElement("span");
      s.textContent = name;
      if (i <= result.meter) { s.className = "hit"; }
      meter.appendChild(s);
    });
    $("verdictCard").hidden = false;
  }

  function fireSinks(report) {
    var sinks = (window.Checker.adapters && window.Checker.adapters.sinks) || [];
    sinks.forEach(function (sink) {
      try { sink.publishVerdict(report); } catch (e) { /* a sink never breaks the card */ }
    });
  }

  $("checkBtn").addEventListener("click", function () {
    var claim = $("claimBox").value, evidence = $("evidenceBox").value;
    var result = window.Checker.engine.check(claim, evidence);
    render(result);
    window.Checker.stamp.stamp(claim, evidence, function (s) {
      $("stampEl").textContent = s.sha256
        ? "Ledger: " + s.mtime + " · SHA-256 " + s.sha256
        : "Ledger: " + s.mtime + " · hash unavailable in this browser";
      fireSinks({ claim: claim, evidence: evidence, result: result, stamp: s });
    });
  });

  var btns = document.querySelectorAll(".exampleBtn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      var ex = window.Checker.examples[+this.getAttribute("data-example")];
      $("claimBox").value = ex.claim;
      $("evidenceBox").value = ex.evidence;
    });
  }
})();

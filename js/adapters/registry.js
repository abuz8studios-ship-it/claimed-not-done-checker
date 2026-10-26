/* js/adapters/registry.js — the pluggable bridge. Named slots; zero connectors today.
   Source: { name, fetchEvidence(ref) -> Promise<string> }
   Sink:   { name, publishVerdict(report) -> Promise<void> }
   Rule: engine.js never touches this file. A future connector (MCP, Google,
   Microsoft, …) is one new file plus one registration line. */
(function (root) {
  "use strict";
  root.Checker = root.Checker || {};
  root.Checker.adapters = root.Checker.adapters || { sources: [], sinks: [] };
})(typeof window !== "undefined" ? window : globalThis);

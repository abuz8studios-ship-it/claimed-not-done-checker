/* js/stamp.js — ledger stamp: check mtime + SHA-256 of the two boxes. Display-only. */
(function (root, factory) {
  var api = factory(root);
  if (typeof module !== "undefined" && module.exports) { module.exports = api; }
  root.Checker = root.Checker || {};
  root.Checker.stamp = api;
})(typeof window !== "undefined" ? window : globalThis, function (root) {
  "use strict";

  function toHex(buf) {
    var bytes = new Uint8Array(buf), out = "";
    for (var i = 0; i < bytes.length; i++) {
      out += ("0" + bytes[i].toString(16)).slice(-2);
    }
    return out;
  }

  function stamp(claim, evidence, cb) {
    var mtime = new Date().toISOString();
    var text = (claim || "") + "\n---\n" + (evidence || "");
    if (root.crypto && root.crypto.subtle && typeof TextEncoder !== "undefined") {
      root.crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)).then(function (d) {
        cb({ mtime: mtime, sha256: toHex(d) });
      }, function () { cb({ mtime: mtime, sha256: null }); });
    } else {
      cb({ mtime: mtime, sha256: null });
    }
  }

  return { stamp: stamp };
});

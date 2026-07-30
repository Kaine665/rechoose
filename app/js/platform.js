/* Explicit platform boundary for native capabilities and platform styling. */
"use strict";

const PLATFORM_ID = window.__RECHOOSE_PLATFORM__ === "ios" ? "ios" : "web";
document.documentElement.dataset.platform = PLATFORM_ID;

const Platform = Object.freeze({
  id: PLATFORM_ID,
  isIOS: PLATFORM_ID === "ios",

  haptic(style = "light") {
    if (!this.isIOS) return;
    try {
      window.webkit?.messageHandlers?.haptic?.postMessage(style);
    } catch (_) {
      /* Unsupported native containers stay silent. */
    }
  },

  exportBackup(filename, content) {
    if (!this.isIOS) return false;
    const exporter = window.webkit?.messageHandlers?.exportBackup;
    if (!exporter) return false;
    exporter.postMessage({ filename, content });
    return true;
  }
});

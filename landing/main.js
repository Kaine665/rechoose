(function () {
  /*
   * App link target.
   * - Monorepo / same host: "/app/"
   * - Separate Vercel project: set window.RECHOOSE_APP_URL before this script,
   *   e.g. "https://app.yourdomain.com"
   */
  const appUrl = window.RECHOOSE_APP_URL || "/app/";
  document.querySelectorAll("[data-app-link]").forEach((a) => {
    a.setAttribute("href", appUrl);
  });

  const form = document.getElementById("waitlist-form");
  const success = document.getElementById("success");
  const errorEl = document.getElementById("form-error");
  const LEGACY_STORAGE_KEY = "rechoose_waitlist";

  if (!form || !success) return;

  function showError(message) {
    if (!errorEl) return;
    errorEl.hidden = !message;
    errorEl.textContent = message || "";
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    showError("");

    const data = new FormData(form);
    const moment = String(data.get("moment") || "").trim();
    const email = String(data.get("email") || "").trim().toLowerCase();

    if (!moment) {
      showError("Pick the moment you struggle with most.");
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("Enter a valid email address.");
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Joining…";
    }

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ email, moment }),
      });

      // A duplicate email is already safely on the list.
      if (!response.ok && response.status !== 409) {
        throw new Error(`Waitlist request failed: ${response.status}`);
      }

      // Remove any data left by the former browser-only implementation.
      try { localStorage.removeItem(LEGACY_STORAGE_KEY); } catch { /* ignore */ }
    } catch {
      showError("Couldn't join right now. Please try again.");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Join the waitlist";
      }
      return;
    }

    form.hidden = true;
    success.hidden = false;
    success.focus?.();
  });
})();

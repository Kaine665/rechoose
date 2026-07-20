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
  const STORAGE_KEY = "rechoose_waitlist";

  if (!form || !success) return;

  function showError(message) {
    if (!errorEl) return;
    errorEl.hidden = !message;
    errorEl.textContent = message || "";
  }

  function readList() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveEntry(entry) {
    const list = readList();
    const exists = list.some(
      (item) => item.email.toLowerCase() === entry.email.toLowerCase()
    );
    if (!exists) {
      list.push(entry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
    return !exists;
  }

  form.addEventListener("submit", function (event) {
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

    saveEntry({
      email,
      moment,
      createdAt: new Date().toISOString(),
      page: "landing-v1",
    });

    form.hidden = true;
    success.hidden = false;
    success.focus?.();
  });
})();

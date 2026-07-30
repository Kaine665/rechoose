/* Rechoose application flow and screen renderers. */
"use strict";

function onLangChange() {
  updateTabbar();
  if (help.overlay) closeHelp();
  if (!DB.onboarded) renderOnboarding(0);
  else nav(currentView === "planEdit" ? "plans" : currentView);
}

/* ---------------- Router ---------------- */

let currentView = "home";
let planEditId = null;

function nav(view, param) {
  currentView = view;
  if (view === "planEdit") planEditId = param ?? null;
  window.scrollTo(0, 0);
  const views = {
    home: renderHome,
    plans: renderPlans,
    planEdit: () => renderPlanEdit(planEditId),
    progress: renderProgress
  };
  (views[view] || renderHome)();
  updateTabbar();
}

function updateTabbar() {
  tabbar.hidden = !DB.onboarded;
  const labels = {
    home: t("tab.home"),
    plans: t("tab.plans"),
    progress: t("tab.progress")
  };
  $$(".tab", tabbar).forEach(btn => {
    const v = btn.dataset.nav;
    const label = btn.querySelector(".tab-label");
    if (label) label.textContent = labels[v] || "";
    btn.classList.toggle("active",
      v === currentView || (v === "plans" && currentView === "planEdit"));
  });
}

tabbar.addEventListener("click", e => {
  const btn = e.target.closest(".tab");
  if (btn) nav(btn.dataset.nav);
});

/* ---------------- Onboarding ---------------- */

function renderOnboarding(step = 0) {
  tabbar.hidden = true;
  const dots = [0, 1, 2].map(i =>
    `<span class="dot2 ${i === step ? "on" : ""}"></span>`).join("");
  const templates = getTemplates();

  const pages = [
    `
    <div class="onboard-emoji">🌱</div>
    <h1>${t("onboard.1.title")}</h1>
    <p>${t("onboard.1.body")}</p>
    `,
    `
    <div class="onboard-emoji">🧭</div>
    <h1>${t("onboard.2.title")}</h1>
    <div class="onboard-flow">
      <div class="of-step"><span class="of-badge">1</span><span class="of-text"><b>${t("onboard.2.s1.title")}</b><span>${t("onboard.2.s1.body")}</span></span></div>
      <div class="of-line"></div>
      <div class="of-step"><span class="of-badge">2</span><span class="of-text"><b>${t("onboard.2.s2.title")}</b><span>${t("onboard.2.s2.body")}</span></span></div>
      <div class="of-line"></div>
      <div class="of-step"><span class="of-badge">3</span><span class="of-text"><b>${t("onboard.2.s3.title")}</b><span>${t("onboard.2.s3.body")}</span></span></div>
    </div>
    `,
    `
    <div class="onboard-emoji">🤝</div>
    <h1>${t("onboard.3.title")}</h1>
    <p>${t("onboard.3.body")}</p>
    <div class="stack" style="margin-top:24px; text-align:left;">
      ${templates.map(tpl => `
        <div class="tpl-card">
          <div class="tc-name">${tpl.emoji} ${esc(tpl.name)}</div>
          <div class="tc-desc">${t("common.triggerPrefix")}${esc(tpl.trigger)}</div>
        </div>`).join("")}
    </div>
    `
  ];

  app.innerHTML = `
    <div class="screen onboard">
      ${pages[step]}
      <div class="onboard-dots">${dots}</div>
      ${step < 2
        ? `<button class="btn btn-primary btn-block" id="ob-next">${t("common.continue")}</button>`
        : `<button class="btn btn-primary btn-block" id="ob-start">${t("onboard.useStarterPlans")}</button>`}
      ${langSwitcherHtml("lang-switch--onboard")}
    </div>`;

  bindLangSwitcher(onLangChange);
  $("#ob-next")?.addEventListener("click", () => renderOnboarding(step + 1));
  $("#ob-start")?.addEventListener("click", finishOnboarding);

  function finishOnboarding() {
    if (!DB.plans.length) {
      DB.plans = templates.map(planFromTemplate);
    }
    DB.onboarded = true;
    DB.version = 3;
    saveData();
    nav("home");
    toast(t("onboard.starterPlansReady"));
  }
}

/* ---------------- Home ---------------- */

function renderHome() {
  const todayRecs = DB.records.filter(r => dayKey(r.ts) === dayKey(Date.now()));
  const todayChanged = todayRecs.filter(r => r.outcome === "changed").length;

  let todayLine = "";
  if (todayRecs.length > 0) {
    todayLine = todayChanged > 0
      ? t("home.todayChanged", { n: todayChanged })
      : t("home.todayPracticed", { n: todayRecs.length });
  }

  app.innerHTML = `
    <div class="screen">
      <div class="home-hero">
        <span class="home-plant">🌱</span>
        <div class="home-greet">${greeting()}</div>
        <div class="home-question">${t("home.question")}</div>
        <button class="help-btn" id="btn-help">${t("home.helpBtn")}</button>
        ${todayLine ? `<div style="margin-top:28px"><span class="today-line">${todayLine}</span></div>` : ""}
      </div>
      <p class="home-note">${t("home.privacy")}</p>
    </div>`;

  $("#btn-help").addEventListener("click", startHelp);
}

/* ---------------- Help flow ---------------- */

const help = {
  overlay: null,
  startTs: 0,
  timerInt: null,
  plan: null,
  actionPlan: null,
  otherContext: false,
  doneSteps: new Set()
};

function startHelp() {
  help.startTs = Date.now();
  help.plan = null;
  help.actionPlan = null;
  help.otherContext = false;
  help.doneSteps = new Set();

  const el = document.createElement("div");
  el.className = "help-overlay";
  el.innerHTML = `<div class="help-inner">
    <div class="help-top">
      <button class="help-exit" id="help-exit">${t("help.exit")}</button>
      <span class="help-timer" id="help-timer"></span>
    </div>
    <div class="help-body" id="help-body"></div>
  </div>`;
  document.body.appendChild(el);
  document.body.style.overflow = "hidden";
  help.overlay = el;

  $("#help-exit", el).addEventListener("click", closeHelp);

  help.timerInt = setInterval(() => {
    const s = Math.floor((Date.now() - help.startTs) / 1000);
    const timerEl = $("#help-timer", el);
    if (timerEl) {
      timerEl.textContent =
        `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
    }
  }, 1000);

  helpPickPlan();
}

function closeHelp() {
  clearInterval(help.timerInt);
  help.overlay?.remove();
  help.overlay = null;
  document.body.style.overflow = "";
  nav(currentView);
}

function helpBody(html) {
  const body = $("#help-body", help.overlay);
  body.innerHTML = html;
  return body;
}

function helpPickPlan() {
  const plans = DB.plans.map(localizePlan);
  const body = helpBody(`
    <div class="help-title">${t("help.pick.title")}</div>
    <div class="help-sub">${t("help.pick.sub")}</div>
    <div class="spacer"></div>
    <div class="help-actions">
      ${plans.length ? `
        <div class="help-choice-label">${t("help.pick.saved")}</div>
        ${plans.map(p => `
        <button class="plan-pick" data-plan="${p.id}">
          <div class="pp-name">${p.emoji} ${esc(p.name)}</div>
          <div class="pp-trigger">${t("common.triggerPrefix")}${esc(p.trigger)}</div>
        </button>`).join("")}` : ""}
      <div class="help-choice-label">${t("help.pick.otherLabel")}</div>
      <button class="plan-pick plan-pick-record" id="h-other-context">
        <div class="pp-name">${t("help.pick.other")}</div>
        <div class="pp-trigger">${t("help.pick.otherSub")}</div>
      </button>
    </div>`);

  $$("[data-plan]", body).forEach(btn => btn.addEventListener("click", () => {
    help.plan = localizePlan(DB.plans.find(p => p.id === btn.dataset.plan));
    helpChooseActionPlan();
  }));

  $("#h-other-context", body).addEventListener("click", () => {
    help.otherContext = true;
    help.plan = null;
    helpChooseActionPlan();
  });
}

function helpAlternativeButtons() {
  return `
    <button class="outcome-btn" id="h-same">
      <div class="ob-title">${t("help.choose.same")}</div>
      <div class="ob-sub">${t("help.choose.sameSub")}</div>
    </button>
    <button class="outcome-btn outcome-btn-custom" id="h-custom">
      <div class="ob-title">${t("help.choose.custom")}</div>
      <div class="ob-sub">${t("help.choose.customSub")}</div>
    </button>`;
}

function bindHelpAlternatives(body) {
  $("#h-same", body).addEventListener("click", () => {
    const actionPlan = help.actionPlan;
    saveHelpRecord({
      outcome: "followed",
      completedSteps: actionPlan
        ? [...help.doneSteps].map(index => actionPlan.steps[index])
        : []
    });
  });
  $("#h-custom", body).addEventListener("click", helpCustomAction);
}

function helpChooseActionPlan() {
  const p = help.plan;
  const body = helpBody(`
    <div class="help-title">${p
      ? `${p.emoji} ${esc(p.name)}`
      : t("help.choose.otherTitle")}</div>
    <div class="help-sub">${t(p ? "help.actionPlans.sub" : "help.choose.otherSub")}</div>
    <div class="spacer"></div>
    <div class="help-actions">
      ${p ? p.actionPlans.map((actionPlan, index) => `
        <button class="outcome-btn action-plan-pick" data-action-plan="${index}">
          <div class="ob-title">🌿 ${esc(actionPlan.name)}</div>
          <div class="ob-sub">${actionPlan.steps.map(esc).join(" → ")}</div>
          ${actionPlan.steps.length > 1
            ? `<div class="action-chain-badge">${t("help.actionPlans.chain", { n: actionPlan.steps.length })}</div>`
            : ""}
        </button>`).join("") : ""}
      ${helpAlternativeButtons()}
    </div>`);

  $$("[data-action-plan]", body).forEach(btn => btn.addEventListener("click", () => {
    const actionPlan = p.actionPlans[+btn.dataset.actionPlan];
    help.actionPlan = actionPlan;
    help.doneSteps = new Set();
    if (actionPlan.steps.length === 1) {
      saveHelpRecord({
        outcome: "changed",
        helpedStep: actionPlan.steps[0],
        completedSteps: [...actionPlan.steps]
      });
      return;
    }
    helpRunActionPlan();
  }));

  bindHelpAlternatives(body);
}

function helpRunActionPlan() {
  const actionPlan = help.actionPlan;
  const body = helpBody(`
    <div class="help-title">${esc(actionPlan.name)}</div>
    <div class="help-sub">${t("help.sequence.sub")}</div>
    <div class="step-list">
      ${actionPlan.steps.map((step, i) => `
        <button class="step-item ${i > 0 ? "locked" : ""}" data-sequence-step="${i}" ${i > 0 ? "disabled" : ""}>
          <span class="step-order">${i + 1}</span>
          <span class="step-text">${esc(step)}</span>
        </button>`).join("")}
    </div>
    <div class="spacer"></div>
    <div class="help-actions">
      <button class="btn btn-calm btn-block" id="h-sequence-complete" disabled>${t("help.sequence.finishLocked")}</button>
      ${helpAlternativeButtons()}
    </div>`);

  $$("[data-sequence-step]", body).forEach(btn => btn.addEventListener("click", () => {
    const index = +btn.dataset.sequenceStep;
    if (index !== help.doneSteps.size) return;

    help.doneSteps.add(index);
    btn.classList.add("done");
    btn.disabled = true;
    Platform.haptic("light");

    const next = $(`[data-sequence-step="${index + 1}"]`, body);
    if (next) {
      next.disabled = false;
      next.classList.remove("locked");
    }

    if (help.doneSteps.size === actionPlan.steps.length) {
      const complete = $("#h-sequence-complete", body);
      complete.disabled = false;
      complete.textContent = t("help.sequence.finish");
      Platform.haptic("success");
    }
  }));

  $("#h-sequence-complete", body)?.addEventListener("click", () => {
    saveHelpRecord({
      outcome: "changed",
      completedSteps: [...actionPlan.steps]
    });
  });

  bindHelpAlternatives(body);
}

function helpCustomAction() {
  const body = helpBody(`
    <div class="help-title">${t("help.custom.title")}</div>
    <div class="help-sub">${t("help.custom.sub")}</div>
    <div class="spacer"></div>
    <div class="field">
      <textarea class="input input-dark" id="h-custom-note" rows="3"
        placeholder="${esc(t("help.custom.placeholder"))}"></textarea>
    </div>
    <div class="help-actions">
      <button class="btn btn-calm btn-block" id="h-custom-save">${t("help.custom.save")}</button>
    </div>`);

  $("#h-custom-save", body).addEventListener("click", () => {
    const note = $("#h-custom-note", body).value.trim();
    if (!note) {
      toast(t("help.custom.needAction"));
      return;
    }
    saveHelpRecord({
      outcome: "changed",
      note,
      completedSteps: help.actionPlan
        ? [...help.doneSteps].map(index => help.actionPlan.steps[index])
        : []
    });
  });
}

function saveHelpRecord({
  outcome,
  helpedStep = null,
  completedSteps = [],
  note = null
}) {
  const delayMin = (Date.now() - help.startTs) / 60000;
  DB.records.push({
    id: uid(),
    ts: Date.now(),
    planId: help.plan?.id ?? null,
    planName: help.plan?.name ?? null,
    actionPlanId: help.actionPlan?.id ?? null,
    actionPlanName: help.actionPlan?.name ?? null,
    outcome,
    delayMin,
    helpedStep,
    completedSteps,
    note
  });
  saveData();
  Platform.haptic(outcome === "changed" ? "success" : "light");
  helpClose(outcome, delayMin);
}

function helpClose(outcome, delayMin) {
  clearInterval(help.timerInt);
  const total = DB.records.length;
  const changed = DB.records.filter(r => r.outcome === "changed").length;

  const statHtml = (delayMin != null && outcome === "changed")
    ? `<div class="close-stat">
         <div class="cs-num">${fmtDelay(delayMin)}</div>
         <div class="cs-label">${t("help.close.delayLabel")}</div>
       </div>`
    : "";

  const msg = outcome === "changed"
    ? t("help.close.changed")
    : t("help.close.followed");

  helpBody(`
    <div class="close-figure">${outcome === "changed" ? "🌿" : "🕯️"}</div>
    <div class="help-title" style="margin-top:16px">${msg}</div>
    ${statHtml}
    <div class="close-stat">
      <div class="cs-num">${total} <small style="font-size:16px">${t("common.times")}</small></div>
      <div class="cs-label">${t("help.close.practice", { total, changed })}</div>
    </div>
    <div class="spacer"></div>
    <div class="help-actions">
      <button class="btn btn-calm btn-block" id="h-close">${t("help.close.back")}</button>
    </div>`);

  $("#h-close", help.overlay).addEventListener("click", closeHelp);
}

/* ---------------- Plans ---------------- */

function renderPlans() {
  const templates = getTemplates();
  const plansHtml = DB.plans.length
    ? DB.plans.map(raw => {
      const p = localizePlan(raw);
      return `
      <div class="card plan-card">
        <div class="plan-head">
          <span class="plan-emoji">${p.emoji}</span>
          <span class="plan-name">${esc(p.name)}</span>
          <button class="plan-edit-btn" data-edit="${p.id}">${t("plans.edit")}</button>
        </div>
        <div class="plan-section">
          <div class="ps-label">${t("plans.trigger")}</div>
          <div class="plan-trigger">${esc(p.trigger)}</div>
        </div>
        <div class="plan-section">
          <div class="ps-label">${t("plans.actionPlans")}</div>
          <div class="action-plan-summaries">
            ${p.actionPlans.map(actionPlan => `
              <div class="action-plan-summary">
                <div class="aps-name">${esc(actionPlan.name)}</div>
                <div class="aps-steps">${actionPlan.steps.map(esc).join(" → ")}</div>
              </div>`).join("")}
          </div>
        </div>
      </div>`;
    }).join("")
    : `<div class="card center" style="padding:32px 20px">
        <div style="font-size:40px">🧭</div>
        <p class="muted" style="margin-top:10px">${t("plans.empty")}</p>
      </div>`;

  const usedIds = new Set(DB.plans.map(p => p.templateId).filter(Boolean));
  const remainingTpls = templates.filter(tpl => !usedIds.has(tpl.id));

  app.innerHTML = `
    <div class="screen">
      <div class="page-title">${t("plans.title")}</div>
      <div class="page-sub">${t("plans.sub")}</div>
      <div class="spacer"></div>
      <div class="stack">${plansHtml}</div>
      <div class="spacer"></div>
      <button class="btn btn-primary btn-block" id="btn-new-plan">${t("plans.new")}</button>
      ${remainingTpls.length ? `
        <div class="section-title">${t("plans.fromTemplate")}</div>
        <div class="stack">
          ${remainingTpls.map(tpl => `
            <button class="tpl-card" data-tpl-id="${esc(tpl.id)}">
              <div class="tc-name">${tpl.emoji} ${esc(tpl.name)}</div>
              <div class="tc-desc">${esc(tpl.desc)} · ${t("common.triggerPrefix")}${esc(tpl.trigger)}</div>
            </button>`).join("")}
        </div>` : ""}
    </div>`;

  $("#btn-new-plan").addEventListener("click", () => nav("planEdit", null));
  $$("[data-edit]").forEach(b => b.addEventListener("click", () => nav("planEdit", b.dataset.edit)));
  $$("[data-tpl-id]").forEach(b => b.addEventListener("click", () => {
    const tpl = templates.find(x => x.id === b.dataset.tplId);
    if (!tpl) return;
    DB.plans.push(planFromTemplate(tpl));
    saveData();
    renderPlans();
    toast(t("plans.added"));
  }));
}

/* ---------------- Plan edit ---------------- */

const EMOJIS = ["🌙", "📱", "😔", "🌅", "🏠", "💻", "🛏️", "🚿", "🧠", "⚡"];

function renderPlanEdit(planId) {
  const plan = planId ? DB.plans.find(p => p.id === planId) : null;
  const view = plan ? localizePlan(plan) : null;
  const draft = view
    ? {
        emoji: view.emoji,
        name: view.name,
        trigger: view.trigger,
        actionPlans: cloneActionPlans(view.actionPlans)
      }
    : {
        emoji: "🌙",
        name: "",
        trigger: "",
        actionPlans: [{ id: uid(), name: "", steps: [""] }]
      };

  function render() {
    app.innerHTML = `
      <div class="screen">
        <div class="page-title">${plan ? t("planEdit.edit") : t("planEdit.new")}</div>
        <div class="page-sub">${t("planEdit.sub")}</div>
        <div class="spacer"></div>

        <div class="field">
          <label>${t("planEdit.icon")}</label>
          <div class="row">
            ${EMOJIS.map(e => `<button class="chip ${draft.emoji === e ? "selected" : ""}" data-emoji="${e}" style="font-size:18px">${e}</button>`).join("")}
          </div>
        </div>

        <div class="field">
          <label>${t("planEdit.name")}</label>
          <input class="input" id="pe-name" placeholder="${esc(t("planEdit.namePh"))}" value="${esc(draft.name)}" maxlength="20">
        </div>

        <div class="field">
          <label>${t("planEdit.trigger")}</label>
          <input class="input" id="pe-trigger" placeholder="${esc(t("planEdit.triggerPh"))}" value="${esc(draft.trigger)}" maxlength="40">
          <div class="hint">${t("planEdit.triggerHint")}</div>
        </div>

        <div class="field">
          <label>${t("planEdit.actionPlans")}</label>
          <div class="action-plan-editors">
            ${draft.actionPlans.map((actionPlan, actionPlanIndex) => `
              <div class="action-plan-editor">
                <div class="action-plan-editor-head">
                  <span>${t("planEdit.actionPlanNumber", { n: actionPlanIndex + 1 })}</span>
                  ${draft.actionPlans.length > 1
                    ? `<button class="step-remove" data-action-plan-del="${actionPlanIndex}" aria-label="${esc(t("planEdit.removeActionPlan"))}">✕</button>`
                    : ""}
                </div>
                <input class="input" data-action-plan-name="${actionPlanIndex}"
                  placeholder="${esc(t("planEdit.actionPlanNamePh"))}"
                  value="${esc(actionPlan.name)}" maxlength="24">
                <div class="action-plan-step-label">${t("planEdit.actionPlanSteps")}</div>
                ${actionPlan.steps.map((step, stepIndex) => `
                  <div class="step-edit-row">
                    <input class="input" data-action-plan-step="${actionPlanIndex}:${stepIndex}"
                      placeholder="${esc(t("planEdit.stepPh", { n: stepIndex + 1 }))}"
                      value="${esc(step)}" maxlength="40">
                    ${actionPlan.steps.length > 1
                      ? `<button class="step-remove" data-action-plan-step-del="${actionPlanIndex}:${stepIndex}" aria-label="${esc(t("planEdit.removeStep"))}">✕</button>`
                      : ""}
                  </div>`).join("")}
                <button class="btn btn-soft btn-sm" data-action-plan-add-step="${actionPlanIndex}">${t("planEdit.addNextStep")}</button>
                <div class="hint">${actionPlan.steps.length === 1
                  ? t("planEdit.singleActionHint")
                  : t("planEdit.chainHint", { n: actionPlan.steps.length })}</div>
              </div>`).join("")}
          </div>
          <button class="btn btn-ghost btn-block" id="pe-add-action-plan">${t("planEdit.addActionPlan")}</button>
          <div class="hint">${t("planEdit.actionPlansHint")}</div>
        </div>

        <div class="spacer"></div>
        <div class="stack">
          <button class="btn btn-primary btn-block" id="pe-save">${t("planEdit.save")}</button>
          <button class="btn btn-ghost btn-block" id="pe-cancel">${t("common.cancel")}</button>
          ${plan ? `<button class="btn btn-danger-ghost btn-block" id="pe-del">${t("planEdit.delete")}</button>` : ""}
        </div>
      </div>`;

    bindDraftInputs();

    $$("[data-emoji]").forEach(b => b.addEventListener("click", () => {
      syncDraft();
      draft.emoji = b.dataset.emoji;
      render();
    }));

    $$("[data-action-plan-add-step]").forEach(button => button.addEventListener("click", () => {
      syncDraft();
      const actionPlanIndex = +button.dataset.actionPlanAddStep;
      draft.actionPlans[actionPlanIndex].steps.push("");
      render();
      const stepIndex = draft.actionPlans[actionPlanIndex].steps.length - 1;
      $(`[data-action-plan-step="${actionPlanIndex}:${stepIndex}"]`)?.focus();
    }));

    $$("[data-action-plan-step-del]").forEach(button => button.addEventListener("click", () => {
      syncDraft();
      const [actionPlanIndex, stepIndex] = button.dataset.actionPlanStepDel.split(":").map(Number);
      draft.actionPlans[actionPlanIndex].steps.splice(stepIndex, 1);
      render();
    }));

    $$("[data-action-plan-del]").forEach(button => button.addEventListener("click", () => {
      syncDraft();
      draft.actionPlans.splice(+button.dataset.actionPlanDel, 1);
      render();
    }));

    $("#pe-add-action-plan").addEventListener("click", () => {
      syncDraft();
      draft.actionPlans.push({ id: uid(), name: "", steps: [""] });
      render();
      $(`[data-action-plan-name="${draft.actionPlans.length - 1}"]`)?.focus();
    });

    $("#pe-save").addEventListener("click", () => {
      syncDraft();
      const name = draft.name.trim();
      const trigger = draft.trigger.trim();
      const actionPlans = draft.actionPlans.map(actionPlan => ({
        id: actionPlan.id || uid(),
        name: actionPlan.name.trim(),
        steps: actionPlan.steps.map(step => step.trim()).filter(Boolean)
      }));
      if (!name) { toast(t("planEdit.needName")); return; }
      if (!actionPlans.length) { toast(t("planEdit.needActionPlan")); return; }
      if (actionPlans.some(actionPlan => !actionPlan.name)) {
        toast(t("planEdit.needActionPlanName"));
        return;
      }
      if (actionPlans.some(actionPlan => !actionPlan.steps.length)) {
        toast(t("planEdit.needStep"));
        return;
      }
      if (plan) {
        Object.assign(plan, {
          emoji: draft.emoji,
          name,
          trigger: trigger || t("planEdit.unnamedTrigger"),
          actionPlans
        });
        /* Edited plans keep the user's wording; stop rebinding to template locale */
        delete plan.templateId;
      } else {
        DB.plans.push({
          id: uid(),
          emoji: draft.emoji,
          name,
          trigger: trigger || t("planEdit.unnamedTrigger"),
          actionPlans,
          createdAt: Date.now()
        });
      }
      saveData();
      nav("plans");
      toast(t("planEdit.saved"));
    });

    $("#pe-cancel").addEventListener("click", () => nav("plans"));

    $("#pe-del")?.addEventListener("click", () => {
      if (confirm(t("planEdit.deleteConfirm"))) {
        DB.plans = DB.plans.filter(p => p.id !== plan.id);
        saveData();
        nav("plans");
        toast(t("planEdit.deleted"));
      }
    });
  }

  function syncDraft() {
    draft.name = $("#pe-name")?.value ?? draft.name;
    draft.trigger = $("#pe-trigger")?.value ?? draft.trigger;
    $$("[data-action-plan-name]").forEach(input => {
      draft.actionPlans[+input.dataset.actionPlanName].name = input.value;
    });
    $$("[data-action-plan-step]").forEach(input => {
      const [actionPlanIndex, stepIndex] = input.dataset.actionPlanStep.split(":").map(Number);
      draft.actionPlans[actionPlanIndex].steps[stepIndex] = input.value;
    });
  }

  function bindDraftInputs() {
    ["pe-name", "pe-trigger"].forEach(id => $("#" + id)?.addEventListener("input", syncDraft));
    $$("[data-action-plan-name], [data-action-plan-step]").forEach(input =>
      input.addEventListener("input", syncDraft));
  }

  render();
}

/* ---------------- Progress ---------------- */

function renderProgress() {
  const now = Date.now();
  const days30 = now - 30 * 86400000;
  const recent = DB.records.filter(r => r.ts >= days30);
  const urges = recent.length;
  const changed = recent.filter(r => r.outcome === "changed");

  const delays = changed.filter(r => r.delayMin != null).map(r => r.delayMin);
  const avgDelay = delays.length ? delays.reduce((a, b) => a + b, 0) / delays.length : null;

  const stepCount = {};
  changed.forEach(r => { if (r.helpedStep) stepCount[r.helpedStep] = (stepCount[r.helpedStep] || 0) + 1; });
  const bestStep = Object.entries(stepCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  const chartDays = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now - i * 86400000);
    const key = dayKey(d.getTime());
    const dayRecs = DB.records.filter(r => dayKey(r.ts) === key);
    chartDays.push({
      label: d.getDate(),
      changed: dayRecs.filter(r => r.outcome === "changed").length,
      followed: dayRecs.filter(r => r.outcome === "followed").length
    });
  }
  const maxDay = Math.max(1, ...chartDays.map(d => d.changed + d.followed));
  const chartHtml = chartDays.map(d => `
    <div class="mini-day-wrap">
      <div class="mini-col">
        ${d.followed ? `<div class="mini-bar followed" style="height:${d.followed / maxDay * 100}%"></div>` : ""}
        ${d.changed ? `<div class="mini-bar changed" style="height:${d.changed / maxDay * 100}%"></div>` : ""}
      </div>
      <div class="mini-day">${d.label}</div>
    </div>`).join("");

  const history = [...DB.records].sort((a, b) => b.ts - a.ts).slice(0, 20);
  const historyHtml = history.length
    ? history.map(r => `
      <div class="rec-item">
        <span class="rec-mark">${r.outcome === "changed" ? "🌿" : "🌧️"}</span>
        <div class="rec-main">
          <div class="rec-title">
            <span class="tag ${r.outcome === "changed" ? "tag-changed" : "tag-followed"}">${r.outcome === "changed" ? t("progress.tag.changed") : t("progress.tag.followed")}</span>
          </div>
          <div class="rec-meta">
            ${fmtDate(r.ts)}${r.planName ? " · " + esc(r.planName) : ""}${r.actionPlanName ? " · " + esc(r.actionPlanName) : ""}${r.delayMin != null && r.outcome === "changed" ? t("progress.delayPrefix") + fmtDelay(r.delayMin) : ""}
          </div>
          ${r.helpedStep ? `<div class="rec-note">${t("progress.helped")}${esc(r.helpedStep)}</div>` : ""}
          ${r.note ? `<div class="rec-note">"${esc(r.note)}"</div>` : ""}
        </div>
        <button class="rec-del" data-rec-del="${r.id}" aria-label="${esc(t("progress.deleteRec"))}">✕</button>
      </div>`).join("")
    : `<p class="muted center" style="padding:16px 0">${t("progress.empty")}</p>`;

  const insightHtml = [];
  if (bestStep) insightHtml.push(t("progress.insight.best", { step: esc(bestStep) }));
  if (avgDelay != null) insightHtml.push(t("progress.insight.delay", { delay: fmtDelay(avgDelay) }));
  if (!insightHtml.length && urges > 0) insightHtml.push(t("progress.insight.start"));

  app.innerHTML = `
    <div class="screen">
      <div class="page-title">${t("progress.title")}</div>
      <div class="page-sub">${t("progress.sub")}</div>
      <div class="spacer"></div>

      <div class="stat-grid">
        <div class="stat-card">
          <div class="st-num">${urges}</div>
          <div class="st-label">${t("progress.urges")}</div>
        </div>
        <div class="stat-card">
          <div class="st-num">${changed.length}</div>
          <div class="st-label">${t("progress.changed")}</div>
        </div>
        <div class="stat-card">
          <div class="st-num">${urges ? Math.round(changed.length / urges * 100) + "<small>%</small>" : "—"}</div>
          <div class="st-label">${t("progress.rate")}</div>
        </div>
        <div class="stat-card">
          <div class="st-num" style="font-size:${avgDelay != null ? 20 : 30}px; padding-top:${avgDelay != null ? 6 : 0}px">${avgDelay != null ? fmtDelay(avgDelay) : "—"}</div>
          <div class="st-label">${t("progress.avgDelay")}</div>
        </div>
      </div>

      ${insightHtml.length ? `<div class="spacer"></div><div class="insight">💡 ${insightHtml.join("<br><br>")}</div>` : ""}

      <div class="section-title">${t("progress.chart14")}</div>
      <div class="card">
        <div class="mini-chart">${chartHtml}</div>
        <div class="legend">
          <span><span class="dot" style="background:var(--green)"></span>${t("progress.legend.changed")}</span>
          <span><span class="dot" style="background:#d8cfbd"></span>${t("progress.legend.followed")}</span>
        </div>
      </div>

      <div class="section-title">${t("progress.recent")}</div>
      <div class="card">${historyHtml}</div>

      <div class="section-title">${t("progress.data")}</div>
      <div class="card stack">
        <p class="faint">${t("progress.dataHint")}</p>
        <div class="row">
          <button class="btn btn-soft btn-sm" id="btn-export">${t("progress.export")}</button>
          <button class="btn btn-ghost btn-sm" id="btn-import">${t("progress.import")}</button>
          <button class="btn btn-danger-ghost btn-sm" id="btn-clear">${t("progress.clear")}</button>
        </div>
        <input type="file" id="import-file" accept=".json,application/json" hidden>
        <div class="field" style="margin:8px 0 0">
          <label>${t("lang.label")}</label>
          ${langSwitcherHtml()}
        </div>
      </div>
    </div>`;

  bindLangSwitcher(onLangChange);

  $$("[data-rec-del]").forEach(b => b.addEventListener("click", () => {
    if (confirm(t("progress.deleteRecConfirm"))) {
      DB.records = DB.records.filter(r => r.id !== b.dataset.recDel);
      saveData();
      renderProgress();
    }
  }));

  $("#btn-export").addEventListener("click", exportData);
  $("#btn-import").addEventListener("click", () => $("#import-file").click());
  $("#import-file").addEventListener("change", importData);
  $("#btn-clear").addEventListener("click", () => {
    if (confirm(t("progress.clear1"))) {
      if (confirm(t("progress.clear2"))) {
        DB = structuredClone(DEFAULT_DATA);
        DB.onboarded = true;
        saveData();
        renderProgress();
        toast(t("progress.cleared"));
      }
    }
  });
}

/* ---------------- Import / export ---------------- */

function exportData() {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const filename = `${t("progress.exportName")}-${stamp}.json`;
  const content = JSON.stringify(DB, null, 2);
  if (Platform.exportBackup(filename, content)) {
    Platform.haptic("success");
    toast(t("progress.exported"));
    return;
  }

  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  toast(t("progress.exported"));
}

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const d = JSON.parse(reader.result);
      if (!d || !Array.isArray(d.plans) || !Array.isArray(d.records)) {
        toast(t("progress.importInvalid"));
        return;
      }
      if (!confirm(t("progress.importConfirm", {
        plans: d.plans.length,
        records: d.records.length
      }))) return;
      DB = Object.assign(structuredClone(DEFAULT_DATA), d, { onboarded: true });
      migrateData();
      saveData();
      nav("progress");
      toast(t("progress.imported"));
    } catch (err) {
      toast(t("progress.importFail"));
    }
  };
  reader.readAsText(file);
  e.target.value = "";
}

/* ---------------- Boot ---------------- */

initLang();
migrateData();
updateTabbar();
DB.onboarded ? nav("home") : renderOnboarding(0);

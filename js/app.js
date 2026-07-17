/* =====================================================
   重新选择 —— 一个帮你在冲动来临时重新获得选择的工具
   无任何外部依赖,数据全部保存在本机(localStorage)。
   ===================================================== */
"use strict";

/* ---------------- 数据层 ---------------- */

const STORE_KEY = "rechoose.data.v1";

const DEFAULT_DATA = {
  version: 1,
  onboarded: false,
  createdAt: Date.now(),
  plans: [],
  records: []
};

function loadData() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return structuredClone(DEFAULT_DATA);
    const d = JSON.parse(raw);
    if (!d || typeof d !== "object") return structuredClone(DEFAULT_DATA);
    return Object.assign(structuredClone(DEFAULT_DATA), d);
  } catch (e) {
    return structuredClone(DEFAULT_DATA);
  }
}

function saveData() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(DB));
  } catch (e) {
    toast("保存失败:存储空间可能已满");
  }
}

let DB = loadData();

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/* 通用兜底策略:没有任何计划时也能获得帮助 */
const FALLBACK_PLAN = {
  id: "__fallback__",
  emoji: "🛟",
  name: "通用方法",
  trigger: "任何时刻",
  steps: ["离开现在所在的位置", "用冷水洗把脸", "喝一杯水", "到窗边或户外,做 5 次深呼吸"]
};

/* 新建计划时可选的模板 */
const TEMPLATES = [
  {
    emoji: "🌙", name: "夜晚独处", trigger: "晚上一个人 + 拿着手机",
    steps: ["把手机放到另一个房间", "去洗澡", "直接上床睡觉"],
    desc: "最常见的高危时刻"
  },
  {
    emoji: "📱", name: "刷手机刷出冲动", trigger: "刷短视频 / 无目的浏览",
    steps: ["立刻关闭这个 App", "出门或在屋里走 5 分钟", "回来后做一件具体的小事"],
    desc: "从内容流里抽身"
  },
  {
    emoji: "😔", name: "情绪低落时", trigger: "压力大、孤独、无聊",
    steps: ["给一个朋友发条消息", "写下现在的感受(一句话就够)", "出门散步 10 分钟"],
    desc: "冲动常常只是情绪的出口"
  },
  {
    emoji: "🌅", name: "清晨醒来", trigger: "醒来后赖床 + 拿手机",
    steps: ["立刻坐起来,双脚落地", "拉开窗帘", "直接去洗漱"],
    desc: "别给冲动留出躺着的时间"
  }
];

/* ---------------- 工具函数 ---------------- */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const app = $("#app");
const tabbar = $("#tabbar");

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}

let toastTimer = null;
function toast(msg) {
  $(".toast")?.remove();
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.remove(), 2400);
}

function fmtDate(ts) {
  const d = new Date(ts);
  const now = new Date();
  const sameYear = d.getFullYear() === now.getFullYear();
  const m = d.getMonth() + 1, day = d.getDate();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${sameYear ? "" : d.getFullYear() + "年"}${m}月${day}日 ${hh}:${mm}`;
}

function fmtDelay(min) {
  if (min == null) return "";
  if (min < 1) return "不到 1 分钟";
  if (min < 60) return `${Math.round(min)} 分钟`;
  return `${Math.floor(min / 60)} 小时 ${Math.round(min % 60)} 分钟`;
}

function dayKey(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return "夜深了";
  if (h < 11) return "早上好";
  if (h < 14) return "中午好";
  if (h < 18) return "下午好";
  return "晚上好";
}

/* ---------------- 路由 ---------------- */

let currentView = "home";

function nav(view, param) {
  currentView = view;
  window.scrollTo(0, 0);
  const views = {
    home: renderHome,
    plans: renderPlans,
    planEdit: () => renderPlanEdit(param),
    progress: renderProgress
  };
  (views[view] || renderHome)();
  updateTabbar();
}

function updateTabbar() {
  tabbar.hidden = !DB.onboarded;
  $$(".tab", tabbar).forEach(t => {
    const v = t.dataset.nav;
    t.classList.toggle("active",
      v === currentView || (v === "plans" && currentView === "planEdit"));
  });
}

tabbar.addEventListener("click", e => {
  const btn = e.target.closest(".tab");
  if (btn) nav(btn.dataset.nav);
});

/* ---------------- 引导(第一次打开) ---------------- */

function renderOnboarding(step = 0) {
  tabbar.hidden = true;
  const dots = [0, 1, 2].map(i =>
    `<span class="dot2 ${i === step ? "on" : ""}"></span>`).join("");

  const pages = [
    `
    <div class="onboard-emoji">🌱</div>
    <h1>当冲动来临时,<br>帮你重新获得一次选择。</h1>
    <p>这里不计算你"坚持了多少天",<br>也不会评判你。<br>它只做一件事:在最难的那几分钟,陪你走过去。</p>
    `,
    `
    <div class="onboard-emoji">🧭</div>
    <h1>它是这样工作的</h1>
    <div class="onboard-flow">
      <div class="of-step"><span class="of-badge">1</span><span class="of-text"><b>平静时,准备好计划</b><span>写下你的触发情境,和你想做的替代行动。</span></span></div>
      <div class="of-line"></div>
      <div class="of-step"><span class="of-badge">2</span><span class="of-text"><b>冲动来时,打开它</b><span>它会带你呼吸,然后一步步执行你自己的计划。</span></span></div>
      <div class="of-line"></div>
      <div class="of-step"><span class="of-badge">3</span><span class="of-text"><b>结束后,看到变化</b><span>不管结果如何,每一次记录都让你更了解自己。</span></span></div>
    </div>
    `,
    `
    <div class="onboard-emoji">🤝</div>
    <h1>先准备一个计划吧</h1>
    <p>选一个和你最像的情境作为起点,<br>之后随时可以修改,或者添加更多。</p>
    <div class="stack" style="margin-top:24px; text-align:left;">
      ${TEMPLATES.map((t, i) => `
        <button class="tpl-card" data-tpl="${i}">
          <div class="tc-name">${t.emoji} ${esc(t.name)}</div>
          <div class="tc-desc">触发:${esc(t.trigger)}</div>
        </button>`).join("")}
    </div>
    `
  ];

  app.innerHTML = `
    <div class="screen onboard">
      ${pages[step]}
      <div class="onboard-dots">${dots}</div>
      ${step < 2
        ? `<button class="btn btn-primary btn-block" id="ob-next">继续</button>`
        : `<button class="btn btn-ghost btn-block" id="ob-skip">先跳过,直接开始</button>`}
    </div>`;

  $("#ob-next")?.addEventListener("click", () => renderOnboarding(step + 1));
  $("#ob-skip")?.addEventListener("click", finishOnboarding);
  $$("[data-tpl]").forEach(btn => btn.addEventListener("click", () => {
    const t = TEMPLATES[+btn.dataset.tpl];
    DB.plans.push({ id: uid(), emoji: t.emoji, name: t.name, trigger: t.trigger, steps: [...t.steps], createdAt: Date.now() });
    finishOnboarding();
    toast("你的第一个计划已经准备好了");
  }));

  function finishOnboarding() {
    DB.onboarded = true;
    saveData();
    nav("home");
  }
}

/* ---------------- 首页:此刻 ---------------- */

function renderHome() {
  const todayRecs = DB.records.filter(r => dayKey(r.ts) === dayKey(Date.now()));
  const todayChanged = todayRecs.filter(r => r.outcome === "changed").length;

  let todayLine = "";
  if (todayRecs.length > 0) {
    todayLine = todayChanged > 0
      ? `今天你已经做出 ${todayChanged} 次不同的选择 🌿`
      : `今天你已经练习了 ${todayRecs.length} 次,来了就是进步`;
  }

  app.innerHTML = `
    <div class="screen">
      <div class="home-hero">
        <span class="home-plant">🌱</span>
        <div class="home-greet">${greeting()}</div>
        <div class="home-question">你现在需要帮助吗?</div>
        <button class="help-btn" id="btn-help">我需要<br>帮助</button>
        ${todayLine ? `<div style="margin-top:28px"><span class="today-line">${todayLine}</span></div>` : ""}
      </div>
      <div class="home-secondary stack">
        <button class="btn btn-ghost btn-block" id="btn-retro">🕯️ 平静地补记刚才的一次经历</button>
      </div>
      <p class="home-note">你的一切记录只保存在这台设备上,<br>不会上传,没有人看得到。</p>
    </div>`;

  $("#btn-help").addEventListener("click", () => startHelp(false));
  $("#btn-retro").addEventListener("click", () => startHelp(true));
}

/* ---------------- 帮助流程 ---------------- */

const help = {
  overlay: null,
  startTs: 0,
  timerInt: null,
  plan: null,
  doneSteps: new Set(),
  retro: false
};

function startHelp(retro) {
  help.startTs = Date.now();
  help.plan = null;
  help.doneSteps = new Set();
  help.retro = retro;

  const el = document.createElement("div");
  el.className = "help-overlay";
  el.innerHTML = `<div class="help-inner">
    <div class="help-top">
      <button class="help-exit" id="help-exit">收起</button>
      <span class="help-timer" id="help-timer"></span>
    </div>
    <div class="help-body" id="help-body"></div>
  </div>`;
  document.body.appendChild(el);
  document.body.style.overflow = "hidden";
  help.overlay = el;

  $("#help-exit", el).addEventListener("click", closeHelp);

  if (!retro) {
    help.timerInt = setInterval(() => {
      const s = Math.floor((Date.now() - help.startTs) / 1000);
      const t = $("#help-timer", el);
      if (t) t.textContent = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
    }, 1000);
  }

  retro ? helpOutcome() : helpArrive();
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

/* 第一步:你来了 */
function helpArrive() {
  const body = helpBody(`
    <div class="help-title">你来了。</div>
    <div class="help-sub">打开这个页面,本身就是一次选择。<br>冲动像海浪,它会升起,也一定会退去。</div>
    <div class="spacer"></div>
    <div class="help-actions">
      <button class="btn btn-calm btn-block" id="h-breathe">先陪我呼吸一分钟</button>
      <button class="btn btn-calm-ghost btn-block" id="h-skip">直接开始行动</button>
    </div>`);
  $("#h-breathe", body).addEventListener("click", helpBreathe);
  $("#h-skip", body).addEventListener("click", helpPickPlan);
}

/* 第二步:呼吸 */
function helpBreathe() {
  const body = helpBody(`
    <div class="breath-wrap">
      <div class="breath-circle"></div>
      <div class="breath-text" id="breath-text">吸气……</div>
    </div>
    <div class="help-sub" id="breath-count">跟着圆圈的节奏,不用着急</div>
    <div class="spacer"></div>
    <div class="help-actions">
      <button class="btn btn-calm btn-block" id="h-next">我好一些了,继续</button>
    </div>`);

  /* 与 CSS 的 8 秒呼吸动画同步:前 4 秒吸气,后 4 秒呼气 */
  let phase = 0;
  const textEl = $("#breath-text", body);
  const breathInt = setInterval(() => {
    if (!document.body.contains(textEl)) { clearInterval(breathInt); return; }
    phase = (phase + 1) % 2;
    textEl.textContent = phase === 0 ? "吸气……" : "呼气……";
  }, 4000);

  let rounds = 0;
  const countEl = $("#breath-count", body);
  const roundInt = setInterval(() => {
    if (!document.body.contains(countEl)) { clearInterval(roundInt); return; }
    rounds++;
    countEl.textContent = `已经完成 ${rounds} 轮呼吸`;
  }, 8000);

  $("#h-next", body).addEventListener("click", () => {
    clearInterval(breathInt);
    clearInterval(roundInt);
    helpPickPlan();
  });
}

/* 第三步:选择计划 */
function helpPickPlan() {
  const plans = DB.plans.length ? DB.plans : [];
  const body = helpBody(`
    <div class="help-title">现在的情况,像哪一个?</div>
    <div class="help-sub">选择你为此准备的计划</div>
    <div class="spacer"></div>
    <div class="help-actions">
      ${plans.map(p => `
        <button class="plan-pick" data-plan="${p.id}">
          <div class="pp-name">${p.emoji} ${esc(p.name)}</div>
          <div class="pp-trigger">触发:${esc(p.trigger)}</div>
        </button>`).join("")}
      <button class="plan-pick" data-plan="__fallback__">
        <div class="pp-name">${FALLBACK_PLAN.emoji} 都不太像 / 我还没有计划</div>
        <div class="pp-trigger">用通用的应急方法</div>
      </button>
    </div>`);

  $$("[data-plan]", body).forEach(btn => btn.addEventListener("click", () => {
    const id = btn.dataset.plan;
    help.plan = id === "__fallback__" ? FALLBACK_PLAN : DB.plans.find(p => p.id === id);
    helpSteps();
  }));
}

/* 第四步:执行 */
function helpSteps() {
  const p = help.plan;
  const body = helpBody(`
    <div class="help-title">${p.emoji} ${esc(p.name)}</div>
    <div class="help-sub">一次只做一步。做完一步,就点亮它。</div>
    <div class="step-list">
      ${p.steps.map((s, i) => `
        <button class="step-item" data-step="${i}">
          <span class="step-check">✓</span>
          <span class="step-text">${esc(s)}</span>
        </button>`).join("")}
    </div>
    <div class="spacer"></div>
    <div class="help-actions">
      <button class="btn btn-calm btn-block" id="h-done">这一轮结束了,记录一下</button>
    </div>`);

  $$(".step-item", body).forEach(btn => btn.addEventListener("click", () => {
    const i = +btn.dataset.step;
    if (help.doneSteps.has(i)) {
      help.doneSteps.delete(i);
      btn.classList.remove("done");
    } else {
      help.doneSteps.add(i);
      btn.classList.add("done");
      if (help.doneSteps.size === p.steps.length) {
        toast("全部完成了,你做得很好");
      }
    }
  }));

  $("#h-done", body).addEventListener("click", helpOutcome);
}

/* 第五步:结果 */
function helpOutcome() {
  const body = helpBody(`
    <div class="help-title">${help.retro ? "刚才发生了什么?" : "这一次,后来怎么样?"}</div>
    <div class="help-sub">诚实地记录就好。这里没有对错,只有了解自己。</div>
    <div class="spacer"></div>
    <div class="help-actions">
      <button class="outcome-btn" data-outcome="changed">
        <div class="ob-title">🌿 我做出了不同的选择</div>
        <div class="ob-sub">冲动出现了,但这次我改变了行为</div>
      </button>
      <button class="outcome-btn" data-outcome="followed">
        <div class="ob-title">🌧️ 这次顺着冲动走了</div>
        <div class="ob-sub">没关系。愿意记录下来,已经是在练习</div>
      </button>
    </div>`);

  $$("[data-outcome]", body).forEach(btn => btn.addEventListener("click", () => {
    helpDetail(btn.dataset.outcome);
  }));
}

/* 第六步:细节(哪个行动有用 + 备注) */
function helpDetail(outcome) {
  const p = help.plan;
  const showSteps = outcome === "changed" && p && p.steps.length;

  const body = helpBody(`
    <div class="help-title">${outcome === "changed" ? "太好了。" : "谢谢你的诚实。"}</div>
    ${showSteps ? `
      <div class="help-sub" style="margin-top:20px">哪一步对你最有帮助?(可选)</div>
      <div class="row" style="justify-content:center; margin-top:12px">
        ${p.steps.map((s, i) => `<button class="chip chip-dark" data-chip="${i}">${esc(s)}</button>`).join("")}
      </div>` : ""}
    <div class="spacer"></div>
    <div class="field">
      <textarea class="input input-dark" id="h-note" rows="3"
        placeholder="想说点什么吗?比如当时的情绪、场景……(可选)"></textarea>
    </div>
    <div class="help-actions">
      <button class="btn btn-calm btn-block" id="h-save">保存这次记录</button>
    </div>`);

  let helped = null;
  $$("[data-chip]", body).forEach(chip => chip.addEventListener("click", () => {
    const i = +chip.dataset.chip;
    if (helped === i) {
      helped = null;
      chip.classList.remove("selected");
    } else {
      helped = i;
      $$("[data-chip]", body).forEach(c => c.classList.remove("selected"));
      chip.classList.add("selected");
    }
  }));

  $("#h-save", body).addEventListener("click", () => {
    const delayMin = help.retro ? null : (Date.now() - help.startTs) / 60000;
    DB.records.push({
      id: uid(),
      ts: Date.now(),
      planId: help.plan?.id ?? null,
      planName: help.plan?.name ?? null,
      outcome,
      delayMin,
      helpedStep: (helped != null && help.plan) ? help.plan.steps[helped] : null,
      note: $("#h-note", body).value.trim() || null
    });
    saveData();
    helpClose(outcome, delayMin);
  });
}

/* 第七步:结束 */
function helpClose(outcome, delayMin) {
  clearInterval(help.timerInt);
  const total = DB.records.length;
  const changed = DB.records.filter(r => r.outcome === "changed").length;

  const statHtml = (!help.retro && delayMin != null && outcome === "changed")
    ? `<div class="close-stat">
         <div class="cs-num">${fmtDelay(delayMin)}</div>
         <div class="cs-label">从冲动到选择,你为自己争取的时间</div>
       </div>`
    : "";

  const msg = outcome === "changed"
    ? "你刚刚证明了:冲动不等于必须行动。"
    : "没有失败的练习。这次的记录,会让下一次更容易。";

  helpBody(`
    <div class="close-figure">${outcome === "changed" ? "🌿" : "🕯️"}</div>
    <div class="help-title" style="margin-top:16px">${msg}</div>
    ${statHtml}
    <div class="close-stat">
      <div class="cs-num">${total} <small style="font-size:16px">次</small></div>
      <div class="cs-label">你已经练习重新选择 ${total} 次,其中 ${changed} 次改变了行为</div>
    </div>
    <div class="spacer"></div>
    <div class="help-actions">
      <button class="btn btn-calm btn-block" id="h-close">好,回到生活里去</button>
    </div>`);

  $("#h-close", help.overlay).addEventListener("click", closeHelp);
}

/* ---------------- 计划页 ---------------- */

function renderPlans() {
  const plansHtml = DB.plans.length
    ? DB.plans.map(p => `
      <div class="card plan-card">
        <div class="plan-head">
          <span class="plan-emoji">${p.emoji}</span>
          <span class="plan-name">${esc(p.name)}</span>
          <button class="plan-edit-btn" data-edit="${p.id}">编辑</button>
        </div>
        <div class="plan-section">
          <div class="ps-label">触发</div>
          <div class="plan-trigger">${esc(p.trigger)}</div>
        </div>
        <div class="plan-section">
          <div class="ps-label">行动</div>
          <ol class="plan-steps">${p.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
        </div>
      </div>`).join("")
    : `<div class="card center" style="padding:32px 20px">
        <div style="font-size:40px">🧭</div>
        <p class="muted" style="margin-top:10px">还没有计划。<br>平静的现在,正是为困难时刻做准备的最好时机。</p>
      </div>`;

  const usedNames = new Set(DB.plans.map(p => p.name));
  const remainingTpls = TEMPLATES.filter(t => !usedNames.has(t.name));

  app.innerHTML = `
    <div class="screen">
      <div class="page-title">我的计划</div>
      <div class="page-sub">在平静时准备,在困难时使用</div>
      <div class="spacer"></div>
      <div class="stack">${plansHtml}</div>
      <div class="spacer"></div>
      <button class="btn btn-primary btn-block" id="btn-new-plan">＋ 新建一个计划</button>
      ${remainingTpls.length ? `
        <div class="section-title">从模板开始</div>
        <div class="stack">
          ${remainingTpls.map((t, i) => `
            <button class="tpl-card" data-tpl-name="${esc(t.name)}">
              <div class="tc-name">${t.emoji} ${esc(t.name)}</div>
              <div class="tc-desc">${esc(t.desc)} · 触发:${esc(t.trigger)}</div>
            </button>`).join("")}
        </div>` : ""}
    </div>`;

  $("#btn-new-plan").addEventListener("click", () => nav("planEdit", null));
  $$("[data-edit]").forEach(b => b.addEventListener("click", () => nav("planEdit", b.dataset.edit)));
  $$("[data-tpl-name]").forEach(b => b.addEventListener("click", () => {
    const t = TEMPLATES.find(t => t.name === b.dataset.tplName);
    DB.plans.push({ id: uid(), emoji: t.emoji, name: t.name, trigger: t.trigger, steps: [...t.steps], createdAt: Date.now() });
    saveData();
    renderPlans();
    toast("已添加,你可以随时编辑它");
  }));
}

/* ---------------- 计划编辑 ---------------- */

const EMOJIS = ["🌙", "📱", "😔", "🌅", "🏠", "💻", "🛏️", "🚿", "🧠", "⚡"];

function renderPlanEdit(planId) {
  const plan = planId ? DB.plans.find(p => p.id === planId) : null;
  const draft = plan
    ? { emoji: plan.emoji, name: plan.name, trigger: plan.trigger, steps: [...plan.steps] }
    : { emoji: "🌙", name: "", trigger: "", steps: ["", ""] };

  function render() {
    app.innerHTML = `
      <div class="screen">
        <div class="page-title">${plan ? "编辑计划" : "新建计划"}</div>
        <div class="page-sub">当"触发"出现时,你打算用哪些"行动"来代替?</div>
        <div class="spacer"></div>

        <div class="field">
          <label>图标</label>
          <div class="row">
            ${EMOJIS.map(e => `<button class="chip ${draft.emoji === e ? "selected" : ""}" data-emoji="${e}" style="font-size:18px">${e}</button>`).join("")}
          </div>
        </div>

        <div class="field">
          <label>名字</label>
          <input class="input" id="pe-name" placeholder="例如:夜晚独处" value="${esc(draft.name)}" maxlength="20">
        </div>

        <div class="field">
          <label>触发情境</label>
          <input class="input" id="pe-trigger" placeholder="例如:独处 + 手机" value="${esc(draft.trigger)}" maxlength="40">
          <div class="hint">什么情况下,冲动最容易出现?</div>
        </div>

        <div class="field">
          <label>替代行动(按顺序执行)</label>
          <div id="pe-steps">
            ${draft.steps.map((s, i) => `
              <div class="step-edit-row">
                <input class="input" data-step-input="${i}" placeholder="第 ${i + 1} 步,例如:离开房间" value="${esc(s)}" maxlength="30">
                ${draft.steps.length > 1 ? `<button class="step-remove" data-step-del="${i}" aria-label="删除这一步">✕</button>` : ""}
              </div>`).join("")}
          </div>
          <button class="btn btn-soft btn-sm" id="pe-add-step">＋ 加一步</button>
          <div class="hint">行动越具体、越容易开始越好。"洗澡"比"转移注意力"有用得多。</div>
        </div>

        <div class="spacer"></div>
        <div class="stack">
          <button class="btn btn-primary btn-block" id="pe-save">保存计划</button>
          <button class="btn btn-ghost btn-block" id="pe-cancel">取消</button>
          ${plan ? `<button class="btn btn-danger-ghost btn-block" id="pe-del">删除这个计划</button>` : ""}
        </div>
      </div>`;

    bindDraftInputs();

    $$("[data-emoji]").forEach(b => b.addEventListener("click", () => {
      syncDraft();
      draft.emoji = b.dataset.emoji;
      render();
    }));

    $("#pe-add-step").addEventListener("click", () => {
      syncDraft();
      draft.steps.push("");
      render();
      $$("[data-step-input]").at(-1)?.focus();
    });

    $$("[data-step-del]").forEach(b => b.addEventListener("click", () => {
      syncDraft();
      draft.steps.splice(+b.dataset.stepDel, 1);
      render();
    }));

    $("#pe-save").addEventListener("click", () => {
      syncDraft();
      const name = draft.name.trim();
      const trigger = draft.trigger.trim();
      const steps = draft.steps.map(s => s.trim()).filter(Boolean);
      if (!name) { toast("给计划起个名字吧"); return; }
      if (!steps.length) { toast("至少写一个替代行动"); return; }
      if (plan) {
        Object.assign(plan, { emoji: draft.emoji, name, trigger: trigger || "未填写", steps });
      } else {
        DB.plans.push({ id: uid(), emoji: draft.emoji, name, trigger: trigger || "未填写", steps, createdAt: Date.now() });
      }
      saveData();
      nav("plans");
      toast("计划已保存");
    });

    $("#pe-cancel").addEventListener("click", () => nav("plans"));

    $("#pe-del")?.addEventListener("click", () => {
      if (confirm("确定删除这个计划吗?已有的记录不会丢失。")) {
        DB.plans = DB.plans.filter(p => p.id !== plan.id);
        saveData();
        nav("plans");
        toast("已删除");
      }
    });
  }

  function syncDraft() {
    draft.name = $("#pe-name")?.value ?? draft.name;
    draft.trigger = $("#pe-trigger")?.value ?? draft.trigger;
    $$("[data-step-input]").forEach(inp => { draft.steps[+inp.dataset.stepInput] = inp.value; });
  }

  function bindDraftInputs() {
    ["pe-name", "pe-trigger"].forEach(id => $("#" + id)?.addEventListener("input", syncDraft));
    $$("[data-step-input]").forEach(inp => inp.addEventListener("input", syncDraft));
  }

  render();
}

/* ---------------- 成长页 ---------------- */

function renderProgress() {
  const now = Date.now();
  const days30 = now - 30 * 86400000;
  const recent = DB.records.filter(r => r.ts >= days30);
  const urges = recent.length;
  const changed = recent.filter(r => r.outcome === "changed");

  /* 平均反应距离(仅统计实时求助且改变了行为的记录) */
  const delays = changed.filter(r => r.delayMin != null).map(r => r.delayMin);
  const avgDelay = delays.length ? delays.reduce((a, b) => a + b, 0) / delays.length : null;

  /* 最有效行动 */
  const stepCount = {};
  changed.forEach(r => { if (r.helpedStep) stepCount[r.helpedStep] = (stepCount[r.helpedStep] || 0) + 1; });
  const bestStep = Object.entries(stepCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  /* 最近14天柱状图 */
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

  /* 历史列表(最近20条) */
  const history = [...DB.records].sort((a, b) => b.ts - a.ts).slice(0, 20);
  const historyHtml = history.length
    ? history.map(r => `
      <div class="rec-item">
        <span class="rec-mark">${r.outcome === "changed" ? "🌿" : "🌧️"}</span>
        <div class="rec-main">
          <div class="rec-title">
            <span class="tag ${r.outcome === "changed" ? "tag-changed" : "tag-followed"}">${r.outcome === "changed" ? "改变了行为" : "顺着冲动走了"}</span>
          </div>
          <div class="rec-meta">
            ${fmtDate(r.ts)}${r.planName ? " · " + esc(r.planName) : ""}${r.delayMin != null && r.outcome === "changed" ? " · 延迟 " + fmtDelay(r.delayMin) : ""}
          </div>
          ${r.helpedStep ? `<div class="rec-note">有效行动:${esc(r.helpedStep)}</div>` : ""}
          ${r.note ? `<div class="rec-note">"${esc(r.note)}"</div>` : ""}
        </div>
        <button class="rec-del" data-rec-del="${r.id}" aria-label="删除记录">✕</button>
      </div>`).join("")
    : `<p class="muted center" style="padding:16px 0">还没有记录。<br>下次冲动出现时,记得回来。</p>`;

  const insightHtml = [];
  if (bestStep) insightHtml.push(`对你最有效的行动是 <b>${esc(bestStep)}</b>。下次可以直接从它开始。`);
  if (avgDelay != null) insightHtml.push(`从打开帮助到做出选择,你平均为自己争取了 <b>${fmtDelay(avgDelay)}</b>。这段距离,就是你和冲动之间的自由。`);
  if (!insightHtml.length && urges > 0) insightHtml.push(`你已经开始记录了。数据积累一段时间后,这里会告诉你哪些方法对你最有效。`);

  app.innerHTML = `
    <div class="screen">
      <div class="page-title">你的成长</div>
      <div class="page-sub">不看"坚持了多少天",只看你有没有越来越强</div>
      <div class="spacer"></div>

      <div class="stat-grid">
        <div class="stat-card">
          <div class="st-num">${urges}</div>
          <div class="st-label">过去 30 天,冲动出现</div>
        </div>
        <div class="stat-card">
          <div class="st-num">${changed.length}</div>
          <div class="st-label">其中,你改变了行为</div>
        </div>
        <div class="stat-card">
          <div class="st-num">${urges ? Math.round(changed.length / urges * 100) + "<small>%</small>" : "—"}</div>
          <div class="st-label">重新选择的比例</div>
        </div>
        <div class="stat-card">
          <div class="st-num" style="font-size:${avgDelay != null ? 20 : 30}px; padding-top:${avgDelay != null ? 6 : 0}px">${avgDelay != null ? fmtDelay(avgDelay) : "—"}</div>
          <div class="st-label">平均反应距离</div>
        </div>
      </div>

      ${insightHtml.length ? `<div class="spacer"></div><div class="insight">💡 ${insightHtml.join("<br><br>")}</div>` : ""}

      <div class="section-title">最近 14 天</div>
      <div class="card">
        <div class="mini-chart">${chartHtml}</div>
        <div class="legend">
          <span><span class="dot" style="background:var(--green)"></span>改变了行为</span>
          <span><span class="dot" style="background:#d8cfbd"></span>顺着冲动走了</span>
        </div>
      </div>

      <div class="section-title">最近的记录</div>
      <div class="card">${historyHtml}</div>

      <div class="section-title">你的数据</div>
      <div class="card stack">
        <p class="faint">所有数据只存在这台设备的浏览器里。建议偶尔导出备份,换设备时可以导入恢复。</p>
        <div class="row">
          <button class="btn btn-soft btn-sm" id="btn-export">导出备份</button>
          <button class="btn btn-ghost btn-sm" id="btn-import">导入备份</button>
          <button class="btn btn-danger-ghost btn-sm" id="btn-clear">清空全部数据</button>
        </div>
        <input type="file" id="import-file" accept=".json,application/json" hidden>
      </div>
    </div>`;

  $$("[data-rec-del]").forEach(b => b.addEventListener("click", () => {
    if (confirm("删除这条记录?")) {
      DB.records = DB.records.filter(r => r.id !== b.dataset.recDel);
      saveData();
      renderProgress();
    }
  }));

  $("#btn-export").addEventListener("click", exportData);
  $("#btn-import").addEventListener("click", () => $("#import-file").click());
  $("#import-file").addEventListener("change", importData);
  $("#btn-clear").addEventListener("click", () => {
    if (confirm("确定清空全部计划和记录吗?此操作无法撤销。")) {
      if (confirm("再确认一次:真的要清空吗?")) {
        DB = structuredClone(DEFAULT_DATA);
        DB.onboarded = true;
        saveData();
        renderProgress();
        toast("已清空");
      }
    }
  });
}

/* ---------------- 数据导入导出 ---------------- */

function exportData() {
  const blob = new Blob([JSON.stringify(DB, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const d = new Date();
  a.href = url;
  a.download = `重新选择-备份-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast("备份已导出,请妥善保存");
}

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const d = JSON.parse(reader.result);
      if (!d || !Array.isArray(d.plans) || !Array.isArray(d.records)) {
        toast("这个文件不是有效的备份");
        return;
      }
      if (!confirm(`备份包含 ${d.plans.length} 个计划、${d.records.length} 条记录。导入会覆盖当前数据,继续吗?`)) return;
      DB = Object.assign(structuredClone(DEFAULT_DATA), d, { onboarded: true });
      saveData();
      nav("progress");
      toast("导入成功");
    } catch (err) {
      toast("文件解析失败");
    }
  };
  reader.readAsText(file);
  e.target.value = "";
}

/* ---------------- 启动 ---------------- */

DB.onboarded ? nav("home") : renderOnboarding(0);

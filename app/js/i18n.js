/* =====================================================
   Flat locale dictionaries + t()
   zh / en only. Unsupported locales fall back to en.
   ===================================================== */
"use strict";

const LANG_KEY = "rechoose.locale";

const zh = {
  "app.name": "重新选择",
  "app.desc": "提前准备不同的行动,在旧模式拉回你的时刻付诸执行。",

  "tab.home": "此刻",
  "tab.plans": "计划",
  "tab.progress": "成长",

  "lang.label": "语言",
  "lang.zh": "中文",
  "lang.en": "English",

  "common.continue": "继续",
  "common.cancel": "取消",
  "common.saveFailed": "保存失败:存储空间可能已满",
  "common.triggerPrefix": "触发:",
  "common.times": "次",

  "greet.lateNight": "夜深了",
  "greet.morning": "早上好",
  "greet.noon": "中午好",
  "greet.afternoon": "下午好",
  "greet.evening": "晚上好",

  "delay.underOne": "不到 1 分钟",
  "delay.minutes": "{n} 分钟",
  "delay.hoursMinutes": "{h} 小时 {m} 分钟",

  "onboard.1.title": "当旧模式把你拉回去时,<br>执行提前准备好的下一步。",
  "onboard.1.body": "这里不计算你\"坚持了多少天\",<br>也不会评判你。<br>它只做一件事:帮助你在最难的时刻,执行清醒时做好的选择。",
  "onboard.2.title": "清醒时选择,关键时刻行动",
  "onboard.2.s1.title": "平静时,准备具体行动",
  "onboard.2.s1.body": "写下你的触发情境,和你想做的替代行动。",
  "onboard.2.s2.title": "旧模式开始拉你时,打开这里",
  "onboard.2.s2.body": "先停一下,然后一步步执行你已经准备好的方案。",
  "onboard.2.s3.title": "每次行动,都在改变模式",
  "onboard.2.s3.body": "不管结果如何,每次记录都在帮助你准备下一次行动。",
  "onboard.3.title": "先准备一个计划吧",
  "onboard.3.body": "选一个和你最像的情境作为起点,<br>之后随时可以修改,或者添加更多。",
  "onboard.skip": "先跳过,直接开始",
  "onboard.firstPlanReady": "你的第一个计划已经准备好了",

  "tpl.night.name": "夜晚独处",
  "tpl.night.trigger": "晚上一个人 + 拿着手机",
  "tpl.night.desc": "最常见的高危时刻",
  "tpl.night.step1": "把手机放到另一个房间",
  "tpl.night.step2": "去洗澡",
  "tpl.night.step3": "直接上床睡觉",

  "tpl.phone.name": "刷手机刷出冲动",
  "tpl.phone.trigger": "刷短视频 / 无目的浏览",
  "tpl.phone.desc": "从内容流里抽身",
  "tpl.phone.step1": "立刻关闭这个 App",
  "tpl.phone.step2": "出门或在屋里走 5 分钟",
  "tpl.phone.step3": "回来后做一件具体的小事",

  "tpl.mood.name": "情绪低落时",
  "tpl.mood.trigger": "压力大、孤独、无聊",
  "tpl.mood.desc": "冲动常常只是情绪的出口",
  "tpl.mood.step1": "给一个朋友发条消息",
  "tpl.mood.step2": "写下现在的感受(一句话就够)",
  "tpl.mood.step3": "出门散步 10 分钟",

  "tpl.morning.name": "清晨醒来",
  "tpl.morning.trigger": "醒来后赖床 + 拿手机",
  "tpl.morning.desc": "别给冲动留出躺着的时间",
  "tpl.morning.step1": "立刻坐起来,双脚落地",
  "tpl.morning.step2": "拉开窗帘",
  "tpl.morning.step3": "直接去洗漱",

  "fallback.name": "通用方法",
  "fallback.trigger": "任何时刻",
  "fallback.option": "都不太像 / 我还没有计划",
  "fallback.optionSub": "用通用的应急方法",
  "fallback.step1": "离开现在所在的位置",
  "fallback.step2": "用冷水洗把脸",
  "fallback.step3": "喝一杯水",
  "fallback.step4": "到窗边或户外,做 5 次深呼吸",

  "home.question": "你现在需要帮助吗?",
  "home.helpBtn": "我需要<br>帮助",
  "home.todayChanged": "今天你已经做出 {n} 次不同的选择 🌿",
  "home.todayPracticed": "今天你已经练习了 {n} 次,来了就是进步",
  "home.retro": "🕯️ 平静地补记刚才的一次经历",
  "home.privacy": "你的一切记录只保存在这台设备上,<br>不会上传,没有人看得到。",

  "help.exit": "收起",
  "help.arrive.title": "你来了。",
  "help.arrive.sub": "旧模式拉你时,你打开了这里。<br>现在不用解决一切,只执行提前准备好的下一步。",
  "help.arrive.breathe": "先陪我呼吸一分钟",
  "help.arrive.skip": "直接开始行动",
  "help.breath.inhale": "吸气……",
  "help.breath.exhale": "呼气……",
  "help.breath.hint": "跟着圆圈的节奏,不用着急",
  "help.breath.rounds": "已经完成 {n} 轮呼吸",
  "help.breath.next": "我好一些了,继续",
  "help.pick.title": "现在的情况,像哪一个?",
  "help.pick.sub": "选择你为此准备的计划",
  "help.steps.sub": "一次只做一步。做完一步,就点亮它。",
  "help.steps.done": "这一轮结束了,记录一下",
  "help.steps.allDone": "全部完成了,你做得很好",
  "help.outcome.title": "这一次,后来怎么样?",
  "help.outcome.titleRetro": "刚才发生了什么?",
  "help.outcome.sub": "诚实地记录就好。这里没有对错,只有了解自己。",
  "help.outcome.changed": "🌿 我执行了不同的行动",
  "help.outcome.changedSub": "旧模式出现了,但我采取了准备好的下一步",
  "help.outcome.followed": "🌧️ 这次回到了旧的反应",
  "help.outcome.followedSub": "没关系。愿意记录下来,已经是在练习",
  "help.detail.good": "太好了。",
  "help.detail.thanks": "谢谢你的诚实。",
  "help.detail.whichStep": "哪一步对你最有帮助?(可选)",
  "help.detail.notePh": "想说点什么吗?比如当时的情绪、场景……(可选)",
  "help.detail.save": "保存这次记录",
  "help.close.changed": "你刚刚用一个具体行动打断了旧模式。",
  "help.close.followed": "没有失败的练习。这次的记录,会让下一次更容易。",
  "help.close.delayLabel": "从冲动到选择,你为自己争取的时间",
  "help.close.practice": "你已经练习重新选择 {total} 次,其中 {changed} 次改变了行为",
  "help.close.back": "好,回到生活里去",

  "plans.title": "我的计划",
  "plans.sub": "在平静时准备,在困难时使用",
  "plans.edit": "编辑",
  "plans.trigger": "触发",
  "plans.actions": "行动",
  "plans.empty": "还没有计划。<br>平静的现在,正是为困难时刻做准备的最好时机。",
  "plans.new": "＋ 新建一个计划",
  "plans.fromTemplate": "从模板开始",
  "plans.added": "已添加,你可以随时编辑它",

  "planEdit.new": "新建计划",
  "planEdit.edit": "编辑计划",
  "planEdit.sub": "旧模式开始时,你打算执行哪些不同的行动?",
  "planEdit.icon": "图标",
  "planEdit.name": "名字",
  "planEdit.namePh": "例如:夜晚独处",
  "planEdit.trigger": "触发情境",
  "planEdit.triggerPh": "例如:独处 + 手机",
  "planEdit.triggerHint": "旧模式通常在什么时刻拉力最强?",
  "planEdit.steps": "替代行动(按顺序执行)",
  "planEdit.stepPh": "第 {n} 步,例如:离开房间",
  "planEdit.removeStep": "删除这一步",
  "planEdit.addStep": "＋ 加一步",
  "planEdit.stepsHint": "行动越具体、越容易开始越好。\"洗澡\"比\"转移注意力\"有用得多。",
  "planEdit.save": "保存计划",
  "planEdit.delete": "删除这个计划",
  "planEdit.needName": "给计划起个名字吧",
  "planEdit.needStep": "至少写一个替代行动",
  "planEdit.unnamedTrigger": "未填写",
  "planEdit.saved": "计划已保存",
  "planEdit.deleteConfirm": "确定删除这个计划吗?已有的记录不会丢失。",
  "planEdit.deleted": "已删除",

  "progress.title": "你的成长",
  "progress.sub": "不看\"坚持了多少天\",只看你有没有越来越强",
  "progress.urges": "过去 30 天,记录关键时刻",
  "progress.changed": "其中,你采取了不同的行动",
  "progress.rate": "重新选择的比例",
  "progress.avgDelay": "平均反应距离",
  "progress.insight.best": "对你最有效的行动是 <b>{step}</b>。下次可以直接从它开始。",
  "progress.insight.delay": "从打开帮助到做出选择,你平均为自己争取了 <b>{delay}</b>。这段距离,就是你和冲动之间的自由。",
  "progress.insight.start": "你已经开始记录了。数据积累一段时间后,这里会告诉你哪些方法对你最有效。",
  "progress.chart14": "最近 14 天",
  "progress.legend.changed": "改变了行为",
  "progress.legend.followed": "回到了旧的反应",
  "progress.recent": "最近的记录",
  "progress.empty": "还没有记录。<br>下次冲动出现时,记得回来。",
  "progress.tag.changed": "改变了行为",
  "progress.tag.followed": "回到了旧的反应",
  "progress.delayPrefix": " · 延迟 ",
  "progress.helped": "有效行动:",
  "progress.deleteRec": "删除记录",
  "progress.deleteRecConfirm": "删除这条记录?",
  "progress.data": "你的数据",
  "progress.dataHint": "所有数据只存在这台设备的浏览器里。建议偶尔导出备份,换设备时可以导入恢复。",
  "progress.export": "导出备份",
  "progress.import": "导入备份",
  "progress.clear": "清空全部数据",
  "progress.clear1": "确定清空全部计划和记录吗?此操作无法撤销。",
  "progress.clear2": "再确认一次:真的要清空吗?",
  "progress.cleared": "已清空",
  "progress.exportName": "rechoose-backup",
  "progress.exported": "备份已导出,请妥善保存",
  "progress.importInvalid": "这个文件不是有效的备份",
  "progress.importConfirm": "备份包含 {plans} 个计划、{records} 条记录。导入会覆盖当前数据,继续吗?",
  "progress.imported": "导入成功",
  "progress.importFail": "文件解析失败"
};

const en = {
  "app.name": "Rechoose",
  "app.desc": "Prepare a different response, then act when an old pattern pulls you back.",

  "tab.home": "Now",
  "tab.plans": "Plans",
  "tab.progress": "Growth",

  "lang.label": "Language",
  "lang.zh": "中文",
  "lang.en": "English",

  "common.continue": "Continue",
  "common.cancel": "Cancel",
  "common.saveFailed": "Couldn't save — storage may be full",
  "common.triggerPrefix": "Trigger: ",
  "common.times": "times",

  "greet.lateNight": "Late night",
  "greet.morning": "Good morning",
  "greet.noon": "Good afternoon",
  "greet.afternoon": "Good afternoon",
  "greet.evening": "Good evening",

  "delay.underOne": "under 1 minute",
  "delay.minutes": "{n} min",
  "delay.hoursMinutes": "{h}h {m}m",

  "onboard.1.title": "When an old pattern pulls you back,<br>take the step you prepared.",
  "onboard.1.body": "This isn't about streak days,<br>and it won't judge you.<br>It does one thing: help you act on a clear-headed choice when the moment gets hard.",
  "onboard.2.title": "Choose when clear. Act when it counts.",
  "onboard.2.s1.title": "When calm, prepare concrete actions",
  "onboard.2.s1.body": "Write your triggers and the actions you'll take instead.",
  "onboard.2.s2.title": "When the old pattern pulls, open this",
  "onboard.2.s2.body": "Pause first, then follow the response you prepared step by step.",
  "onboard.2.s3.title": "Each action changes the pattern",
  "onboard.2.s3.body": "Whatever the outcome, each record helps you act differently next time.",
  "onboard.3.title": "Start with one plan",
  "onboard.3.body": "Pick the situation that feels most familiar.<br>You can edit it anytime, or add more later.",
  "onboard.skip": "Skip for now",
  "onboard.firstPlanReady": "Your first plan is ready",

  "tpl.night.name": "Night alone",
  "tpl.night.trigger": "Alone at night + phone in hand",
  "tpl.night.desc": "The most common high-risk moment",
  "tpl.night.step1": "Put the phone in another room",
  "tpl.night.step2": "Take a shower",
  "tpl.night.step3": "Go straight to bed",

  "tpl.phone.name": "Urge from scrolling",
  "tpl.phone.trigger": "Short videos / mindless browsing",
  "tpl.phone.desc": "Step out of the feed",
  "tpl.phone.step1": "Close the app immediately",
  "tpl.phone.step2": "Walk for 5 minutes",
  "tpl.phone.step3": "Do one small concrete task when you return",

  "tpl.mood.name": "When mood dips",
  "tpl.mood.trigger": "Stress, loneliness, or boredom",
  "tpl.mood.desc": "Urges are often an emotional exit",
  "tpl.mood.step1": "Text a friend",
  "tpl.mood.step2": "Write one sentence about how you feel",
  "tpl.mood.step3": "Take a 10-minute walk",

  "tpl.morning.name": "Waking up",
  "tpl.morning.trigger": "Lying in bed + reaching for the phone",
  "tpl.morning.desc": "Don't leave room for the urge to settle in",
  "tpl.morning.step1": "Sit up — feet on the floor",
  "tpl.morning.step2": "Open the curtains",
  "tpl.morning.step3": "Go wash up right away",

  "fallback.name": "General method",
  "fallback.trigger": "Any moment",
  "fallback.option": "None of these / I don't have a plan yet",
  "fallback.optionSub": "Use the general emergency steps",
  "fallback.step1": "Leave where you are right now",
  "fallback.step2": "Splash cold water on your face",
  "fallback.step3": "Drink a glass of water",
  "fallback.step4": "Go to a window or outside — take 5 deep breaths",

  "home.question": "Do you need help right now?",
  "home.helpBtn": "I need<br>help",
  "home.todayChanged": "You've already made {n} different choice(s) today 🌿",
  "home.todayPracticed": "You've practiced {n} time(s) today — showing up counts",
  "home.retro": "🕯️ Calmly log a recent moment",
  "home.privacy": "Everything stays on this device.<br>Nothing is uploaded. No one else can see it.",

  "help.exit": "Close",
  "help.arrive.title": "You're here.",
  "help.arrive.sub": "You opened this while the old pattern was pulling.<br>Don't solve everything now — just take the next step you prepared.",
  "help.arrive.breathe": "Breathe with me for a minute",
  "help.arrive.skip": "Skip to action",
  "help.breath.inhale": "Breathe in…",
  "help.breath.exhale": "Breathe out…",
  "help.breath.hint": "Follow the circle. No rush.",
  "help.breath.rounds": "{n} breath cycle(s) done",
  "help.breath.next": "I feel a bit better — continue",
  "help.pick.title": "Which situation is this?",
  "help.pick.sub": "Choose the plan you prepared",
  "help.steps.sub": "One step at a time. Tap when you've done it.",
  "help.steps.done": "This round is over — log it",
  "help.steps.allDone": "All done. You did well.",
  "help.outcome.title": "How did this round go?",
  "help.outcome.titleRetro": "What happened just now?",
  "help.outcome.sub": "Be honest. There's no right or wrong here — only knowing yourself.",
  "help.outcome.changed": "🌿 I took a different action",
  "help.outcome.changedSub": "The old pattern showed up, but I took the step I prepared",
  "help.outcome.followed": "🌧️ I went with the old response this time",
  "help.outcome.followedSub": "That's okay. Logging it is already practice",
  "help.detail.good": "Well done.",
  "help.detail.thanks": "Thank you for being honest.",
  "help.detail.whichStep": "Which step helped most? (optional)",
  "help.detail.notePh": "Anything to note? Mood, setting… (optional)",
  "help.detail.save": "Save this record",
  "help.close.changed": "You just interrupted the old pattern with a concrete action.",
  "help.close.followed": "There's no failed practice. This record makes the next time easier.",
  "help.close.delayLabel": "Time you won for yourself — from urge to choice",
  "help.close.practice": "You've practiced rechoosing {total} time(s); {changed} changed the behavior",
  "help.close.back": "Okay — back to life",

  "plans.title": "My plans",
  "plans.sub": "Prepare when calm. Use when it's hard.",
  "plans.edit": "Edit",
  "plans.trigger": "Trigger",
  "plans.actions": "Actions",
  "plans.empty": "No plans yet.<br>Calm moments are the best time to prepare for hard ones.",
  "plans.new": "+ New plan",
  "plans.fromTemplate": "Start from a template",
  "plans.added": "Added — you can edit it anytime",

  "planEdit.new": "New plan",
  "planEdit.edit": "Edit plan",
  "planEdit.sub": "When the old pattern begins, which different actions will you take?",
  "planEdit.icon": "Icon",
  "planEdit.name": "Name",
  "planEdit.namePh": "e.g. Night alone",
  "planEdit.trigger": "Trigger situation",
  "planEdit.triggerPh": "e.g. Alone + phone",
  "planEdit.triggerHint": "When does the old pattern pull hardest?",
  "planEdit.steps": "Replacement actions (in order)",
  "planEdit.stepPh": "Step {n}, e.g. Leave the room",
  "planEdit.removeStep": "Remove this step",
  "planEdit.addStep": "+ Add a step",
  "planEdit.stepsHint": "The more concrete and easy to start, the better. \"Shower\" beats \"distract yourself\".",
  "planEdit.save": "Save plan",
  "planEdit.delete": "Delete this plan",
  "planEdit.needName": "Give the plan a name",
  "planEdit.needStep": "Add at least one action",
  "planEdit.unnamedTrigger": "Not set",
  "planEdit.saved": "Plan saved",
  "planEdit.deleteConfirm": "Delete this plan? Existing records will stay.",
  "planEdit.deleted": "Deleted",

  "progress.title": "Your growth",
  "progress.sub": "Not streak days — whether you're getting stronger",
  "progress.urges": "Hard moments logged in the last 30 days",
  "progress.changed": "Times you took a different action",
  "progress.rate": "Rechoose rate",
  "progress.avgDelay": "Average response distance",
  "progress.insight.best": "Your most effective action is <b>{step}</b>. Start there next time.",
  "progress.insight.delay": "From opening help to choosing, you averaged <b>{delay}</b>. That gap is freedom between you and the urge.",
  "progress.insight.start": "You've started logging. After more data, this space will show what works best for you.",
  "progress.chart14": "Last 14 days",
  "progress.legend.changed": "Changed behavior",
  "progress.legend.followed": "Went with the old response",
  "progress.recent": "Recent records",
  "progress.empty": "No records yet.<br>Come back the next time an urge appears.",
  "progress.tag.changed": "Changed behavior",
  "progress.tag.followed": "Went with the old response",
  "progress.delayPrefix": " · delayed ",
  "progress.helped": "Helpful action: ",
  "progress.deleteRec": "Delete record",
  "progress.deleteRecConfirm": "Delete this record?",
  "progress.data": "Your data",
  "progress.dataHint": "All data stays in this browser. Export a backup now and then so you can restore on another device.",
  "progress.export": "Export backup",
  "progress.import": "Import backup",
  "progress.clear": "Clear all data",
  "progress.clear1": "Clear all plans and records? This cannot be undone.",
  "progress.clear2": "One more time: really clear everything?",
  "progress.cleared": "Cleared",
  "progress.exportName": "rechoose-backup",
  "progress.exported": "Backup exported — keep it safe",
  "progress.importInvalid": "This file isn't a valid backup",
  "progress.importConfirm": "Backup has {plans} plan(s) and {records} record(s). Import will replace current data. Continue?",
  "progress.imported": "Import complete",
  "progress.importFail": "Couldn't parse the file"
};

const LOCALES = { zh, en };

let currentLang = "en";

function detectLang() {
  /*
   * English-first detection (avoid accidental Chinese).
   *
   * Priority when no saved preference:
   * 1. Default is always en
   * 2. iOS → en (App Store target)
   * 3. Only the PRIMARY preferred language counts
   *    (navigator.language / languages[0])
   * 4. zh only if that primary tag starts with "zh"
   * 5. Anything else / missing / unknown → en
   *
   * Do NOT scan the full languages list — a secondary zh
   * (e.g. en-US, zh-CN) must not flip the UI to Chinese.
   */
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) return "en";

  const primary = String(
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    ""
  ).toLowerCase().trim();

  if (primary.startsWith("zh")) return "zh";
  return "en";
}

function loadSavedLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "zh" || saved === "en") return saved;
  } catch (_) { /* ignore */ }
  return null;
}

function getLang() {
  return currentLang;
}

function t(key, vars) {
  const dict = LOCALES[currentLang] || en;
  let s = dict[key] ?? en[key] ?? key;
  if (vars) {
    s = s.replace(/\{(\w+)\}/g, (_, k) =>
      vars[k] != null ? String(vars[k]) : "");
  }
  return s;
}

function applyDocumentLang() {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  document.title = t("app.name");
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = t("app.desc");
}

function setLang(lang, { persist = true } = {}) {
  /* Any non-zh value collapses to en — never leave currentLang unset */
  currentLang = lang === "zh" ? "zh" : "en";
  if (persist) {
    try { localStorage.setItem(LANG_KEY, currentLang); } catch (_) { /* ignore */ }
  }
  applyDocumentLang();
}

function initLang() {
  const saved = loadSavedLang();
  /* saved preference wins; otherwise detect (defaults to en) */
  setLang(saved || detectLang() || "en", { persist: false });
}

function langSwitcherHtml(extraClass = "") {
  return `
    <div class="lang-switch ${extraClass}" role="group" aria-label="${escAttr(t("lang.label"))}">
      <button type="button" class="lang-btn ${currentLang === "en" ? "active" : ""}" data-set-lang="en">${escAttr(t("lang.en"))}</button>
      <button type="button" class="lang-btn ${currentLang === "zh" ? "active" : ""}" data-set-lang="zh">${escAttr(t("lang.zh"))}</button>
    </div>`;
}

function escAttr(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}

function bindLangSwitcher(onChange) {
  document.querySelectorAll("[data-set-lang]").forEach(btn => {
    btn.addEventListener("click", () => {
      const next = btn.dataset.setLang;
      if (next === currentLang) return;
      setLang(next, { persist: true });
      onChange?.(next);
    });
  });
}

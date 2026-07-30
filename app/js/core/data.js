/* Shared data model, storage, and plan templates. */
"use strict";

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
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return structuredClone(DEFAULT_DATA);
    return Object.assign(structuredClone(DEFAULT_DATA), data);
  } catch (_) {
    return structuredClone(DEFAULT_DATA);
  }
}

function saveData() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(DB));
  } catch (_) {
    toast(t("common.saveFailed"));
  }
}

let DB = loadData();

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const TEMPLATE_IDS = ["night", "phone", "mood", "morning"];

function getTemplates() {
  return TEMPLATE_IDS.map(id => ({
    id,
    emoji: ({ night: "🌙", phone: "📱", mood: "😔", morning: "🌅" })[id],
    name: t(`tpl.${id}.name`),
    trigger: t(`tpl.${id}.trigger`),
    desc: t(`tpl.${id}.desc`),
    steps: [1, 2, 3].map(n => t(`tpl.${id}.step${n}`))
  }));
}

function planFromTemplate(template) {
  return {
    id: uid(),
    templateId: template.id,
    emoji: template.emoji,
    name: template.name,
    trigger: template.trigger,
    steps: [...template.steps],
    createdAt: Date.now()
  };
}

/* Template plans re-resolve copy so language switches stay in sync. */
function localizePlan(plan) {
  if (!plan || !plan.templateId) return plan;
  const template = getTemplates().find(item => item.id === plan.templateId);
  if (!template) return plan;
  return {
    ...plan,
    emoji: template.emoji,
    name: template.name,
    trigger: template.trigger,
    steps: [...template.steps]
  };
}

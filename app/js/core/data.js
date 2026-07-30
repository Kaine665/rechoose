/* Shared data model, storage, and plan templates. */
"use strict";

const STORE_KEY = "rechoose.data.v1";

const DEFAULT_DATA = {
  version: 3,
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
    actionPlans: [1, 2, 3].map(number => ({
      id: `${id}-action-${number}`,
      name: t(`tpl.${id}.action${number}.name`),
      steps: Array.from(
        { length: number === 3 ? 2 : 1 },
        (_, index) => t(`tpl.${id}.action${number}.step${index + 1}`)
      )
    }))
  }));
}

function cloneActionPlans(actionPlans) {
  return (actionPlans || []).map(actionPlan => ({
    ...actionPlan,
    steps: [...actionPlan.steps]
  }));
}

function planFromTemplate(template) {
  return {
    id: uid(),
    templateId: template.id,
    emoji: template.emoji,
    name: template.name,
    trigger: template.trigger,
    actionPlans: cloneActionPlans(template.actionPlans),
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
    actionPlans: cloneActionPlans(template.actionPlans)
  };
}

/*
 * v2 made bundled examples editable user plans.
 * v3 introduces multiple action plans per situation. Existing custom plans
 * keep their ordered steps as one action plan; bundled plans gain the new
 * starter action plans.
 */
function migrateData() {
  const version = Number(DB.version || 1);

  if (version < 2) {
    const usedTemplateIds = new Set(DB.plans.map(plan => plan.templateId).filter(Boolean));
    getTemplates().forEach(template => {
      if (!usedTemplateIds.has(template.id)) DB.plans.push(planFromTemplate(template));
    });
  }

  if (version < 3) {
    DB.plans.forEach(plan => {
      const template = plan.templateId
        ? getTemplates().find(item => item.id === plan.templateId)
        : null;
      plan.actionPlans = template
        ? cloneActionPlans(template.actionPlans)
        : [{
            id: uid(),
            name: t("data.migratedActionPlan"),
            steps: Array.isArray(plan.steps) && plan.steps.length
              ? [...plan.steps]
              : [t("data.migratedAction")]
          }];
      delete plan.steps;
    });
  }

  if (version < 3) {
    DB.version = 3;
    saveData();
  }
}

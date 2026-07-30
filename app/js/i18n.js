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
  "data.migratedActionPlan": "原来的行动方案",
  "data.migratedAction": "停一下,做一个不同的选择",

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
  "onboard.2.s2.body": "先停一下,然后按顺序执行你已经准备好的行动。",
  "onboard.2.s3.title": "每次行动,都在改变模式",
  "onboard.2.s3.body": "不管结果如何,每次记录都在帮助你准备下一次行动。",
  "onboard.3.title": "先从这四个计划开始",
  "onboard.3.body": "它们会成为你的计划,不是软件临时提供的选项。<br>之后可以按自己的情况修改或删除。",
  "onboard.useStarterPlans": "使用这些计划",
  "onboard.starterPlansReady": "你的计划已经准备好了",

  "tpl.night.name": "夜晚独处",
  "tpl.night.trigger": "晚上一个人 + 拿着手机",
  "tpl.night.desc": "最常见的高危时刻",
  "tpl.night.step1": "把手机放到另一个房间",
  "tpl.night.step2": "去洗澡",
  "tpl.night.step3": "直接上床睡觉",
  "tpl.night.action1.name": "手机离手",
  "tpl.night.action1.step1": "把手机放到另一个房间",
  "tpl.night.action2.name": "联系一个人",
  "tpl.night.action2.step1": "给朋友发一条消息",
  "tpl.night.action3.name": "睡前收尾",
  "tpl.night.action3.step1": "去洗澡",
  "tpl.night.action3.step2": "直接上床睡觉",

  "tpl.phone.name": "刷手机刷出冲动",
  "tpl.phone.trigger": "刷短视频 / 无目的浏览",
  "tpl.phone.desc": "从内容流里抽身",
  "tpl.phone.step1": "立刻关闭这个 App",
  "tpl.phone.step2": "出门或在屋里走 5 分钟",
  "tpl.phone.step3": "回来后做一件具体的小事",
  "tpl.phone.action1.name": "立刻退出",
  "tpl.phone.action1.step1": "关闭当前 App",
  "tpl.phone.action2.name": "让身体动起来",
  "tpl.phone.action2.step1": "站起来走 5 分钟",
  "tpl.phone.action3.name": "离开内容流",
  "tpl.phone.action3.step1": "关闭当前 App",
  "tpl.phone.action3.step2": "做一件具体的小事",

  "tpl.mood.name": "情绪低落时",
  "tpl.mood.trigger": "压力大、孤独、无聊",
  "tpl.mood.desc": "冲动常常只是情绪的出口",
  "tpl.mood.step1": "给一个朋友发条消息",
  "tpl.mood.step2": "写下现在的感受(一句话就够)",
  "tpl.mood.step3": "出门散步 10 分钟",
  "tpl.mood.action1.name": "联系一个人",
  "tpl.mood.action1.step1": "给朋友发一条消息",
  "tpl.mood.action2.name": "写下一句话",
  "tpl.mood.action2.step1": "写下现在的感受",
  "tpl.mood.action3.name": "出门缓一缓",
  "tpl.mood.action3.step1": "穿鞋出门",
  "tpl.mood.action3.step2": "散步 10 分钟",

  "tpl.morning.name": "清晨醒来",
  "tpl.morning.trigger": "醒来后赖床 + 拿手机",
  "tpl.morning.desc": "别给冲动留出躺着的时间",
  "tpl.morning.step1": "立刻坐起来,双脚落地",
  "tpl.morning.step2": "拉开窗帘",
  "tpl.morning.step3": "直接去洗漱",
  "tpl.morning.action1.name": "双脚落地",
  "tpl.morning.action1.step1": "立刻坐起来,双脚落地",
  "tpl.morning.action2.name": "让房间亮起来",
  "tpl.morning.action2.step1": "拉开窗帘",
  "tpl.morning.action3.name": "开始早晨",
  "tpl.morning.action3.step1": "放下手机起床",
  "tpl.morning.action3.step2": "直接去洗漱",

  "home.question": "现在,做一次重新选择",
  "home.helpBtn": "Rechoose",
  "home.todayChanged": "今天你已经做出 {n} 次不同的选择 🌿",
  "home.todayPracticed": "今天你已经练习了 {n} 次,来了就是进步",
  "home.privacy": "你的一切记录只保存在这台设备上,<br>不会上传,没有人看得到。<br><a href=\"privacy.html\">隐私政策</a> · <a href=\"support.html\">帮助与支持</a>",

  "help.exit": "收起",
  "help.pick.title": "现在是哪一种情境?",
  "help.pick.sub": "从你的计划中选择当前情境,然后直接做出这一次的选择。",
  "help.pick.saved": "我的计划",
  "help.pick.templates": "预设模板",
  "help.pick.noPlan": "不使用方案",
  "help.pick.record": "🕯️ 只记录这一次",
  "help.pick.recordSub": "不执行模板,直接记下结果和当时的情况",
  "help.pick.otherLabel": "不使用计划",
  "help.pick.other": "直接记录这一次",
  "help.pick.otherSub": "不关联情境或行动方案,记录实际发生的事",
  "help.choose.sub": "这一次你选择做什么?选择后会直接记入记录。",
  "help.choose.otherTitle": "这一次,你选择怎么做?",
  "help.choose.otherSub": "没有对应计划也没关系,如实选择这次的行动。",
  "help.choose.plannedSub": "使用计划中已经准备好的行动",
  "help.actionPlans.sub": "选择一个现在最做得到的行动方案。",
  "help.actionPlans.chain": "{n} 步行动链",
  "help.sequence.sub": "按顺序完成。做完当前一步,下一步才会解锁。",
  "help.sequence.finishLocked": "完成全部行动后结束",
  "help.sequence.finish": "完成这次 Rechoose",
  "help.choose.same": "🌧️ 还是按原来的习惯做了",
  "help.choose.sameSub": "如实记录就好,这里没有失败",
  "help.choose.custom": "✍️ 我做了计划外的事",
  "help.choose.customSub": "只有计划里没有这个行动时才需要手写",
  "help.custom.title": "你做了什么?",
  "help.custom.sub": "这个行动不在计划里,简单写下来即可。",
  "help.custom.placeholder": "例如:给朋友打了电话",
  "help.custom.save": "记录这个选择",
  "help.custom.needAction": "先写下你做的行动",
  "help.steps.sub": "一次只做一步。做完一步,就点亮它。",
  "help.steps.done": "这一轮结束了,记录一下",
  "help.steps.allDone": "全部完成了,你做得很好",
  "help.outcome.title": "这一次,后来怎么样?",
  "help.outcome.titleRecord": "刚才发生了什么?",
  "help.outcome.sub": "诚实地记录就好。这里没有对错,只有了解自己。",
  "help.outcome.changed": "🌿 我执行了不同的行动",
  "help.outcome.changedSub": "旧模式出现了,但我采取了准备好的下一步",
  "help.outcome.changedSubRecord": "这一次,我没有沿着旧的反应继续",
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
  "plans.actionPlans": "行动方案",
  "plans.empty": "还没有计划。<br>平静的现在,正是为困难时刻做准备的最好时机。",
  "plans.new": "＋ 新建一个计划",
  "plans.fromTemplate": "从模板开始",
  "plans.added": "已添加,你可以随时编辑它",

  "planEdit.new": "新建计划",
  "planEdit.edit": "编辑计划",
  "planEdit.sub": "为这个情境准备几个可选择的行动方案。",
  "planEdit.icon": "图标",
  "planEdit.name": "名字",
  "planEdit.namePh": "例如:夜晚独处",
  "planEdit.trigger": "触发情境",
  "planEdit.triggerPh": "例如:独处 + 手机",
  "planEdit.triggerHint": "旧模式通常在什么时刻拉力最强?",
  "planEdit.steps": "行动(按顺序执行)",
  "planEdit.stepPh": "第 {n} 步,例如:离开房间",
  "planEdit.removeStep": "删除这一步",
  "planEdit.addStep": "＋ 加一步",
  "planEdit.stepsHint": "按实际执行顺序排列。行动越具体、越容易开始越好。",
  "planEdit.actionPlans": "行动方案",
  "planEdit.actionPlanNumber": "方案 {n}",
  "planEdit.removeActionPlan": "删除这个行动方案",
  "planEdit.actionPlanNamePh": "方案名称,例如:睡前收尾",
  "planEdit.actionPlanSteps": "这个方案怎么做",
  "planEdit.addNextStep": "＋ 添加下一步",
  "planEdit.singleActionHint": "保持一个行动最简单;只有确实需要时才添加下一步。",
  "planEdit.chainHint": "这是一个 {n} 步行动链,使用时会按顺序解锁。",
  "planEdit.addActionPlan": "＋ 添加另一个行动方案",
  "planEdit.actionPlansHint": "同一情境可以有多个方案。推荐大多数方案只有一个行动。",
  "planEdit.save": "保存计划",
  "planEdit.delete": "删除这个计划",
  "planEdit.needName": "给计划起个名字吧",
  "planEdit.needStep": "至少写一个替代行动",
  "planEdit.needActionPlan": "至少添加一个行动方案",
  "planEdit.needActionPlanName": "给每个行动方案起个名字",
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
  "data.migratedActionPlan": "Original action plan",
  "data.migratedAction": "Pause and make a different choice",

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
  "onboard.2.s2.body": "Pause, then follow the actions you prepared in order.",
  "onboard.2.s3.title": "Each action changes the pattern",
  "onboard.2.s3.body": "Whatever the outcome, each record helps you act differently next time.",
  "onboard.3.title": "Start with these four plans",
  "onboard.3.body": "They become your plans, not temporary suggestions from the app.<br>Edit or delete them anytime to make them yours.",
  "onboard.useStarterPlans": "Use these plans",
  "onboard.starterPlansReady": "Your plans are ready",

  "tpl.night.name": "Night alone",
  "tpl.night.trigger": "Alone at night + phone in hand",
  "tpl.night.desc": "The most common high-risk moment",
  "tpl.night.step1": "Put the phone in another room",
  "tpl.night.step2": "Take a shower",
  "tpl.night.step3": "Go straight to bed",
  "tpl.night.action1.name": "Put the phone away",
  "tpl.night.action1.step1": "Put the phone in another room",
  "tpl.night.action2.name": "Reach someone",
  "tpl.night.action2.step1": "Text a friend",
  "tpl.night.action3.name": "Close out the night",
  "tpl.night.action3.step1": "Take a shower",
  "tpl.night.action3.step2": "Go straight to bed",

  "tpl.phone.name": "Urge from scrolling",
  "tpl.phone.trigger": "Short videos / mindless browsing",
  "tpl.phone.desc": "Step out of the feed",
  "tpl.phone.step1": "Close the app immediately",
  "tpl.phone.step2": "Walk for 5 minutes",
  "tpl.phone.step3": "Do one small concrete task when you return",
  "tpl.phone.action1.name": "Exit now",
  "tpl.phone.action1.step1": "Close the current app",
  "tpl.phone.action2.name": "Move your body",
  "tpl.phone.action2.step1": "Stand up and walk for 5 minutes",
  "tpl.phone.action3.name": "Leave the feed",
  "tpl.phone.action3.step1": "Close the current app",
  "tpl.phone.action3.step2": "Do one small concrete task",

  "tpl.mood.name": "When mood dips",
  "tpl.mood.trigger": "Stress, loneliness, or boredom",
  "tpl.mood.desc": "Urges are often an emotional exit",
  "tpl.mood.step1": "Text a friend",
  "tpl.mood.step2": "Write one sentence about how you feel",
  "tpl.mood.step3": "Take a 10-minute walk",
  "tpl.mood.action1.name": "Reach someone",
  "tpl.mood.action1.step1": "Text a friend",
  "tpl.mood.action2.name": "Write one sentence",
  "tpl.mood.action2.step1": "Write down how you feel",
  "tpl.mood.action3.name": "Step outside",
  "tpl.mood.action3.step1": "Put on your shoes and go outside",
  "tpl.mood.action3.step2": "Walk for 10 minutes",

  "tpl.morning.name": "Waking up",
  "tpl.morning.trigger": "Lying in bed + reaching for the phone",
  "tpl.morning.desc": "Don't leave room for the urge to settle in",
  "tpl.morning.step1": "Sit up — feet on the floor",
  "tpl.morning.step2": "Open the curtains",
  "tpl.morning.step3": "Go wash up right away",
  "tpl.morning.action1.name": "Feet on the floor",
  "tpl.morning.action1.step1": "Sit up with both feet on the floor",
  "tpl.morning.action2.name": "Let light in",
  "tpl.morning.action2.step1": "Open the curtains",
  "tpl.morning.action3.name": "Start the morning",
  "tpl.morning.action3.step1": "Put the phone down and get up",
  "tpl.morning.action3.step2": "Go wash up right away",

  "home.question": "Make one new choice now",
  "home.helpBtn": "Rechoose",
  "home.todayChanged": "You've already made {n} different choice(s) today 🌿",
  "home.todayPracticed": "You've practiced {n} time(s) today — showing up counts",
  "home.privacy": "Everything stays on this device.<br>Nothing is uploaded. No one else can see it.<br><a href=\"privacy.html\">Privacy Policy</a> · <a href=\"support.html\">Support</a>",

  "help.exit": "Close",
  "help.pick.title": "Which situation are you in?",
  "help.pick.sub": "Choose the situation from your plans, then make this choice directly.",
  "help.pick.saved": "My plans",
  "help.pick.templates": "Preset templates",
  "help.pick.noPlan": "Without a plan",
  "help.pick.record": "🕯️ Just record this time",
  "help.pick.recordSub": "Skip the template and log the outcome and context",
  "help.pick.otherLabel": "Without a plan",
  "help.pick.other": "Record this time directly",
  "help.pick.otherSub": "Log what happened without linking a situation or action plan",
  "help.choose.sub": "What will you do this time? Your choice is recorded directly.",
  "help.choose.otherTitle": "What do you choose this time?",
  "help.choose.otherSub": "It's okay if no plan matches. Choose what you actually did.",
  "help.choose.plannedSub": "Use an action already prepared in this plan",
  "help.actionPlans.sub": "Choose the action plan that feels most doable right now.",
  "help.actionPlans.chain": "{n}-step action chain",
  "help.sequence.sub": "Follow the actions in order. Finishing one unlocks the next.",
  "help.sequence.finishLocked": "Finish every action to complete",
  "help.sequence.finish": "Complete this Rechoose",
  "help.choose.same": "🌧️ I followed the old pattern",
  "help.choose.sameSub": "Record it honestly. This isn't failure.",
  "help.choose.custom": "✍️ I did something outside the plan",
  "help.choose.customSub": "Write only when the action isn't already in the plan",
  "help.custom.title": "What did you do?",
  "help.custom.sub": "This action isn't in the plan, so write it down briefly.",
  "help.custom.placeholder": "e.g. Called a friend",
  "help.custom.save": "Record this choice",
  "help.custom.needAction": "Write down the action first",
  "help.steps.sub": "One step at a time. Tap when you've done it.",
  "help.steps.done": "This round is over — log it",
  "help.steps.allDone": "All done. You did well.",
  "help.outcome.title": "How did this round go?",
  "help.outcome.titleRecord": "What happened just now?",
  "help.outcome.sub": "Be honest. There's no right or wrong here — only knowing yourself.",
  "help.outcome.changed": "🌿 I took a different action",
  "help.outcome.changedSub": "The old pattern showed up, but I took the step I prepared",
  "help.outcome.changedSubRecord": "This time, I didn't continue the old response",
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
  "plans.actionPlans": "Action plans",
  "plans.empty": "No plans yet.<br>Calm moments are the best time to prepare for hard ones.",
  "plans.new": "+ New plan",
  "plans.fromTemplate": "Start from a template",
  "plans.added": "Added — you can edit it anytime",

  "planEdit.new": "New plan",
  "planEdit.edit": "Edit plan",
  "planEdit.sub": "Prepare a few action plans you can choose in this situation.",
  "planEdit.icon": "Icon",
  "planEdit.name": "Name",
  "planEdit.namePh": "e.g. Night alone",
  "planEdit.trigger": "Trigger situation",
  "planEdit.triggerPh": "e.g. Alone + phone",
  "planEdit.triggerHint": "When does the old pattern pull hardest?",
  "planEdit.steps": "Actions (in order)",
  "planEdit.stepPh": "Step {n}, e.g. Leave the room",
  "planEdit.removeStep": "Remove this step",
  "planEdit.addStep": "+ Add a step",
  "planEdit.stepsHint": "Arrange actions in the order you'll do them. Keep each one concrete and easy to start.",
  "planEdit.actionPlans": "Action plans",
  "planEdit.actionPlanNumber": "Plan {n}",
  "planEdit.removeActionPlan": "Remove this action plan",
  "planEdit.actionPlanNamePh": "Plan name, e.g. Close out the night",
  "planEdit.actionPlanSteps": "How to do this plan",
  "planEdit.addNextStep": "+ Add the next step",
  "planEdit.singleActionHint": "One action is simplest. Add a next step only when it is truly needed.",
  "planEdit.chainHint": "This is a {n}-step chain. Steps unlock in order when used.",
  "planEdit.addActionPlan": "+ Add another action plan",
  "planEdit.actionPlansHint": "One situation can have several plans. Keep most plans to one action.",
  "planEdit.save": "Save plan",
  "planEdit.delete": "Delete this plan",
  "planEdit.needName": "Give the plan a name",
  "planEdit.needStep": "Add at least one action",
  "planEdit.needActionPlan": "Add at least one action plan",
  "planEdit.needActionPlanName": "Name every action plan",
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

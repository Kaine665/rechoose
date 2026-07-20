/* Check zh/en key parity in js/i18n.js */
const fs = require("fs");
const path = require("path");

const code = fs.readFileSync(path.join(__dirname, "..", "app", "js", "i18n.js"), "utf8");
const zhBlock = code.match(/const zh = \{([\s\S]*?)\n\};/)[1];
const enBlock = code.match(/const en = \{([\s\S]*?)\n\};/)[1];
const keys = block => [...block.matchAll(/"([^"]+)":/g)].map(m => m[1]);

const zhKeys = keys(zhBlock);
const enKeys = keys(enBlock);
const zhSet = new Set(zhKeys);
const enSet = new Set(enKeys);

const onlyZh = zhKeys.filter(k => !enSet.has(k));
const onlyEn = enKeys.filter(k => !zhSet.has(k));

console.log(`zh: ${zhKeys.length}  en: ${enKeys.length}`);
if (onlyZh.length) console.log("only in zh:", onlyZh.join(", "));
if (onlyEn.length) console.log("only in en:", onlyEn.join(", "));
if (!onlyZh.length && !onlyEn.length) console.log("OK: keys match");
process.exit(onlyZh.length || onlyEn.length ? 1 : 0);

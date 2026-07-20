const fs = require("fs");
const path = require("path");

const c = fs.readFileSync(path.join(__dirname, "../app/js/i18n.js"), "utf8");
const zhM = c.match(/const zh = \{([\s\S]*?)\n\};/);
const enM = c.match(/const en = \{([\s\S]*?)\n\};/);
if (!zhM || !enM) {
  console.error("Could not parse zh/en objects");
  process.exit(1);
}
const parse = s => [...s.matchAll(/"([^"]+)":/g)].map(m => m[1]);
const zk = parse(zhM[1]);
const ek = parse(enM[1]);
const zs = new Set(zk);
const es = new Set(ek);
const onlyZh = zk.filter(k => !es.has(k));
const onlyEn = ek.filter(k => !zs.has(k));
console.log(`zh: ${zk.length} keys`);
console.log(`en: ${ek.length} keys`);
if (onlyZh.length || onlyEn.length) {
  console.log("onlyZh:", onlyZh);
  console.log("onlyEn:", onlyEn);
  process.exit(1);
}
console.log("OK: zh and en keys match");

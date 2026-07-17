# 重新选择

> 当冲动来临时,帮你重新获得一次选择的机会。

一个遵循 **SLC(Simple / Lovely / Complete)** 理念的个人行为改变工具。
不计天数、不评判、不羞辱——只在最难的那几分钟,陪用户走过去。

## 核心闭环

```
发现冲动 → 启动帮助 → 执行自己的策略 → 记录结果 → 看到变化
```

对应三个页面:

| 页面 | 状态 | 作用 |
|------|------|------|
| 🌱 此刻(Help) | 当下,可能快失控 | 一个大按钮,减少思考,带用户呼吸并执行计划 |
| 🧭 计划(Plans) | 平静时 | 建立"触发 → 替代行动"策略,内置模板 |
| 🌿 成长(Progress) | 复盘时 | 冲动次数、改变行为次数、平均反应距离、最有效行动 |

## 技术说明

- 纯 HTML / CSS / 原生 JavaScript,**零依赖、零构建、零服务器**
- 数据全部保存在本机 `localStorage`,不上传、无账号
- 支持导出 / 导入 JSON 备份,换设备可迁移
- 内置 Service Worker + PWA manifest:首次访问后完全离线可用,可"添加到主屏幕"当 App 用
- 移动端优先设计,桌面端自适应

即使以后不再更新,用户也能一直使用。

## 运行方式

任选其一:

1. **直接双击 `index.html`** —— 全部功能可用(file:// 下仅离线缓存不生效,但本来就是本地文件)
2. 任意静态服务器,例如:

```bash
python -m http.server 8080
# 打开 http://localhost:8080
```

部署到 Vercel 等静态托管即可获得完整 PWA 离线体验。

## 在线访问

部署后地址会出现在 Vercel 控制台,格式类似 `https://rechoose.vercel.app`。

## 部署

### GitHub

```bash
git init
git add .
git commit -m "feat: initial SLC prototype"
gh repo create rechoose --public --source=. --push
```

### Vercel

1. 打开 [vercel.com/new](https://vercel.com/new),导入 GitHub 仓库
2. 框架选 **Other**,Build Command 留空,Output Directory 填 `.`
3. 点击 Deploy

或用 CLI:

```bash
npx vercel --prod
```

## 文件结构

```
index.html      入口页面
css/style.css   全部样式(含帮助流程的夜间安抚配色)
js/app.js       全部逻辑(数据层、路由、三个页面、帮助流程、导入导出)
sw.js           离线缓存
manifest.json   PWA 配置
```

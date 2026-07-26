# Rechoose — App Store 上架清单

更新日期：2026-07-26

## 0. 当前结论

- 产品是离线优先的交互式工具，不是内容站点；所有用户数据仅保存在设备本地。
- iOS 工程使用原生 `WKWebView` 加载安装包内的 Web 资源，不依赖远程网页或第三方运行时。
- Bundle ID：`com.kaine665.rechoose`，已在 Apple Developer 注册，不要随意修改。
- 当前版本：Marketing Version `1.0`，Build `1`。
- 隐私标签建议：`Data Not Collected`，前提是发布版本继续不加入分析、广告、账号或其他数据上传。

## 1. 用户必须完成：账号与身份

- [x] 注册并完成 Apple Developer Program 付费会员。
- [x] 确认 App Store 卖方名称为个人姓名 `Xuting Feng`。
- [x] 使用 GitHub Pages 提供公开支持页和隐私政策页。
- [x] 确认并注册 Bundle ID：`com.kaine665.rechoose`。
- [x] 在 Xcode → Settings → Accounts 登录开发者 Apple Account。
- [x] 在项目 Signing & Capabilities 中选择 `Xuting Feng` Team，启用 Automatically manage signing。
- [ ] 连接一台已信任的 iPhone，让 Xcode 注册设备并创建开发描述文件。

## 2. 用户必须确认：公开信息

- [x] App 名称：`Rechoose`。
- [x] 副标题：`Pause. Choose your next step.`
- [x] 主分类：`Health & Fitness`；次分类：`Lifestyle`。
- [x] 年龄分级问卷已完成，结果为 `9+`。
- [x] 公开支持入口：GitHub Issues，不公开个人审核联系邮箱。
- [x] 支持 URL：`https://kaine665.github.io/rechoose/app/support.html`。
- [x] 隐私政策 URL：`https://kaine665.github.io/rechoose/app/privacy.html`。

## 3. 已在仓库完成：工程前置

- [x] 添加仅依赖 Apple SDK 的原生 iOS 容器。
- [x] 固定 Node 与 Capacitor 版本。
- [x] 添加中英文隐私政策与支持页面。
- [x] 添加原创 1024×1024 图标源文件。
- [x] 添加 App Store 中英文元数据草稿。
- [x] 声明不收集数据的 Privacy Manifest。
- [x] 保持应用资源随安装包分发，可离线运行。
- [x] 添加 iOS 原生触感反馈与系统分享备份。
- [x] 安装 Xcode iOS 26.5 Simulator Runtime，并完成包含图标和启动页的标准无签名 Release 构建。
- [x] 原生 Swift 代码已完成编译、链接、dSYM 生成和应用包校验。
- [x] 升级到 `UIScene` 生命周期，消除 iOS 26.5 的未来兼容性警告。
- [x] 在 iPhone 17 Pro / iOS 26.5 模拟器完成安装与首次启动验收。
- [x] 在 iPhone 17 Pro Max / iOS 26.5 生成 3 张英文 App Store 截图（1320×2868）。

## 4. App Store Connect 操作

- [x] 免费 App 协议状态有效；当前版本无收费项目，无需签署付费 App 协议。
- [x] 创建新 App：平台 iOS、名称 Rechoose、主语言 English (U.S.)、Bundle ID `com.kaine665.rechoose`、SKU `rechoose-ios-001`。
- [x] 保存 App 信息：副标题、主分类 `Health & Fitness`、次分类 `Lifestyle`。
- [x] 保存年龄分级问卷；按功能填写后的计算结果为 `9+`。
- [x] App Privacy 已发布 “No, we do not collect data from this app”。
- [x] 保存内容版权声明：不包含、显示或访问第三方内容。
- [x] 保存受监管医疗设备声明：否。
- [x] 填写并发布隐私政策 URL。
- [x] 填写分类、版权、年龄分级问卷。
- [x] 填写并保存 1.0 版本的描述、关键词、支持 URL、营销 URL和审核联系信息。
- [x] 完成欧盟《数字服务法》(DSA) 非交易商声明，状态有效。
- [x] 上传 `docs/app-store/screenshots/en-US-6.5/` 中的 3 张 iPhone 14 Plus 截图（1284×2778），顺序为首页、计划、即时帮助；当前工程仅支持 iPhone。
- [x] 创建 Apple Distribution 证书和 `Rechoose App Store` 发布描述文件。
- [x] 生成并验证正式 App Store 归档，上传 `Rechoose 1.0 (1)` 到 App Store Connect。
- [x] Apple 已处理上传的构建，并已将构建 `1` 关联到 App Store 版本 `1.0`。
- [x] 创建 TestFlight 内部群组 `Internal QA`，启用自动分发并关联构建 `1.0 (1)`。
- [x] 邀请 `1713061501@qq.com`（封旭庭）作为内部测试员，并填写 Beta 描述、反馈邮箱和测试内容。
- [x] 已通过 TestFlight 完成真机回归，用户确认版本运行可靠。
- [x] App 定价设为免费，并设置为在全部 175 个国家或地区发布时供应。
- [x] 已将 iOS 版本 `1.0 (1)` 正式提交审核；当前状态为“正在等待审核”。
- [x] 审核通过后采用手动发布，不自动上架。

## 5. 审核前回归

- [x] 浏览器验收：中文首次引导、模板创建与核心帮助流程可完成，控制台无错误或警告。
- [x] iPhone 17 Pro 模拟器：全新安装可启动，首次引导正常显示，无白屏或立即崩溃。
- [ ] 模拟器/真机全新安装：中英文首次引导均可完成。
- [ ] 创建、编辑、删除计划。
- [ ] 完成帮助流程并生成记录。
- [ ] 退出并重开 App 后数据仍存在。
- [ ] 飞行模式下全部核心功能可用。
- [ ] 导出、导入、清空数据在真机上验证。
- [x] 浏览器验收：隐私政策和支持链接可打开。
- [ ] 深色帮助流程、动态字体、VoiceOver 基本可用。
- [ ] iPhone 小屏与大屏均无截断；如支持 iPad，再验证 iPad。
- [x] 模拟器 Release 构建无崩溃、无空白页、无调试入口。

## 6. 审核备注建议

```
Rechoose is an offline-first behavior planning tool. Users create concrete response
plans, start a guided pause-and-act flow during a difficult moment, and review their
private progress over time. No account is required and no user data is collected or
transmitted. All core functionality is available offline.

No demo account is required.
```

## 7. 主要审核风险

- Guideline 4.2（Minimum Functionality）：提交材料应突出“创建行动计划、引导式呼吸与逐步执行、行为记录、趋势洞察、离线备份”，而不是描述成网页。
- 健康表述：它是自助行为工具，不要在描述或截图中声称诊断、治疗、治愈疾病或替代专业医疗服务。
- 隐私一致性：以后若加入分析、崩溃上报、云同步、登录或广告，必须同步更新隐私政策、Privacy Manifest 与 App Store Privacy 答案。

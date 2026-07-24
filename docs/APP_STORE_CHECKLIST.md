# Rechoose — App Store 上架清单

更新日期：2026-07-24

## 0. 当前结论

- 产品是离线优先的交互式工具，不是内容站点；所有用户数据仅保存在设备本地。
- iOS 工程使用原生 `WKWebView` 加载安装包内的 Web 资源，不依赖远程网页或第三方运行时。
- 临时 Bundle ID：`com.kaine665.rechoose`。在 Apple Developer 注册 App ID 前必须确认，注册后不要随意修改。
- 当前版本：Marketing Version `1.0.0`，Build `1`。
- 隐私标签建议：`Data Not Collected`，前提是发布版本继续不加入分析、广告、账号或其他数据上传。

## 1. 用户必须完成：账号与身份

- [ ] 注册并完成 Apple Developer Program 付费会员。
- [ ] 确认 App Store 卖方名称（个人真实姓名或公司法定名称）。
- [ ] 确认拥有可公开访问的域名和邮箱。
- [ ] 确认 Bundle ID；默认暂用 `com.kaine665.rechoose`。
- [ ] 在 Xcode → Settings → Accounts 登录开发者 Apple Account。
- [ ] 在项目 Signing & Capabilities 中选择 Team，启用 Automatically manage signing。

## 2. 用户必须确认：公开信息

- [ ] App 名称：`Rechoose`（需在 App Store Connect 检查可用性）。
- [ ] 副标题建议：`Pause. Choose your next step.`
- [ ] 主分类建议：`Health & Fitness`；备选 `Lifestyle`。
- [ ] 年龄分级：按 App Store Connect 新问卷如实回答；本应用本身不含暴力、成人内容、赌博或用户生成内容。
- [ ] 支持邮箱：当前文案使用 `support@rechoose.app`。
- [ ] 隐私邮箱：当前文案使用 `privacy@rechoose.app`。
- [ ] 支持 URL：部署后的 `https://<你的域名>/app/support.html`。
- [ ] 隐私政策 URL：部署后的 `https://<你的域名>/app/privacy.html`。

> 如果 `rechoose.app` 不是你的域名，请在提交前全局替换上面的两个邮箱。

## 3. 已在仓库完成：工程前置

- [x] 添加仅依赖 Apple SDK 的原生 iOS 容器。
- [x] 固定 Node 与 Capacitor 版本。
- [x] 添加中英文隐私政策与支持页面。
- [x] 添加原创 1024×1024 图标源文件。
- [x] 添加 App Store 中英文元数据草稿。
- [x] 声明不收集数据的 Privacy Manifest。
- [x] 保持应用资源随安装包分发，可离线运行。
- [x] 添加 iOS 原生触感反馈与系统分享备份。
- [x] 原生 Swift 代码已完成无签名 Release 编译、链接和应用包校验。
- [ ] 下载 Xcode 的 iOS 26.5 Simulator Runtime（约 8.52 GB）后，完成包含图标和启动页的标准 Release 构建与模拟器回归。

## 4. App Store Connect 操作

- [ ] Agreements, Tax, and Banking 中接受必要协议；免费 App 通常无需配置收款，但协议状态必须正常。
- [ ] 创建新 App：平台 iOS、名称 Rechoose、主语言 English (U.S.)、选择 Bundle ID、填写自定义 SKU。
- [ ] App Privacy 选择 “No, we do not collect data from this app”。
- [ ] 填写隐私政策 URL。
- [ ] 填写分类、版权、年龄分级问卷。
- [ ] 填写 1.0 版本的描述、关键词、支持 URL、营销 URL。
- [ ] 上传 iPhone 截图；如果工程同时支持 iPad，还要上传要求的 iPad 截图。
- [ ] 在 Xcode Archive 后执行 Validate App，再 Distribute App → App Store Connect。
- [ ] 先通过 TestFlight 做真机回归，再选择构建并提交审核。

## 5. 审核前回归

- [x] 浏览器验收：中文首次引导、模板创建与核心帮助流程可完成，控制台无错误或警告。
- [ ] 模拟器/真机全新安装：中英文首次引导均可完成。
- [ ] 创建、编辑、删除计划。
- [ ] 完成帮助流程并生成记录。
- [ ] 退出并重开 App 后数据仍存在。
- [ ] 飞行模式下全部核心功能可用。
- [ ] 导出、导入、清空数据在真机上验证。
- [x] 浏览器验收：隐私政策和支持链接可打开。
- [ ] 深色帮助流程、动态字体、VoiceOver 基本可用。
- [ ] iPhone 小屏与大屏均无截断；如支持 iPad，再验证 iPad。
- [ ] Release 构建无崩溃、无空白页、无调试日志或测试入口。

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

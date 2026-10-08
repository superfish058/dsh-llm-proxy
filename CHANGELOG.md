# Changelog

## v1.5.6 (unreleased)

- **适配 dsh 0.2.0 插件卡片的 view 渲染契约（修复「插件列表直接铺开完整配置、详情页出现 2 个重复配置卡」）**。`@deepseek-ai/dsh-client-ui-plugin-manager` 会把同一个卡片组件在每款插件上挂载三处：列表行与详情描述行都以 `{view:'summary'}` 渲染（输出落在宿主自己的标题/描述样式内），详情配置区以 `{view:'page'}` 渲染。此前卡片不读 `view`、所有渲染点都输出完整配置表单，导致列表行被配置界面铺满、详情页双渲染。现在卡片按 `view` 分支：`summary` 输出一行简介（无表单、无内部展开状态）；`page` 只渲染配置表单（详情页头部由宿主绘制）；无 `view`（dsh 0.1.7 独立渲染）保持原自包含卡片（标题 + 折叠 chevron + 表单）不变。座位仍是单一 `plugins.item`，无注册面变化。

## v1.5.5 (unreleased)

- **回滚收敛：客户端恢复 v1.5.0 原版 + 仅保留两处最小修补**。v1.5.2~v1.5.4 引入的「三座位注册 / trySeat 降级 / Record 放宽」多座位适配（`plugins.bundle.config` keyed、`web-ui.plugin.item` family、诊断日志）整体撤销，`src/client/index.ts` 与 `ProxyModelCard.tsx` 恢复 origin/master 单座位 `plugins.item` 原版，待宿主 0.2.0 卡片契约在真实环境验证后再议适配。保留的两处修补：
  - `cordis.patch.yml` 去重（v1.5.1 的修复，消除 `duplicate loader entry id "llm-proxy"` 启动报错）。
  - `ProxyModelCard` 折叠图标 `IconChevronDownOutline14` → `IconChevronDownOutlineRegular`（dsh 0.2.0 primitives 删除了数字尺寸图标，旧名运行时 undefined 导致卡片渲染抛错）；配套 `@deepseek-ai/dsh-client-ui-primitives` devDep 保持在 `^0.2.0-rc.2`（仅构建期类型解析需要，Regular 图标名从 0.2.0 起才存在）。

## v1.5.2 (unreleased)

- **适配 dsh 0.2.0 正式插件卡片座位（修复「设置里没有插件入口、卡片不出」）**：0.2.0 把插件页搬到主界面（`@deepseek-ai/dsh-client-ui-plugin-manager` 注入 `main`），bundle 配置卡片座位为 `plugins.bundle.config`（keyed，**key = 插件包名** `@superfish058/dsh-llm-proxy`）。同时兼容替换型 Web UI（如 `@linxin666/dsh-web-all`）：其 `dsh-web-settings` 组加载期间（探测 `webUiSettings` 服务）卡片改挂家庭座位 `web-ui.plugin.item`（list，id/order/label），并在每次 `slots/changed` 时重判、先 dispose 后重挂，保证卡片从不同时出现在两个座位。注册仍包在 `configForms.whileServed(['llm-proxy'])` 门控内。v1.5.1 曾适配的 `settings.plugin.item` 是 alpha.1 的过渡座位（alpha.2 已删），正式版不适用。

## v1.5.1 (unreleased)

- **修复 v1.5.0 cordis.patch.yml 重复 insert 块**（启动报 `duplicate loader entry id "llm-proxy"`）：文件里同一 `insert` 块被意外写了两次，宿主组合 profile 时出现两条同 id 行，加载器直接抛错。纯删除，无值变更。
- **适配 dsh 0.2.0 的 Plugins 页槽位改名**：卡片槽位由 `plugins.item`（list，`id`/`order`/`label`）改回 `settings.plugin.item`（keyed，`key: 'llm-proxy'`），卡片在 `configForms.whileServed(['llm-proxy'])` 下注册不变。不改则宿主侧一切正常（设置文档照常 serve、bridge 照常挂载），但设置页只显示插件标题、不出卡片。

## v1.5.0 (2026-09-28)

- **适配 dsh 0.1.7 的设置模型（重要，修复「renderer boot failed」）**。0.1.7 把客户端设置服务从 `settingsScope` 改名为 `configForms`，并按 **Loader entry id**（本插件即 `llm-proxy`）寻址设置文档；旧代码硬 `inject` 已不存在的服务名，cordis fiber 永远停在 pending，启动审计因此只能报「The client Loader did not provide an error message. RendererStartupFailure」。现在客户端改为 `ctx.inject(['configForms'], …)` 动态等待该服务——服务缺失时插件照常启动、只是不显示设置页，未来再改名也不会再把启动拖垮。
- **宿主侧不再自建命名空间**：`Config` 的每个字段都标成 `volatile()`（经 `live()` 包装，老 schemastery 上优雅降级并告警），该 schema 本身即 `llm-proxy` 设置文档；loader 把 volatile 字段作为 live accessor 交给 `apply()`，写入直接落在这份 accessor 上。插件监听 fiber 过滤的 `loader/volatile-update` 重算代理策略（`settings/document-updated` 作为 provider 文档变更的补充信号），不再有 `settings.register()` / `watch()` 这套 0.1.7 已删除的接缝。
- **设置页搬到 Plugins 页**：注册槽位由 `settings.plugin.item`（keyed）改为 `plugins.item`（list，`id`/`order`/`label`），与官方 `settings-web-search` 同构（`order: 50` 排在官方页之后）；卡片在 `configForms.whileServed(['llm-proxy'])` 下注册，宿主不提供该文档时不显示任何痕迹。`dsh.client.inject` 同步改为客户端包名（原先写的是服务名，从未生效）。
- **移除「多模态模型镜像」**：dsh 0.1.7 起模型图片输入由官方模型设置与 provider 配置直接管理，插件不再代写 `input` / `inputModalities`（`multimodalModels` 字段、宿主镜像逻辑、卡片区段、`multimodal` 测试标志与 `test/multimodal-mirror.test.js` 一并删除）。
- **保留**：按模型走代理（官方 `dsh-http-proxy` 优先 / 自带 `RoutingDispatcher` 回退）、`retries`/`retryIntervalMs` 的官方 `retryPolicy` 镜像、模型列表与「测试连接」桥接（`/api/dsh-llm-proxy/settings` 的 `describe`/`mutate`/`models`/`test` 保留，作为官方 `configForms` 不可达时的兜底），反代 `trustedOrigins` 白名单。
- 依赖：`@deepseek-ai/schemastery` 提到 `^3.18.4`（`Schema#volatile` 从该版本起才有）；测试同步改造（无 seam 场景、`Config` 解析为 live accessor、`loader/volatile-update` 驱动重算），全套 **73** 个用例通过。

## v1.4.0 (2026-09-10)

- **官方优先：复用官方出站代理层（重要）**。检测到官方 `@deepseek-ai/dsh-http-proxy`（随 dsh ≥ 0.1.3 安装，是库不是插件）时，插件不再自建全局 dispatcher，而是通过官方公开接缝 `installProxyFromEnvironment(envLookup, report)` 喂一份算好的策略：`https_proxy` / `http_proxy` 取自设置卡的代理地址，`no_proxy` = 除勾选模型之外的所有已配置 provider 主机。官方自己的匹配器、子进程环境发布、web-fetch 例外语义全部保留，插件只负责官方不提供的那一个决定——「哪个模型走代理」。卸载时把 launcher 原本的策略原样还回去。
- **旧 harness 自动回退**。加载不到该包时（dsh ≤ 0.1.2，含内置桌面壳 0.1.2-rc.1）继续使用自带 `RoutingDispatcher`，行为与 v1.3.0 一致。日志首行打印实际引擎：`engine=official …` 或 `engine=bundled …`。
- **删除传输层重试（RetryAgent）**。此前 `RetryAgent(RoutingDispatcher)` 与官方 `dsh-llm-retry` 会同时重试同一次请求（最坏情况重试次数²），且刻意忽略 `Retry-After`、把 400/402 当作可重试，与官方语义冲突。现在重试**只**由官方 `dsh-llm-retry` 按每个 provider 的 `retryPolicy` 执行；卡片的 `retries` / `retryIntervalMs` 仍照旧镜像进该配置（v1.0.3 起的行为，只作用于被勾选的 provider），设置页体验不变。
- **「测试连接」报告真实路由**。探测结果里的 经代理／直连 来自当前引擎（官方 `proxyRouteFor` 或自带 `planFor()`），不再是配置意图；引擎答不出来时回退到配置值。
- **官方引擎的直连语义变化（需知）**：官方策略默认「代理一切、按 `no_proxy` 绕过」，所以非 provider 主机（web fetch、HTTP MCP、curl）在官方引擎下会走代理；自带引擎仍是「只代理勾选的模型主机」。插件会读取并沿用你已有的 `no_proxy` 环境变量（与自动算出绕过列表合并，不覆盖）。
- **socks5 / PAC 等 scheme 保护**：官方解析器不接受这类代理 URL 并会回退成 DIRECT（等于抹掉 launcher 已配好的代理），因此插件在这类配置下拒绝安装、保留官方策略并打印原因。
- 新增 `lib/official-proxy.js`（引擎探测 + 策略构造：`loadOfficialProxy` / `policyEnvLookup` / `splitProxyList`）与 `test/official-proxy.test.js`（14 个用例：注入检测与无效包拒绝、策略映射与大小写、空勾选不安装、非 http scheme 拒绝、重入时释放旧 overlay、卸载还原、真实路由回报与回退）。
- `test/routing-dispatcher.test.js` 的 RetryAgent 段替换为 `planFor()`（真实路由判定、不产生请求、非法输入不抛错）用例；`test/smoke-test.mjs` 同步去除重试场景、加入 `planFor()` 校验。
- **测试与机器环境解耦**：`lib/official-proxy.js` 的测试钩子新增「强制视为未安装」（`__setOfficialProxyForTest(null)`）语义，`test/settings.test.js` 用它固定验证自带引擎分支——否则一台在上级目录装有官方包的机器会把 `resolveProxyHosts`/dispatcher 断言翻成官方分支（这正是本次开发中真实出现过的失败）。全套 **76** 个用例通过。
- **真机验证（不涉及本机桌面壳）**：① 在装有真实 `@deepseek-ai/dsh-http-proxy@0.1.5-rc.1` 的目录树中运行插件，确认 `engine=official`、策略注入、选中主机经代理、其余 provider 主机走 `no_proxy`、卸载后策略还原；② 在隔离 `DSH_HOME` 下用 npm 版 `@deepseek-ai/dsh@0.1.5-rc.1` 启动真实 web 服务并安装本插件，通过 bridge `/settings/test` 实测：选中模型 `viaProxy: true` 且本地假代理收到该请求，未选中模型 `viaProxy: false` 直连成功，`retryPolicy` 正确镜像；同时用一个探针插件确认进程全局 dispatcher 不是 `RoutingDispatcher`（即插件未自建 dispatcher）。

## v1.3.0 (2026-09-08)

- **反代部署兼容（issue #6）**：新增 `trustedOrigins` 设置项，把设置页 bridge API 的受信访问源从「仅回环主机」扩展到反代场景的公共域名。反代把 `Host`/`Origin` 改写为公共域名时，将公共 origin（如 `https://dsh.example.com`）加入白名单即可放行，不再误报 403。默认空，行为与之前完全一致；CSRF 同源校验始终生效（Host 命中白名单但 Origin 不一致仍 403）。进阶项走 settings.yaml 配置。
- **`proxyHost` 容错（issue #3）**：`proxyHost` 误填 `http://` 前缀或内联端口时自动归一化（支持 http/https 协议），不再拼出 `http://http://…` 导致代理路由静默失效；README 配置表拆分为 `proxyHost` / `proxyPort` 两行并明确「不要带 http://」。
- 新增测试：bridge 反代白名单（命中放行 / 白名单外 403 / 攻击者 Origin 403 / 本机直连不受影响）+ proxyHost 归一化（http 前缀、https 内联端口）。全套 61 个用例通过。

## v1.2.0 (2026-09-07)

- **DSH ≥ 0.1.2 兼容（重要）**：client bundle 的快照 store 外部引用从 rc.7 时代的 `@deepseek-ai/dsh-client-runtime/client` 改为新 DSH 的平台 seed `@deepseek-ai/dsh-client-store`（`createSnapshotStore` API 完全一致）。修复新版本 DSH Desktop 上「Failed to load plugins … client-modules: require("@deepseek-ai/dsh-client-runtime/client") missed the module table」导致插件无法加载。
  - **注意：v1.2.0 的 client bundle 面向 DSH ≥ 0.1.2**（模块表含 `dsh-client-store`），不再兼容 rc.7/rc.8 运行时；旧 DSH 用户请停留在 v1.1.x。
- 宿主侧去掉 rc.8-only 的 `settingsNamespace()` 品牌校验调用（`LLM_PROXY_NAMESPACE` 改为字面量 `'llm-proxy'`），`@deepseek-ai/dsh-settings` 的依赖收敛为两版都导出的 `SettingsConflictError`，降低对 profile 内 rc.8 副本的隐性依赖。
- 附带收录此前未发布的重试改进（`lib/index.js` + `test/retry-mirror.test.js`）：
  - 固定间隔重试：镜像回退 `maxDelayMs == initialDelayMs`、`jitterRatio 0`，传输层忽略 `Retry-After`（undici 默认会遵循该头导致间隔漂移），卡片设置的间隔在每个重试尝试上都精确生效，不再呈 1s→2s→4s→8s 指数堆积。
  - 传输层重试状态码纳入 `400` 与 `402`；retryPolicy 镜像的 `retryableCodes` 补 `QUOTA` / `INVALID_REQUEST`（B.AI 等「余额不足 / invalid_request」自动按固定节奏续跑，而不是直接失败）。

## v1.1.0 (2026-08-24)

- **测试连接**：走代理的模型列表每行新增「测试连接」按钮。宿主侧新增 loopback 桥接端点 `POST /api/dsh-llm-proxy/settings/test`，对被勾选模型发一个最小 `chat/completions` 探测请求（走插件自己的全局 dispatcher，即真实代理路径），返回 HTTP 状态 / 耗时 / 是否经代理 / 多模态是否开启；网络超时、认证失败、限流、服务端错误都有明确提示（`lib/connection-test.js`）。
- 凭据不出宿主机：探测请求的 `Authorization` 头在宿主侧组装，卡片只收到结构化结果字段。
- 客户端卡片每行显示 ✓ 连接成功（状态 · 耗时 · 经代理/直连 · 多模态）或 ✗ 连接失败（原因），新增 zh/en 文案与样式。
- **测试连接可靠性修复**：
  - `findTestTarget` 改为基于 `listModels` 匹配，设置卡 UI 能勾选的模型测试必然可解析；`llm-deepseek` 为空文档（`llm-deepseek: {}`）时回退官方内置目录（默认 `https://api.deepseek.com` + `DEEPSEEK_API_KEY`），官方 DeepSeek 模型不再报「未找到模型」。
  - 测试失败时读取并脱敏显示提供方响应 body（截断 2KB），HTTP 400/401/… 直接给出真实原因而不是只有状态码。
  - 探测请求 `max_tokens` 从 1 调整为 8：B.AI 等提供方要求 `max_tokens > 2`，旧值会返回 HTTP 400。
  - 新增 `lib/deepseek-official.js` 共享 llm-deepseek 官方默认（baseURL / apiKeyEnv / 内置模型目录），`listModels` / `findTestTarget` / `resolveProxyHosts` 三处统一回退。
  - 设置卡文案精简：测试连接提示（小字，注明「走已保存配置、改勾选后先保存」）、走代理按 API 地址整组生效、多模态说明。
- 新增测试 `test/connection-test.test.js`（19 个用例）。

## v1.0.9 (2026-08-24)

- **多模态模型镜像**：新增设置项 `multimodalModels`。用户在设置卡「多模态模型」区勾选模型后，宿主侧 `syncMultimodal()` 会把 `[text, image]` 镜像写进所属 provider 命名空间（`llm-pi-ai` 的 `models[].input` 或目录型 `modelOverrides[].input`；`llm-deepseek` 的 `models[].inputModalities`），取消勾选自动还原官方默认；已声明为文本的模型发图不再被 `UNSUPPORTED_CONTENT` 拒绝（对应 B.AI / 官方识图模型）。
- 客户端卡片新增「多模态模型」区（`ProxyModelCard.tsx`）+ zh/en 文案 + 🖼 多模态徽章。
- **深色模式保存按钮修复**：主按钮文字色改用 DSH 官方主按钮一致的 `--dsw-alias-label-primary-foreground`（替换此前会让深色下偏灰的 `--dsw-alias-label-primary-inverted`），深色下文字从混浊的 `#353638` 修正为清晰近黑 `#0f1115`，与平台标准完全一致。
- **设置卡「一直加载中」修复**：`LlmProxySettingsBinder` 兼容层此前只在官方 scope 报告 `unavailable` 时才启动桥接兜底，且 `project()` 会把「官方仍 loading」直接透出——一旦官方 describe 镜像没有沉降出本命名空间的视图，卡片会永久停在「加载中」，即使桥接已经 `ready`。现改为只要官方不是 `ready` 就启动桥接，并在取值时优先任意已 `ready` 的来源（官方 → 桥接），构建时也先 `publish()` 一次，避免卡在初始 loading。
- 原生 `<select>/<input>` 深色模式修复（`color-scheme` + `body[data-ds-dark-theme]` 兜底）。
- 新增测试 `test/multimodal-mirror.test.js`（5 个用例）。

## v1.0.8 (2026-08-21)

- **深色模式修复**：客户端卡片 CSS 用了 7 个主题不存在的别名变量（`--dsw-alias-line-default` / `line-strong` / `accent-default` / `accent-strong` / `bg-subtle` / `danger-default` / `success-default`），深色模式下全部回退浅色硬编码，导致按钮文字浅色+浅底不可读、边框浅色刺眼；已替换为主题真实存在的变量（`border-l2` / `border-l3` / `state-business-primary` / `state-error-primary` / `state-success-primary` / `button-primary-fill` / `button-primary-hover` / `bg-layer-2`），主按钮文字色改用 `--dsw-alias-label-primary-inverted`（浅色=白字，深色=深灰字）

## v1.0.7 (2026-08-19)

- **rc.7 兼容修复**：官方 `settings.plugin.item` 槽位由 `list`（要求 `id`）改为 `keyed`（要求 `key`），注册参数同步改为 `key: 'llm-proxy'`，修复 rc.7 上「Failed to load plugins … keyed slot requires options.key」
- 构建依赖（`dsh-settings` / `dsh-client-*`）升至 `0.1.0-rc.7`，类型声明与 rc.7 运行时一致

## v1.0.6 (2026-08-19)

- 客户端卡片文案字典与官方 `settings.plugins` 规范对齐（小版本直发，未单独记录）

## v1.0.5 (2026-08-19)

- 客户端卡片文案字典与官方 `settings.plugins` 规范对齐（小版本直发，未单独记录）

## v1.0.4 (2026-08-19)

- npm 发布元数据：新增 `repository` / `publishConfig.access=public` / `author` / `homepage` / `bugs`
- README 新增 npm 安装方式（`dsh plugin add @superfish058/dsh-llm-proxy`）
- 新增 GitHub Actions CI（build + test）

## v1.0.3 (2026-08-19)

- pi-ai 目录回退：只配了 `apiKeyEnv`、未写 `models` 的 provider（如 `xiaomi`），模型列表从 pi-ai 内置目录补齐，与官方模型选择器同步
- retryPolicy 镜像：卡片 `retries`/`retryIntervalMs` 镜像进选中 provider 官方 `retryPolicy`，取消勾选自动还原

## v1.0.2 (2026-08-18)

- 冷启动 provider 命名空间未注册时的退避重试，不再需要手动「恢复默认再保存」

## v1.0.1 (2026-08-18)

- 客户端 bundle id 作用域化；精简中文 README

## v1.0.0 (2026-08-18)

- 首版：按模型走代理（Clash 等）+ 失败自动重试，设置页实时生效

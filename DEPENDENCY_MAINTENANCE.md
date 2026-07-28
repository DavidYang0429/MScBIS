# 依赖维护记录

## 2026-07-26 基线（已被 2026-07-28 升级替代）

- Node.js 22
- pnpm 11.9.0
- VuePress 2.0.0-rc.24
- VuePress Theme Hope 2.0.0-rc.94

## 2026-07-26 维护

- Vue 从 3.5.18 更新到 3.5.40。
- Mermaid 从 11.10.0 更新到 11.16.0。
- 移除本站没有使用的直接 `plyr` 依赖。
- 移除本站没有启用数学渲染时多余的直接 `mathjax-full` 声明。
- 新增 Dependabot 月度检查，并将构建与内部链接检查加入 Pull Request。

## 2026-07-26 当时暂不升级的依赖（历史判断）

`vuepress-theme-hope` 2.0.0-rc.107 要求 VuePress 2.0.0-rc.30 及整组 2.0.0-rc.130 插件，不能作为单包小版本更新。当前站点仍在 VuePress 2 RC 体系内，单独升级主题会造成 peer dependency 分裂，因此本轮不做跨整组迁移。

当前主题依赖链仍会安装已弃用的 `mathjax-full@3.2.2`，即使本站 `markdown.math` 已关闭。要彻底切换到 MathJax 4 的 `@mathjax/src`，需要和 VuePress／Theme Hope 整组升级一起处理；不应在没有数学内容需求时单独打开或改写数学渲染链路。

`sass-embedded` 1.100.0 在当前 pnpm 11 安装策略下会出现平台二进制未正确链接的警告，因此锁文件暂时保留已通过构建验证的 1.90.0。后续可由 Dependabot 提交独立升级 PR，再以干净安装和 Vercel Preview 验证是否能够放行。

## 2026-07-26 制定的后续升级门槛

整组升级前至少需要：

1. 新建独立升级分支；
2. 使用冻结锁文件安装；
3. 完成 `pnpm docs:check`；
4. 检查首页、Reference、MIS、FIT、选修课和评论区；
5. 等待 Vercel Preview 与 GitHub Actions 同时通过。

## 2026-07-28 VuePress 2 RC 兼容组升级

本节记录 2026-07-28 完成的整组升级，并替代上方“暂不升级的依赖”中基于 2026-07-26 旧基线作出的判断。此次升级没有切换站点生成器，也没有使用 Vue 或 VuePress 的最新预发布版本；目标是把现有 VuePress 2 + Theme Hope 架构更新到已经过兼容验证的一组版本。

### 升级依据

- [Vue 3.5.40](https://github.com/vuejs/core/releases/tag/v3.5.40) 是核验时的最新稳定版；Vue 3.6.0-rc.2 仍是预发布版，因此继续使用 Vue 3.5。
- [VuePress 2.0.0-rc.30](https://github.com/vuepress/core/releases/tag/v2.0.0-rc.30)、[VuePress 插件 2.0.0-rc.130](https://github.com/vuepress/ecosystem/releases/tag/v2.0.0-rc.130) 与 [Theme Hope 2.0.0-rc.107](https://theme-hope.vuejs.press/changelog.html#_2-0-0-rc-107-2026-05-14) 组成当前主题要求的兼容组。
- VuePress 2 仍处于 RC 阶段，官方提示 RC 小版本也可能包含 Breaking Changes，因此本次按整组升级处理，未单独追逐某一个包的最新版本。
- 升级后的 VuePress 构建链解析到 Vite 8.1.5、Vue Router 5.2.0 与 Rolldown。Vite 8 已把开发和生产构建统一到 Rolldown；对应架构说明见 [Vite 8 官方公告](https://vite.dev/blog/announcing-vite8)。
- VuePress 官方说明 Vue 核心团队目前聚焦 VitePress、VuePress 由社区团队继续维护。本仓库暂不迁移 VitePress，因为现有 Theme Hope、双评论区和自定义插件需要单独制定迁移方案，不能把依赖升级与站点生成器迁移混在同一次变更中；背景见 [VuePress Introduction](https://vuepress.vuejs.org/guide/introduction.html)。

### 版本变化

| 依赖或运行环境 | 升级前 | 升级后 | 说明 |
| --- | --- | --- | --- |
| Node.js | CI 使用 Node 22，项目未声明最低版本 | `>=22.18.0` | 与 VuePress rc.30 兼容要求对齐；本地验证使用 24.11.1 |
| Vue | 3.5.40 | 3.5.40 | 保持最新稳定版，不进入 3.6 RC |
| VuePress / Vite bundler | rc.24 | rc.30 | 整组升级 |
| Theme Hope / components | rc.94 | rc.107 | 与 VuePress rc.30 对齐 |
| VuePress 官方插件 | rc.112 | rc.130 | copyright、revealjs、slimsearch、PWA 同步升级 |
| Vite / 路由 / 打包器 | Vite 7 / Vue Router 4 / Rollup | Vite 8.1.5 / Vue Router 5.2.0 / Rolldown | 传递依赖，由兼容组带入 |
| sass-embedded | `^1.90.0`，锁文件为 1.90.0 | 固定 1.99.0 | 避开 1.100.0 在当前安装策略下出现的平台二进制警告 |

### 兼容性处理

- `package.json` 增加 Node.js 最低版本，并同步更新全部 VuePress、Theme Hope 与插件版本；`pnpm-lock.yaml` 随兼容组重新解析。
- VuePress 配置、Theme Hope 配置、Markdown 内容与自定义插件不需要 API 改写；既有首页、搜索、路由、评论区及样式可继续使用。
- PWA、Markdown、Mermaid 构建链中的已发布补丁通过 `pnpm-workspace.yaml` 的精确版本覆盖处理，避免把覆盖范围扩大到不相关版本。
- 没有把 `sass-embedded` 升到 1.100.0，也没有升级到 VuePress rc.31、Vue 3.6 RC 或迁移 VitePress；这些都应拆成独立变更重新评估。

### 验证记录

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 冻结锁文件安装 | 通过 | `pnpm install --frozen-lockfile`；无 peer dependency 冲突 |
| GitHub Pages 路径构建 | 通过 | `pnpm docs:check`；生成 101 个页面，检查 4745 个站内链接 |
| Vercel 根路径构建 | 通过 | `VERCEL=1 pnpm docs:check`；生成 101 个页面，检查 4745 个站内链接 |
| 桌面端浏览器 | 通过 | 首页、SlimSearch 搜索及跳转、IS5740 双评论区正常 |
| 历史评论 | 通过 | 可展开并读取 `AvalonC/MScBIS` Discussion #2 的 6 条评论 |
| 当前评论 | 通过 | 指向 `DavidYang0429/MScBIS`；无现有 Discussion 时按 Giscus 机制等待首次留言创建 |
| 移动端浏览器 | 通过 | 390 × 844 视口下首页、导航展开及基本排版正常 |
| 依赖审计 | 部分处理 | 从 23 项降至 2 项；剩余 1 项高危、1 项低危均位于 PWA 的构建期传递依赖 |

浏览器验证中出现两类预期开发提示：尚未创建当前仓库 Discussion 时，Giscus 请求返回 404 并提示将在首次留言时创建；Lit 以开发模式运行时会输出开发版本提示。初次开发页请求 `/favicon.ico` 也可能返回 404，但生产构建 HTML 已指向 `/MScBIS/assets/image/bis-navigator-logo.png`，不影响发布产物。

### 依赖审计边界

- 已覆盖 `@babel/plugin-transform-modules-systemjs`、AJV、fast-uri、js-yaml、lodash-es、markdown-it、mdast-util-to-hast、minimatch、uuid 等已发布且可保持兼容主版本的补丁。
- 剩余高危项是 `brace-expansion@2.1.2`。审计公告把完全修复版本列为 5.0.8，但 PWA 构建链中的 `minimatch@5` 要求 2.x；强行跨三个主版本覆盖会引入未验证的构建风险，因此暂不把审计数字清零。
- 剩余低危项是 `@babel/core@7.28.3`。公告要求 7.29.1，但核验时 npm 没有发布该版本；直接切换 Babel 8 会跨主版本，因此等待 Workbox／Babel 上游更新。
- 两项均来自 `@vuepress/plugin-pwa -> workbox-build` 构建路径，不是浏览器运行时直接暴露的本站业务接口。它们仍需跟踪，但不能据此宣称产品已不存在任何依赖风险。

### 发布门槛与回退

本地验证完成不等于线上发布完成。提交后仍需等待 GitHub Actions 和 Vercel Preview 同时通过，再决定是否合并；合并后还应检查 GitHub Pages 与 Vercel Production。

如需回退，应在同一个提交中同时恢复 `package.json`、`pnpm-workspace.yaml` 与 `pnpm-lock.yaml`，重新执行冻结锁文件安装和两种 base path 构建。不要只回退其中一个包，否则会重新造成 VuePress、Theme Hope 与官方插件的版本分裂。

# 系统架构更新日志

本日志记录 BIS Navigator 的站点架构、构建工具、自动化检查、部署和社区功能变化。具体包版本、兼容性判断、依赖审计与回退方式另见[依赖维护记录](./DEPENDENCY_MAINTENANCE.md)；读者可见的课程、签证、住宿等事实更新另见[内容更新日志](./CONTENT_CHANGELOG.md)。

## 当前架构概览

| 层级 | 当前实现 |
| --- | --- |
| 内容与站点生成 | Markdown 内容位于 `src/`；使用 VuePress 2 与 VuePress Theme Hope 生成静态站点 |
| 前端与构建链 | Vue 3.5、VuePress 2.0.0-rc.30、Theme Hope 2.0.0-rc.107、Vite 8、Rolldown、Vue Router 5 |
| 信息架构 | `navbar.ts` 与 `sidebar.ts` 管理栏目；自定义 `editorial-home` 插件提供编辑型首页 |
| 社区评论 | 自定义 `community-comments` 插件分开展示原项目历史评论与当前仓库新评论 |
| 内容治理 | 页面状态标签、页面级更新记录、集中内容日志、贡献指南和结构化 Issue 模板 |
| 质量检查 | 冻结锁文件安装、VuePress 构建、内部链接检查、Pull Request CI 与 Dependabot |
| 部署 | Vercel 与 GitHub Pages 双部署；分别验证根路径和 `/MScBIS/` base path |

## 2026-07-28

### VuePress 兼容组升级

- 将 VuePress 从 2.0.0-rc.24 升至 rc.30、Theme Hope 从 rc.94 升至 rc.107、官方插件从 rc.112 升至 rc.130；Vue 保持 3.5.40 稳定版。
- 构建链随兼容组更新为 Vite 8.1.5、Vue Router 5.2.0 与 Rolldown，并把 Node.js 最低版本声明为 `>=22.18.0`。
- 固定 `sass-embedded` 1.99.0，并通过精确 overrides 处理兼容范围内已有修复的传递依赖；没有强行跨主版本覆盖尚未兼容的 PWA 构建依赖。
- 保留 VuePress／Theme Hope、编辑型首页、双评论区和现有 Markdown 架构；没有把依赖升级与 VitePress 迁移混在同一变更中。
- 完成冻结锁文件安装、GitHub Pages 与 Vercel 两种 base path 构建、桌面／移动端页面、搜索、路由及双评论区检查。详细证据与剩余依赖风险见依赖维护记录。

## 2026-07-26

### 评论、质量检查与维护入口

- 新增 `community-comments` 插件：旧评论继续从 `AvalonC/MScBIS` 只读展示，新评论写入 `DavidYang0429/MScBIS`，避免迁移历史评论或改变原作者归属。
- 建立冻结锁文件构建与内部链接检查脚本，并把检查加入 Pull Request 工作流。
- 新增 Dependabot 月度检查、Pull Request 模板、内容过期与课程评价 Issue 模板、贡献指南和社交分享图。
- 新增内容状态规则，为当前资料、历史经验、待复核与社区档案建立统一标记和维护边界。

### 编辑型首页与信息架构重构

- 新增 `editorial-home` 自定义插件，重建桌面、平板和移动端首页层级，并加入 2026/27 专题入口。
- 重组顶部导航与侧边栏，将 Reference、Career、课程方向和学习资源纳入统一信息架构。
- 更新站点主题、样式、品牌图形、首页可见内容和社交预览；历史文章路径与署名继续保留。
- 调整 GitHub Pages 构建流程、canonical base path 和 Vercel Production 配置，使两种部署路径使用同一套内容源。

## 2023-09 至 2025-11：原项目架构里程碑

以下根据 Git 提交摘要归档，只用于定位历史演进；旧版本号和当时的运行状态应回到对应提交核对。

| 时间 | 架构里程碑 |
| --- | --- |
| 2025-01 | 更新站点框架、图标与构建依赖 |
| 2024-03 至 2024-06 | 多次同步 VuePress／Theme Hope，修复导航和图片，并继续维护 PWA |
| 2024-01 | 修复 PWA，调整 Content Security Policy |
| 2023-11 | 切换至 VuePress 2.0 RC，统一 pnpm 构建并首次发布 GitHub Pages |
| 2023-10 | 建立 PWA、搜索、评论、字体、主题样式及 Vercel 部署基础 |
| 2023-09 | 创建项目初版与基础目录结构 |

自动生成的 `gh-pages` 部署提交不单列为架构变更；需要精确回溯时，以 Git 历史和当时的配置文件为准。

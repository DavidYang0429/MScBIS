# 依赖维护记录

## 当前基线

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

## 暂不升级的依赖

`vuepress-theme-hope` 2.0.0-rc.107 要求 VuePress 2.0.0-rc.30 及整组 2.0.0-rc.130 插件，不能作为单包小版本更新。当前站点仍在 VuePress 2 RC 体系内，单独升级主题会造成 peer dependency 分裂，因此本轮不做跨整组迁移。

当前主题依赖链仍会安装已弃用的 `mathjax-full@3.2.2`，即使本站 `markdown.math` 已关闭。要彻底切换到 MathJax 4 的 `@mathjax/src`，需要和 VuePress／Theme Hope 整组升级一起处理；不应在没有数学内容需求时单独打开或改写数学渲染链路。

`sass-embedded` 1.100.0 在当前 pnpm 11 安装策略下会出现平台二进制未正确链接的警告，因此锁文件暂时保留已通过构建验证的 1.90.0。后续可由 Dependabot 提交独立升级 PR，再以干净安装和 Vercel Preview 验证是否能够放行。

## 后续升级门槛

整组升级前至少需要：

1. 新建独立升级分支；
2. 使用冻结锁文件安装；
3. 完成 `pnpm docs:check`；
4. 检查首页、Reference、MIS、FIT、选修课和评论区；
5. 等待 Vercel Preview 与 GitHub Actions 同时通过。

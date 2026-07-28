# BIS Navigator

由 CityU MSc Business Information Systems 在读生与校友共同维护的中文学生手册，内容涵盖专业方向、课程选择、校内系统、实习发展与历届经验。

> 本项目为民间维护，不代表 City University of Hong Kong 官方立场。高时效信息请始终以学校、学院、学系及课程教师发布的内容为准。

在线阅读：[BIS Navigator](https://mscbis.vercel.app/)

发现内容过期、想补充课程评价或参与维护，请阅读 [贡献指南](./CONTRIBUTING.md)。页面底部直接展示带原作者、发布日期和来源链接的旧站历史评论，并在其后提供当前评论区。

## 内容状态

本站将内容区分为当前已核验资料、历史经验、待复核资料和社区档案。课程开设、教师、考核、名额、签证、住宿和认证等高时效信息，必须同时写明适用学年、核验日期与官方来源。

完整规则见 [内容状态与维护规则](./CONTENT_MAINTENANCE.md)。

依赖升级边界与当前技术基线见 [依赖维护记录](./DEPENDENCY_MAINTENANCE.md)。

## 更新日志

- [内容更新日志](./CONTENT_CHANGELOG.md)：集中记录项目要求、课程、入学注册、签证住宿、实习就业与学习资源的核验历史。
- [系统架构更新日志](./ARCHITECTURE_CHANGELOG.md)：单独记录站点架构、构建链、评论、自动检查与部署变化。

README 只保留日志入口和当前概览；具体页面的更新记录继续放在页面底部，依赖版本、审计边界与回退方式继续由依赖维护记录承载。

## 与原项目的关系和区别

本仓库基于 [AvalonC/MScBIS](https://github.com/AvalonC/MScBIS) 继续维护，保留历史文章的原作者与届别署名，也继续保留原项目 GitHub Discussions 中的历史评论。以下比较以原项目 `main` 分支截至 2026-02-12 的状态为基线。

### 内容维护差异

- 原项目积累的课程评价、校园系统说明与学生经验继续作为历史资料保留；本仓库新增 2026/27 学年的入学、住宿、选课、实习、IANG、AI 与学术诚信等专题导航。
- 本仓库将“当前官方事实”“历届学生经验”“历史材料”和“待复核内容”分开标注。课程、教师、考核、签证、住宿及认证等高时效信息，需要注明适用学年、核验日期与官方来源。
- 历史评论从 `AvalonC/MScBIS` 生成带原作者、发布日期、回复关系和来源链接的本地归档；新的提问、纠错与经验补充写入 `DavidYang0429/MScBIS`，不转移或重新署名旧评论。
- 本仓库增加内容过期反馈、课程评价模板、贡献规范和内容维护规则，方便后续维护者持续复核，而不是把一次更新视为永久有效。

### 技术版本与工程维护差异

| 项目 | 原项目基线 | 本仓库当前基线 |
| --- | --- | --- |
| Vue | 3.5.18 | 3.5.40 |
| VuePress | 2.0.0-rc.24 | 2.0.0-rc.30 |
| VuePress Theme Hope | 2.0.0-rc.94 | 2.0.0-rc.107 |
| VuePress 官方插件 | 2.0.0-rc.112 | 2.0.0-rc.130 |
| 构建链 | Vite 7 | Vite 8、Rolldown、Vue Router 5 |
| 工程检查 | 基础构建与部署 | 冻结锁文件安装、构建、内部链接检查、Dependabot、Pull Request CI 与双部署验证 |

本仓库还增加了编辑型首页、历史评论归档、当前 Giscus 评论区和企业资格检测（当前未启用）等自定义 VuePress 插件。完整的升级原因、Breaking Changes、验证证据、暂缓项和回退方式统一记录在 [依赖维护记录](./DEPENDENCY_MAINTENANCE.md) 中。

## 本地开发

```bash
pnpm install
pnpm docs:dev
```

构建静态站点：

```bash
pnpm docs:check
```

## 内容来源与授权

- 官方课程与项目事实来自公开的 CityU 页面和课程文件，并在页面中保留来源链接。
- 学生经验按学年归档，仅作为个人经验参考。
- 本仓库基于 [AvalonC/MScBIS](https://github.com/AvalonC/MScBIS) 继续维护；原项目 `package.json` 声明 MIT，本仓库已补充可由 GitHub 识别的 [MIT License](./LICENSE)。
- 历史文章继续保留原作者与届别署名；许可文件中的 `MScBIS contributors` 指项目历届贡献者，不将全部内容归属于单一个人。

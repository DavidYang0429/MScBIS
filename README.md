# BIS Navigator

由 CityU MSc Business Information Systems 在读生与校友共同维护的中文学生手册，内容涵盖专业方向、课程选择、校内系统、实习发展与历届经验。

> 本项目为民间维护，不代表 City University of Hong Kong 官方立场。高时效信息请始终以学校、学院、学系及课程教师发布的内容为准。

在线阅读：[BIS Navigator](https://mscbis.vercel.app/)

发现内容过期、想补充课程评价或参与维护，请阅读 [贡献指南](./CONTRIBUTING.md)。页面底部的社区讨论分为旧站历史评论与新评论区，历史评论继续保留原作者和 Discussion 记录。

## 内容状态

本站将内容区分为当前已核验资料、历史经验、待复核资料和社区档案。课程开设、教师、考核、名额、签证、住宿和认证等高时效信息，必须同时写明适用学年、核验日期与官方来源。

完整规则见 [内容状态与维护规则](./CONTENT_MAINTENANCE.md)。

依赖升级边界与当前技术基线见 [依赖维护记录](./DEPENDENCY_MAINTENANCE.md)。

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

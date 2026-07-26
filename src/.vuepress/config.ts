import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

import { communityCommentsPlugin } from "./plugins/community-comments";
import { enterpriseApplicationPlugin } from "./plugins/enterprise-application";
import { editorialHomePlugin } from "./plugins/editorial-home";

const isVercelBuild = process.env.VERCEL === "1";

export default defineUserConfig({
  base: isVercelBuild ? "/" : "/MScBIS/",
  lang: "zh-CN",
  title: "BIS Navigator",
  description:
    "面向 CityUHK MSc Business Information Systems 学生的中文手册：入学生活、MIS/FIT 课程、选课、实习与历届经验。",

  theme,
  // Enable it with pwa
  shouldPrefetch: false,


  plugins: [
    communityCommentsPlugin(),
    editorialHomePlugin(),
    enterpriseApplicationPlugin({
      dataPath: "/test.csv", // 相对于public目录
      // defaultCompanies: [
      //   "默认公司1",
      //   "默认公司2"
      // ]
    }),
  ],
});

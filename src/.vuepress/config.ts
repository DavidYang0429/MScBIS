import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

import { enterpriseApplicationPlugin } from "./plugins/enterprise-application";
import { editorialHomePlugin } from "./plugins/editorial-home";

export default defineUserConfig({
  base: "/MScBIS/",
  lang: "zh-CN",
  title: "BIS Navigator",
  description: "由城大 BIS 在读生与校友共同维护的中文学生手册",

  theme,
  // Enable it with pwa
  shouldPrefetch: false,


  plugins: [
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

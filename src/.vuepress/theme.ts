import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://DavidYang0429.github.io/MScBIS/",

  author: {
    name: "BIS Navigator",
  },

  favicon: "/assets/image/bis-navigator-logo.png",


  logo: "/assets/image/bis-navigator-logo.png",

  repo: "DavidYang0429/MScBIS",

  docsDir: "src",

  // navbar
  navbar,

  repoDisplay: false,

  darkmode: "disable",

  // sidebar
  sidebar,

  breadcrumb: false,

  footer: "民间维护 · 非 CityU 官方网站 · 资料仅供学习交流与参考",

  displayFooter: true,

  // encrypt: {
  //   config: {
  //     "/demo/encrypt.html": ["1234"],
  //   },
  // },

  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页(仅限维护组)",
  },

  blog: {
    timeline: "暂无更新",
  },

  // All features are enabled for demo, only preserve features you need here
  markdown: {
    align: true,
    attrs: true,
    chartjs: false,
    codeTabs: true,
    demo: false,
    echarts: false,
    figure: true,
    flowchart: false,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    math: false,
    mark: false,
    mermaid: true,
    playground: {
      presets: ["ts", "vue"],
    },
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    tasklist: true,
    sub: false,
    sup: true,
    tabs: true,
    vPre: false,
    vuePlayground: false,
    revealjs:{
      plugins: ["zoom", "highlight", "search"],
      themes: ["sky"],
    }
  },

  plugins: {
    icon:{ 
      assets: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css"
    },
    blog: true,
    // You should generate and use your own comment service    
    comment: {
      provider: "Giscus",
      repo: "DavidYang0429/MScBIS",
      repoId: "R_kgDOTjvYPg",
      category: "Announcements",
      categoryId: "DIC_kwDOTjvYPs4DB_Ih",
    },

        components: {
      components: [
        "VPBanner",
        "VPCard",
        "Badge"
      ],
    },

    copyright: {
      global: true,
      disableSelection: false,
    },

    // notice: [
    //     {
    //       path: "/",
    //       title: "🧭BIS Navigator 2025招募启动！",
    //       content: "一同来建设更好平台！",
    //       actions: [
    //         {
    //           text: "了解详情",
    //           link: "/General/recurit.md",
    //           type: "primary",
    //         },
    //       ],
    //       confirm: true,
    //       showOnce:false
    //     }
    //   ],


    slimsearch: true,
    // uncomment these if you want a pwa
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   appendBase: true,
    //   update: "hint",
    //   themeColor: "#b01861",
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //   },
    // },
  },
});

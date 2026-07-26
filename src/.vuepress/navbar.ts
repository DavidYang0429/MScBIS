import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "新生上手",
    link: "/General/greenhand.html",
    icon: "bi-compass",
  },
  {
    text: "入学与生活",
    icon: "bi-map",
    children: [
      {
        text: "总体参考",
        children: [
          { text: "参考资料总览", icon: "bi-map", link: "/Reference/" },
          { text: "行前与学生签证", icon: "bi-passport", link: "/Reference/before-arrival.html" },
          { text: "城大注册与学生证", icon: "bi-person-vcard", link: "/Reference/cityu-onboarding.html" },
          { text: "AIMS 选课与课表", icon: "bi-calendar-check", link: "/Reference/course-registration.html" },
        ],
      },
      {
        text: "抵港生活",
        children: [
          { text: "宿舍、租房与盖印", icon: "bi-house-door", link: "/Reference/housing.html" },
          { text: "HKID、通信与银行", icon: "bi-phone", link: "/Reference/arrival.html" },
          { text: "付款与信息安全", icon: "bi-shield-check", link: "/Reference/safety.html" },
        ],
      },
    ],
  },
  {
    text: "课程与选课",
    icon: "bi-journal-bookmark",
    children: [
      {
        text: "专业方向",
        children: [
          { text: "MIS 管理智能系统", icon: "bi-diagram-3", link: "/MIS/" },
          { text: "FIT 金融与智能科技", icon: "bi-diagram-3", link: "/FIT/" },
          { text: "共享选修课", icon: "bi-collection", link: "/elective/" },
        ],
      },
      {
        text: "选课指南",
        prefix: "/Useful/CourseEnroll/",
        children: [
          { text: "选课基本流程", icon: "bi-signpost-split", link: "how_to" },
          { text: "选课规则与提示", icon: "bi-info-circle", link: "useful_data" },
          { text: "课程数量与时间安排", icon: "bi-calendar-week", link: "time_arrangement" },
          { text: "CityU Schedule Planner", icon: "bi-calendar3", link: "extension" },
        ],
      },
    ],
  },
  {
    text: "学在城大",
    icon: "bi-building",
    children: [
      {
        text: "校内系统",
        prefix: "/Tech/",
        children: [
          { text: "CityU Portal", icon: "bi-grid", link: "CityU_Portal" },
          { text: "Canvas", icon: "bi-easel2", link: "Canvas" },
          { text: "信息技术服务", icon: "bi-pc-display", link: "it_services" },
        ],
      },
      {
        text: "学习与认证",
        prefix: "/Useful/Learning/",
        children: [
          { text: "BIS 资料与官方资源", icon: "bi-hdd-network", link: "BIS_resource" },
          { text: "AI 使用与学术诚信", icon: "bi-shield-check", link: "ai_academic_integrity" },
          { text: "留服认证", icon: "bi-file-earmark-check", link: "cscse_reco" },
          { text: "转换专业认证", icon: "bi-person-vcard", link: "trans_mse_tutorial" },
        ],
      },
    ],
  },
  {
    text: "实习与发展",
    icon: "bi-briefcase",
    children: [
      { text: "职业与实习导航", icon: "bi-compass", link: "/Career/" },
      { text: "实习与校内职业服务", icon: "bi-buildings", link: "/Career/internship-and-services.html" },
      { text: "非本地生工作与 IANG", icon: "bi-person-workspace", link: "/Career/work-and-iang.html" },
      { text: "商业实习课程", icon: "bi-buildings", link: "/elective/IS5/IS5238.html" },
      { text: "就业方向", icon: "bi-signpost", link: "/General/greenhand.html#就业方向" },
      { text: "校友寄言", icon: "bi-chat-quote", link: "/General/alumni_share.html" },
      { text: "研究生交换项目", icon: "bi-send-check", link: "/Useful/CourseEnroll/pgce.html" },
    ],
  },
  {
    text: "关于与共建",
    icon: "bi-people",
    children: [
      { text: "关于本站", icon: "bi-info-circle", link: "/General/about.html" },
      { text: "参与维护", icon: "bi-github", link: "/General/recurit.html" },
      { text: "致谢", icon: "bi-heart", link: "/General/appreciate.html" },
      { text: "名人堂", icon: "bi-award", link: "/General/Hall_of_Fame.html" },
    ],
  },
]);

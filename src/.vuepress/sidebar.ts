import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/MIS/": [
    "/MIS/",
    {
      text: "必修课程",
      icon: "bi-file-earmark-check-fill",
      prefix: "Core_Course/",
      children: "structure"
    },
    {
      text: "专属选修课程",
      icon: "bi-file-earmark-check",
      prefix: "MIS_Elective/",
      children: "structure"
    }
  ],
  "/FIT/": [
    "/FIT/",
    {
      text: "必修课程",
      icon: "bi-file-earmark-check-fill",
      prefix: "Core_Course/",
      children: "structure"
    },
    {
      text: "专属选修课程",
      icon: "bi-file-earmark-check",
      prefix: "FIT_Elective/",
      children: "structure"
    },
  ],
  "/elective/": [
    "/elective/",
    {
      text: "人工智能专题",
      icon: "bi-stars",
      children: ["IS6/IS6423", "IS6/IS6620", "/FIT/Core_Course/IS5542"],
    },
    {
      text: "5000 级课程",
      icon: "bi-5-square",
      prefix: "IS5/",
      children: "structure",
    },
    {
      text: "6000 级课程",
      icon: "bi-6-square",
      prefix: "IS6/",
      children: "structure",
    },
  ],
});

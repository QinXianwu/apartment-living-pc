// 页面的指导，格式 route.name:steps
export default {
  // 概况页的指导
  BasicFacts: () => [
    {
      title: "云系统",
      element: document.querySelector(".mta_sys_switch"),
      intro: "此处切换多个云系统! ",
    },
    {
      title: "全局搜索",
      element: document.querySelector(".SearchUser"),
      intro: "此处可以进行整个系统的相关搜索! ",
    },
    {
      title: "全屏",
      element: document.querySelector("#screenfull"),
      intro: "全屏操作系统! ",
    },
    {
      title: "展开/收起",
      element: document.querySelector(".hamburger-container"),
      intro: "此处可以展开和收起侧边菜单栏",
    },
  ],
};

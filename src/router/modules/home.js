import MainLayout from "@/layouts/MainLayout/index";
import BasicFacts from "@/views/Home/views/BasicFacts/index.vue";
// import PERMISSION_ID from "@/permission/PERMISSION_ID";

export default {
  path: "/Home",
  component: MainLayout,
  redirect: "/Home/BasicFacts",
  meta: {
    title: "首页",
    icon: "data_panel",
    affix: true,
    // PermissionId: PERMISSION_ID.Home,
    notPassPermissionVerify: true,
  },
  children: [
    {
      path: "BasicFacts",
      component: BasicFacts,
      name: "BasicFacts",
      meta: {
        title: "概况",
        // PermissionId: PERMISSION_ID.Home,
        notPassPermissionVerify: true,
      },
    },
  ],
};

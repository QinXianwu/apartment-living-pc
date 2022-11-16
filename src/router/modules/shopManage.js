// import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import PageEditor from "@/views/ShopManage/views/PageEditor/index.vue";
export default {
  path: "/ShopManage",
  component: MainLayout,
  redirect: "/ShopManage/PageEditor",
  meta: {
    title: "店铺管理",
    icon: "shop",
    affix: true,
  },
  children: [
    {
      path: "PageEditor",
      component: PageEditor,
      name: "PageEditor",
      meta: {
        title: "店铺管理",
        // PermissionId: PERMISSION_ID.ShopManage_PageEditor,
      },
    },
  ],
};

// import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import List from "@/views/VendorManage/views/List/index.vue";

export default {
  path: "/VendorManage",
  component: MainLayout,
  redirect: "/VendorManage/List",
  alwaysShow: true,
  meta: {
    title: "供应商管理",
    icon: "data-user",
    affix: true,
    // PermissionId: PERMISSION_ID.UserHub,
  },
  children: [
    {
      path: "List",
      component: List,
      name: "VendorList",
      meta: {
        title: "供应商列表",
        // PermissionId: PERMISSION_ID.Goods_List,
      },
    },
  ],
};

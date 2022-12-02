import MainLayout from "@/layouts/MainLayout/index";
import GoodsList from "@/views/Goods/views/List/index.vue";
import PERMISSION_ID from "@/permission/PERMISSION_ID";

export default {
  path: "/Goods",
  component: MainLayout,
  redirect: "/Goods/List",
  meta: {
    title: "商品管理",
    icon: "data_panel",
    affix: true,
    PermissionId: PERMISSION_ID.Goods,
  },
  children: [
    {
      path: "List",
      component: GoodsList,
      name: "GoodsList",
      meta: {
        title: "商品列表",
        PermissionId: PERMISSION_ID.Goods_List,
      },
    },
  ],
};

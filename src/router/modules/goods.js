import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import GoodsList from "@/views/Goods/views/List/index.vue";
import GoodsCategory from "@/views/Goods/views/Category/index.vue";

export default {
  path: "/Goods",
  component: MainLayout,
  redirect: "/Goods/List",
  meta: {
    title: "商品管理",
    icon: "goods",
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
        // PermissionId: PERMISSION_ID.Goods_List,
      },
    },
    {
      path: "Category",
      component: GoodsCategory,
      name: "GoodsCategory",
      meta: {
        title: "商品分类",
        // PermissionId: PERMISSION_ID.Goods_List,
      },
    },
  ],
};

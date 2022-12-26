import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import List from "@/views/Goods/views/List/index.vue";
import Edit from "@/views/Goods/views/Edit/index.vue";
import Audit from "@/views/Goods/views/Audit/index.vue";
import GoodsCategory from "@/views/Goods/views/Category/index.vue";
import Specification from "@/views/Goods/views/Specification/index.vue";

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
      component: List,
      name: "GoodsList",
      meta: {
        title: "商品列表",
        PermissionId: PERMISSION_ID.Goods_List,
      },
    },
    {
      path: "Edit",
      component: Edit,
      name: "GoodsEdit",
      hidden: true,
      meta: {
        title: "商品发布",
        PermissionId: PERMISSION_ID.Goods_Category,
      },
    },
    {
      path: "Category",
      component: GoodsCategory,
      name: "GoodsCategory",
      meta: {
        title: "商品分类",
        PermissionId: PERMISSION_ID.Goods_Specification,
      },
    },
    {
      path: "Specification",
      component: Specification,
      name: "Specification",
      meta: {
        title: "商品规格",
        PermissionId: PERMISSION_ID.Goods_Edit,
      },
    },
    {
      path: "Audit",
      component: Audit,
      name: "Audit",
      meta: {
        title: "商品审核",
        PermissionId: PERMISSION_ID.Goods_Audit,
      },
    },
  ],
};

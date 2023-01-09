// import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import PurchaseOrder from "@/views/Order/views/Purchase/index.vue";
import SendGoodsOrder from "@/views/Order/views/SendGoods/index.vue";

export default {
  path: "/Order",
  component: MainLayout,
  redirect: "/Order/PurchaseOrder",
  alwaysShow: true,
  meta: {
    title: "订单管理",
    icon: "order_search",
    affix: true,
    // PermissionId: PERMISSION_ID.UserHub,
  },
  children: [
    {
      path: "PurchaseOrder",
      component: PurchaseOrder,
      name: "PurchaseOrder",
      meta: {
        title: "采购订单",
        // PermissionId: PERMISSION_ID.Goods_List,
      },
    },
    {
      path: "SendGoodsOrder",
      component: SendGoodsOrder,
      name: "SendGoodsOrder",
      meta: {
        title: "配送订单",
        // PermissionId: PERMISSION_ID.Goods_List,
      },
    },
  ],
};

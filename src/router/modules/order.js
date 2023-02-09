import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import PurchaseOrder from "@/views/Order/views/Purchase/index.vue";
import OrderDetail from "@/views/Order/views/OrderDetail/index.vue";
import SendGoodsOrder from "@/views/Order/views/SendGoods/index.vue";
import SendSetUp from "@/views/Order/views/SendSetUp/index.vue";

export default {
  path: "/Order",
  component: MainLayout,
  redirect: "/Order/PurchaseOrder",
  alwaysShow: true,
  meta: {
    title: "订单管理",
    icon: "order_search",
    affix: true,
    PermissionId: PERMISSION_ID.Order,
  },
  children: [
    {
      path: "PurchaseOrder",
      component: PurchaseOrder,
      name: "PurchaseOrder",
      meta: {
        title: "采购订单",
        PermissionId: PERMISSION_ID.Order_PurchaseOrder,
      },
    },
    {
      path: "OrderDetail",
      component: OrderDetail,
      name: "OrderDetail",
      hidden: true,
      meta: {
        title: "订单详情",
        // PermissionId: PERMISSION_ID.Order_OrderDetail,
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
    {
      path: "SendSetUp",
      component: SendSetUp,
      name: "SendSetUp",
      meta: {
        title: "配送设置",
        // PermissionId: PERMISSION_ID.Order_SendGoodsSetUp,
      },
    },
  ],
};

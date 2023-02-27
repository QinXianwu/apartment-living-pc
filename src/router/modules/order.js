import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import PurchaseOrder from "@/views/Order/views/Purchase/index.vue";
import OrderDetail from "@/views/Order/views/OrderDetail/index.vue";
import SendGoodsOrder from "@/views/Order/views/SendGoods/index.vue";
import SelfPickupOrder from "@/views/Order/views/SelfPickup/index.vue";
import PointsOrder from "@/views/Order/views/PointsOrder/index.vue";
import GroupOrder from "@/views/Order/views/GroupOrder/index.vue";
import AfterSales from "@/views/Order/views/AfterSales/index.vue";
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
      path: "SelfPickupOrder",
      component: SelfPickupOrder,
      name: "SelfPickupOrder",
      meta: {
        title: "自提订单",
        // PermissionId: PERMISSION_ID.Goods_List,
      },
    },
    {
      path: "PointsOrder",
      component: PointsOrder,
      name: "PointsOrder",
      meta: {
        title: "积分订单",
        // PermissionId: PERMISSION_ID.Goods_List,
      },
    },
    {
      path: "GroupOrder",
      component: GroupOrder,
      name: "GroupOrder",
      meta: {
        title: "拼团订单",
        // PermissionId: PERMISSION_ID.Goods_List,
      },
    },
    {
      path: "AfterSales",
      component: AfterSales,
      name: "AfterSales",
      meta: {
        title: "售后订单",
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

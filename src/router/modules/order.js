import PERMISSION_ID from "@/permission/PERMISSION_ID";
import OrderRouterChildren from "../config/order";
import MainLayout from "@/layouts/MainLayout/index";

export default {
  path: "/Order",
  component: MainLayout,
  redirect: "/404",
  meta: {
    title: "订单出票",
    icon: "order",
    affix: true,
    PermissionId: PERMISSION_ID.Order,
  },
  children: OrderRouterChildren,
};

import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
// import ReadyMoney from "@/views/OrderRefund/views/ReadyMoney/index.vue";
import NonReadyMoney from "@/views/OrderRefund/views/NonReadyMoney/index.vue";
import LogisticsManagement from "@/views/OrderRefund/views/LogisticsManagement/index.vue";

export default {
  path: "/OrderRefund",
  component: MainLayout,
  redirect: "/OrderRefund/ReadyMoney",
  alwaysShow: true,
  meta: {
    title: "订单退票",
    icon: "refund",
    affix: true,
    PermissionId: PERMISSION_ID.Order_Ticket_Return,
  },
  children: [
    // {
    //   path: "ReadyMoney",
    //   component: ReadyMoney,
    //   name: "ReadyMoney",
    //   meta: {
    //     title: "现金退票",
    //     PermissionId: PERMISSION_ID.Order_Ticket_Return_Cash,
    //   },
    // },
    {
      path: "NonReadyMoney",
      component: NonReadyMoney,
      name: "NonReadyMoney",
      meta: {
        title: "非现金退票",
        PermissionId: PERMISSION_ID.Order_Ticket_Return_NotCash,
      },
    },
    {
      path: "LogisticsManagement",
      component: LogisticsManagement,
      name: "LogisticsManagement",
      meta: {
        title: "快递发件",
      },
    },
  ],
};

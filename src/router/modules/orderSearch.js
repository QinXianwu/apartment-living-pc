import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import TicketsSearch from "@/views/OrderSearch/views/TicketsSearch/index.vue";
import Refund from "@/views/OrderSearch/views/Refund/index.vue";
import RefundDetails from "@/views/OrderSearch/views/RefundDetails/index.vue";
import ReimbursementVoucher from "@/views/OrderSearch/views/ReimbursementVoucher/index.vue";
import DaySalePointSettlement from "@/views/OrderSearch/views/DaySalePointSettlement/index.vue";
import HourSalePointSettlement from "@/views/OrderSearch/views/HourSalePointSettlement/index.vue";
import SupplierPayList from "@/views/OrderSearch/views/SupplierPayList/index.vue";
import BackCommissionSettlement from "@/views/OrderSearch/views/BackCommissionSettlement/index.vue";
import AbnormalSettlement from "@/views/OrderSearch/views/AbnormalSettlement/index.vue";

export default {
  path: "/OrderSearch",
  component: MainLayout,
  redirect: "/OrderSearch/TicketsSearch",
  alwaysShow: true,
  meta: {
    title: "订单查询",
    icon: "order_search",
    affix: true,
    PermissionId: PERMISSION_ID.Order_Query,
  },
  children: [
    {
      path: "TicketsSearch",
      component: TicketsSearch,
      name: "TicketsSearch",
      meta: {
        title: "出票查询&回填信息修改",
        PermissionId: PERMISSION_ID.Order_Query_Ticketing,
      },
    },
    {
      path: "Refund",
      component: Refund,
      name: "Refund",
      meta: {
        title: "退票查询",
        PermissionId: PERMISSION_ID.Order_Query_TicketingReturn,
      },
    },
    {
      path: "RefundDetails",
      component: RefundDetails,
      name: "RefundDetails",
      meta: {
        title: "退票费明细查询",
      },
    },
    {
      path: "ReimbursementVoucher",
      component: ReimbursementVoucher,
      name: "ReimbursementVoucher",
      meta: {
        title: "取报销凭证查询",
      },
    },
    {
      path: "DaySalePointSettlement",
      component: DaySalePointSettlement,
      name: "DaySalePointSettlement",
      meta: {
        title: "每日代售点结算查询",
        PermissionId: PERMISSION_ID.Order_Query_DaySalePoint,
      },
    },
    {
      path: "HourSalePointSettlement",
      component: HourSalePointSettlement,
      name: "HourSalePointSettlement",
      meta: {
        title: "分时代售点结算查询",
        PermissionId: PERMISSION_ID.Order_Query_HourSalePoint,
      },
    },
    {
      path: "SupplierPayList",
      component: SupplierPayList,
      name: "SupplierPayList",
      meta: {
        title: "供应商合并打款记录",
      },
    },
    {
      path: "BackCommissionSettlement",
      component: BackCommissionSettlement,
      name: "BackCommissionSettlement",
      meta: {
        title: "返佣结算查询",
      },
    },
    {
      path: "AbnormalSettlement",
      component: AbnormalSettlement,
      name: "AbnormalSettlement",
      meta: {
        title: "异常结算查询",
      },
    },
  ],
};

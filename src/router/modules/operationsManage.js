// import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import Coupons from "@/views/OperationsManage/views/Coupons/index.vue";
import CouponHub from "@/views/OperationsManage/views/CouponHub/index.vue";

export default {
  path: "/OperationsManage",
  component: MainLayout,
  redirect: "/OperationsManage/Coupons",
  alwaysShow: true,
  meta: {
    title: "运营管理",
    icon: "operations",
    affix: true,
    // PermissionId: PERMISSION_ID.Order,
  },
  children: [
    {
      path: "Coupons",
      component: Coupons,
      name: "Coupons",
      meta: {
        title: "优惠劵",
        // PermissionId: PERMISSION_ID.Order_PurchaseOrder,
      },
    },
    {
      path: "CouponHub",
      component: CouponHub,
      name: "CouponHub",
      meta: {
        title: "领劵中心",
        // PermissionId: PERMISSION_ID.Order_PurchaseOrder,
      },
    },
  ],
};

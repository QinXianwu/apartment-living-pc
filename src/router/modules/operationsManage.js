import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import Coupons from "@/views/OperationsManage/views/Coupons/index.vue";
import CouponHub from "@/views/OperationsManage/views/CouponHub/index.vue";
import NewcomerActivities from "@/views/OperationsManage/views/NewcomerActivities/index.vue";
import FastDeals from "@/views/OperationsManage/views/FastDeals/index.vue";

export default {
  path: "/OperationsManage",
  component: MainLayout,
  redirect: "/OperationsManage/Coupons",
  alwaysShow: true,
  meta: {
    title: "运营管理",
    icon: "operations",
    affix: true,
    PermissionId: PERMISSION_ID.OperationsManage,
  },
  children: [
    {
      path: "Coupons",
      component: Coupons,
      name: "Coupons",
      meta: {
        title: "优惠劵",
        PermissionId: PERMISSION_ID.OperationsManage_Coupons,
      },
    },
    {
      path: "CouponHub",
      component: CouponHub,
      name: "CouponHub",
      meta: {
        title: "领劵中心",
        PermissionId: PERMISSION_ID.OperationsManage_CouponHub,
      },
    },
    {
      path: "NewcomerActivities",
      component: NewcomerActivities,
      name: "NewcomerActivities",
      meta: {
        title: "新人活动",
        PermissionId: PERMISSION_ID.OperationsManage_NewcomerActivities,
      },
    },
    {
      path: "FastDeals",
      component: FastDeals,
      name: "FastDeals",
      meta: {
        title: "秒杀活动",
        notPassPermissionVerify: true,
        PermissionIds: [
          PERMISSION_ID.OperationsManage_FastDeals_SessionCount,
          PERMISSION_ID.OperationsManage_FastDeals_ActivityList,
        ],
      },
    },
  ],
};

import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import Coupons from "@/views/OperationsManage/views/Coupons/index.vue";
import CouponHub from "@/views/OperationsManage/views/CouponHub/index.vue";
import NewcomerActivities from "@/views/OperationsManage/views/NewcomerActivities/index.vue";
import FastDeals from "@/views/OperationsManage/views/FastDeals/index.vue";
import DiscountActivity from "@/views/OperationsManage/views/DiscountActivity/index.vue";
import FeedbackList from "@/views/OperationsManage/views/FeedbackList/index.vue";
import RecruiterList from "@/views/OperationsManage/views/RecruiterList/index.vue";
import CourierManage from "@/views/OperationsManage/views/CourierManage/index.vue";

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
    {
      path: "DiscountActivity",
      component: DiscountActivity,
      name: "DiscountActivity",
      meta: {
        title: "折扣活动",
        PermissionId: PERMISSION_ID.OperationsManage_DiscountActivity,
      },
    },
    {
      path: "CourierManage",
      component: CourierManage,
      name: "CourierManage",
      meta: {
        title: "配送员列表",
        // PermissionId: PERMISSION_ID.OperationsManage_CourierManage,
      },
    },
    {
      path: "FeedbackList",
      component: FeedbackList,
      name: "FeedbackList",
      meta: {
        title: "意见反馈",
        // PermissionId: PERMISSION_ID.OperationsManage_FeedbackList,
      },
    },
    {
      path: "RecruiterList",
      component: RecruiterList,
      name: "RecruiterList",
      meta: {
        title: "招聘记录",
        // PermissionId: PERMISSION_ID.OperationsManage_RecruiterList,
      },
    },
  ],
};

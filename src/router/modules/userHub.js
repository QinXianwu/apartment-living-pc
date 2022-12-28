import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import List from "@/views/UserHub/views/List/index.vue";
import PointsSetting from "@/views/UserHub/views/PointsSetting/index.vue";

export default {
  path: "/userHub",
  component: MainLayout,
  redirect: "/userHub/List",
  alwaysShow: true,
  meta: {
    title: "用户中心",
    icon: "data-user",
    affix: true,
    PermissionId: PERMISSION_ID.UserHub,
  },
  children: [
    {
      path: "List",
      component: List,
      name: "UserHubList",
      meta: {
        title: "用户列表",
        PermissionId: PERMISSION_ID.Goods_List,
      },
    },
    {
      path: "PointsSetting",
      component: PointsSetting,
      name: "PointsSetting",
      meta: {
        title: "积分设置",
        notPassPermissionVerify: true,
      },
    },
  ],
};

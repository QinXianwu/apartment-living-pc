import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import List from "@/views/ServiceStationManage/views/List/index.vue";

export default {
  path: "/ServiceStationManage",
  component: MainLayout,
  redirect: "/ServiceStationManage/List",
  alwaysShow: true,
  meta: {
    title: "服务点管理",
    icon: "serviceStation",
    affix: true,
    PermissionId: PERMISSION_ID.ServiceStationManage,
  },
  children: [
    {
      path: "List",
      component: List,
      name: "ServiceStationList",
      meta: {
        title: "服务点列表",
        PermissionId: PERMISSION_ID.ServiceStationManage_List,
      },
    },
  ],
};

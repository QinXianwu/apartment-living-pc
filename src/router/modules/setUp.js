import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import AccountRoleManage from "@/views/SetUp/views/AccountRoleManage/index";

export default {
  path: "/SetUp",
  component: MainLayout,
  redirect: "/SetUp",
  name: "SetUp",
  alwaysShow: true,
  meta: {
    title: "系统设置",
    icon: "setup",
    PermissionId: PERMISSION_ID.SetUp,
  },
  children: [
    {
      path: "AccountRoleManage",
      component: AccountRoleManage,
      name: "AccountRoleManage",
      meta: { title: "账号角色管理", notPassPermissionVerify: true },
    },
  ],
};

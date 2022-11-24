import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import AccountRoleManage from "@/views/SetUp/views/AccountRoleManage/index";
import MenuManage from "@/views/SetUp/views/MenuManage/index";

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
    {
      path: "MenuManage",
      component: MenuManage,
      name: "MenuManage",
      meta: {
        title: "菜单管理",
        PermissionId: PERMISSION_ID.SetUp_MenuManagement,
      },
    },
  ],
};

import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import AccountRoleManage from "@/views/SetUp/views/AccountRoleManage/index";
import PayConfig from "@/views/SetUp/views/PayConfig/index";
import SysConfig from "@/views/SetUp/views/SysConfig/index";
import SystemNotification from "@/views/SetUp/views/SystemNotification/index";

export default {
  path: "/SetUp",
  component: MainLayout,
  redirect: "/SetUp",
  name: "SetUp",
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
      path: "PayConfig",
      component: PayConfig,
      name: "PayConfig",
      meta: {
        title: "支付配置",
        PermissionId: PERMISSION_ID.SetUp_AliPayManagement,
      },
    },
    {
      path: "SysConfig",
      component: SysConfig,
      name: "SysConfig",
      meta: {
        title: "系统配置",
        PermissionId: PERMISSION_ID.SetUp_SysConfigManagement,
      },
    },
    {
      path: "SystemNotification",
      component: SystemNotification,
      name: "SystemNotification",
      meta: { title: "系统通知" },
    },
  ],
};

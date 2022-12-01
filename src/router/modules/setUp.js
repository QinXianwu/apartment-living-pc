import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import AccountRoleManage from "@/views/SetUp/views/AccountRoleManage/index";
import DepartmentPostManage from "@/views/SetUp/views/DepartmentPostManage/index";
import MenuManage from "@/views/SetUp/views/MenuManage/index";
import DictionaryManage from "@/views/SetUp/views/DictionaryManage/index";
import OperationalLogs from "@/views/SetUp/views/OperationalLogs/index";
import ProtocolManage from "@/views/SetUp/views/ProtocolManage/index";

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
        PermissionId: PERMISSION_ID.SetUp_MenuManage,
      },
    },
    {
      path: "DepartmentPostManage",
      component: DepartmentPostManage,
      name: "DepartmentPostManage",
      meta: { title: "部门岗位管理", notPassPermissionVerify: true },
    },
    {
      path: "DictionaryManage",
      component: DictionaryManage,
      name: "DictionaryManage",
      meta: {
        title: "字典管理",
        PermissionId: PERMISSION_ID.SetUp_DictionaryManage,
      },
    },
    {
      path: "OperationalLogs",
      component: OperationalLogs,
      name: "OperationalLogs",
      meta: {
        title: "操作日志",
        PermissionId: PERMISSION_ID.SetUp_LogManage_OperationalLogs,
      },
    },
    {
      path: "ProtocolManage",
      component: ProtocolManage,
      name: "ProtocolManage",
      meta: { title: "协议管理", notPassPermissionVerify: true },
    },
  ],
};

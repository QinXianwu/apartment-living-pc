import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import TimedTasks from "@/views/SystemMonitoring/views/TimedTasks/index";
import OnlineUsers from "@/views/SystemMonitoring/views/OnlineUsers/index";

export default {
  path: "/SystemMonitoring",
  component: MainLayout,
  redirect: "/SystemMonitoring",
  name: "SystemMonitoring",
  alwaysShow: true,
  meta: {
    title: "系统监控",
    icon: "sys_monitoring",
    PermissionId: PERMISSION_ID.SystemMonitoring,
  },
  children: [
    {
      path: "OnlineUsers",
      component: OnlineUsers,
      name: "OnlineUsers",
      meta: {
        title: "在线用户",
        PermissionId: PERMISSION_ID.SystemMonitoring_OnlineUsers,
      },
    },
    {
      path: "TimedTasks",
      component: TimedTasks,
      name: "TimedTasks",
      meta: {
        title: "定时任务",
        PermissionId: PERMISSION_ID.SystemMonitoring_TimedTasks,
      },
    },
  ],
};

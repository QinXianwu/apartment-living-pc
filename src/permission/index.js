// 权限控制相关
import Vue from "vue";
import router from "@/router";
import store from "@/store";
import hasPermission from "./hasPermission";

import { clearNum } from "@/api/request";
router.beforeEach(async (to, from, next) => {
  //true用户已登录， false用户未登录
  const isLogin = Boolean(store.state.authorization.state);
  const permissionHash = store.state.permission.permissionHash;
  // 清除loading
  clearNum();
  if (!isLogin && to.path !== "/Authorization/Login") {
    return next({ path: "/Authorization/Login" });
  } else if (!permissionHash && isLogin && to.path !== "/401") {
    // // 如果没有hash表 但已授权
    const accessRoutes = await store.dispatch("permission/GenerateRoutes", {});
    accessRoutes.forEach((r) => router.addRoute(r));
    next({ ...to, replace: true });
  } else {
    // 如果已经有hash表了，直接跳转
    next();
  }
});

// 权限指令
// 使用 v-permission="该操作的权限ID"
// 如果不满足权限，则会被隐藏
Vue.directive("permission", {
  inserted(el, { value: permissionId }) {
    if (!hasPermission(permissionId)) {
      // 隐藏元素
      el.style.display = "none";
    }
  },
});

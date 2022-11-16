import Vue from "vue";
import Router from "vue-router";
import routerList from "./modules/index";
// import beforeEachFun from "./beforeEachFun";
import MainLayout from "@/layouts/MainLayout/index";
// import startPageIntro from "@/pagesIntro/index";

// 读取 module 文件夹的路由js

Vue.use(Router);
/**
 * 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题(主要解决在同一页面点击面包屑进行重定向返回)
 */
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

/**
 * 基础路由页面
 * 不需要验证权限
 * 所有角色都可以访问
 */
export const constantRoutes = [
  {
    path: "/",
    alias: "/Authorization/Login",
    meta: {},
    component: () => import("@/views/Authorization/views/Login"),
    hidden: true,
  },
  // redirect 框架的重定向页面，刷新的时候会跳转到这个页面再跳回去
  {
    path: "/redirect",
    component: MainLayout,
    hidden: true,
    meta: {},
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/404",
    meta: {},
    component: () => import("@/views/ErrorPage/404"),
    hidden: true,
  },
  {
    path: "/401",
    meta: {},
    component: () => import("@/views/ErrorPage/401"),
    hidden: true,
  },
  // { path: "*", redirect: "/404", hidden: true },
  // ...routerList,
];

/**
 * 根据后台返回的权限列表
 * 异步加载的的路由
 */
export const asyncRoutes = routerList;

// 生成路由实例
const createRouter = () => {
  const r = new Router({
    mode: "hash",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });
  r.afterEach(() => {
    // r.afterEach((route) => {
    let loadings = document.querySelectorAll(".el-loading-mask");
    if (loadings) {
      for (let i = loadings.length - 1; i >= 0; i--) {
        loadings[i].parentNode.removeChild(loadings[i]);
      }
    }
    Vue.nextTick(() => {
      // 触发页面指示
      // startPageIntro(route.name);
    });
  });
  return r;
};
const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}
// router.beforeEach(beforeEachFun);

export default router;

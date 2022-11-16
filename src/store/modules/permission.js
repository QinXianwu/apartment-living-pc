// import api from "@/api/module";
import Page401 from "@/views/ErrorPage/401";
import { asyncRoutes, constantRoutes } from "@/router";

const IS_NO_PERMISSION = !!process.env.VUE_APP_NO_PERMISSION;
/**
 * 根据返回的权限列表查找到可访问的页面
 * @param routes asyncRoutes
 */
export function filterAsyncRoutes(routes, permissionHash) {
  const res = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children, permissionHash);
    }
    // 如果没有设置 tmp?.meta?.PermissionId ,则默认次路由任何角色都可以访问
    const p = permissionHash.get(tmp?.meta?.PermissionId);
    if (tmp?.meta?.PermissionId && !p && !IS_NO_PERMISSION) {
      tmp.hidden = true; // 隐藏
      tmp.component = Page401; // 无权限
    }
    // if (p?.MenuName) tmp.meta.title = p.MenuName;
    tmp.OrderNum = p ? p.OrderNum : 9999; // 如果没有对应的权限，默认设置成大值
    res.push(tmp);
  });
  // 根据后台返回的顺序进行排序
  return res.sort((a, b) => a.OrderNum - b.OrderNum);
}
/**
 * 根据权限列表生成权限哈希列表
 * @param {Map} permission 权限hash表
 */
export function getPermissionsHash(permission = [], map) {
  permission?.forEach((p) => {
    map.set(p.code, p);
    if (p?.subordinate?.length) {
      getPermissionsHash(p?.subordinate, map);
    }
  });
  return map;
}

const state = {
  routes: [], // 页面路由
  permissionHash: null, // 权限哈希
};

const mutations = {
  SET_ROUTES(state, routes) {
    state.routes = constantRoutes.concat(routes);
  },
  SET_PERMISSION_HASH(state, data) {
    state.permissionHash = data;
  },
};

const actions = {
  // 根据接口接口返回的权限列表生成可以访问的路由
  async GenerateRoutes({ commit }) {
    // const [, res] = await api.Authorization.GetPageMenuTenantListApi();
    // // 建立hash表
    // const permissionHash = getPermissionsHash(res, new Map());
    // // 根据权限列表，获取得到可访问的路由
    // const accessedRoutes = filterAsyncRoutes(asyncRoutes, permissionHash);
    const permissionHash = new Map();
    const accessedRoutes = [...asyncRoutes];
    if (accessedRoutes.length > 0) {
      accessedRoutes.unshift({
        path: "/",
        redirect: {
          path: accessedRoutes[0].path,
        },
        hidden: true,
      });
    }
    // 添加重定向，初始化后才添加是为了未请求回权限列表时就重定向了
    accessedRoutes.push({
      path: "*",
      redirect: "/404",
      hidden: true,
    });
    commit("SET_PERMISSION_HASH", permissionHash);
    commit("SET_ROUTES", accessedRoutes);
    return accessedRoutes;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

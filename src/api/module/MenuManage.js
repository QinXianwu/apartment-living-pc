import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("菜单管理相关接口网络请求出错", error);
});

export default {
  // 获取菜单列表
  GetMenuList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/menu/list",
        params,
        method: "GET",
      })
    );
  },
  // 获取菜单详情
  GetMenuInfo(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/system/menu/${params.menuId}`,
        params,
        method: "GET",
      })
    );
  },
  // 新增菜单
  AddMenu(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/menu",
        params,
      })
    );
  },
  // 修改菜单
  UpdateMenu(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/menu",
        params,
        method: "PUT",
      })
    );
  },
  // 删除菜单
  DeleteMenu(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/system/menu/${params.menuId}`,
        params,
        method: "DELETE",
      })
    );
  },
};

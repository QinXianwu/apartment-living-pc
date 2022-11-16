import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("权限相关接口网络请求出错", error);
});
export default {
  // 登录
  Login(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/rbac/login/login",
        params,
        isReturnAll: true,
      })
    );
  },
  // 注销登录
  OutLogin(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/rbac/login/out-login",
        params,
        isReturnAll: true,
      })
    );
  },
  // 获取路由权限
  GetPageMenuTenantListApi(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/common/list/resources",
        params,
      })
    );
  },
};

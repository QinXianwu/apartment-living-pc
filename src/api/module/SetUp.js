import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("系统设置模块相关接口网络请求出错", error);
});

export default {
  // 获取用户列表
  GetUserList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/user/list",
        params,
        method: "GET",
      })
    );
  },
};

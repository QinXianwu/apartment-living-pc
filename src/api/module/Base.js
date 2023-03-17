import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("公共模块相关接口网络请求出错", error);
});

export default {
  // 获取用户信息
  GetUserInfo(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/user/getInfo",
        params: {},
        method: "GET",
        isReturnAll: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: params.token,
        },
      })
    );
  },
};

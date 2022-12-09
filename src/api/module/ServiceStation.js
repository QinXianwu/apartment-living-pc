import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("服务点相关接口网络请求出错", error);
});

export default {
  // 获取服务点列表
  GetList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/serviceStation/list",
        params,
      })
    );
  },
};
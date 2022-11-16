import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("系统配置相关接口网络请求出错", error);
});

export default {
  // 获取系统配置项列表
  GetSysConfigList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/sys/config/list",
        params,
        method: "post",
      })
    );
  },
  // 更新系统配置项
  UpdateSysConfig(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/sys/config/update",
        params,
        method: "post",
      })
    );
  },
};

import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("操作日志相关接口网络请求出错", error);
});

export default {
  // 获取操作日志列表
  GetList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/operlog/list",
        params,
        method: "GET",
        isReturnAll: true,
        isHandleParams: true,
      })
    );
  },
  // 删除操作日志
  DeleteOperLog(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/system/operlog/${params.operId}`,
        params,
        method: "DELETE",
      })
    );
  },
  // 清空操作日志
  DeleteAllOperLog(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/operlog/clean",
        params,
        method: "DELETE",
      })
    );
  },
};

import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("导入导出相关接口网络请求出错", error);
});

export default {
  ExportTicketing(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/query/ticketing/download",
        params,
        method: "post",
        TaskName: "出票查询导出",
        isReturnAll: true,
        responseType: "blob",
      })
    );
  },
};

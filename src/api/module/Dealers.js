import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("分销商管理相关接口网络请求出错", error);
});

export default {
  // 分销商列表
  GetDealersList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-distribution/distributor/page",
        params,
        isReturnAll: true,
      })
    );
  },
  // 审核分销商
  AuditDealers(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-distribution/distributor/audit",
        params,
        isHandleParams: true,
        isHeadersForm: true,
      })
    );
  },
};

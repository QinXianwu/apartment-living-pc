import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("商品审核相关接口网络请求出错", error);
});

export default {
  // 获取审核商品列表
  GetList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-product/product/atproduct/queryList",
        params,
        isReturnAll: true,
        isHeadersForm: true,
      })
    );
  },
  // 审核商品
  AuditGoods(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-product/product/atproduct/approval",
        params,
      })
    );
  },
  // 重新审核商品
  RefreshAuditGoods(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-product/product/atproduct/refreshApproval",
        params,
      })
    );
  },
};

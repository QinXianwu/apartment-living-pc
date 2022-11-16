import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("导入导出相关接口网络请求出错", error);
});

export default {
  // 订单查询 ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  // 出票查询&回填信息修改 导出
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
  // 退票查询 导出
  ExportRefundTicket(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/query/refund-ticket/download",
        params,
        method: "post",
        TaskName: "退票查询导出",
        isReturnAll: true,
        responseType: "blob",
      })
    );
  },
  // 订单查询 ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  // 订单退票 ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  // 非现金退票 导出
  ExportRefundTicketNonCash(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/refund/non-cash/download",
        params,
        method: "post",
        TaskName: "非现金退票导出",
        isReturnAll: true,
        responseType: "blob",
      })
    );
  },
  ExportRefundTicketNonCashPass(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/refund/non-cash/certificates/download",
        params,
        method: "post",
        TaskName: "非现金退票导出证件",
        isReturnAll: true,
        responseType: "blob",
      })
    );
  },
  // 订单退票 ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
};

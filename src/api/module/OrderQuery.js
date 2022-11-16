import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("订单查询相关接口网络请求出错", error);
});

export default {
  // 获取出票查询 回填信息修改
  GetTicketingList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/query/ticketing",
        params,
        method: "post",
      })
    );
  },
  // 获取票务统计信息
  GetTicketingStatistics(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/query/ticketing/order-statistics",
        params,
        method: "post",
        isLoading: false,
      })
    );
  },
  // 获取票务详情
  GetTicketingDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/query/ticketing/detail/${params.id}`,
        params,
        method: "post",
        isLoading: false,
      })
    );
  },
  // 修改订单取票号
  UpdateTicketingEorderNumber(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/query/ticketing/e-number/update",
        params,
        method: "post",
        isLoading: false,
      })
    );
  },
  // 获取退票查询列表
  GetTicketRefundList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/query/refund-ticket",
        params,
        method: "post",
      })
    );
  },
  // 获取退票查询-票款明细
  GetTicketRefundDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/query/refund-ticket/detail",
        params,
        method: "post",
      })
    );
  },
  // 每日代售点结算查询
  GetEveryDayClearingList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/query/every-day",
        params,
        method: "post",
      })
    );
  },
  // 分时代收点结算查询
  GetEveryHourClearingList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/query/every-hour/list",
        params,
        method: "post",
      })
    );
  },
};

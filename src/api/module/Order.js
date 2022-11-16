import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("订单相关接口网络请求出错", error);
});

export default {
  // 获取打票及回填订单列表
  GetOrderWaitList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/order/waiting/list",
        params,
        method: "post",
        isLoading: false,
      })
    );
  },
  // 获取支付宝流水号
  GetAlipaySerialNumber(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/order/waiting/ali-pay-number",
        params,
        method: "post",
      })
    );
  },
  // 接单开关
  UpdateTicketingSwitch(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/order/waiting/ticketing-switch",
        params,
        method: "post",
        isReturnAll: true,
      })
    );
  },
  // 获取代售点统计数据
  GetOrderStatistics(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/order/waiting/order-statistics/${params.agentCode}`,
        params,
        method: "post",
      })
    );
  },
  // 操作出票
  OperationTicketing(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/order/waiting/ticket-result-info",
        params,
        method: "post",
      })
    );
  },
  // 新订单
  GetNewOrderCount(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/order/waiting/order/count",
        params,
        method: "post",
        isLoading: false,
      })
    );
  },
};

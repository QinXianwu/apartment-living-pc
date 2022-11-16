import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("公共模块相关接口网络请求出错", error);
});

export default {
  // 获取代售点列表
  GetPointSaleList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/common/list/point-sale",
        params,
        method: "post",
      })
    );
  },
  // 获取支付宝账号列表
  GetAlipayAccountList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/common/list/alipay",
        params,
        method: "post",
      })
    );
  },
  // 获取首页数据
  GetHomeOverview(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/home/overview",
        params,
        method: "post",
      })
    );
  },
};

import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("优惠劵相关接口网络请求出错", error);
});

export default {
  // 获取优惠劵列表 分页
  GetCouponsList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-coupon/couponConfig/page",
        params,
        isReturnAll: true,
      })
    );
  },
  // 获取优惠券详情
  GetCouponsDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-coupon/couponConfig/detail",
        params,
        method: "GET",
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
};

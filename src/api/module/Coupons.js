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
  // 新增优惠劵
  AddCoupons(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-coupon/couponConfig/add",
        params,
      })
    );
  },
  // 修改优惠劵
  UpdateCoupons(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-coupon/couponConfig/update",
        params,
      })
    );
  },
  // 删除优惠劵
  DeleteCoupons(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-coupon/couponConfig/delete",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 禁用优惠劵
  DisabledCoupons(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/receiveCoupon/disabled",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 启用优惠劵
  EnableCoupons(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/receiveCoupon/enable",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 获取优惠劵活动规则
  GetCouponsActivityRule(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/receiveCoupon/getRule",
        params,
        method: "GET",
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 更新优惠劵活动规则
  UpdateCouponsActivityRule(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/receiveCoupon/editRule",
        params,
      })
    );
  },
};

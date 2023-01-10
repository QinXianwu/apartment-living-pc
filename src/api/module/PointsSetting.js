import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("积分设置相关接口网络请求出错", error);
});

export default {
  // 获取积分规则详情
  GetIntegralRuleDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/integralSet/detail",
        params,
        method: "GET",
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 更新积分规则
  UpdateIntegralRule(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/integralSet/addOrUpdate",
        params,
      })
    );
  },
  // 获取积分瓜分详情
  GetIntegralCarveDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/integralCarve/detail",
        params,
        method: "GET",
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 更新积分瓜分
  UpdateIntegralCarve(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/integralCarve/edit",
        params,
        method: "GET",
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
};

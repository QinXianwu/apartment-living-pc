import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("运营管理相关接口网络请求出错", error);
});

export default {
  // 获取新人活动详情
  GetNewcomerActivitieDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/registerActivity/detail",
        params,
        method: "GET",
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 更新新人活动
  GetNewcomerActivitie(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/registerActivity/edit",
        params,
      })
    );
  },
};

import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("协议管理相关接口网络请求出错", error);
});

export default {
  // 获取协议列表
  GetList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/agreement/page",
        params,
        isReturnAll: true,
      })
    );
  },
  // 获取协议详情
  GetAgreementInfo(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/agreement/getAgreementByType",
        params,
        method: "GET",
      })
    );
  },
  // 新增/修改协议
  UpdateAgreement(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/agreement/updateAgreement",
        params,
      })
    );
  },
};

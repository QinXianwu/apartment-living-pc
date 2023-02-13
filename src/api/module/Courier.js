import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("配送员相关接口网络请求出错", error);
});

export default {
  // 获取配送员列表
  GetCourierList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/courier/page",
        params,
        isReturnAll: true,
      })
    );
  },
  // 获取配送员列表-不分页
  GetCourierListAll(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/courier/list",
        params,
      })
    );
  },
  // 获取配送员详情
  GetCourierDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/courier/detail",
        params,
        method: "GET",
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 新增配送员信息
  AddCourier(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/courier/add",
        params,
      })
    );
  },
  // 更新配送员信息
  UpdateCourier(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/courier/updateById",
        params,
      })
    );
  },
  // 更新配送员状态
  UpdateCourierStatus(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/courier/updateStatus",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
};

import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("服务点相关接口网络请求出错", error);
});

export default {
  // 获取服务点列表
  GetList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/serviceStation/list",
        params,
      })
    );
  },
  // 获取服务点列表
  GetServiceStationList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/serviceStation/page",
        params,
        isReturnAll: true,
      })
    );
  },
  // 获取服务点详情
  GetServiceStationDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/serviceStation/detail",
        params,
        method: "GET",
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 新增服务点
  AddServiceStation(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/serviceStation/add",
        params,
      })
    );
  },
  // 更新服务点
  UpdateServiceStation(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/serviceStation/update",
        params,
      })
    );
  },
  // 删除服务点
  DeleteServiceStation(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/serviceStation/delete",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 更新服务点状态
  UpdateServiceStationStatus(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/serviceStation/updateStatus",
        params,
        method: "GET",
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
};

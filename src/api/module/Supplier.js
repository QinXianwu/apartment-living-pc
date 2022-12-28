import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("供应商相关接口网络请求出错", error);
});

export default {
  // 获取供应商列表
  GetList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/supplier/list",
        params,
      })
    );
  },
  // 获取供应商分页列表
  GetSupplierList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/supplier/page",
        params,
        isReturnAll: true,
      })
    );
  },
  // 获取供应商详情
  GetSupplierDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/supplier/detail",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 新增供应商
  AddSupplierl(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/supplier/add",
        params,
      })
    );
  },
  // 更新供应商
  UpdateSupplierl(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/supplier/add",
        params,
        isReturnAll: true,
      })
    );
  },
};

import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("商品规格相关接口网络请求出错", error);
});

export default {
  // 获取规格列表
  GetList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-product/product/atspecification/queryPage",
        params,
        isReturnAll: true,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 获取规格详情
  GetSpecificaById(params) {
    return catchAsyncFun(
      apiFetch({
        url:
          apiPrefix +
          `/apartment-product/product/atspecification/queryById/${params.id}`,
        params,
        isHeadersForm: true,
      })
    );
  },
  // 新增规格
  AddSpecifica(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-product/product/atspecification/saveInfo",
        params,
      })
    );
  },
  // 更新规格
  UpdateSpecifica(params) {
    return catchAsyncFun(
      apiFetch({
        url:
          apiPrefix + "/apartment-product/product/atspecification/updateInfo",
        params,
      })
    );
  },
  // 删除商品规格
  DeleteSpecifica(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-product/product/atspecification/deleteBt",
        params,
      })
    );
  },
  // 获取所有规格列表
  GetListAll(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-product/product/atspecification/queryList",
        params,
      })
    );
  },
  // 获取管理规格值(规格值列表)
  GetSpecificaValueList(params) {
    return catchAsyncFun(
      apiFetch({
        url:
          apiPrefix +
          "/apartment-product/product/atspecificationvalue/queryList",
        params,
        isReturnAll: true,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 新增规格值
  AddSpecificaValue(params) {
    return catchAsyncFun(
      apiFetch({
        url:
          apiPrefix +
          "/apartment-product/product/atspecificationvalue/saveInfo",
        params,
      })
    );
  },
  // 更新规格值
  UpdateSpecificaValue(params) {
    return catchAsyncFun(
      apiFetch({
        url:
          apiPrefix +
          "/apartment-product/product/atspecificationvalue/updateInfo",
        params,
      })
    );
  },
  // 删除规格值
  DeleteSpecificaValue(params) {
    return catchAsyncFun(
      apiFetch({
        url:
          apiPrefix +
          "/apartment-product/product/atspecificationvalue/deleteBt",
        params,
      })
    );
  },
};

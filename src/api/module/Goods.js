import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("商品相关接口网络请求出错", error);
});

export default {
  // 获取商品列表 -> 平台/供应商商品列表
  GetList(params) {
    return catchAsyncFun(
      apiFetch({
        url:
          apiPrefix +
          "/apartment-product/product/atproduct/queryPageForSupplier",
        params,
        isReturnAll: true,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 获取商品列表 -> 服务点商品列表
  GetServeGoodsList(params) {
    return catchAsyncFun(
      apiFetch({
        url:
          apiPrefix +
          "/apartment-product/product/atproduct/queryPageForServicePoint",
        params,
        isReturnAll: true,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 查询平台/供应商商品详情
  GetGoodsInfo(params) {
    return catchAsyncFun(
      apiFetch({
        url:
          apiPrefix + "/apartment-product/product/atproduct/queryByProductNo",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 新增商品
  AddGoods(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-product/product/atproduct/save",
        params,
      })
    );
  },
  // 更新商品
  UpdateGoods(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-product/product/atproduct/update",
        params,
      })
    );
  },
  // 删除商品
  DeleteGoods(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-product/product/atproduct/delete",
        params,
      })
    );
  },
  // 商品上架
  UpdateUpGoods(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-product/product/atproduct/upProduct",
        params,
      })
    );
  },
  // 商品下架
  UpdateOffGoods(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-product/product/atproduct/offProduct",
        params,
      })
    );
  },
};

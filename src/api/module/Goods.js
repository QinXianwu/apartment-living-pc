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
      })
    );
  },
};

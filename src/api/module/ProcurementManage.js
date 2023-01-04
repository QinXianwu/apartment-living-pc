import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("采购管理相关接口网络请求出错", error);
});

export default {
  // 服务站商品采购
  ProcurementGoods(params) {
    return catchAsyncFun(
      apiFetch({
        url:
          apiPrefix +
          "/apartment-product/product/atproductstockprice/procurement",
        params,
      })
    );
  },
};

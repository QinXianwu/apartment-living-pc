import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("商品分类相关接口网络请求出错", error);
});

export default {
  // 获取商品分类列表
  GetList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-product/product/category/queryPage",
        params,
        isReturnAll: true,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 获取分类级联
  GetCategoryAll(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-product/product/category/listAllSelect",
        params,
      })
    );
  },
  // 分类详情
  GetCategoryById(params) {
    return catchAsyncFun(
      apiFetch({
        url:
          apiPrefix +
          `/apartment-product/product/category/findById/${params.id}`,
        params,
      })
    );
  },
  // 新增分类
  AddCategory(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-product/product/category/saveCategory",
        params,
      })
    );
  },
  // 更新分类
  UpdateCategory(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-product/product/category/updateCategory",
        params,
      })
    );
  },
  // 删除分类
  DeleteCategory(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-product/product/category/deleteCategory",
        params,
      })
    );
  },
  // 启用/禁用 分类
  UpdateCategoryStatus(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-product/product/category/enableOrDisabled",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
};

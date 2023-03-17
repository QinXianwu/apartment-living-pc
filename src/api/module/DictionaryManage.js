import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("字典管理相关接口网络请求出错", error);
});

export default {
  // 获取字典列表
  GetDictionaryList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/dict/type/list",
        params,
        method: "GET",
        isReturnAll: true,
        isHandleParams: true,
      })
    );
  },
  // 获取字典详情
  GetDictionaryInfo(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/system/dict/type/${params.dictId}`,
        params,
        method: "GET",
      })
    );
  },
  // 新增字典
  AddDictionary(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/dict/type",
        params,
      })
    );
  },
  // 修改字典
  UpdateDictionary(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/dict/type",
        params,
        method: "PUT",
      })
    );
  },
  // 删除字典
  DeleteDictionary(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/system/dict/type/${params.dictId}`,
        params,
        method: "DELETE",
      })
    );
  },
  // 刷新字典缓存
  UpdateDictRefreshCache(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/dict/type/refreshCache",
        params,
        method: "DELETE",
      })
    );
  },
  // 获取字典数据选择框列表
  GetDictionaryOptions(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/dict/type/optionselect",
        params,
        method: "GET",
      })
    );
  },
  // 获取字典数据列表
  GetDictionaryDataList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/dict/data/list",
        params,
        method: "GET",
        isReturnAll: true,
      })
    );
  },
  // 获取字典数据详情
  GetDictionaryDataInfo(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/system/dict/data/${params.dictCode}`,
        params,
        method: "GET",
      })
    );
  },
  // 根据字典类型查询字典数据信息
  GetDictionaryDataTypeInfo(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/system/dict/data/type/${params.dictType}`,
        params,
        method: "GET",
      })
    );
  },
  // 新增字典数据
  AddDictionaryData(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/dict/data",
        params,
      })
    );
  },
  // 修改字典数据
  UpdateDictionaryData(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/dict/data",
        params,
        method: "PUT",
      })
    );
  },
  // 删除字典数据
  DeleteDictionaryData(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/system/dict/data/${params.dictCode}`,
        params,
        method: "DELETE",
      })
    );
  },
};

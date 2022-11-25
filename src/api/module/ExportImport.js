import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("导入导出相关接口网络请求出错", error);
});

export default {
  // 用户列表导出
  ExportUserList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/user/export",
        params,
        method: "POST",
        TaskName: "用户列表导出",
        isReturnAll: true,
        isHandleParams: true,
        responseType: "blob",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
    );
  },
  // 下载导入用户列表的文件模板
  ImportUserListTemplate(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/user/importTemplate",
        params,
        method: "POST",
        TaskName: "导入用户列表模板",
        isReturnAll: true,
        isHandleParams: true,
        responseType: "blob",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
    );
  },
  // 角色列表导出
  ExportRoleList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/role/export",
        params,
        method: "POST",
        TaskName: "角色列表导出",
        isReturnAll: true,
        isHandleParams: true,
        responseType: "blob",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
    );
  },
  // 岗位列表导出
  ExportPostList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/post/export",
        params,
        method: "POST",
        TaskName: "岗位列表导出",
        isReturnAll: true,
        isHandleParams: true,
        responseType: "blob",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
    );
  },
  // 字典列表导出
  ExportDictList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/dict/type/export",
        params,
        method: "POST",
        TaskName: "字典列表导出",
        isReturnAll: true,
        isHandleParams: true,
        responseType: "blob",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
    );
  },
  // 字典数据列表导出
  ExportDictDataList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/dict/data/export",
        params,
        method: "POST",
        TaskName: "字典数据导出",
        isReturnAll: true,
        isHandleParams: true,
        responseType: "blob",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
    );
  },
};

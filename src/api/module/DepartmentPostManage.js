import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("部门岗位管理相关接口网络请求出错", error);
});

export default {
  // 获取部门列表
  GetDepartmentList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/dept/list",
        params,
        method: "GET",
      })
    );
  },
  // 获取部门列表（排除节点）
  GetDepartmentExcludeChildList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/system/dept/list/exclude/${params.deptId}`,
        params,
        method: "GET",
      })
    );
  },
  // 获取部门详情
  GetDepartmentInfo(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/system/dept/${params.deptId}`,
        params,
        method: "GET",
      })
    );
  },
  // 新增部门
  AddDepartment(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/dept",
        params,
      })
    );
  },
  // 修改部门
  UpdateDepartment(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/dept",
        params,
        method: "PUT",
      })
    );
  },
  // 删除部门
  DeleteDepartment(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/system/dept/${params.deptId}`,
        params,
        method: "DELETE",
      })
    );
  },
};

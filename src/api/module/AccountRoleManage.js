import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("账号角色管理相关接口网络请求出错", error);
});

export default {
  // 获取账号列表
  GetAccountList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/sys/user",
        params,
        method: "post",
      })
    );
  },
  // 新增账户
  AddAccount(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/sys/user/create",
        params,
        method: "post",
      })
    );
  },
  // 删除账户
  DeleteAccount(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/sys/user/delete/${params.id}`,
        params,
        method: "post",
      })
    );
  },
  // 账号角色列表Options
  GetAccountByRoleList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/sys/user/role/list",
        params,
        method: "post",
      })
    );
  },
  // 账号分配角色
  AccountDistributionRole(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/sys/user/role/distribution",
        params,
        method: "post",
      })
    );
  },
  // 账户获取代售点列表
  GetAccountByPointSale(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/sys/user/point-sale/list",
        params,
        method: "post",
      })
    );
  },
  // 添加子账号
  AddSubAccount(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/sys/user/sub-user/create",
        params,
        method: "post",
      })
    );
  },
  // 修改账号/子账号 密码
  UpdateAccount(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/sys/user/update/${params.id}`,
        params,
        method: "post",
      })
    );
  },
  // 获取角色列表
  GetRoleList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/sys/role",
        params,
        method: "post",
      })
    );
  },
  // 新增角色
  AddRole(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/sys/role/create",
        params,
        method: "post",
      })
    );
  },
  // 删除角色
  DeleteRole(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/sys/role/delete/${params.id}`,
        params,
        method: "post",
      })
    );
  },
  // 修改角色
  UpdateRole(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/sys/role/update/${params.id}`,
        params,
        method: "post",
      })
    );
  },
  // 角色权限配置
  UpdateRolePermission(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/sys/role/permission-configuration`,
        params,
        method: "post",
      })
    );
  },
  // 角色权限配置列表 不分页
  GetRolePermissionList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/sys/role/resource/list/${params.id}`,
        params,
        method: "post",
      })
    );
  },
  // 获取用户管理 省份列表
  GetProvinceList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/sys/user/province/list",
        params,
        method: "post",
      })
    );
  },
};

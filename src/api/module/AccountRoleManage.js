import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("账号角色管理相关接口网络请求出错", error);
});

export default {
  // 获取用户列表
  GetUserList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/user/list",
        params,
        method: "GET",
        isReturnAll: true,
        isHandleParams: true,
      })
    );
  },
  // 获取用户信息
  GetUserInfo(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/system/user/${params.userId}`,
        params,
        method: "GET",
        isReturnAll: true,
      })
    );
  },
  // 更新用户状态
  UpdateUserStatus(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/user/changeStatus",
        params,
        method: "PUT",
      })
    );
  },
  // 添加用户
  AddUser(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/user",
        params,
      })
    );
  },
  // 更新用户
  UpdateUser(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/user",
        params,
        method: "PUT",
      })
    );
  },
  // 删除用户
  DeleteUser(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/system/user/${params.userId}`,
        params,
        method: "DELETE",
      })
    );
  },
  // 更新用户密码
  UpdateUserPassword(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/user/resetPwd",
        params,
        method: "PUT",
      })
    );
  },
  // 获取用户下的角色列表以及已分配角色
  GetUserByRoleList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/system/user/authRole/${params.userId}`,
        params,
        method: "GET",
        isReturnAll: true,
      })
    );
  },
  // 更新用户分配的角色
  UpdataUserByRole(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/user/authRole",
        params,
        method: "PUT",
        isHandleParams: true,
      })
    );
  },
  // 获取角色列表
  GetRoleList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/role/list",
        params,
        method: "GET",
        isReturnAll: true,
        isHandleParams: true,
      })
    );
  },
  // 更新角色状态
  UpdateRoleStatus(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/role/changeStatus",
        params,
        method: "PUT",
      })
    );
  },
  // 获取角色详情
  GetRoleDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/system/role/${params.roleId}`,
        params,
        method: "GET",
      })
    );
  },
  // 修改角色
  UpdateRole(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/role",
        params,
        method: "PUT",
      })
    );
  },
  // 新增角色
  AddRole(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/role",
        params,
      })
    );
  },
  // 删除角色
  DeleteRole(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/system/role/${params.roleId}`,
        params,
        method: "DELETE",
      })
    );
  },
  // 查询菜单下拉树结构
  GetMenuTree(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/menu/treeselect",
        params,
        method: "GET",
      })
    );
  },
  // 根据角色ID查询菜单下拉树结构
  GetRoleByMenuTree(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/system/menu/roleMenuTreeselect/${params.roleId}`,
        params,
        method: "GET",
        isReturnAll: true,
      })
    );
  },
  // 查询角色已授权用户列表
  GetRoleByAllocatedList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/role/authUser/allocatedList",
        params,
        method: "GET",
        isReturnAll: true,
      })
    );
  },
  // 查询角色未授权用户列表
  GetRoleByUnallocatedList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/role/authUser/unallocatedList",
        params,
        method: "GET",
        isReturnAll: true,
      })
    );
  },
  // 角色分配用户
  AddRoleByUser(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/role/authUser/selectAll",
        params,
        method: "PUT",
        isHandleParams: true,
      })
    );
  },
  // 取消用户授权角色
  DeleteRoleByUser(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/role/authUser/cancel",
        params,
        method: "PUT",
      })
    );
  },
  // 批量取消用户授权角色
  DeleteRoleByUserAll(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/role/authUser/cancelAll",
        params,
        method: "PUT",
      })
    );
  },
};

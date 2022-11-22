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
};

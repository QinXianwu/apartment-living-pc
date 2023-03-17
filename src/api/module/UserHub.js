import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("用户中心相关接口网络请求出错", error);
});

export default {
  // 获取移动端用户列表
  GetList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/sysMoblieUser/queryListPage",
        params,
        isReturnAll: true,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 获取移动端用户详情
  GetUserDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/sysMoblieUser/queryInfo",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 编辑用户备注
  UpdateUserRemark(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/sysMoblieUser/updateRemark",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 新增用户积分记录
  AddUserIntegral(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/userIntegralRecord/add",
        params,
      })
    );
  },
  // 获取用户积分记录
  GetUserByIntegral(params) {
    return catchAsyncFun(
      apiFetch({
        url:
          apiPrefix +
          "/apartment-user/userIntegralRecord/getTotalIntegralByUserId",
        params,
        method: "GET",
        isReturnAll: true,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 获取用户积分列表
  GetUserIntegralList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/userIntegralRecord/page",
        params,
        isReturnAll: true,
      })
    );
  },
  // 获取会员卡列表
  GetMemberCardlList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/memberCard/page",
        params,
        isReturnAll: true,
      })
    );
  },
  // 获取会员卡详情
  GetMemberCardDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/memberCard/detail",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 新增会员卡
  AddMemberCard(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/memberCard/add",
        params,
      })
    );
  },
  // 更新会员卡
  UpdateMemberCard(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/memberCard/update",
        params,
      })
    );
  },
};

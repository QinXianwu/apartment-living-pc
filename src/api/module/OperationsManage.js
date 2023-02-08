import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("运营管理相关接口网络请求出错", error);
});

export default {
  // 获取新人活动详情
  GetNewcomerActivitieDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/registerActivity/detail",
        params,
        method: "GET",
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 更新新人活动
  GetNewcomerActivitie(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/registerActivity/edit",
        params,
      })
    );
  },
  // 获取商品件折扣活动列表
  GetPieceDiscountActivityList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/pieceDiscountActivity/page",
        params,
        isReturnAll: true,
      })
    );
  },
  // 获取折扣活动详情
  GetDiscountActivityDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/pieceDiscountActivity/detail",
        params,
        method: "GET",
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 新增折扣活动
  AddDiscountActivity(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/pieceDiscountActivity/add",
        params,
      })
    );
  },
  // 修改折扣活动
  UpdateDiscountActivity(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/pieceDiscountActivity/update",
        params,
      })
    );
  },
  // 删除商品件折扣活动
  DeleteDiscountActivity(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/pieceDiscountActivity/delete",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 获取拼团活动列表
  GetGroupActivityList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/groupActivity/page",
        params,
        isReturnAll: true,
      })
    );
  },
  // 获取拼团活动详情
  GetGroupActivityDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/groupActivity/detail",
        params,
        method: "GET",
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 新增拼团活动
  AddGroupActivity(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/groupActivity/add",
        params,
      })
    );
  },
  // 修改拼团活动
  UpdateGroupActivity(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/groupActivity/update",
        params,
      })
    );
  },
  // 停止拼团活动
  StopGroupActivity(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/groupActivity/stop",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 审核拼团活动
  AuditActivity(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/groupActivity/audit",
        params,
      })
    );
  },
  // 获取问题反馈列表
  GetFeedbackList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/feedback/page",
        params,
        isReturnAll: true,
      })
    );
  },
  // 更新问题反馈状态
  UpdateFeedbackStatus(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/feedback/updateStatus",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 获取招聘记录列表
  GetRecruiterList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/recruiter/page",
        params,
        isReturnAll: true,
      })
    );
  },
  // 更新招聘记录状态
  UpdateRecruiterStatus(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-user/recruiter/updateStatus",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
};

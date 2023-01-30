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
};

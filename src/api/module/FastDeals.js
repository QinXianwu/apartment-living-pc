import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("秒杀活动相关接口网络请求出错", error);
});

export default {
  // 获取秒杀场次列表
  GetSessionCountList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/secKillSession/page",
        params,
        isReturnAll: true,
      })
    );
  },
  // 获取秒杀场次列表(启用状态) 不分页
  GetSessionCountListAll(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/secKillSession/list",
        params,
      })
    );
  },
  // 获取秒杀场次详情
  GetSessionCountDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/secKillSession/detail",
        params,
        method: "GET",
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 新增秒杀场次
  AddSessionCount(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/secKillSession/add",
        params,
      })
    );
  },
  // 更新秒杀场次
  UpdateSessionCount(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/secKillSession/update",
        params,
      })
    );
  },
  // 更新场次状态
  UpdateSessionCountStatus(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/secKillSession/updateStatus",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 获取秒杀活动列表
  GetActivityList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/secKillActivity/page",
        params,
        isReturnAll: true,
      })
    );
  },
  // 获取秒杀活动详情
  GetActivityDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/secKillActivity/detail",
        params,
        method: "GET",
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 新增秒杀活动
  AddActivity(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/secKillActivity/add",
        params,
      })
    );
  },
  // 修改秒杀活动
  UpdateActivity(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/secKillActivity/update",
        params,
      })
    );
  },
  // 停止秒杀活动
  StopSecKillActivity(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/secKillActivity/stop",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
};

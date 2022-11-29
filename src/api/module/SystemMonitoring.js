import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("系统监控设置模块相关接口网络请求出错", error);
});

export default {
  // 获取在线用户列表
  GetOnlineUserList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/system/online/list",
        params,
        method: "GET",
        isReturnAll: true,
      })
    );
  },
  // 强退用户
  DeleteOnlineUser(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/system/online/${params.tokenId}`,
        params,
        method: "DELETE",
      })
    );
  },
  // 获取定时任务列表
  GetScheduleTaskList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/schedule/job/list",
        params,
        method: "GET",
        isReturnAll: true,
      })
    );
  },
  // 获取定时任务详情
  GetScheduleTaskDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/schedule/job/${params.jobId}`,
        params,
        method: "GET",
      })
    );
  },
  // 新增定时任务
  AddScheduleTask(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/schedule/job",
        params,
      })
    );
  },
  // 修改定时任务
  UpdateScheduleTask(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/schedule/job",
        params,
        method: "PUT",
      })
    );
  },
  // 删除定时任务
  DeleteScheduleTask(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/schedule/job/${params.jobId}`,
        params,
        method: "DELETE",
      })
    );
  },
  // 任务状态修改
  UpdateScheduleTaskStatus(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/schedule/job/changeStatus",
        params,
        method: "PUT",
      })
    );
  },
  // 定时任务立即执行一次
  RunScheduleTask(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/schedule/job/run",
        params,
        method: "PUT",
      })
    );
  },
  // 获取任务调度日志列表
  GetScheduleTaskLogList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/schedule/job/log/list",
        params,
        method: "GET",
        isReturnAll: true,
        isHandleParams: true,
      })
    );
  },
  // 删除任务调度日志
  DeleteScheduleTaskLog(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/schedule/job/log/${params.jobLogId}`,
        params,
        method: "DELETE",
      })
    );
  },
  // 清空任务调度日志
  DeleteAllScheduleTaskLog(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/schedule/job/log/clean",
        params,
        method: "DELETE",
      })
    );
  },
};

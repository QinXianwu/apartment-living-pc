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
};

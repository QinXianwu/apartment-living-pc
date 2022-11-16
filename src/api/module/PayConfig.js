import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("支付配置相关接口网络请求出错", error);
});

export default {
  // 获取支付宝账号列表
  GetAlipayAccountList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/sys/alipay",
        params,
        method: "post",
      })
    );
  },
  // 获取支付宝账号详情
  GetAlipayAccountDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/sys/alipay/detail/${params.id}`,
        params,
        method: "post",
      })
    );
  },
  // 新增支付宝账号
  AddAlipayAccount(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/sys/alipay/create",
        params,
        method: "post",
      })
    );
  },
  // 编辑支付宝账号
  UpdateAlipayAccount(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/sys/alipay/update/${params.id}`,
        params,
        method: "post",
      })
    );
  },
  // 删除支付宝账号
  DeleteAlipayAccount(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + `/sys/alipay/delete/${params.id}`,
        params,
        method: "post",
      })
    );
  },
  // 支付记录统计
  GetAlipayAccountRecordList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/sys/alipay/record",
        params,
        method: "post",
      })
    );
  },
};

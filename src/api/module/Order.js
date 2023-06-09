import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("订单相关接口网络请求出错", error);
});

export default {
  // 获取采购单列表
  GetPurchaseList(params) {
    return catchAsyncFun(
      apiFetch({
        url:
          apiPrefix +
          "/apartment-product/product/atproductprocurementorder/queryPageList",
        params,
        isReturnAll: true,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 获取采购单详情
  GetPurchaseOrderDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url:
          apiPrefix +
          "/apartment-product/product/atproductprocurementorder/queryInfo",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 关闭采购单
  ClosePurchaseOrder(params) {
    return catchAsyncFun(
      apiFetch({
        url:
          apiPrefix +
          "/apartment-product/product/atproductstockprice/procurementCancel",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 供应商发货
  SupplierSendPurchaseOrder(params) {
    return catchAsyncFun(
      apiFetch({
        url:
          apiPrefix +
          "/apartment-product/product/atproductstockprice/procurementSend",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 服务站入库商品
  ServiceStationStorageGoods(params) {
    return catchAsyncFun(
      apiFetch({
        url:
          apiPrefix +
          "/apartment-product/product/atproductstockprice/putStorage",
        params,
      })
    );
  },
  // 添加采购订单备注
  AddPurchaseOrderRemark(params) {
    return catchAsyncFun(
      apiFetch({
        url:
          apiPrefix +
          "/apartment-product/product/atproductprocurementorder/addRemark",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 获取运营后台订单列表
  GetOrderList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-order/order/atorder/listForAdmin",
        params,
        isReturnAll: true,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 获取运营后台订单详情
  GetOrderDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-order/order/atorder/infoByAdmin",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 获取运营后台售后订单列表
  GetAfterSalesOrderList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-order/atorderafterserv/refundOrderList",
        params,
        isReturnAll: true,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 获取运营后台售后订单详情
  GetAfterSalesOrderDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-order/atorderafterserv/refundOrderInfo",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 获取拼团订单列表
  GetGroupOrderList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/groupActivity/joinRecord",
        params,
        isReturnAll: true,
      })
    );
  },
  // 获取运营后台拼团订单详情
  GetGroupOrderDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/groupActivity/joinRecordDetail",
        params,
        method: "GET",
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 审核售后订单
  ReviewAfterSalesOrder(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-order/atorderafterserv/approve",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 售后订单-确认收货
  confirmAfterSalesOrderReceipt(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-order/atorderafterserv/confirmReceipt",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 售后订单-退款
  confirmAfterSalesOrderRefund(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-order/atorderafterserv/refund",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 获取配送设置
  GetSendSettingDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-order/order/atsendsetting/getSendSetting",
        params,
      })
    );
  },
  // 更新订单配送员
  UpdateOrderByCourier(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-order/order/atorder/updateOrderCourier",
        params,
      })
    );
  },
  // 更新拼团订单配送员
  UpdateGroupOrderByCourier(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-activity/groupActivity/updateOrderCourier",
        params,
      })
    );
  },
  // 更新订单状态
  UpdateOrderByStatus(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-order/order/atorder/updateOrderStatus",
        params,
        isHeadersForm: true,
        isHandleParams: true,
      })
    );
  },
  // 更新配送设置
  UpdateSendSetting(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/apartment-order/order/atsendsetting/svaeSendSetting",
        params,
      })
    );
  },
};

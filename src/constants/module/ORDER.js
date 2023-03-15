import { getOptionsByText } from "../utils";

// 订单来源(前端区分订单)
export const ORDER_SOURCE = {
  AFTER_SALE_ORDER: "AFTER_SALE_ORDER", // 售后
  SEND_ORDER: "SEND_ORDER", // 配送单
  SELF_PICKUP_ORDER: "SELF_PICKUP_ORDER", // 自提单
  GROUP_ORDER: "GROUP_ORDER", // 拼团订单
  POINTS_ORDER: "POINTS_ORDER", // 积分订单
};
export const ORDER_SOURCE_TEXT = {
  [ORDER_SOURCE.AFTER_SALE_ORDER]: "售后订单",
  [ORDER_SOURCE.SEND_ORDER]: "配送订单",
  [ORDER_SOURCE.SELF_PICKUP_ORDER]: "自提订单",
  [ORDER_SOURCE.GROUP_ORDER]: "拼团订单",
  [ORDER_SOURCE.POINTS_ORDER]: "积分订单",
};

// 收货类型
export const DELIVERY_TYPE = {
  HOME_DELIVERY: 1, // 配送上门
  ARRIVE_AT_PICKED: 2, // 站点自提
};
export const DELIVERY_TYPE_TEXT = {
  [DELIVERY_TYPE.HOME_DELIVERY]: "配送上门",
  [DELIVERY_TYPE.ARRIVE_AT_PICKED]: "站点自提",
};
export const DELIVERY_TYPE_OPTIONS = () => getOptionsByText(DELIVERY_TYPE_TEXT);

// 订单来源
export const SOURCE_ORDER = {
  FEATURED_GOODS_ORDER: 1, // 精选商品订单
  POINTS_ORDER: 2, // 积分订单
  GROUP_ORDER: 3, // 拼团订单
};

// 订单状态
export const ORDER_STATE = {
  ALL: 99999, // 所有 99999转->字符串空
  ALREADY_PAY: 0, // 已支付
  WAIT_PAY: 1, // 待付款
  IN_TRANSIT: 2, // 配送中
  WAIT_DELIVERY: 3, // 待收货
  FINISH: 4, // 已完成
  CANCEL: 5, // 用户取消
  EXPIRED_CANCEL: 6, // 过期取消
  PLATFORM_CANCEL: 7, // 平台取消
  TO_BE_SHIPPED: 8, // 待出货
  TO_BE_WRITTEN_OFF: 9, // 待核销
  WAIT_SEND: 10, // 待配送
  AFTER_SALE: 99, // 售后
};

export const ORDER_STATE_TEXT = {
  [ORDER_STATE.ALL]: "所有",
  [ORDER_STATE.ALREADY_PAY]: "已支付",
  [ORDER_STATE.WAIT_PAY]: "待付款",
  [ORDER_STATE.WAIT_SEND]: "待配送",
  [ORDER_STATE.IN_TRANSIT]: "配送中",
  [ORDER_STATE.WAIT_DELIVERY]: "待收货",
  [ORDER_STATE.FINISH]: "已完成",
  [ORDER_STATE.CANCEL]: "已取消",
  [ORDER_STATE.EXPIRED_CANCEL]: "过期取消",
  [ORDER_STATE.PLATFORM_CANCEL]: "平台取消",
  [ORDER_STATE.TO_BE_SHIPPED]: "待出货",
  [ORDER_STATE.TO_BE_WRITTEN_OFF]: "待核销",
  [ORDER_STATE.AFTER_SALE]: "售后",
};

export const ORDER_STATE_OPTIONS = () => getOptionsByText(ORDER_STATE_TEXT);

// 售后订单状态
export const A_S_ORDER_STATE = {
  WAIT_AUDITED: 0, // 待审核
  WAIT_DELIVERY: 2, // 待商家收货
  WAIT_REFUNDED: 4, // 待退款
  RETURN_MONEY: 5, // 待到账(退款中)
  RETURN_DOEN: 6, // 已完成
  USER_WRITTEN_OFF: 7, // 用户撤销
  FIAL: 8, // 售后失败
  AUDIT_FAIL: 15, // 售后拒绝
  EXPIRED_CANCEL: 16, // 过期取消
};

export const A_S_ORDER_STATE_TEXT = {
  [A_S_ORDER_STATE.WAIT_AUDITED]: "待审核",
  [A_S_ORDER_STATE.WAIT_DELIVERY]: "待商家收货",
  [A_S_ORDER_STATE.WAIT_REFUNDED]: "待退款",
  [A_S_ORDER_STATE.RETURN_MONEY]: "待到账",
  [A_S_ORDER_STATE.RETURN_DOEN]: "已完成",
  [A_S_ORDER_STATE.USER_WRITTEN_OFF]: "用户撤销",
  [A_S_ORDER_STATE.FIAL]: "售后失败",
  [A_S_ORDER_STATE.AUDIT_FAIL]: "售后拒绝",
  [A_S_ORDER_STATE.EXPIRED_CANCEL]: "过期取消",
};
export const A_S_ORDER_STATE_OPTIONS = () =>
  getOptionsByText(A_S_ORDER_STATE_TEXT);

export const A_S_RETURNS_TYPE = {
  RETURN_M: 1, // 仅退款
  RETURN_G_M: 2, // 退款退货
};
export const A_S_RETURNS_TYPE_TEXT = {
  [A_S_RETURNS_TYPE.RETURN_M]: "仅退款",
  [A_S_RETURNS_TYPE.RETURN_G_M]: "退款退货",
};

export const A_S_RETURNS_TYPE_OPTIONS = getOptionsByText(A_S_RETURNS_TYPE_TEXT);

export const REFUND_METHOD = {
  SAME_WAY: 1, // 原路返回
};
export const REFUND_METHOD_TEXT = {
  [REFUND_METHOD.SAME_WAY]: "原路返回",
};

//  订单审核状态
export const ORDER_AUDIT_STATE = {
  SUCCESS_CHECK: 1, // 审核通过
  FAIL_CHECK: 2, // 审核失败
};
export const ORDER_AUDIT_STATE_TEXT = {
  [ORDER_AUDIT_STATE.SUCCESS_CHECK]: "审核通过",
  [ORDER_AUDIT_STATE.FAIL_CHECK]: "审核失败",
};

// 采购订单状态
export const ORDER_PURCHASE_STATE = {
  ALL: 0, // 全部 0转->字符串空
  WAIT_SEND: 1, // 待发货
  WAIT_DELIVERY: 2, // 待收货
  FINISH: 3, // 已完成
  CANCEL: 4, // 已取消
};

export const ORDER_PURCHASE_STATE_TEXT = {
  [ORDER_PURCHASE_STATE.WAIT_SEND]: "待发货",
  [ORDER_PURCHASE_STATE.WAIT_DELIVERY]: "待收货",
  [ORDER_PURCHASE_STATE.FINISH]: "已完成",
  [ORDER_PURCHASE_STATE.CANCEL]: "已取消",
};

// 配送设置类型
export const SEND_SETTING_TYPE = {
  FREE_SHIPPING: 1, // 免费
  FIXED_FEE: 2, // 固定费用
};

export const SEND_SETTING_TYPE_TEXT = {
  [SEND_SETTING_TYPE.FREE_SHIPPING]: "免配送费",
  [SEND_SETTING_TYPE.FIXED_FEE]: "固定费用",
};

export const SEND_SETTING_TYPE_OPTIONS = () =>
  getOptionsByText(SEND_SETTING_TYPE_TEXT);

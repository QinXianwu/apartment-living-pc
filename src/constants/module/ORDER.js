import { getOpitonsByText } from "../utils";

// 收货类型
export const DELIVERY_TYPE = {
  HOME_DELIVERY: 1, // 配送上门
  ARRIVE_AT_PICKED: 2, // 站点自提
};
export const DELIVERY_TYPE_TEXT = {
  [DELIVERY_TYPE.HOME_DELIVERY]: "配送上门",
  [DELIVERY_TYPE.ARRIVE_AT_PICKED]: "站点自提",
};
export const DELIVERY_TYPE_OPTIONS = () => getOpitonsByText(DELIVERY_TYPE_TEXT);

// 订单来源
export const SOURCE_ORDER = {
  FEATURED_GOODS_ORDER: 1, // 精选商品订单
  POINTS_ORDER: 2, // 积分订单
  GROUP_ORDER: 3, // 拼团订单
};

// 订单状态
export const ORDER_STATE = {
  ALL: 0, // 所有 0转->字符串空
  WAIT_PAY: 1, // 待付款
  IN_TRANSIT: 2, // 配送中
  WAIT_DELIVERY: 3, // 待收货
  FINISH: 4, // 已完成
  CANCEL: 5, // 用户取消
  EXPIRED_CANCEL: 6, // 过期取消
  PLATFORM_CANCEL: 7, // 平台取消
  TO_BE_SHIPPED: 8, // 待出货
  TO_BE_WRITTEN_OFF: 9, // 待核销
  AFTER_SALE: 99, // 售后
  // TO_PICKED_UP: 1500, // 待到店自提
  // TO_BE_AUDITED: 1600, // 待审核
  // WAIT_SEND: 1700, // 待发货
};

export const ORDER_STATE_TEXT = {
  [ORDER_STATE.ALL]: "所有",
  [ORDER_STATE.WAIT_PAY]: "待付款",
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
export const ORDER_STATE_OPTIONS = () => getOpitonsByText(ORDER_STATE_TEXT);

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
  getOpitonsByText(SEND_SETTING_TYPE_TEXT);

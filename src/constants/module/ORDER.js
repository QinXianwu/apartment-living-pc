// 收货类型
export const DELIVERY_TYPE = {
  HOME_DELIVERY: 1, // 配送上门
  ARRIVE_AT_PICKED: 2, // 站点自提
};

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
  // TO_PICKED_UP: 1500, // 待到店自提
  // TO_BE_AUDITED: 1600, // 待审核
  // WAIT_SEND: 1700, // 待发货
  IN_TRANSIT: 2, // 配送中
  WAIT_DELIVERY: 3, // 待收货
  FINISH: 4, // 已完成
  // AFTER_SALE: 6900, // 售后
  CANCEL: 5, // 用户取消
  EXPIRED_CANCEL: 6, // 过期取消
  PLATFORM_CANCEL: 7, // 平台取消
  TO_BE_SHIPPED: 8, // 待出货
  TO_BE_WRITTEN_OFF: 9, // 待核销
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

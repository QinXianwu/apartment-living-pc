// 订单状态
export const ORDER_STATE = {
  ALL: 0, // 所有
  WAIT_PAY: 1000, // 待付款
  TO_PICKED_UP: 1500, // 待到店自提
  TO_BE_AUDITED: 1600, // 待审核
  WAIT_SEND: 1800, // 待发货
  WAIT_DELIVERY: 2100, // 待收货
  FINISH: 6600, // 已完成
  AFTER_SALE: 6900, // 售后
  CANCEL: 7700, // 已关闭
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

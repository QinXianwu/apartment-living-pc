// 运营管理模块

// 折扣活动状态
export const DISCOUNT_STATUS = {
  ALL: 0, // 所有
  NOT_START: 1, // 未开始
  HAVE_IN_HAND: 2, // 进行中
  HAS_ENDED: 3, // 已结束
  STOP: 4, // 已停止
};
export const DISCOUNT_STATUS_TEXT = {
  [DISCOUNT_STATUS.NOT_START]: "未开始",
  [DISCOUNT_STATUS.HAVE_IN_HAND]: "进行中",
  [DISCOUNT_STATUS.HAS_ENDED]: "已结束",
  [DISCOUNT_STATUS.STOP]: "已停止",
};
export const DISCOUNT_STATUS_OPTIONS = () => [
  {
    label: DISCOUNT_STATUS_TEXT[DISCOUNT_STATUS.NOT_START],
    value: DISCOUNT_STATUS.NOT_START,
  },
  {
    label: DISCOUNT_STATUS_TEXT[DISCOUNT_STATUS.HAVE_IN_HAND],
    value: DISCOUNT_STATUS.HAVE_IN_HAND,
  },
  {
    label: DISCOUNT_STATUS_TEXT[DISCOUNT_STATUS.HAS_ENDED],
    value: DISCOUNT_STATUS.HAS_ENDED,
  },
  {
    label: DISCOUNT_STATUS_TEXT[DISCOUNT_STATUS.STOP],
    value: DISCOUNT_STATUS.STOP,
  },
];

// 反馈状态
export const FEED_BACK_STATE = {
  A_S_HANDLE: 1, // 待处理
  A_S_PROCESSED: 2, // 已处理
};
export const FEED_BACK_STATE_TEXT = {
  [FEED_BACK_STATE.A_S_HANDLE]: "待处理",
  [FEED_BACK_STATE.A_S_PROCESSED]: "已处理",
};
// options
export const FEED_BACK_STATE_OPTIONS = () => [
  {
    label: FEED_BACK_STATE_TEXT[FEED_BACK_STATE.A_S_HANDLE],
    value: FEED_BACK_STATE.A_S_HANDLE,
  },
  {
    label: FEED_BACK_STATE_TEXT[FEED_BACK_STATE.A_S_PROCESSED],
    value: FEED_BACK_STATE.A_S_PROCESSED,
  },
];

// 招聘状态
export const RECRUITER_STATE = {
  A_S_HANDLE: 1, // 待处理
  A_S_PROCESSED: 2, // 已处理
};
export const RECRUITER_STATE_TEXT = {
  [RECRUITER_STATE.A_S_HANDLE]: "待处理",
  [RECRUITER_STATE.A_S_PROCESSED]: "已处理",
};
// options
export const RECRUITER_STATE_OPTIONS = () => [
  {
    label: RECRUITER_STATE_TEXT[FEED_BACK_STATE.A_S_HANDLE],
    value: FEED_BACK_STATE.A_S_HANDLE,
  },
  {
    label: RECRUITER_STATE_TEXT[FEED_BACK_STATE.A_S_PROCESSED],
    value: FEED_BACK_STATE.A_S_PROCESSED,
  },
];

// 配送员状态
export const COURIER_AUDIT_STATE = {
  NO_CHECK: 1, // 待审核
  SUCCESS_CHECK: 2, // 审核通过
  FAIL_CHECK: 3, // 审核失败
  INTERDICTED: 4, // 停职
};
export const COURIER_AUDIT_STATE_TEXT = {
  [COURIER_AUDIT_STATE.NO_CHECK]: "待审核",
  [COURIER_AUDIT_STATE.SUCCESS_CHECK]: "审核通过",
  [COURIER_AUDIT_STATE.FAIL_CHECK]: "审核失败",
  [COURIER_AUDIT_STATE.INTERDICTED]: "停职",
};
// 审核options
export const COURIER_AUDIT_STATE_OPTIONS = () => [
  {
    label: COURIER_AUDIT_STATE_TEXT[COURIER_AUDIT_STATE.NO_CHECK],
    value: COURIER_AUDIT_STATE.NO_CHECK,
  },
  {
    label: COURIER_AUDIT_STATE_TEXT[COURIER_AUDIT_STATE.SUCCESS_CHECK],
    value: COURIER_AUDIT_STATE.SUCCESS_CHECK,
  },
  {
    label: COURIER_AUDIT_STATE_TEXT[COURIER_AUDIT_STATE.FAIL_CHECK],
    value: COURIER_AUDIT_STATE.FAIL_CHECK,
  },
  {
    label: COURIER_AUDIT_STATE_TEXT[COURIER_AUDIT_STATE.INTERDICTED],
    value: COURIER_AUDIT_STATE.INTERDICTED,
  },
];

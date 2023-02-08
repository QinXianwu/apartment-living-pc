import { getOpitonsByText } from "../utils";
// 运营管理模块

// 活动状态
export const ACTIVITY_STATUS = {
  ALL: 0, // 所有
  NOT_START: 1, // 未开始
  HAVE_IN_HAND: 2, // 进行中
  HAS_ENDED: 3, // 已结束
  STOP: 4, // 已停止
  NO_CHECK: 5, // 待审核
  FAIL_CHECK: 6, // 驳回
};
export const ACTIVITY_STATUS_TEXT = {
  [ACTIVITY_STATUS.NOT_START]: "未开始",
  [ACTIVITY_STATUS.HAVE_IN_HAND]: "进行中",
  [ACTIVITY_STATUS.HAS_ENDED]: "已结束",
  [ACTIVITY_STATUS.STOP]: "已停止",
  [ACTIVITY_STATUS.NO_CHECK]: "待审核",
  [ACTIVITY_STATUS.FAIL_CHECK]: "审核失败",
};
export const ACTIVITY_STATUS_OPTIONS = () =>
  getOpitonsByText(ACTIVITY_STATUS_TEXT);

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
export const FEED_BACK_STATE_OPTIONS = () =>
  getOpitonsByText(FEED_BACK_STATE_TEXT);

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
export const RECRUITER_STATE_OPTIONS = () =>
  getOpitonsByText(RECRUITER_STATE_TEXT);

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
export const COURIER_AUDIT_STATE_OPTIONS = () =>
  getOpitonsByText(COURIER_AUDIT_STATE_TEXT);

// 限制时间类型
export const GROUP_LIMIT_TYPE = {
  HOUR: 1, // 小时
  DAYS: 2, // 天
};
export const GROUP_LIMIT_TYPE_TEXT = {
  [GROUP_LIMIT_TYPE.HOUR]: "小时",
  [GROUP_LIMIT_TYPE.DAYS]: "天",
};
export const GROUP_LIMIT_OPTIONS = () =>
  getOpitonsByText(GROUP_LIMIT_TYPE_TEXT);

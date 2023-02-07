import { getOpitonsByText } from "../utils";
// 分销商模块

//  分销商状态
export const DEALERS_AUDIT_STATE = {
  NO_CHECK: 1, // 待审核
  SUCCESS_CHECK: 2, // 审核通过
  FAIL_CHECK: 3, // 审核失败
};
export const DEALERS_AUDIT_STATE_TEXT = {
  [DEALERS_AUDIT_STATE.NO_CHECK]: "待审核",
  [DEALERS_AUDIT_STATE.SUCCESS_CHECK]: "审核通过",
  [DEALERS_AUDIT_STATE.FAIL_CHECK]: "审核失败",
};
// 审核options
export const DEALERS_AUDIT_STATE_OPTIONS = () =>
  getOpitonsByText(DEALERS_AUDIT_STATE_TEXT);

//  分销商订单状态
export const DEALERS_ORDER_STATE = {
  TO_BE_SETTLED: 1, // 待结算
  FINISH: 2, // 已完成
  CANCEL: 3, // 已关闭
};
export const DEALERS_ORDER_STATE_TEXT = {
  [DEALERS_ORDER_STATE.TO_BE_SETTLED]: "待结算",
  [DEALERS_ORDER_STATE.FINISH]: "已完成",
  [DEALERS_ORDER_STATE.CANCEL]: "已关闭",
};
// options
export const DEALERS_ORDER_STATE_OPTIONS = () =>
  getOpitonsByText(DEALERS_ORDER_STATE_TEXT);

// 提现类型
export const WITHDRAWALS_TYPE = {
  BANK_CARD: 1, // 银行卡
  WE_CHAT: 2, // 微信零钱
};

export const WITHDRAWALS_TYPE_TEXT = {
  [WITHDRAWALS_TYPE.BANK_CARD]: "银行卡",
  [WITHDRAWALS_TYPE.WE_CHAT]: "微信零钱",
};

export const WITHDRAWALS_TYPE_OPTIONS = () =>
  getOpitonsByText(WITHDRAWALS_TYPE_TEXT);

// 提现状态
export const WITHDRAWALS_STATE = {
  NO_CHECK: 1, // 待审核
  NOT_PAY: 2, // 待打款(审核通过)
  SUCCESS_CHECK: 3, // 已打款(确认打款)
  FAIL_CHECK: 4, // 打款失败 - 驳回
};

export const WITHDRAWALS_STATE_TEXT = {
  [WITHDRAWALS_STATE.NO_CHECK]: "待审核",
  [WITHDRAWALS_STATE.NOT_PAY]: "待打款",
  [WITHDRAWALS_STATE.SUCCESS_CHECK]: "已打款",
  [WITHDRAWALS_STATE.FAIL_CHECK]: "驳回",
};

export const WITHDRAWALS_STATE_OPTIONS = () =>
  getOpitonsByText(WITHDRAWALS_STATE_TEXT);

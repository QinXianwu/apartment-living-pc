import { getOptionsByText } from "../utils";

// 客户模块
// 账号类型
export const ACCOUNT_TYPE = {
  ADMIN: "admin", // 平台账号
  VENDOR: "vendor", // 供应商
  SERVICE: "service", // 服务点
};

// 性别
export const GENDER = {
  MALE: 0, // 男
  FEMALE: 1, // 女
  UNCERTAIN: 2, // 未知
};
export const GENDER_TEXT = {
  [GENDER.MALE]: "男",
  [GENDER.FEMALE]: "女",
  [GENDER.UNCERTAIN]: "未知",
};
// 用户性别options
export const GENDER_OPTIONS = () => getOptionsByText(GENDER_TEXT);

// 状态
export const USER_STATE = {
  ON: "0", // 正常
  OFF: "1", //停用
};
export const USER_STATE_TEXT = {
  [USER_STATE.ON]: "正常",
  [USER_STATE.OFF]: "停用",
};
// 用户options类型
export const USER_STATE_OPTIONS = () => getOptionsByText(USER_STATE_TEXT);

// 会员卡状态
export const MEMBERSHIP_STATE = {
  ON: 1, // 正常
  OFF: 2, //停用
};
export const MEMBERSHIP_STATE_TEXT = {
  [MEMBERSHIP_STATE.ON]: "正常",
  [MEMBERSHIP_STATE.OFF]: "停用",
};
export const MEMBERSHIP_STATE_OPTIONS = () =>
  getOptionsByText(MEMBERSHIP_STATE_TEXT);

// 卡包显示状态
export const MEMBERSHIP_SHOW_STATE = {
  SHOW: 1, // 显示
  HIDE: 2, //不显示
};

// 卡包类型
export const MEMBERSHIP_TYPE = {
  MONTHLY: 1, // 月卡
  SEASON: 2, // 季卡
  ANNUAL: 3, // 年卡
};

export const MEMBERSHIP_TYPE_TEXT = {
  [MEMBERSHIP_TYPE.MONTHLY]: "月卡",
  [MEMBERSHIP_TYPE.SEASON]: "季卡",
  [MEMBERSHIP_TYPE.ANNUAL]: "年卡",
};

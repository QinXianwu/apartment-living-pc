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

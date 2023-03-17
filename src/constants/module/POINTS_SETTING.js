import { getOptionsByText } from "../utils";
// 积分设置模块

// 奖励积分
export const REWARD_INTEGRAL_STATE = {
  GIVE: 1, // 赠送
  NOT_GIFTED: 2, // 不赠送
};
export const REWARD_INTEGRAL_STATE_TEXT = {
  [REWARD_INTEGRAL_STATE.GIVE]: "赠送",
  [REWARD_INTEGRAL_STATE.NOT_GIFTED]: "不赠送",
};
export const REWARD_INTEGRAL_STATE_OPTIONS = () =>
  getOptionsByText(REWARD_INTEGRAL_STATE_TEXT);

// 活动限制日期类型
export const ACTIVITY_LIMIT_DATE_TYPE = {
  LONG_ACTIVITY: 1, // 长期活动
  LIMITED_TIME: 2, // 限期活动
};
export const ACTIVITY_LIMIT_DATE_TYPE_TEXT = {
  [ACTIVITY_LIMIT_DATE_TYPE.LONG_ACTIVITY]: "长期活动",
  [ACTIVITY_LIMIT_DATE_TYPE.LIMITED_TIME]: "限期活动",
};
export const ACTIVITY_LIMIT_DATE_TYPE_OPTIONS = () =>
  getOptionsByText(ACTIVITY_LIMIT_DATE_TYPE_TEXT);

// 积分瓜分活动类型
export const INTEGRAL_CARVE_ACTIVITY_TYPE = {
  LONG_TERM: 1, // 长期活动
  LIMITED_TIME: 2, // 期限活动
};

export const ACTIVITY_TYPE_TEXT = {
  [INTEGRAL_CARVE_ACTIVITY_TYPE.LONG_TERM]: "长期活动",
  [INTEGRAL_CARVE_ACTIVITY_TYPE.LIMITED_TIME]: "期限活动",
};

export const ACTIVITY_TYPE_OPTIONS = () => getOptionsByText(ACTIVITY_TYPE_TEXT);

export const FLUCTUA_TYPE = {
  REVENUE: 1, // 收入
  EXPENDITURE: 2, // 支出
};
export const FLUCTUA_TYPE_TEXT = {
  [FLUCTUA_TYPE.REVENUE]: "收入",
  [FLUCTUA_TYPE.EXPENDITURE]: "支出",
};
export const FLUCTUA_TYPE_OPTIONS = () => getOptionsByText(FLUCTUA_TYPE_TEXT);

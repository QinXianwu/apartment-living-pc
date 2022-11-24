// 客户模块
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
export const GENDER_OPTIONS = () => [
  {
    label: GENDER_TEXT[GENDER.MALE],
    value: GENDER.MALE,
  },
  {
    label: GENDER_TEXT[GENDER.FEMALE],
    value: GENDER.FEMALE,
  },
  {
    label: GENDER_TEXT[GENDER.UNCERTAIN],
    value: GENDER.UNCERTAIN,
  },
];

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
export const USER_STATE_OPTIONS = () => [
  {
    label: USER_STATE_TEXT[USER_STATE.ON],
    value: USER_STATE.ON,
  },
  {
    label: USER_STATE_TEXT[USER_STATE.OFF],
    value: USER_STATE.OFF,
  },
];

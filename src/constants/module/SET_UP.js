// 角色状态
export const ROLE_STATE = {
  ON: "0", // 正常
  OFF: "1", //停用
};
export const ROLE_STATE_TEXT = {
  [ROLE_STATE.ON]: "正常",
  [ROLE_STATE.OFF]: "停用",
};
// 角色options类型
export const ROLE_STATE_OPTIONS = () => [
  {
    label: ROLE_STATE_TEXT[ROLE_STATE.ON],
    value: ROLE_STATE.ON,
  },
  {
    label: ROLE_STATE_TEXT[ROLE_STATE.OFF],
    value: ROLE_STATE.OFF,
  },
];

// 菜单状态
export const MENU_STATE = {
  ON: "0", // 正常
  OFF: "1", //停用
};
export const MENU_STATE_TEXT = {
  [MENU_STATE.ON]: "正常",
  [MENU_STATE.OFF]: "停用",
};
// 菜单options类型
export const MENU_STATE_OPTIONS = () => [
  {
    label: MENU_STATE_TEXT[MENU_STATE.ON],
    value: MENU_STATE.ON,
  },
  {
    label: MENU_STATE_TEXT[MENU_STATE.OFF],
    value: MENU_STATE.OFF,
  },
];

// 菜单类型
export const MENU_TYPE = {
  DIRECTORY: "M", // 目录
  MENU: "C", // 菜单
  BUTTON: "F", // 按钮
};
export const MENU_TYPE_TEXT = {
  [MENU_TYPE.DIRECTORY]: "目录",
  [MENU_TYPE.MENU]: "菜单",
  [MENU_TYPE.BUTTON]: "按钮",
};
// 菜单类型options类型
export const MENU_TYPE_OPTIONS = () => [
  {
    label: MENU_TYPE_TEXT[MENU_TYPE.DIRECTORY],
    value: MENU_TYPE.DIRECTORY,
  },
  {
    label: MENU_TYPE_TEXT[MENU_TYPE.MENU],
    value: MENU_TYPE.MENU,
  },
  {
    label: MENU_TYPE_TEXT[MENU_TYPE.BUTTON],
    value: MENU_TYPE.BUTTON,
  },
];

// 菜单显示状态
export const MENU_SHOW_STATE = {
  SHOW: "0", // 显示
  HIDE: "1", //隐藏
};
export const MENU_SHOW_STATE_TEXT = {
  [MENU_SHOW_STATE.SHOW]: "显示",
  [MENU_SHOW_STATE.HIDE]: "隐藏",
};
// 菜单options类型
export const MENU_SHOW_STATE_OPTIONS = () => [
  {
    label: MENU_SHOW_STATE_TEXT[MENU_SHOW_STATE.SHOW],
    value: MENU_SHOW_STATE.SHOW,
  },
  {
    label: MENU_SHOW_STATE_TEXT[MENU_SHOW_STATE.HIDE],
    value: MENU_SHOW_STATE.HIDE,
  },
];

// 菜单是否为外链
export const MENU_BACKLINKS = {
  YES: "0", // 是
  NOT: "1", // 否
};

// 菜单是否缓存
export const MENU_CACHE = {
  YES: "0", // 是
  NOT: "1", // 否
};

// 部门状态
export const DEPT_STATE = {
  ON: "0", // 正常
  OFF: "1", //停用
};
export const DEPT_STATE_TEXT = {
  [DEPT_STATE.ON]: "正常",
  [DEPT_STATE.OFF]: "停用",
};
// 部门options类型
export const DEPT_STATE_OPTIONS = () => [
  {
    label: DEPT_STATE_TEXT[DEPT_STATE.ON],
    value: DEPT_STATE.ON,
  },
  {
    label: DEPT_STATE_TEXT[DEPT_STATE.OFF],
    value: DEPT_STATE.OFF,
  },
];

// 岗位状态
export const POST_STATE = {
  ON: "0", // 正常
  OFF: "1", //停用
};
export const POST_STATE_TEXT = {
  [POST_STATE.ON]: "正常",
  [POST_STATE.OFF]: "停用",
};
// 岗位options类型
export const POST_STATE_OPTIONS = () => [
  {
    label: POST_STATE_TEXT[POST_STATE.ON],
    value: POST_STATE.ON,
  },
  {
    label: POST_STATE_TEXT[POST_STATE.OFF],
    value: POST_STATE.OFF,
  },
];

// 字典状态
export const DICT_STATE = {
  ON: "0", // 正常
  OFF: "1", //停用
};
export const DICT_STATE_TEXT = {
  [DICT_STATE.ON]: "正常",
  [DICT_STATE.OFF]: "停用",
};
// 字典ptions类型
export const DICT_STATE_OPTIONS = () => [
  {
    label: DICT_STATE_TEXT[DICT_STATE.ON],
    value: DICT_STATE.ON,
  },
  {
    label: DICT_STATE_TEXT[DICT_STATE.OFF],
    value: DICT_STATE.OFF,
  },
];

import { getOpitonsByText } from "../utils";

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
export const ROLE_STATE_OPTIONS = () => getOpitonsByText(ROLE_STATE_TEXT);

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
export const MENU_STATE_OPTIONS = () => getOpitonsByText(MENU_STATE_TEXT);

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
export const MENU_TYPE_OPTIONS = () => getOpitonsByText(MENU_TYPE_TEXT);

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
export const MENU_SHOW_STATE_OPTIONS = () =>
  getOpitonsByText(MENU_SHOW_STATE_TEXT);

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
export const DEPT_STATE_OPTIONS = () => getOpitonsByText(DEPT_STATE_TEXT);

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
export const POST_STATE_OPTIONS = () => getOpitonsByText(POST_STATE_TEXT);

// 字典状态
export const DICT_STATE = {
  ON: "0", // 正常
  OFF: "1", //停用
};
export const DICT_STATE_TEXT = {
  [DICT_STATE.ON]: "正常",
  [DICT_STATE.OFF]: "停用",
};
// 字典options类型
export const DICT_STATE_OPTIONS = () => getOpitonsByText(DICT_STATE_TEXT);

// 系统日志操作状态
export const SYS_ACTION_STATE = {
  SUCCESS: 0, // 正常
  FAIL: 1, // 失败
};
export const SYS_ACTION_STATE_TEXT = {
  [SYS_ACTION_STATE.SUCCESS]: "正常",
  [SYS_ACTION_STATE.FAIL]: "失败",
};
// 系统日志操作状态options类型
export const SYS_ACTION_STATE_OPTIONS = () =>
  getOpitonsByText(SYS_ACTION_STATE_TEXT);

// 系统日志操作类型
export const SYS_ACTION_TYPE = {
  ADD: "1", // 新增
  UPDATE: "2", // 修改
  DELETE: "3", // 删除
  LICENSING: "4", // 授权
  EXPORT: "5", // 导出
  IMPORT: "6", // 导入
  FORCE_OUT: "7", // 强制退出
  GENERATE_CODE: "8", // 生产代码
  CLEAR_DATA: "9", // 清空数据
};
export const SYS_ACTION_TYPE_TEXT = {
  [SYS_ACTION_TYPE.ADD]: "新增",
  [SYS_ACTION_TYPE.UPDATE]: "修改",
  [SYS_ACTION_TYPE.DELETE]: "删除",
  [SYS_ACTION_TYPE.LICENSING]: "授权",
  [SYS_ACTION_TYPE.EXPORT]: "导出",
  [SYS_ACTION_TYPE.IMPORT]: "导入",
  [SYS_ACTION_TYPE.FORCE_OUT]: "强制退出",
  [SYS_ACTION_TYPE.GENERATE_CODE]: "生产代码",
  [SYS_ACTION_TYPE.CLEAR_DATA]: "清空数据",
};
// 系统日志操作类型options类型
export const SYS_ACTION_TYPE_OPTIONS = () =>
  getOpitonsByText(SYS_ACTION_TYPE_TEXT);

// 协议类型
export const PROTOCOL_TYPE = {
  USER_AGREEMENT: 1, // 用户协议
  PRIVACY_AGREEMENT: 2, //  隐私协议
};

export const PROTOCOL_TYPE_TEXT = {
  [PROTOCOL_TYPE.USER_AGREEMENT]: "用户协议",
  [PROTOCOL_TYPE.PRIVACY_AGREEMENT]: "隐私协议",
};

export const PROTOCOL_TYPE_OPTIONS = getOpitonsByText(PROTOCOL_TYPE_TEXT);

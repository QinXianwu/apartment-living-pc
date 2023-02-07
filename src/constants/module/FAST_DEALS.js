import { getOpitonsByText } from "../utils";
// 秒杀模块

// 秒杀场次状态
export const SESSION_COUNT_STATE = {
  ON: 1, // 正常
  OFF: 2, // 停用
};
export const SESSION_COUNT_STATE_TEXT = {
  [SESSION_COUNT_STATE.ON]: "正常",
  [SESSION_COUNT_STATE.OFF]: "停用",
};
export const SESSION_COUNT_STATE_OPTIONS = () =>
  getOpitonsByText(SESSION_COUNT_STATE_TEXT);

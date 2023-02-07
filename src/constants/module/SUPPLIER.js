import { getOpitonsByText } from "../utils";

// 供应商状态
export const SUPPLIER_STATE = {
  ON: 0, // 正常
  OFF: 1, //停用
};
export const SUPPLIER_STATE_TEXT = {
  [SUPPLIER_STATE.ON]: "正常",
  [SUPPLIER_STATE.OFF]: "停用",
};
export const SUPPLIER_STATE_OPTIONS = () =>
  getOpitonsByText(SUPPLIER_STATE_TEXT);

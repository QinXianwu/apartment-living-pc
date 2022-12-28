// 供应商状态
export const SUPPLIER_STATE = {
  ON: "0", // 正常
  OFF: "1", //停用
};
export const SUPPLIER_STATE_TEXT = {
  [SUPPLIER_STATE.ON]: "正常",
  [SUPPLIER_STATE.OFF]: "停用",
};
export const SUPPLIER_STATE_OPTIONS = () => [
  {
    label: SUPPLIER_STATE_TEXT[SUPPLIER_STATE.ON],
    value: SUPPLIER_STATE.ON,
  },
  {
    label: SUPPLIER_STATE_TEXT[SUPPLIER_STATE.OFF],
    value: SUPPLIER_STATE.OFF,
  },
];

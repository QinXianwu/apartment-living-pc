import { getOpitonsByText } from "../utils";

// 服务点状态
export const SERVICE_STATION_STATE = {
  ON: 0, // 启用
  OFF: 1, //停用
};
export const SERVICE_STATION_STATE_TEXT = {
  [SERVICE_STATION_STATE.ON]: "启用",
  [SERVICE_STATION_STATE.OFF]: "停用",
};
export const SERVICE_STATION_STATE_OPTIONS = () =>
  getOpitonsByText(SERVICE_STATION_STATE_TEXT);

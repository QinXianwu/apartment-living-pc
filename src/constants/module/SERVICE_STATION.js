import { getOptionsByText } from "../utils";

// 服务点状态
export const SERVICE_STATION_STATE = {
  ON: 1, // 启用
  OFF: 2, //停用
};
export const SERVICE_STATION_STATE_TEXT = {
  [SERVICE_STATION_STATE.ON]: "启用",
  [SERVICE_STATION_STATE.OFF]: "停用",
};
export const SERVICE_STATION_STATE_OPTIONS = () =>
  getOptionsByText(SERVICE_STATION_STATE_TEXT);

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
export const SESSION_COUNT_STATE_OPTIONS = () => [
  {
    label: SESSION_COUNT_STATE_TEXT[SESSION_COUNT_STATE.ON],
    value: SESSION_COUNT_STATE.ON,
  },
  {
    label: SESSION_COUNT_STATE_TEXT[SESSION_COUNT_STATE.OFF],
    value: SESSION_COUNT_STATE.OFF,
  },
];

// 秒杀活动状态
export const ACT_STATUS = {
  NOT_START: 1, // 未开始
  HAVE_IN_HAND: 2, // 进行中
  HAS_ENDED: 3, // 已结束
  STOP: 4, // 已停止
};
export const ACT_STATUS_TEXT = {
  [ACT_STATUS.NOT_START]: "未开始",
  [ACT_STATUS.HAVE_IN_HAND]: "进行中",
  [ACT_STATUS.HAS_ENDED]: "已结束",
  [ACT_STATUS.STOP]: "已停止",
};
export const ACT_STATUS_OPTIONS = () => [
  {
    label: ACT_STATUS_TEXT[ACT_STATUS.NOT_START],
    value: ACT_STATUS.NOT_START,
  },
  {
    label: ACT_STATUS_TEXT[ACT_STATUS.HAVE_IN_HAND],
    value: ACT_STATUS.HAVE_IN_HAND,
  },
  {
    label: ACT_STATUS_TEXT[ACT_STATUS.HAS_ENDED],
    value: ACT_STATUS.HAS_ENDED,
  },
  {
    label: ACT_STATUS_TEXT[ACT_STATUS.STOP],
    value: ACT_STATUS.STOP,
  },
];

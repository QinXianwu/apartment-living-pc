// 运营管理模块

// 反馈状态
export const FEED_BACK_STATE = {
  A_S_HANDLE: 1, // 待处理
  A_S_PROCESSED: 2, // 已处理
};
export const FEED_BACK_STATE_TEXT = {
  [FEED_BACK_STATE.A_S_HANDLE]: "待处理",
  [FEED_BACK_STATE.A_S_PROCESSED]: "已处理",
};
// options
export const FEED_BACK_STATE_OPTIONS = () => [
  {
    label: FEED_BACK_STATE_TEXT[FEED_BACK_STATE.A_S_HANDLE],
    value: FEED_BACK_STATE.A_S_HANDLE,
  },
  {
    label: FEED_BACK_STATE_TEXT[FEED_BACK_STATE.A_S_PROCESSED],
    value: FEED_BACK_STATE.A_S_PROCESSED,
  },
];

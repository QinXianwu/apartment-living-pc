// 任务组状态
export const JOB_GROUP = {
  DEFAULT: "DEFAULT", // 默认
  SYSTEM: "SYSTEM", //系统
};
export const JOB_GROUP_TEXT = {
  [JOB_GROUP.DEFAULT]: "默认",
  [JOB_GROUP.SYSTEM]: "系统",
};
// 任务组options类型
export const JOB_GROUP_OPTIONS = () => [
  {
    label: JOB_GROUP_TEXT[JOB_GROUP.DEFAULT],
    value: JOB_GROUP.DEFAULT,
  },
  {
    label: JOB_GROUP_TEXT[JOB_GROUP.SYSTEM],
    value: JOB_GROUP.SYSTEM,
  },
];

// 定时任务状态
export const JOB_STATE = {
  ON: "0", // 正常
  OFF: "1", //停用
};
export const JOB_STATE_TEXT = {
  [JOB_STATE.ON]: "正常",
  [JOB_STATE.OFF]: "停用",
};
// 定时任务状态options类型
export const JOB_STATE_OPTIONS = () => [
  {
    label: JOB_STATE_TEXT[JOB_STATE.ON],
    value: JOB_STATE.ON,
  },
  {
    label: JOB_STATE_TEXT[JOB_STATE.OFF],
    value: JOB_STATE.OFF,
  },
];

// 执行策略
export const EXECUTE_POLICY = {
  DEFAULT: "0", // 默认策略
  EXECUTE_IMMEDIATELY: "1", // 立即执行
  EXECUTE_ONCE: "2", // 执行一次
  ABANDON_EXECUTION: "3", // 放弃执行
};
export const EXECUTE_POLICY_TEXT = {
  [EXECUTE_POLICY.DEFAULT]: "默认策略",
  [EXECUTE_POLICY.EXECUTE_IMMEDIATELY]: "立即执行",
  [EXECUTE_POLICY.EXECUTE_ONCE]: "执行一次",
  [EXECUTE_POLICY.ABANDON_EXECUTION]: "放弃执行",
};
// 执行策略options类型
export const EXECUTE_POLICY_OPTIONS = () => [
  {
    label: EXECUTE_POLICY_TEXT[EXECUTE_POLICY.EXECUTE_IMMEDIATELY],
    value: EXECUTE_POLICY.EXECUTE_IMMEDIATELY,
  },
  {
    label: EXECUTE_POLICY_TEXT[EXECUTE_POLICY.EXECUTE_ONCE],
    value: EXECUTE_POLICY.EXECUTE_ONCE,
  },
  {
    label: EXECUTE_POLICY_TEXT[EXECUTE_POLICY.ABANDON_EXECUTION],
    value: EXECUTE_POLICY.ABANDON_EXECUTION,
  },
];

// 并发类型
export const CONCURRENCY = {
  ALLOW: "0", // 允许
  FORBID: "1", // 禁止
};
export const CONCURRENCY_TEXT = {
  [CONCURRENCY.ALLOW]: "允许",
  [CONCURRENCY.FORBID]: "禁止",
};
// 并发options类型
export const CONCURRENCY_OPTIONS = () => [
  {
    label: CONCURRENCY_TEXT[CONCURRENCY.ALLOW],
    value: CONCURRENCY.ALLOW,
  },
  {
    label: CONCURRENCY_TEXT[CONCURRENCY.FORBID],
    value: CONCURRENCY.FORBID,
  },
];

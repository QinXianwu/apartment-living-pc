import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "任务名称",
    prop: "jobName",
    type: "text",
    value: "",
    placeholder: "请输入任务名称",
  },
  {
    label: "任务组名",
    prop: "jobGroup",
    type: "select",
    value: "",
    options: CONST.JOB_GROUP_OPTIONS(),
    placeholder: "请选择任务组名",
  },
  {
    label: "任务状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.JOB_STATE_OPTIONS(),
    placeholder: "请选择任务状态",
  },
];

// 表格头
export const column = [
  {
    label: "任务编号",
    prop: "jobId",
  },
  {
    label: "任务名称",
    prop: "jobName",
    showOverflowTooltip: true,
  },
  {
    label: "任务组名",
    prop: "jobGroup",
    type: "custom",
  },
  {
    label: "调用目标字符串",
    prop: "invokeTarget",
    showOverflowTooltip: true,
  },
  {
    label: "cron执行表达式",
    prop: "cronExpression",
    showOverflowTooltip: true,
  },
  {
    label: "状态",
    prop: "status",
    type: "custom",
  },
  {
    label: "创建时间",
    prop: "createTime",
    width: 160,
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    width: 260,
  },
];

// 调度日志 搜索选项
export const DispatchLog_formData = [
  {
    label: "任务名称",
    prop: "jobName",
    type: "text",
    value: "",
    placeholder: "请输入任务名称",
  },
  {
    label: "任务组名",
    prop: "jobGroup",
    type: "select",
    value: "",
    options: CONST.JOB_GROUP_OPTIONS(),
    placeholder: "请选择任务组名",
  },
  {
    label: "执行状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.JOB_STATE_OPTIONS(),
    placeholder: "请选择执行状态",
  },
  {
    label: "执行时间",
    prop: "runTime",
    type: "daterange",
    value: "",
    placeholder: "请选择创建时间",
  },
];

// 调度日志 表格头
export const DispatchLog_column = [
  {
    label: "日志编号",
    prop: "jobLogId",
  },
  {
    label: "任务名称",
    prop: "jobName",
    showOverflowTooltip: true,
  },
  {
    label: "任务组名",
    prop: "jobGroup",
  },
  {
    label: "调用目标字符串",
    prop: "invokeTarget",
  },
  {
    label: "任务名称",
    prop: "jobName",
    showOverflowTooltip: true,
  },
  {
    label: "调用目标字符串",
    prop: "invokeTarget",
    showOverflowTooltip: true,
  },
  {
    label: "日志信息",
    prop: "jobMessage",
    showOverflowTooltip: true,
  },
  {
    label: "状态",
    prop: "status",
    type: "custom",
  },
  {
    label: "执行时间",
    prop: "createTime",
    width: 160,
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    fixed: "right",
    width: 250,
  },
];

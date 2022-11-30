import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "系统模块",
    prop: "title",
    type: "text",
    value: "",
    placeholder: "请输入系统模块",
  },
  {
    label: "操作人员",
    prop: "operName",
    type: "text",
    value: "",
    placeholder: "请输入操作人员",
  },
  {
    label: "类型",
    prop: "businessType",
    type: "select",
    value: "",
    options: CONST.SYS_ACTION_TYPE_OPTIONS(),
    placeholder: "请选择操作类型",
  },
  {
    label: "状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.SYS_ACTION_STATE_OPTIONS(),
    placeholder: "请选择操作状态",
  },
  {
    label: "操作时间",
    prop: "actionDate",
    type: "daterange",
    value: "",
    placeholder: "请选择操作时间",
  },
];

// 表格头
export const column = [
  {
    label: "日志编号",
    prop: "operId",
  },
  {
    label: "系统模块",
    prop: "title",
  },
  {
    label: "操作类型",
    prop: "businessType",
    type: "custom",
  },
  {
    label: "请求方式",
    prop: "requestMethod",
  },
  {
    label: "操作人员",
    prop: "operName",
    showOverflowTooltip: true,
  },
  {
    label: "主机",
    prop: "operIp",
    showOverflowTooltip: true,
  },
  {
    label: "操作状态",
    prop: "status",
    type: "custom",
  },
  {
    label: "操作日期",
    prop: "operTime",
    width: 160,
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    width: 260,
  },
];

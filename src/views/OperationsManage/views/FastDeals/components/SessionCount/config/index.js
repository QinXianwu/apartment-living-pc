import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "场次状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.SESSION_COUNT_STATE_OPTIONS(),
    placeholder: "请选择场次状态",
  },
];
// 表格头
export const column = [
  {
    label: "序号",
    prop: "id",
    showOverflowTooltip: true,
  },
  {
    label: "活动开始时间",
    prop: "startTime",
    width: 160,
  },
  {
    label: "活动结束时间",
    prop: "endTime",
    width: 160,
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
    fixed: "right",
    width: 250,
  },
];

import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "配送员名称",
    prop: "name",
    type: "text",
    value: "",
    placeholder: "请输入配送员名称",
  },
  {
    label: "配送员手机号",
    prop: "phone",
    type: "text",
    value: "",
    placeholder: "请输入配送员手机号",
  },
  {
    label: "适用服务点",
    prop: "serviceStationId",
    type: "select",
    value: "",
    options: [],
    placeholder: "请选择适用服务点",
  },
  {
    label: "状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.COURIER_AUDIT_STATE_OPTIONS(),
    placeholder: "请选择状态",
  },
];
// 表格头
export const column = [
  {
    label: "配送员名称",
    prop: "name",
    width: 160,
  },
  {
    label: "配送员手机号",
    prop: "phone",
    width: 160,
  },
  {
    label: "适用服务点",
    prop: "serviceStationName",
  },
  {
    label: "状态",
    prop: "status",
    type: "custom",
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    fixed: "right",
    width: 250,
  },
];

// 活动标签
export const activityTab = () => [
  {
    value: "",
    tabType: "",
    is: CONST.COURIER_AUDIT_STATE.NO_CHECK,
  },
  {
    value: "",
    tabType: "success",
    is: CONST.COURIER_AUDIT_STATE.SUCCESS_CHECK,
  },
  {
    value: "",
    tabType: "danger",
    is: CONST.COURIER_AUDIT_STATE.FAIL_CHECK,
  },
  {
    value: "",
    tabType: "warning",
    is: CONST.COURIER_AUDIT_STATE.INTERDICTED,
  },
];

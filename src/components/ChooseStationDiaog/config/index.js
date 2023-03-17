import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "服务点名称",
    prop: "name",
    type: "text",
    value: "",
    placeholder: "请输入服务点名称",
  },
  {
    label: "状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.SUPPLIER_STATE_OPTIONS(),
    placeholder: "请选择状态",
  },
  {
    label: "管理员",
    prop: "manager",
    type: "text",
    value: "",
    placeholder: "请输入管理员",
  },
  {
    label: "管理员手机号",
    prop: "managePhone",
    type: "text",
    value: "",
    placeholder: "请输入管理员手机号",
  },
];

// 表格头
export const column = [
  {
    label: "服务点名称",
    prop: "name",
  },
  {
    label: "地址",
    prop: "address",
    type: "custom",
    // showOverflowTooltip: true,
  },
  {
    label: "服务点联系方式",
    prop: "phone",
  },
  {
    label: "管理员",
    prop: "manager",
  },
  {
    label: "管理员手机号",
    prop: "managePhone",
  },
  {
    label: "状态",
    prop: "status",
    type: "custom",
  },
];

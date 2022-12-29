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
  {
    label: "状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.SUPPLIER_STATE_OPTIONS(),
    placeholder: "请选择状态",
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

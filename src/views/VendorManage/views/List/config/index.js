import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "供应商名称",
    prop: "name",
    type: "text",
    value: "",
    placeholder: "请输入供应商名称",
  },
  {
    label: "联系人",
    prop: "manager",
    type: "text",
    value: "",
    placeholder: "请输入联系人",
  },
  {
    label: "联系电话",
    prop: "managerPhone",
    type: "text",
    value: "",
    placeholder: "请输入联系电话",
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
    label: "供应商名称",
    prop: "name",
  },
  {
    label: "联系人",
    prop: "manager",
  },
  {
    label: "手机号",
    prop: "managerPhone",
  },
  {
    label: "地址",
    prop: "address",
    type: "custom",
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

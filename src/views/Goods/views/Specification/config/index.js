import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "规格名称",
    prop: "specificationName",
    type: "text",
    value: "",
    placeholder: "请输入规格名称",
  },
  {
    label: "规格状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.SPECIFICA_TYPE_OPTIONS(),
    placeholder: "请选择规格状态",
  },
];

// 表格头
export const column = [
  {
    label: "ID",
    prop: "id",
    showOverflowTooltip: true,
  },
  {
    label: "规格名称",
    prop: "specificationName",
  },
  {
    label: "分类排序",
    prop: "sort",
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

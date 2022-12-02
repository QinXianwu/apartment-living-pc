// import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "商品名称",
    prop: "goodsName",
    type: "text",
    value: "",
    placeholder: "请输入商品名称",
  },
  {
    label: "商品分类",
    prop: "status",
    type: "select",
    value: "",
    options: [],
    placeholder: "请选择商品分类",
  },
  {
    label: "商品类型",
    prop: "status",
    type: "select",
    value: "",
    options: [],
    placeholder: "请选择商品类型",
  },
  {
    label: "供应商",
    prop: "status",
    type: "select",
    value: "",
    options: [],
    placeholder: "请选择供应商",
  },
  {
    label: "商品库存",
    prop: "status",
    type: "textrange",
    textType: "number",
    value: [],
    placeholder: "请输入商品库存",
  },
];

// 表格头
export const column = [
  {
    label: "ID",
    prop: "ID",
    showOverflowTooltip: true,
  },
  {
    label: "图标",
    prop: "icon",
  },
  {
    label: "排序",
    prop: "orderNum",
  },
  {
    label: "权限标识",
    prop: "perms",
    showOverflowTooltip: true,
  },
  {
    label: "组件路径",
    prop: "component",
    showOverflowTooltip: true,
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

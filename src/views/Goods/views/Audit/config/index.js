// import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "商品名称",
    prop: "productName",
    type: "text",
    value: "",
    placeholder: "请输入商品名称",
  },
  {
    label: "商品分类",
    prop: "categoryId",
    type: "cascader",
    value: "",
    options: [],
    placeholder: "请选择商品分类",
    props: {
      emitPath: false,
      checkStrictly: true,
    },
  },
  {
    label: "供应商",
    prop: "supplierId",
    type: "select",
    value: "",
    options: [],
    placeholder: "请选择供应商",
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
    label: "分类",
    prop: "icon",
  },
  {
    label: "商品标签",
    prop: "orderNum",
    type: "custom",
  },
  {
    label: "供应商",
    prop: "perms",
    showOverflowTooltip: true,
  },
  {
    label: "商品名称",
    prop: "component",
    showOverflowTooltip: true,
  },
  {
    label: "售价",
    prop: "icon",
    type: "money",
  },
  {
    label: "库存",
    prop: "icon",
  },
  {
    label: "创建时间",
    prop: "icon",
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

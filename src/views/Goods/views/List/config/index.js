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
    label: "分类",
    prop: "icon",
  },
  {
    label: "商品标签",
    prop: "orderNum",
  },
  {
    label: "供应商",
    prop: "perms",
    showOverflowTooltip: true,
  },
  {
    label: "商品名称",
    prop: "component",
  },
  {
    label: "供应价",
    prop: "icon",
    type: "money",
  },
  {
    label: "活动标签",
    prop: "icon",
  },
  {
    label: "售价",
    prop: "icon",
    type: "money",
  },
  {
    label: "当前剩余库存",
    // label: "当前剩余库存(服务点)",
    prop: "icon",
  },
  {
    label: "销量",
    // label: "销量(服务点)",
    prop: "icon",
  },
  {
    label: "采购总量",
    // label: "采购总量(服务点)",
    prop: "icon",
  },
  {
    label: "折扣",
    prop: "icon",
  },
  {
    label: "折扣价",
    prop: "icon",
  },
  {
    label: "预售时间",
    prop: "icon",
  },
  {
    label: "更新时间",
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

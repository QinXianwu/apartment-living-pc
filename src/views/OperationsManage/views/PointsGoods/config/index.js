import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  // {
  //   label: "商品名称",
  //   prop: "productName",
  //   type: "text",
  //   value: "",
  //   placeholder: "请输入商品名称",
  // },
  // {
  //   label: "商品分类",
  //   prop: "categoryId",
  //   type: "cascader",
  //   value: "",
  //   options: [],
  //   placeholder: "请选择商品分类",
  //   props: {
  //     emitPath: false,
  //     checkStrictly: true,
  //   },
  // },
  // {
  //   label: "供应商",
  //   prop: "supplierId",
  //   type: "select",
  //   value: "",
  //   options: [],
  //   placeholder: "请选择供应商",
  // },
];

export const tabs = [
  {
    label: "全部",
    value: CONST.GOODS_OPER_STATE.ALL,
  },
  {
    label: "上架",
    value: CONST.GOODS_OPER_STATE.LISTING,
  },
  {
    label: "下架",
    value: CONST.GOODS_OPER_STATE.REMOVAL,
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
    label: "分类",
    prop: "categoryName",
    type: "custom",
  },
  // {
  //   label: "供应商",
  //   prop: "supplierName",
  //   type: "custom",
  // },
  {
    label: "商品名称",
    prop: "goodsInfo",
    type: "custom",
    minWidth: 150,
  },
  {
    label: "积分",
    prop: "integral",
  },
  {
    label: "库存",
    prop: "stockCount",
  },
  {
    label: "销量",
    prop: "exchangeCount",
  },
  {
    label: "状态",
    prop: "status",
    type: "custom",
    width: 100,
  },
  {
    label: "更新时间",
    prop: "updateTime",
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

// 采购单规格表格头
export const ProcurementColumn = [
  {
    label: "规格1",
    prop: "specificationValueName1",
    showOverflowTooltip: true,
  },
  {
    label: "规格2",
    prop: "specificationValueName2",
    showOverflowTooltip: true,
  },
  {
    label: "规格图片",
    prop: "images",
    type: "image",
  },
  {
    label: "销售价",
    prop: "sellPrice",
    type: "money",
  },
  {
    label: "供应价",
    prop: "originalPrice",
    type: "money",
  },
  {
    label: "采购数量",
    prop: "procurementNum",
    type: "custom",
    width: 160,
  },
];

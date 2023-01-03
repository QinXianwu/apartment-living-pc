import CONST from "@/constants/index";

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
    label: "商品状态",
    prop: "operStatus",
    type: "select",
    value: "",
    options: CONST.GOODS_OPER_STATE_OPTIONS(),
    placeholder: "请选择商品状态",
  },
  {
    label: "供应商",
    prop: "supplierId",
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
    prop: "id",
    showOverflowTooltip: true,
  },
  {
    label: "分类",
    prop: "categoryName",
    showOverflowTooltip: true,
  },
  {
    label: "商品标签",
    prop: "goodsTab",
    type: "custom",
  },
  {
    label: "供应商",
    prop: "supplierName",
    showOverflowTooltip: true,
  },
  {
    label: "商品名称",
    prop: "goodsInfo",
    type: "custom",
    minWidth: 150,
  },
  {
    label: "供应价",
    prop: "originalPrice",
    type: "money",
  },
  {
    label: "活动标签",
    prop: "activityTab",
    type: "custom",
    width: 125,
  },
  {
    label: "售价",
    prop: "sellPrice",
    type: "custom",
  },
  {
    label: "当前剩余库存",
    prop: "stock",
  },
  {
    label: "销量",
    prop: "sales",
  },
  {
    label: "采购总量",
    prop: "purchaseAmount",
  },
  {
    label: "折扣",
    prop: "discount",
    type: "custom",
  },
  {
    label: "折扣价",
    prop: "discountPrice",
    type: "custom",
  },
  {
    label: "秒杀价",
    prop: "spikePrice",
    type: "custom",
  },
  {
    label: "预售时间",
    prop: "preFhDate",
    width: 160,
  },
  {
    label: "上下架状态",
    prop: "operStatus",
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

// 活动标签
export const activityTab = [
  {
    key: "bargainIs",
    label: "特价",
    value: "",
    tabType: "",
    is: CONST.SPECIALS_TYPE.YES,
  },
  {
    key: "discountIs",
    label: "折扣",
    value: "",
    tabType: "success",
    is: CONST.DISCOUNTED_TYPE.YES,
  },
  {
    key: "isLimit",
    label: "限购",
    value: "",
    tabType: "danger",
    is: CONST.RESTRICTED_TYPE.YES,
  },
  {
    key: "isPre",
    label: "预售",
    value: "",
    tabType: "warning",
    is: CONST.PRE_SALE_TYPE.YES,
  },
];

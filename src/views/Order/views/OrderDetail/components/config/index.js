// 商品信息表格头
export const GoodsColumn = [
  {
    label: "活动类型",
    prop: "activityType",
    type: "custom",
  },
  {
    label: "商品名称",
    prop: "goodsInfo",
    type: "custom",
    minWidth: 150,
  },
  {
    label: "单价",
    prop: "productPrice",
    type: "money",
  },
  {
    label: "规格",
    prop: "specificationName",
  },
  {
    label: "数量",
    prop: "productNum",
  },
  {
    label: "小计",
    prop: "total",
    type: "money",
  },
  {
    label: "供应商",
    prop: "supplierName",
    showOverflowTooltip: true,
  },
  {
    label: "供应价",
    prop: "originalPrice",
    type: "money",
  },
];

// 活动标签
export const activityTab = () => [
  {
    key: "bargainIs",
    label: "特价",
    value: "",
    tabType: "",
  },
  {
    key: "discountIs",
    label: "折扣",
    value: "",
    tabType: "success",
  },
  {
    key: "isLimit",
    label: "限购",
    value: "",
    tabType: "danger",
  },
  {
    key: "isPre",
    label: "预售",
    value: "",
    tabType: "warning",
  },
];

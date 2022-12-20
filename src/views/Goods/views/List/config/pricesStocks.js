export const dynamic_column = [
  {
    label: "规格",
    prop: "specificationValueName1",
    showOverflowTooltip: true,
    minWidth: 120,
  },
  {
    label: "规格名称",
    prop: "specificationValueName2",
    showOverflowTooltip: true,
    minWidth: 120,
  },
];

// 表格头
export const column = [
  {
    label: "销售价",
    btnText: "销售价",
    prop: "sellPrice",
    type: "money",
  },
  {
    label: "折扣",
    btnText: "折扣",
    prop: "discount",
    precision: 1,
    max: 10,
  },
  {
    label: "折扣价",
    btnText: "折扣价",
    prop: "discountPrice",
    type: "money",
  },
  {
    label: "划线价",
    btnText: "划线价",
    prop: "underlinedPrice",
    type: "money",
  },
  {
    label: "供应价(原价)",
    btnText: "供应价",
    prop: "originalPrice",
    type: "money",
  },
  {
    label: "采购总量",
    btnText: "",
    prop: "procurNum",
  },
  {
    label: "当前剩余库存",
    btnText: "",
    prop: "stock",
  },
  {
    label: "拼团价",
    btnText: "拼团价",
    prop: "groupPrice",
    type: "money",
  },
  {
    label: "秒杀价",
    btnText: "秒杀价",
    prop: "spikePrice",
    type: "money",
  },
  {
    label: "新人价",
    btnText: "新人价",
    prop: "couplePrice",
    type: "money",
  },
  {
    label: "一级分销佣金",
    btnText: "一级分销佣金",
    prop: "firstDistributionAmount	",
    type: "money",
  },
  {
    label: "二级分销佣金",
    btnText: "二级分销佣金",
    prop: "secondDistributionAmount",
    type: "money",
  },
];

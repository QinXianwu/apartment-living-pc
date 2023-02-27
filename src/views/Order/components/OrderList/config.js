// 列表表格头
export const column = [
  {
    label: "订单号",
    prop: "orderNo",
  },
  {
    label: "商品信息",
    prop: "goodsInfo",
    type: "custom",
    minWidth: 150,
  },
  {
    label: "供应商",
    prop: "supplierName",
    showOverflowTooltip: true,
  },
  {
    label: "服务点",
    prop: "serviceName",
    showOverflowTooltip: true,
  },
  {
    label: "实收金额",
    prop: "orderAmount",
    type: "money",
  },
  {
    label: "兑换积分",
    prop: "iiii",
  },
  {
    label: "配送信息",
    prop: "userInfo",
    type: "custom",
  },
  {
    label: "配送员",
    prop: "courierName",
  },
  {
    label: "配送服务费",
    prop: "courierServiceAmount",
    type: "money",
  },
  {
    label: "自提信息",
    prop: "pickingAddress",
    type: "custom",
  },
  {
    label: "自提时间",
    prop: "pickingTime",
    width: 160,
  },
  {
    label: "状态",
    prop: "orderStatus",
    type: "custom",
    width: 100,
  },
  {
    label: "下单时间",
    prop: "orderTime",
    width: 160,
  },
  {
    label: "备注",
    prop: "remark",
    showOverflowTooltip: true,
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    fixed: "right",
    width: 250,
  },
];

// 列表售后表格头
export const afterSaleColumn = [
  {
    label: "订单号",
    prop: "orderNo",
  },
  {
    label: "商品信息",
    prop: "goodsInfo",
    type: "custom",
    minWidth: 150,
  },
  {
    label: "退款金额",
    prop: "refundAmount",
    type: "money",
  },
  {
    label: "申请原因",
    prop: "reason",
    showOverflowTooltip: true,
  },
  {
    label: "服务点",
    prop: "serviceName",
    showOverflowTooltip: true,
  },
  {
    label: "用户信息",
    prop: "userInfo",
    type: "custom",
    width: 160,
  },
  {
    label: "售前状态",
    prop: "orderStatus",
    type: "custom",
    width: 100,
  },
  {
    label: "售后类型",
    prop: "type",
  },
  {
    label: "售后状态",
    prop: "operStatus",
    type: "custom",
  },
  {
    label: "申请时间",
    prop: "applyDate",
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

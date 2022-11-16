// 搜索选项
export const formData = [
  {
    label: "代售点",
    prop: "code",
    type: "select",
    value: "",
    options: [],
    placeholder: "请选择代售点",
  },
  {
    label: "开始结算日期",
    prop: "settlementDate",
    type: "datetimerange",
    value: [],
  },
];
// 表格头
export const column = [
  {
    label: "代售点",
    prop: "name",
  },
  {
    label: "结算开始时间",
    prop: "startTime",
    width: 160,
  },
  {
    label: "结算结束时间",
    prop: "endTime",
    width: 160,
  },
  {
    label: "出票订单数",
    prop: "orderQuantity",
  },
  {
    label: "出票张数",
    prop: "ticketQuantity",
  },
  {
    label: "出票款",
    prop: "ticketAmount",
    type: "money",
  },
  {
    label: "代购费",
    prop: "purchaseAmount",
    type: "money",
  },
  {
    label: "退票费",
    prop: "refundAmount",
    type: "money",
  },
  {
    label: "改签张数",
    prop: "changesQuantity",
  },
  {
    label: "改签款",
    prop: "changesAmount",
    type: "money",
  },
  {
    label: "订单总金额",
    prop: "totalOrderAmount",
    type: "money",
  },
  {
    label: "结算总金额",
    prop: "totalSettlementAmount",
    type: "money",
  },
];

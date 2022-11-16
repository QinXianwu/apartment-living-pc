import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "乘客姓名",
    prop: "passengerName",
    type: "text",
    value: "",
    placeholder: "请输入乘客姓名",
  },
  {
    label: "手机号",
    prop: "contactMobile",
    type: "text",
    value: "",
    placeholder: "请输入手机号",
  },
  {
    label: "车次",
    prop: "trainNumber",
    type: "text",
    value: "",
    placeholder: "请输入车次",
  },
  {
    label: "代售点",
    prop: "agentCode",
    type: "select",
    value: "",
    options: [],
    placeholder: "请选择代售点",
  },
  {
    label: "订单号",
    prop: "partnerOrderId",
    type: "text",
    value: "",
    placeholder: "请输入订单号",
  },
  {
    label: "流水号",
    prop: "payTradeNumber",
    type: "text",
    value: "",
    placeholder: "请输入流水号",
  },
  {
    label: "出票类型",
    prop: "handle",
    type: "select",
    value: "",
    options: CONST.TICKETS_TYPE_OPTIONS(),
    placeholder: "请选择出票类型",
  },
  {
    label: "出发站",
    prop: "fromStationName",
    type: "text",
    value: "",
    placeholder: "请输入出发站",
  },
  {
    label: "到达站",
    prop: "toStationName",
    type: "text",
    value: "",
    placeholder: "请输入到达站",
  },
  {
    label: "车票日期",
    prop: "ticketDate",
    type: "datetimerange",
    value: [],
  },
];
// 表格头
export const column = [
  {
    label: "订单号",
    prop: "partnerOrderId",
  },
  {
    label: "发车时间",
    prop: "departTime",
    width: 160,
    type: "custom",
  },
  {
    label: "车次",
    prop: "trainNumber",
    type: "custom",
  },
  {
    label: "发/到站",
    prop: "fromToStationName",
    type: "custom",
  },
  {
    label: "出票数量",
    prop: "ticketCount",
    type: "custom",
  },
  {
    label: "总价",
    prop: "orderPrice",
    type: "money",
  },
  {
    label: "订单时间",
    prop: "orderDate",
    type: "custom",
    width: 200,
  },
  {
    label: "处理账号名",
    prop: "handleUserAccount",
  },
  {
    label: "是否有票",
    prop: "handle",
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    fixed: "right",
    width: 250,
  },
];

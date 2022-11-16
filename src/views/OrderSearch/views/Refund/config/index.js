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
    label: "代售点",
    prop: "code",
    type: "select",
    value: "",
    options: [],
    placeholder: "请选择代售点",
  },
  {
    label: "车票状态",
    prop: "ticketStatus",
    type: "select",
    value: "",
    options: "",
    placeholder: "请选择车票状态",
  },
  {
    label: "取票号",
    prop: "ticketCollectionNumber",
    type: "text",
    value: "",
    placeholder: "请输入取票号",
  },
  {
    label: "退票类型",
    prop: "refundTicketType",
    type: "select",
    value: "",
    options: CONST.REFUND_TYPE_OPTIONS(),
    placeholder: "请选择退票类型",
  },
  {
    label: "退票日期",
    prop: "refundTicketDate",
    type: "datetimerange",
    value: [],
  },
];
// 表格头
export const column = [
  {
    label: "发车时间",
    prop: "departTime",
    width: 160,
  },
  {
    label: "车次",
    prop: "trainNumber",
  },
  {
    label: "取票号",
    prop: "ticketCollectionNumber",
  },
  {
    label: "出发/到达",
    prop: "fromToStationName",
  },
  {
    label: "姓名",
    prop: "passengerName",
  },
  {
    label: "退票类型",
    prop: "ticketType",
  },
  {
    label: "退票时间",
    prop: "refundTicketTime",
    width: 160,
  },
  {
    label: "退款金额",
    prop: "refundTicketAmount",
    type: "money",
  },
  {
    label: "优先级",
    prop: "prioritization",
  },
];

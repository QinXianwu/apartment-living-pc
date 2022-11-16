// 搜索选项
export const formData = [
  {
    label: "姓名",
    prop: "passengerName",
    type: "text",
    value: "",
    placeholder: "请输入姓名",
  },
  {
    label: "出发站",
    prop: "departStation",
    type: "text",
    value: "",
    placeholder: "请输入出发站",
  },
  {
    label: "到达站",
    prop: "arrivalStation",
    type: "text",
    value: "",
    placeholder: "请输入到达站",
  },
  {
    label: "车次",
    prop: "trainNumber",
    type: "text",
    value: "",
    placeholder: "请输入车次",
  },
  {
    label: "身份证",
    prop: "passportNumber",
    type: "text",
    value: "",
    placeholder: "请输入身份证",
  },
  {
    label: "车票日期",
    prop: "trainDate",
    type: "datetimerange",
    value: [],
  },
];
// 表格头
export const column = [
  {
    label: "发车时间",
    prop: "ticketTime",
    width: 160,
  },
  {
    label: "车次",
    prop: "trainNumber",
  },
  {
    label: "出发/到达",
    prop: "fromToStationName",
  },
  {
    label: "取票号",
    prop: "eOrderNumber",
  },
  {
    label: "证件类型",
    prop: "passportName",
  },
  {
    label: "证件号",
    prop: "passportNumber",
  },
  {
    label: "出票下单姓名",
    prop: "passengerName",
  },
  {
    label: "实际出票姓名",
    prop: "realPassengerName",
  },
  {
    label: "坐席",
    prop: "seatName",
  },
  {
    label: "乘客类型",
    prop: "passengerType",
  },
  {
    label: "申请时间",
    prop: "createTime",
  },
  {
    label: "证件照",
    prop: "identityFirstImage",
    type: "image",
  },
  {
    label: "票价",
    prop: "",
    type: "money",
  },
  {
    label: "退款比例(%)",
    prop: "name",
  },
  {
    label: "退款金额",
    prop: "preRefundPrice",
    type: "money",
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    fixed: "right",
    width: 250,
  },
];

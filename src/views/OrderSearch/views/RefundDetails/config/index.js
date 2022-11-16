import CONST from "@/constants/index";
// 搜索选项
export const formData = [
  {
    label: "代售点",
    prop: "ticket_number",
    type: "select",
    value: CONST.SITE_ID.ALL,
    options: CONST.SITE_OPTIONS(),
    placeholder: "请选择代售点",
  },
  {
    label: "订单号",
    prop: "name",
    type: "text",
    value: "",
    placeholder: "请输入订单号",
  },
  {
    label: "流水号",
    prop: "name",
    type: "text",
    value: "",
    placeholder: "请输入流水号",
  },
  {
    label: "退票费类型",
    prop: "ticket_number",
    type: "select",
    value: CONST.REFUND_FEE_TYPE.ALL,
    options: CONST.REFUND_FEE_TYPE_OPTIONS(),
    placeholder: "请选择退票费类型",
  },
  {
    label: "扣款日期",
    prop: "create_time",
    type: "datetimerange",
    value: [],
  },
  {
    label: "金额",
    prop: "ticket_number",
    type: "text",
    value: "",
    placeholder: "请输入金额",
  },
];
// 表格头
export const column = [
  {
    label: "扣款日期",
    prop: "departure_time",
    width: 120,
  },
  {
    label: "支付宝",
    prop: "trips_number",
  },
  {
    label: "退款流水号",
    prop: "license_number",
  },
  {
    label: "退款金额",
    prop: "start_end_station",
  },
  {
    label: "拦截金额",
    prop: "name",
  },
  {
    label: "实际退款金额",
    prop: "ticket_type",
  },
  {
    label: "支付宝到账日期",
    prop: "certificate_type",
  },
  {
    label: "订单号",
    prop: "license_number",
  },
  {
    label: "订单处理日期",
    prop: "license_number",
  },
  {
    label: "处理类型",
    prop: "license_number",
  },
];

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
    label: "结算日期",
    prop: "create_time",
    type: "datetimerange",
    value: [],
  },
];
// 表格头
export const column = [
  {
    label: "日期",
    prop: "departure_time",
  },
  {
    label: "代售点",
    prop: "departure_time",
    width: 120,
  },
  {
    label: "成功订单",
    prop: "trips_number",
  },
  {
    label: "成功张数",
    prop: "trips_number",
  },
  {
    label: "返佣单价",
    prop: "license_number",
  },
  {
    label: "代购费",
    prop: "start_end_station",
  },
  {
    label: "返佣基础金额",
    prop: "name",
  },
  {
    label: "返佣额外金额",
    prop: "ticket_type",
  },
  {
    label: "返佣实际金额",
    prop: "certificate_type",
  },
];

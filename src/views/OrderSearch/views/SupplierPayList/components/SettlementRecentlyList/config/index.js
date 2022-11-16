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
    label: "供应商组",
    prop: "departure_time",
  },
  {
    label: "出退改结算总金额",
    prop: "departure_time",
  },
  {
    label: "上月返佣金额",
    prop: "trips_number",
  },
  {
    label: "结算总余额",
    prop: "trips_number",
  },
  {
    label: "结算时间",
    prop: "license_number",
  },
];

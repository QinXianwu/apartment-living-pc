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
    label: "姓名",
    prop: "name",
    type: "text",
    value: "",
    placeholder: "请输入姓名",
  },
  {
    label: "证件号",
    prop: "name",
    type: "text",
    value: "",
    placeholder: "请输入证件号",
  },
  {
    label: "车票状态",
    prop: "ticket_number",
    type: "select",
    value: CONST.TICKETS_STATE.SUCCESS,
    options: CONST.TICKETS_STATE_OPTIONS(),
    placeholder: "请选择车票状态",
  },
  {
    label: "物流号",
    prop: "ticket_number",
    type: "text",
    value: "",
    placeholder: "请输入物流号",
  },
  {
    label: "取票号",
    prop: "ticket_number",
    type: "text",
    value: "",
    placeholder: "请输入取票号",
  },
  {
    label: "日期",
    prop: "create_time",
    type: "datetimerange",
    value: [],
  },
];
// 表格头
export const column = [
  {
    label: "发车时间",
    prop: "departure_time",
    width: 120,
  },
  {
    label: "车次",
    prop: "trips_number",
  },
  {
    label: "出发/到达",
    prop: "license_number",
  },
  {
    label: "取票号",
    prop: "start_end_station",
  },
  {
    label: "证件号",
    prop: "name",
  },
  {
    label: "姓名",
    prop: "ticket_type",
  },
  {
    label: "识别号",
    prop: "certificate_type",
  },
  {
    label: "快递号",
    prop: "license_number",
  },
  {
    label: "失败",
    prop: "license_number",
  },
  {
    label: "取票时间",
    prop: "license_number",
  },
  {
    label: "快递打印时间",
    prop: "license_number",
  },
];

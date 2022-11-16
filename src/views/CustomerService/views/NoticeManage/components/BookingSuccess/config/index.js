import CONST from "@/constants/index";
// 搜索选项
export const formData = [
  {
    label: "订单号",
    prop: "code",
    type: "text",
    value: "",
    placeholder: "请输入订单号",
  },
  {
    label: "会话状态",
    prop: "code",
    type: "select",
    value: CONST.SESSION_STATE.WAIT_HANDLE,
    options: CONST.SESSION_STATE_OPTIONS(),
    placeholder: "请选择会话状态",
  },
  {
    label: "订单处理日期",
    prop: "create_time",
    type: "datetimerange",
    value: [],
  },
];
// 表格头
export const column = [
  {
    label: "订单号",
    prop: "departure_time",
  },
  {
    label: "最新处理",
    prop: "departure_time",
  },
  {
    label: "发车时间",
    prop: "trips_number",
  },
  {
    label: "车次",
    prop: "departure_time",
  },
  {
    label: "发/到站",
    prop: "trips_number",
  },
  {
    label: "出票数量",
    prop: "trips_number",
  },
  {
    label: "总价",
    prop: "departure_time",
  },
  {
    label: "订单时间",
    prop: "trips_number",
  },
  {
    label: "是否有票",
    prop: "trips_number",
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    fixed: "right",
    width: 250,
  },
];

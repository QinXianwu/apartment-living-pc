// 搜索选项
export const formData = [];
// 表格头
export const column = [
  {
    label: "订单号",
    prop: "partnerOrderId",
  },
  {
    label: "发车时间",
    prop: "departure_time",
    width: 160,
    type: "custom",
  },
  {
    label: "车次",
    prop: "trips_number",
    type: "custom",
  },
  {
    label: "发/到站",
    prop: "start_end_station",
    type: "custom",
  },
  {
    label: "订单标记",
    prop: "order_mark",
    type: "custom",
  },
  {
    label: "处理倒计时",
    prop: "process_countdown",
    type: "custom",
    minWidth: 120,
  },
  {
    label: "订单时间",
    prop: "currentTime",
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

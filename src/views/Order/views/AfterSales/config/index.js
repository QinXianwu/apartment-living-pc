// 搜索选项
export const formData = [
  {
    label: "姓名",
    prop: "name",
    type: "text",
    value: "",
    placeholder: "请输入姓名",
  },
  {
    label: "车次",
    prop: "car_count",
    type: "text",
    value: "",
    placeholder: "请输入车次",
  },
  {
    label: "出发站",
    prop: "start_site",
    type: "text",
    value: "",
    placeholder: "请输入出发站",
  },
  {
    label: "到达站",
    prop: "end_site",
    type: "text",
    value: "",
    placeholder: "请输入到达站",
  },
];
// 表格头
export const column = [
  {
    label: "车票日期",
    prop: "ticket_date",
  },
  {
    label: "车次",
    prop: "car_count",
  },
  {
    label: "出发/到达",
    prop: "start_end",
  },
  {
    label: "证件类型",
    prop: "certificate_type",
  },
  {
    label: "证件号",
    prop: "license_number",
  },
  {
    label: "姓名",
    prop: "name",
  },
  {
    label: "票类型",
    prop: "ticket_type",
  },
  {
    label: "取票号",
    prop: "ticket_number",
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    fixed: "right",
    width: 250,
  },
];

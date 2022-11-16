import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "用户名",
    prop: "userName",
    type: "text",
    value: "",
    placeholder: "请输入用户名",
  },
  {
    label: "登录账号",
    prop: "account",
    type: "text",
    value: "",
    placeholder: "请输入登录账号",
  },
  // {
  //   label: "联系电话",
  //   prop: "code",
  //   type: "text",
  //   value: "",
  //   placeholder: "请输入联系电话",
  // },
  // {
  //   label: "所属角色",
  //   prop: "roleName",
  //   type: "select",
  //   value: "",
  //   options: [],
  //   placeholder: "请选择所属角色",
  // },
];
// 表格头
export const column = [
  {
    label: "用户名",
    prop: "userName",
  },
  {
    label: "登录账号",
    prop: "account",
  },
  {
    label: "所属账号",
    prop: "parentAccount",
    type: "custom",
  },
  {
    label: "所属角色",
    prop: "roleName",
    type: "custom",
  },
  {
    label: "创建时间",
    prop: "createTime",
  },
  {
    label: "更新时间",
    prop: "updateTime",
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    fixed: "right",
    width: 250,
  },
];

// 表单 - 选择器
export const selectFormData = [
  {
    prop: "receiveOrderProvince",
    label: "接单出发省份限制:",
    valueKey: "label",
    placeholder: "请选择接单出发省份限制",
    options: [],
  },
  {
    prop: "receiveOrderArriveProvince",
    label: "接单到达省份限制:",
    valueKey: "label",
    placeholder: "请选择接单到达省份限制",
    options: [],
  },
  {
    prop: "documentType",
    label: "接单证件类型:",
    valueKey: "label",
    placeholder: "请选择接单证件类型",
    options: CONST.PASSPORT_TYPE_OPTIONS(),
  },
  {
    prop: "designatedSeats",
    label: "接单指定的坐席:",
    valueKey: "label",
    placeholder: "请选择接单指定的坐席",
    options: CONST.SEAT_OPTIONS(),
  },
];

// 表单 - 数字框
export const numberFormDate = [
  {
    label: "接单距离发车时间之内:",
    prop: "withinDepartureTime",
    precision: 0,
    step: 1,
    min: -1,
    max: 9999999999,
    placeholder: "请输入接单距离发车时间",
    tipText: "进单距离发车时间,限制多少小时内 如24小时内 值为24,无限制为-1",
  },
  {
    label: "接单距离发车时间之后:",
    prop: "afterDepartureTime",
    precision: 0,
    step: 1,
    min: -1,
    max: 9999999999,
    placeholder: "请输入接单距离发车时间",
    tipText: "进单距离发车时间,限制多少小时后 如24小时后 值为24,无限制为-1",
  },
  {
    label: "接单订单金额上限:",
    prop: "orderAmountUpperLimit",
    precision: 2,
    step: 1,
    min: -1,
    max: 9999999999,
    placeholder: "请输入接单订单金额上限",
    tipText: "接单订单金额上限,无限制为-1",
  },
  {
    label: "接单订单金额下限:",
    prop: "lowerLimitOfOrderAmount",
    precision: 2,
    step: 1,
    min: -1,
    max: 9999999999,
    placeholder: "请输入接单订单金额下限",
    tipText: "接单订单金额下限,无限制为-1",
  },
];

import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "订单号",
    prop: "orderNo",
    type: "text",
    value: "",
    placeholder: "请输入订单号",
  },
  {
    label: "手机号",
    prop: "phone",
    type: "text",
    value: "",
    placeholder: "请输入手机号",
  },
  {
    label: "状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.DEALERS_ORDER_STATE_OPTIONS(),
    placeholder: "请选择状态",
  },
];

// 表格头
export const column = [
  {
    label: "ID",
    prop: "id",
    showOverflowTooltip: true,
  },
  {
    label: "订单号",
    prop: "orderNo",
    showOverflowTooltip: true,
  },
  {
    label: "用户信息",
    prop: "info",
    type: "custom",
    minWidth: 150,
  },
  {
    label: "手机号",
    prop: "phone",
  },
  {
    label: "分销信息",
    prop: "aaa",
    type: "custom",
  },
  {
    label: "实收金额",
    prop: "orderAmount",
    type: "money",
  },
  {
    label: "状态",
    prop: "status",
    type: "custom",
  },
  {
    label: "下单时间",
    prop: "createTime",
    width: 160,
  },
  // {
  //   label: "操作",
  //   prop: "action",
  //   type: "custom",
  //   fixed: "right",
  //   width: 250,
  // },
];

// 状态tab类型
export const tabType = () => [
  {
    value: "",
    tabType: "",
    is: CONST.DEALERS_ORDER_STATE.TO_BE_SETTLED,
  },
  {
    value: "",
    tabType: "success",
    is: CONST.DEALERS_ORDER_STATE.FINISH,
  },
  {
    value: "",
    tabType: "danger",
    is: CONST.DEALERS_ORDER_STATE.CANCEL,
  },
];

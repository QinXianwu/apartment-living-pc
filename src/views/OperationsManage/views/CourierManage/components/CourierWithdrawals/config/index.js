import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  // {
  //   label: "用户ID",
  //   prop: "userId",
  //   type: "text",
  //   value: "",
  //   placeholder: "请输入用户ID",
  // },
  {
    label: "提现类型",
    prop: "type",
    type: "select",
    value: "",
    options: CONST.WITHDRAWALS_TYPE_OPTIONS(),
    placeholder: "请选择提现类型",
  },
  {
    label: "状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.WITHDRAWALS_STATE_OPTIONS(),
    placeholder: "请选择状态",
  },
];

// 表格头
export const column = [
  {
    label: "用户名",
    prop: "userName",
    showOverflowTooltip: true,
  },
  {
    label: "手机号",
    prop: "userPhone",
  },
  {
    label: "提现方式",
    prop: "type",
    type: "custom",
  },
  {
    label: "实际提现金额",
    prop: "actualAmount",
    type: "money",
  },
  {
    label: "申请提现金额",
    prop: "applyAmount",
    type: "money",
  },
  {
    label: "手续费",
    prop: "serviceCharge",
    type: "money",
  },
  {
    label: "状态",
    prop: "status",
    type: "custom",
  },
  {
    label: "打款时间",
    prop: "remitTime",
    width: 160,
  },
  {
    label: "驳回时间",
    prop: "repulseTime",
    width: 160,
  },
  {
    label: "下单时间",
    prop: "createTime",
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

// 状态tab类型
export const tabType = () => [
  {
    value: "",
    tabType: "",
    is: CONST.WITHDRAWALS_STATE.NO_CHECK,
  },
  {
    value: "",
    tabType: "warning",
    is: CONST.WITHDRAWALS_STATE.NOT_PAY,
  },
  {
    value: "",
    tabType: "success",
    is: CONST.WITHDRAWALS_STATE.SUCCESS_CHECK,
  },
  {
    value: "",
    tabType: "danger",
    is: CONST.WITHDRAWALS_STATE.FAIL_CHECK,
  },
];

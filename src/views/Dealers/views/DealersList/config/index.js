import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "授权手机号",
    prop: "phone",
    type: "text",
    value: "",
    placeholder: "请输入授权手机号",
  },
  {
    label: "状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.DEALERS_AUDIT_STATE_OPTIONS(),
    placeholder: "请选择状态",
  },
];

// 表格头
export const column = [
  {
    label: "用户信息",
    prop: "info",
    type: "custom",
    minWidth: 150,
  },
  {
    label: "授权手机号",
    prop: "phone",
  },
  {
    label: "下级用户",
    prop: "distributorNumber",
  },
  {
    label: "累计佣金",
    prop: "cumulativeCommissions",
    type: "custom",
  },
  {
    label: "可提现佣金",
    prop: "allowWithdrawAmount",
    type: "money",
  },
  {
    label: "状态",
    prop: "status",
    type: "custom",
  },
  {
    label: "申请时间",
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
    is: CONST.DEALERS_AUDIT_STATE.NO_CHECK,
  },
  {
    value: "",
    tabType: "success",
    is: CONST.DEALERS_AUDIT_STATE.SUCCESS_CHECK,
  },
  {
    value: "",
    tabType: "danger",
    is: CONST.DEALERS_AUDIT_STATE.FAIL_CHECK,
  },
];

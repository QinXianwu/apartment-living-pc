import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  // {
  //   label: "商品名称",
  //   prop: "name",
  //   type: "text",
  //   value: "",
  //   placeholder: "请输入商品名称",
  // },
  {
    label: "活动时间",
    prop: "activityDate",
    type: "datetimerange",
    value: "",
    placeholder: "请选择活动时间",
  },
];

// 表格头
export const column = [
  {
    label: "活动标题",
    prop: "name",
  },
  {
    label: "优惠内容",
    prop: "text",
    type: "custom",
  },
  {
    label: "活动商品",
    prop: "goods-list",
    type: "custom",
  },
  {
    label: "活动开始时间",
    prop: "startTime",
    width: 160,
  },
  {
    label: "活动结束时间",
    prop: "endTime",
    width: 160,
  },
  {
    label: "状态",
    prop: "status",
    type: "custom",
  },
  {
    label: "创建时间",
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

// 活动标签
export const activityTab = () => [
  {
    value: "",
    tabType: "",
    is: CONST.ACTIVITY_STATUS.NOT_START,
  },
  {
    value: "",
    tabType: "success",
    is: CONST.ACTIVITY_STATUS.HAVE_IN_HAND,
  },
  {
    value: "",
    tabType: "danger",
    is: CONST.ACTIVITY_STATUS.HAS_ENDED,
  },
  {
    value: "",
    tabType: "warning",
    is: CONST.ACTIVITY_STATUS.STOP,
  },
  {
    value: "",
    tabType: "",
    is: CONST.ACTIVITY_STATUS.NO_CHECK,
  },
  {
    value: "",
    tabType: "danger",
    is: CONST.ACTIVITY_STATUS.FAIL_CHECK,
  },
];

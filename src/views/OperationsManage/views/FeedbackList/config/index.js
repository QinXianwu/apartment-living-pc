import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "用户名称",
    prop: "userName",
    type: "text",
    value: "",
    placeholder: "请输入用户名称",
  },
  {
    label: "状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.FEED_BACK_STATE_OPTIONS(),
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
    label: "联系方式",
    prop: "contactWay",
  },
  {
    label: "反馈内容",
    prop: "text",
    showOverflowTooltip: true,
    minWidth: 150,
  },
  {
    label: "截图",
    prop: "imageList",
    type: "image-list",
  },
  {
    label: "提交时间",
    prop: "createTime",
    width: 160,
  },
  {
    label: "状态",
    prop: "status",
    type: "custom",
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
    is: CONST.ACT_STATUS.NOT_START,
  },
  {
    value: "",
    tabType: "success",
    is: CONST.ACT_STATUS.HAVE_IN_HAND,
  },
  {
    value: "",
    tabType: "danger",
    is: CONST.ACT_STATUS.HAS_ENDED,
  },
  {
    value: "",
    tabType: "warning",
    is: CONST.ACT_STATUS.STOP,
  },
];

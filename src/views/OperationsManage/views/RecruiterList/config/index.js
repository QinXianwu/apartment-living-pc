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
    label: "联系方式",
    prop: "phone",
    type: "text",
    value: "",
    placeholder: "请输入联系方式",
  },
  {
    label: "状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.RECRUITER_STATE_OPTIONS(),
    placeholder: "请选择状态",
  },
];
// 表格头
export const column = [
  {
    label: "用户名称",
    prop: "name",
    showOverflowTooltip: true,
  },
  // {
  //   label: "用户信息",
  //   prop: "info",
  //   type: "custom",
  //   minWidth: 150,
  // },
  {
    label: "联系方式",
    prop: "phone",
  },
  {
    label: "招募类型",
    prop: "type",
    type: "custom",
  },
  {
    label: "备注",
    prop: "remark",
    showOverflowTooltip: true,
    minWidth: 150,
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

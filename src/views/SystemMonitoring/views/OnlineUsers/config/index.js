// 搜索选项
export const formData = [
  {
    label: "登录地址",
    prop: "ipaddr",
    type: "text",
    value: "",
    placeholder: "请输入登录地址",
  },
  {
    label: "用户名称",
    prop: "userName",
    type: "text",
    value: "",
    placeholder: "请输入用户名称",
  },
];

// 表格头
export const column = [
  {
    label: "会话编号",
    prop: "tokenId",
    showOverflowTooltip: true,
  },
  {
    label: "登录名称",
    prop: "userName",
    showOverflowTooltip: true,
  },
  {
    label: "主机",
    prop: "ipaddr",
    showOverflowTooltip: true,
  },
  {
    label: "登录时间",
    prop: "loginTime",
    width: 160,
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    width: 260,
  },
];

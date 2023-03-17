// 搜索选项
export const formData = [
  // {
  //   label: "用户名称",
  //   prop: "name",
  //   type: "text",
  //   value: "",
  //   placeholder: "请输入用户名称",
  // },
  {
    label: "用户昵称",
    prop: "nickName",
    type: "text",
    value: "",
    placeholder: "请输入用户昵称",
  },
  {
    label: "手机号",
    prop: "mobile",
    type: "text",
    value: "",
    placeholder: "请输入手机号",
  },
];

// 表格头
export const column = [
  {
    label: "用户ID",
    prop: "userId",
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
    prop: "mobile",
  },
  {
    label: "备注",
    prop: "remark",
    showOverflowTooltip: true,
  },
  {
    label: "优惠劵数量",
    prop: "totalUseCoupon",
  },
  {
    label: "余额",
    prop: "123", // 后端没给(说：先默认0)
    type: "money",
  },
  {
    label: "积分",
    prop: "totalIntegral",
  },
  {
    label: "注册时间",
    prop: "createDate",
    width: 160,
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    width: 260,
  },
];

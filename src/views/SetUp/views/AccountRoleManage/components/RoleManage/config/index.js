import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "角色名称",
    prop: "roleName",
    type: "text",
    value: "",
    placeholder: "请输入角色名称",
  },
  {
    label: "权限字符",
    prop: "roleKey",
    type: "text",
    value: "",
    placeholder: "请输入权限字符",
  },
  {
    label: "角色状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.ROLE_STATE_OPTIONS(),
    placeholder: "请选择角色状态",
  },
  {
    label: "创建时间",
    prop: "createDate",
    type: "daterange",
    value: "",
    placeholder: "请选择创建时间",
  },
];

// 表格头
export const column = [
  {
    label: "角色编号",
    prop: "roleId",
  },
  {
    label: "角色名称",
    prop: "roleName",
  },
  {
    label: "权限字符",
    prop: "roleKey",
  },
  {
    label: "显示顺序",
    prop: "roleSort",
  },
  {
    label: "状态",
    prop: "status",
    type: "custom",
  },
  {
    label: "创建时间",
    prop: "createTime",
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    width: 260,
  },
];

// 分配用户 搜索选项
export const AssignUsers_formData = [
  {
    label: "用户名称",
    prop: "userName",
    type: "text",
    value: "",
    placeholder: "请输入用户名称",
  },
  {
    label: "手机号码",
    prop: "phonenumber",
    type: "text",
    value: "",
    placeholder: "请输入手机号码",
  },
];

// 分配用户 表格头
export const AssignUsers_column = [
  {
    label: "用户名称",
    prop: "userName",
    showOverflowTooltip: true,
  },
  {
    label: "用户昵称",
    prop: "nickName",
    showOverflowTooltip: true,
  },
  {
    label: "邮箱",
    prop: "email",
  },
  {
    label: "手机号码",
    prop: "phonenumber",
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

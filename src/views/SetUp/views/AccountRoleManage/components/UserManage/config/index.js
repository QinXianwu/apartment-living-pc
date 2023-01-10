import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "登录账号",
    prop: "userName",
    type: "text",
    value: "",
    placeholder: "请输入登录账号",
  },
  {
    label: "手机号码",
    prop: "phonenumber",
    type: "text",
    value: "",
    placeholder: "请输入手机号码",
  },
  {
    label: "账号状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.USER_STATE_OPTIONS(),
    placeholder: "请选择账号状态",
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
    label: "用户编号",
    prop: "userId",
  },
  {
    label: "登录账号",
    prop: "userName",
    showOverflowTooltip: true,
  },
  {
    label: "用户昵称",
    prop: "nickName",
    showOverflowTooltip: true,
  },
  {
    label: "部门",
    prop: "deptName",
    type: "custom",
    showOverflowTooltip: true,
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

// 表单 - 选择器
export const selectFormData = [
  {
    prop: "roleIds",
    label: "角色:",
    valueKey: "value",
    placeholder: "请选择角色",
    options: [],
    multiple: false,
  },
  {
    prop: "deptId",
    label: "归属部门:",
    valueKey: "label",
    placeholder: "请选择归属部门",
    options: [],
  },
  {
    prop: "postIds",
    label: "岗位:",
    valueKey: "label",
    placeholder: "请选择岗位",
    options: [],
    multiple: true,
    isShowSelectAll: true,
  },
  {
    prop: "sex",
    label: "用户性别:",
    valueKey: "label",
    placeholder: "请选择用户性别",
    options: CONST.GENDER_OPTIONS().map((item) => ({
      ...item,
      value: String(item.value),
    })),
    isShowSelectAll: false,
  },
];

// 分配角色 表格头
export const AssignRole_column = [
  {
    label: "",
    prop: "custom_checkbox",
    type: "custom",
    width: "55",
  },
  {
    label: "角色编号",
    prop: "roleId",
  },
  {
    label: "角色名称",
    prop: "roleName",
    showOverflowTooltip: true,
  },
  {
    label: "权限字符",
    prop: "roleKey",
    showOverflowTooltip: true,
  },
  {
    label: "创建时间",
    prop: "createTime",
    width: 160,
  },
];

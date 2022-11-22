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
    options: [],
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
  },
];

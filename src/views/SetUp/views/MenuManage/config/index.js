import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "菜单名称",
    prop: "menuName",
    type: "text",
    value: "",
    placeholder: "请输入菜单名称",
  },
  {
    label: "状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.MENU_STATE_OPTIONS(),
    placeholder: "请选择菜单状态",
  },
];
// 表格头
export const column = [
  {
    label: "菜单名称",
    prop: "menuName",
    showOverflowTooltip: true,
  },
  {
    label: "图标",
    prop: "icon",
  },
  {
    label: "排序",
    prop: "orderNum",
  },
  {
    label: "权限标识",
    prop: "perms",
    showOverflowTooltip: true,
  },
  {
    label: "组件路径",
    prop: "component",
    showOverflowTooltip: true,
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
  {
    prop: "deptId",
    label: "归属部门:",
    valueKey: "label",
    placeholder: "请选择归属部门",
    options: [],
  },
  {
    prop: "roleIds",
    label: "角色:",
    valueKey: "label",
    placeholder: "请选择角色",
    options: [],
    multiple: true,
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
];

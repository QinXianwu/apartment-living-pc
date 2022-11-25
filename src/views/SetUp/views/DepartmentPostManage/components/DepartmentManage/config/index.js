import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "部门名称",
    prop: "deptName",
    type: "text",
    value: "",
    placeholder: "请输入部门名称",
  },
  {
    label: "状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.DEPT_STATE_OPTIONS(),
    placeholder: "请选择部门状态",
  },
];
// 表格头
export const column = [
  {
    label: "部门名称",
    prop: "deptName",
    showOverflowTooltip: true,
  },
  {
    label: "排序",
    prop: "orderNum",
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

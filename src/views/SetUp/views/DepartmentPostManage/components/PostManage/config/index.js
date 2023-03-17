import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "岗位编码",
    prop: "postCode",
    type: "text",
    value: "",
    placeholder: "请输入岗位编码",
  },
  {
    label: "岗位名称",
    prop: "postName",
    type: "text",
    value: "",
    placeholder: "请输入岗位名称",
  },
  {
    label: "状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.POST_STATE_OPTIONS(),
    placeholder: "请选择状态",
  },
];

// 表格头
export const column = [
  {
    label: "岗位编号",
    prop: "postId",
  },
  {
    label: "岗位编码",
    prop: "postCode",
  },
  {
    label: "岗位名称",
    prop: "postName",
  },
  {
    label: "岗位排序",
    prop: "postSort",
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
    width: 260,
  },
];

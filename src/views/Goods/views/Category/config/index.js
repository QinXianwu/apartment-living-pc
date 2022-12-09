import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "分类名称",
    prop: "name",
    type: "text",
    value: "",
    placeholder: "请输入分类名称",
  },
  {
    label: "分类状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.CATEGORY_STATE_OPTIONS(),
    placeholder: "请选择分类状态",
  },
];

// 表格头
export const column = [
  {
    label: "分类图标",
    prop: "icon",
    type: "custom",
  },
  {
    label: "分类名称",
    prop: "name",
  },
  {
    label: "级别",
    prop: "catLevel",
  },
  {
    label: "分类排序",
    prop: "sort",
  },
  {
    label: "是否在导航栏显示",
    prop: "navigationShow",
    type: "custom",
    width: 160,
  },
  {
    label: "是否为热门推荐分类",
    prop: "hotShow",
    type: "custom",
    width: 160,
  },
  {
    label: "热门推荐排序",
    prop: "hotSort",
    width: 140,
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

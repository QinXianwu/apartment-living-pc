import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "字典名称",
    prop: "dictName",
    type: "text",
    value: "",
    placeholder: "请输入字典名称",
  },
  {
    label: "字典类型",
    prop: "dictType",
    type: "text",
    value: "",
    placeholder: "请输入字典类型",
  },
  {
    label: "状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.DICT_STATE_OPTIONS(),
    placeholder: "请选择状态",
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
    label: "字典编号",
    prop: "dictId",
  },
  {
    label: "字典名称",
    prop: "dictName",
  },
  {
    label: "字典类型",
    prop: "dictType",
    type: "custom",
  },
  {
    label: "状态",
    prop: "status",
    type: "custom",
  },
  {
    label: "备注",
    prop: "remark",
    showOverflowTooltip: true,
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

// 字典详情 搜索选项
export const DictDetail_formData = [
  {
    label: "字典名称",
    prop: "dictType",
    type: "select",
    value: "",
    options: [],
    placeholder: "请选择字典名称",
  },
  {
    label: "字典标签",
    prop: "dictLabel",
    type: "text",
    value: "",
    placeholder: "请输入字典标签",
  },
  {
    label: "状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.DICT_STATE_OPTIONS(),
    placeholder: "请选择状态",
  },
];

// 分配用户 表格头
export const DictDetail_column = [
  {
    label: "字典编码",
    prop: "dictCode",
  },
  {
    label: "字典标签",
    prop: "dictLabel",
    type: "custom",
  },
  {
    label: "字典键值",
    prop: "dictValue",
  },
  {
    label: "字典排序",
    prop: "dictSort",
  },
  {
    label: "状态",
    prop: "status",
    type: "custom",
  },
  {
    label: "备注",
    prop: "remark",
    showOverflowTooltip: true,
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

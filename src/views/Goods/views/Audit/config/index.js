import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "商品名称",
    prop: "productName",
    type: "text",
    value: "",
    placeholder: "请输入商品名称",
  },
  {
    label: "商品分类",
    prop: "categoryId",
    type: "cascader",
    value: "",
    options: [],
    placeholder: "请选择商品分类",
    props: {
      emitPath: false,
      checkStrictly: true,
    },
  },
  {
    label: "供应商",
    prop: "supplierId",
    type: "select",
    value: "",
    options: [],
    placeholder: "请选择供应商",
  },
];

// 表格头
export const column = [
  {
    label: "ID",
    prop: "id",
    showOverflowTooltip: true,
  },
  {
    label: "分类",
    prop: "categoryName",
  },
  {
    label: "商品标签",
    prop: "goodsTab",
    type: "custom",
    minWidth: 110,
  },
  {
    label: "供应商",
    prop: "supplierName",
    showOverflowTooltip: true,
  },
  {
    label: "商品名称",
    prop: "goodsInfo",
    type: "custom",
    minWidth: 150,
  },
  {
    label: "供应价",
    prop: "originalPrice",
    type: "custom",
  },
  {
    label: "预售时间",
    prop: "preFhDate",
    width: 160,
  },
  {
    label: "状态",
    prop: "status",
    type: "custom",
    width: 110,
  },
  {
    label: "提交时间",
    prop: "createDate",
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

export const tabs = [
  {
    label: "全部",
    value: CONST.AUDIT_TYPE.ALL,
  },
  {
    label: "待审核",
    value: CONST.AUDIT_TYPE.NO_CHECK,
  },
  {
    label: "审核成功",
    value: CONST.AUDIT_TYPE.SUCCESS_CHECK,
  },
  {
    label: "审核失败",
    value: CONST.AUDIT_TYPE.FAIL_CHECK,
  },
];

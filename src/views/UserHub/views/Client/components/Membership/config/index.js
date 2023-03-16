// 搜索选项
export const formData = [];

// 表格头
export const column = [
  {
    label: "会员名称",
    prop: "name",
    showOverflowTooltip: true,
  },
  {
    label: "折扣",
    prop: "productDiscount",
    type: "custom",
  },
  {
    label: "时效",
    prop: "aging",
    type: "custom",
    minWidth: 250,
  },
  {
    label: "适用商品",
    prop: "productType",
    type: "custom",
  },
  {
    label: "备注",
    prop: "remark",
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
    width: 260,
  },
];

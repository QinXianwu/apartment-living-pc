// 表格头
export const GoodsColumn = [
  {
    label: "商品编码",
    prop: "productNo",
    showOverflowTooltip: true,
  },
  {
    label: "分类",
    prop: "categoryName",
    showOverflowTooltip: true,
  },
  {
    label: "商品名称",
    prop: "goodsInfo",
    type: "custom",
    minWidth: 150,
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    fixed: "right",
    width: 250,
  },
];

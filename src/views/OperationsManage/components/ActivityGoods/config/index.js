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
    label: "商品编码",
    prop: "productNo",
    type: "text",
    value: "",
    placeholder: "请输入商品编码",
  },
];

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
    label: "秒杀价",
    prop: "spikePrice",
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

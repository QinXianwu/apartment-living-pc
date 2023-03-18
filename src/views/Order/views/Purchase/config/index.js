import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "采购订单号",
    prop: "pdOrderNo",
    type: "text",
    value: "",
    placeholder: "请输入采购订单号",
  },
  {
    label: "商品名称",
    prop: "productName",
    type: "text",
    value: "",
    placeholder: "请输入商品名称",
  },
  {
    label: "供应商",
    prop: "supplierId",
    type: "select",
    value: "",
    options: [],
    placeholder: "请选择供应商",
  },
  {
    label: "服务点",
    prop: "serviceId",
    type: "select",
    value: "",
    options: [],
    placeholder: "请选择服务点",
  },
  // {
  //   label: "收件用户名",
  //   prop: "name",
  //   type: "text",
  //   value: "",
  //   placeholder: "请输入收件用户名",
  // },
  // {
  //   label: "收件联系电话",
  //   prop: "phone",
  //   type: "text",
  //   value: "",
  //   placeholder: "请输入商品名称",
  // },
];

export const tabs = [
  {
    label: "全部",
    value: CONST.ORDER_PURCHASE_STATE.ALL,
  },
  {
    label: "待发货",
    value: CONST.ORDER_PURCHASE_STATE.WAIT_SEND,
  },
  {
    label: "待收货",
    value: CONST.ORDER_PURCHASE_STATE.WAIT_DELIVERY,
  },
  {
    label: "已完成",
    value: CONST.ORDER_PURCHASE_STATE.FINISH,
  },
  {
    label: "已取消",
    value: CONST.ORDER_PURCHASE_STATE.CANCEL,
  },
];

// 表格头
export const column = [
  {
    label: "采购订单编号",
    prop: "pdOrderNo",
    showOverflowTooltip: true,
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
    label: "采购总数量",
    prop: "procureTotalNum",
  },
  {
    label: "合计采购价",
    prop: "procureTotalPrice",
    type: "money",
  },
  {
    label: "服务点信息",
    prop: "serveInfo",
    type: "custom",
    minWidth: 150,
  },
  {
    label: "下单时间",
    prop: "createTime",
    width: 160,
  },
  {
    label: "入库数量",
    prop: "putTotalNum",
  },
  {
    label: "入库总价",
    prop: "putTotalPrice",
    type: "money",
  },
  {
    label: "备注",
    prop: "remark",
    showOverflowTooltip: true,
  },
  {
    label: "状态",
    prop: "operStatus",
    type: "custom",
    width: 100,
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    fixed: "right",
    width: 250,
  },
];

// 入库规格表格头
export const ProcurementColumn = [
  {
    label: "规格1",
    prop: "specificationValueName1",
    showOverflowTooltip: true,
  },
  {
    label: "规格2",
    prop: "specificationValueName2",
    showOverflowTooltip: true,
  },
  {
    label: "规格图片",
    prop: "images",
    type: "image",
  },
  {
    label: "销售价",
    prop: "sellPrice",
    type: "money",
  },
  {
    label: "供应价(原价)",
    prop: "originalPrice",
    type: "money",
  },
  {
    label: "采购数量",
    prop: "orderNum",
  },
  {
    label: "合计采购价",
    prop: "orderNumTotalAmount",
    type: "custom",
    showOverflowTooltip: true,
  },
  {
    label: "入库数量",
    prop: "putNum",
    type: "custom",
    width: 160,
  },
  {
    label: "入库总价",
    prop: "putNumTotalAmount",
    type: "custom",
    showOverflowTooltip: true,
  },
];

// 订单详情-规格表格头
export const ProcurementDetailColumn = [
  {
    label: "规格1",
    prop: "specificationValueName1",
    showOverflowTooltip: true,
  },
  {
    label: "规格2",
    prop: "specificationValueName2",
    showOverflowTooltip: true,
  },
  {
    label: "规格图片",
    prop: "images",
    type: "image",
  },
  {
    label: "销售价",
    prop: "sellPrice",
    type: "money",
  },
  {
    label: "供应价(原价)",
    prop: "originalPrice",
    type: "money",
  },
  {
    label: "采购数量",
    prop: "orderNum",
  },
  {
    label: "合计采购价",
    prop: "totalPrice",
    type: "money",
  },
  {
    label: "入库数量",
    prop: "putNum",
  },
  {
    label: "入库总价",
    prop: "putNumTotalAmount",
    type: "custom",
  },
];

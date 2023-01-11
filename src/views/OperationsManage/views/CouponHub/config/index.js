import CONST from "@/constants/index";

// 搜索选项
export const formData = [
  {
    label: "优惠券名称",
    prop: "name",
    type: "text",
    value: "",
    placeholder: "请输入优惠券名称",
  },
  {
    label: "状态",
    prop: "status",
    type: "select",
    value: "",
    options: CONST.COUPONS_STATE_OPTIONS(),
    placeholder: "请选择优惠券状态",
  },
];

// 表格头
export const column = [
  {
    label: "优惠劵名称",
    prop: "name",
    showOverflowTooltip: true,
  },
  {
    label: "面值",
    prop: "deductAmount",
    type: "money",
  },
  {
    label: "适用商品",
    prop: "applyProductType",
    type: "custom",
  },
  {
    label: "适用服务点",
    prop: "applyStationStatus",
    type: "custom",
  },
  {
    label: "过期时间",
    prop: "expireTime",
    type: "custom",
    showOverflowTooltip: true,
  },
  {
    label: "发行量",
    prop: "totalLimitCount",
  },
  {
    label: "单位内限制",
    prop: "unitLimitType",
    type: "custom",
  },
  {
    label: "状态",
    prop: "status",
    type: "custom",
    width: 110,
  },
  {
    label: "操作",
    prop: "action",
    type: "custom",
    fixed: "right",
    width: 250,
  },
];

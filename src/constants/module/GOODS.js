import { getOptionsByText } from "../utils";

// 商品分类层级
export const CATEGORY_LEVEL = {
  FIRST: 1, // 一级
  SECOND: 2, // 二级
  THIRD: 3, // 三级
};
export const CATEGORY_LEVEL_TEXT = {
  [CATEGORY_LEVEL.FIRST]: "一级",
  [CATEGORY_LEVEL.SECOND]: "二级",
  [CATEGORY_LEVEL.THIRD]: "三级",
};
// 商品分类层级options
export const CATEGORY_LEVEL_OPTIONS = () =>
  getOptionsByText(CATEGORY_LEVEL_TEXT);

// 商品分类状态
export const CATEGORY_STATE = {
  ON: 1, // 正常
  OFF: 0, // 禁止
};
export const CATEGORY_STATE_TEXT = {
  [CATEGORY_STATE.ON]: "正常",
  [CATEGORY_STATE.OFF]: "禁止",
};
// 商品分类状态options
export const CATEGORY_STATE_OPTIONS = () =>
  getOptionsByText(CATEGORY_STATE_TEXT);

// 商品分类-导航栏显示状态
export const CATEGORY_NAV_STATE = {
  SHOW: 1, // 显示
  HIDE: 0, // 隐藏
};
export const CATEGORY_NAV_STATE_TEXT = {
  [CATEGORY_NAV_STATE.SHOW]: "显示",
  [CATEGORY_NAV_STATE.HIDE]: "隐藏",
};
export const CATEGORY_NAV_STATE_OPTIONS = () =>
  getOptionsByText(CATEGORY_NAV_STATE_TEXT);

// 商品分类-是否为热门推荐
export const CATEGORY_HOT_TYPE = {
  YES: 1, // 正常
  NOT: 0, // 禁止
};
export const CATEGORY_HOT_TYPE_TEXT = {
  [CATEGORY_HOT_TYPE.YES]: "是",
  [CATEGORY_HOT_TYPE.NOT]: "否",
};
export const CATEGORY_HOT_TYPE_OPTIONS = () =>
  getOptionsByText(CATEGORY_HOT_TYPE_TEXT);

// 商品上下架状态
export const GOODS_OPER_STATE = {
  ALL: 0, // 全部 0转->字符串空
  LISTING: 1, // 上架
  REMOVAL: 2, // 下架
  NO_CHECK: 3, // 待审核
};
export const GOODS_OPER_STATE_TEXT = {
  [GOODS_OPER_STATE.ALL]: "全部",
  [GOODS_OPER_STATE.LISTING]: "上架",
  [GOODS_OPER_STATE.REMOVAL]: "下架",
  [GOODS_OPER_STATE.NO_CHECK]: "待审核",
};
// 商品上下架状态options
export const GOODS_OPER_STATE_OPTIONS = () => [
  {
    label: GOODS_OPER_STATE_TEXT[GOODS_OPER_STATE.LISTING],
    value: GOODS_OPER_STATE.LISTING,
  },
  {
    label: GOODS_OPER_STATE_TEXT[GOODS_OPER_STATE.REMOVAL],
    value: GOODS_OPER_STATE.REMOVAL,
  },
  {
    label: GOODS_OPER_STATE_TEXT[GOODS_OPER_STATE.NO_CHECK],
    value: GOODS_OPER_STATE.NO_CHECK,
  },
];

// 特价类型
export const SPECIALS_TYPE = {
  YES: 1, // 是
  NOT: 0, // 否
};
export const SPECIALS_TYPE_TEXT = {
  [SPECIALS_TYPE.YES]: "是",
  [SPECIALS_TYPE.NOT]: "否",
};
// 特价类型options
export const SPECIALS_TYPE_OPTIONS = () => getOptionsByText(SPECIALS_TYPE_TEXT);

// 折扣类型
export const DISCOUNTED_TYPE = {
  YES: 1, // 是
  NOT: 0, // 否
};
export const DISCOUNTED_TYPE_TEXT = {
  [DISCOUNTED_TYPE.YES]: "是",
  [DISCOUNTED_TYPE.NOT]: "否",
};
// 折扣类型options
export const DISCOUNTED_TYPE_OPTIONS = () =>
  getOptionsByText(DISCOUNTED_TYPE_TEXT);

// 限购类型
export const RESTRICTED_TYPE = {
  YES: 1, // 是
  NOT: 0, // 否
};
export const RESTRICTED_TYPE_TEXT = {
  [RESTRICTED_TYPE.YES]: "是",
  [RESTRICTED_TYPE.NOT]: "否",
};
// 限购类型options
export const RESTRICTED_TYPE_OPTIONS = () =>
  getOptionsByText(RESTRICTED_TYPE_TEXT);

// 预售类型
export const PRE_SALE_TYPE = {
  YES: 1, // 是
  NOT: 0, // 否
};
export const PRE_SALE_TYPE_TEXT = {
  [PRE_SALE_TYPE.YES]: "是",
  [PRE_SALE_TYPE.NOT]: "否",
};
// 限购类型options
export const PRE_SALE_TYPE_OPTIONS = () => getOptionsByText(PRE_SALE_TYPE_TEXT);

// 规格类型
export const SPECIFICA_TYPE = {
  ON: 1, // 正常
  OFF: 0, // 禁止
};
export const SPECIFICA_TYPE_TEXT = {
  [SPECIFICA_TYPE.ON]: "正常",
  [SPECIFICA_TYPE.OFF]: "禁止",
};
// 规格类型options
export const SPECIFICA_TYPE_OPTIONS = () =>
  getOptionsByText(SPECIFICA_TYPE_TEXT);

// 商品审核类型
export const AUDIT_TYPE = {
  ALL: 0, // 全部 0转->字符串空
  NO_CHECK: 1, // 待审核
  SUCCESS_CHECK: 2, // 审核通过
  FAIL_CHECK: 3, // 审核失败
};
export const AUDIT_TYPE_TEXT = {
  [AUDIT_TYPE.ALL]: "全部",
  [AUDIT_TYPE.NO_CHECK]: "待审核",
  [AUDIT_TYPE.SUCCESS_CHECK]: "审核通过",
  [AUDIT_TYPE.FAIL_CHECK]: "审核失败",
};
// 商品审核类型options
export const AUDIT_TYPE_OPTIONS = () => getOptionsByText(AUDIT_TYPE_TEXT);

// 商品赠送状态
export const GOODS_GIVE_STATE = {
  GIVE: 1, // 赠送
  NOT_GIFTED: 2, // 不赠送
};

export const GOODS_GIVE_STATE_TEXT = {
  [GOODS_GIVE_STATE.GIVE]: "赠送",
  [GOODS_GIVE_STATE.NOT_GIFTED]: "不赠送",
};
export const GOODS_GIVE_STATE_OPTIONS = () =>
  getOptionsByText(GOODS_GIVE_STATE_TEXT);

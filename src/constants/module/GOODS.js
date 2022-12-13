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
export const CATEGORY_LEVEL_OPTIONS = () => [
  {
    label: CATEGORY_LEVEL_TEXT[CATEGORY_LEVEL.FIRST],
    value: CATEGORY_LEVEL.FIRST,
  },
  {
    label: CATEGORY_LEVEL_TEXT[CATEGORY_LEVEL.SECOND],
    value: CATEGORY_LEVEL.SECOND,
  },
  {
    label: CATEGORY_LEVEL_TEXT[CATEGORY_LEVEL.THIRD],
    value: CATEGORY_LEVEL.THIRD,
  },
];

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
export const CATEGORY_STATE_OPTIONS = () => [
  {
    label: CATEGORY_STATE_TEXT[CATEGORY_STATE.ON],
    value: CATEGORY_STATE.ON,
  },
  {
    label: CATEGORY_STATE_TEXT[CATEGORY_STATE.OFF],
    value: CATEGORY_STATE.OFF,
  },
];

// 商品分类-导航栏显示状态
export const CATEGORY_NAV_STATE = {
  SHOW: 1, // 显示
  HIDE: 0, // 隐藏
};
export const CATEGORY_NAV_STATE_TEXT = {
  [CATEGORY_NAV_STATE.SHOW]: "显示",
  [CATEGORY_NAV_STATE.HIDE]: "隐藏",
};
export const CATEGORY_NAV_STATE_OPTIONS = () => [
  {
    label: CATEGORY_NAV_STATE_TEXT[CATEGORY_NAV_STATE.SHOW],
    value: CATEGORY_NAV_STATE.SHOW,
  },
  {
    label: CATEGORY_NAV_STATE_TEXT[CATEGORY_NAV_STATE.HIDE],
    value: CATEGORY_NAV_STATE.HIDE,
  },
];
// 商品分类-是否为热门推荐
export const CATEGORY_HOT_TYPE = {
  YES: 1, // 正常
  NOT: 0, // 禁止
};
export const CATEGORY_HOT_TYPE_TEXT = {
  [CATEGORY_HOT_TYPE.YES]: "是",
  [CATEGORY_HOT_TYPE.NOT]: "否",
};
export const CATEGORY_HOT_TYPE_OPTIONS = () => [
  {
    label: CATEGORY_HOT_TYPE_TEXT[CATEGORY_HOT_TYPE.YES],
    value: CATEGORY_HOT_TYPE.YES,
  },
  {
    label: CATEGORY_HOT_TYPE_TEXT[CATEGORY_HOT_TYPE.NOT],
    value: CATEGORY_HOT_TYPE.NOT,
  },
];

// 商品上下架状态
export const GOODS_OPER_STATE = {
  LISTING: 1, // 上架
  REMOVAL: 0, // 下架
};
export const GOODS_OPER_STATE_TEXT = {
  [GOODS_OPER_STATE.LISTING]: "上架",
  [GOODS_OPER_STATE.REMOVAL]: "下架",
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
export const SPECIALS_TYPE_OPTIONS = () => [
  {
    label: SPECIALS_TYPE_TEXT[SPECIALS_TYPE.YES],
    value: SPECIALS_TYPE.YES,
  },
  {
    label: SPECIALS_TYPE_TEXT[SPECIALS_TYPE.NOT],
    value: SPECIALS_TYPE.NOT,
  },
];

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
export const DISCOUNTED_TYPE_OPTIONS = () => [
  {
    label: DISCOUNTED_TYPE_TEXT[DISCOUNTED_TYPE.YES],
    value: DISCOUNTED_TYPE.YES,
  },
  {
    label: DISCOUNTED_TYPE_TEXT[DISCOUNTED_TYPE.NOT],
    value: DISCOUNTED_TYPE.NOT,
  },
];

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
export const RESTRICTED_TYPE_OPTIONS = () => [
  {
    label: RESTRICTED_TYPE_TEXT[RESTRICTED_TYPE.YES],
    value: RESTRICTED_TYPE.YES,
  },
  {
    label: RESTRICTED_TYPE_TEXT[RESTRICTED_TYPE.NOT],
    value: RESTRICTED_TYPE.NOT,
  },
];

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
export const PRE_SALE_TYPE_OPTIONS = () => [
  {
    label: PRE_SALE_TYPE_TEXT[PRE_SALE_TYPE.YES],
    value: PRE_SALE_TYPE.YES,
  },
  {
    label: PRE_SALE_TYPE_TEXT[PRE_SALE_TYPE.NOT],
    value: PRE_SALE_TYPE.NOT,
  },
];

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
export const SPECIFICA_TYPE_OPTIONS = () => [
  {
    label: SPECIFICA_TYPE_TEXT[SPECIFICA_TYPE.ON],
    value: SPECIFICA_TYPE.ON,
  },
  {
    label: SPECIFICA_TYPE_TEXT[SPECIFICA_TYPE.OFF],
    value: SPECIFICA_TYPE.OFF,
  },
];

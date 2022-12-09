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
  [CATEGORY_NAV_STATE.ON]: "显示",
  [CATEGORY_NAV_STATE.OFF]: "隐藏",
};
export const CATEGORY_NAV_STATE_OPTIONS = () => [
  {
    label: CATEGORY_NAV_STATE_TEXT[CATEGORY_NAV_STATE.ON],
    value: CATEGORY_NAV_STATE.ON,
  },
  {
    label: CATEGORY_NAV_STATE_TEXT[CATEGORY_NAV_STATE.OFF],
    value: CATEGORY_NAV_STATE.OFF,
  },
];

// 商品分类-是否为热门推荐
export const CATEGORY_HOT_TYPE = {
  YES: 1, // 正常
  NOT: 0, // 禁止
};
export const CATEGORY_HOT_TYPE_TEXT = {
  [CATEGORY_NAV_STATE.YES]: "是",
  [CATEGORY_NAV_STATE.NOT]: "否",
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

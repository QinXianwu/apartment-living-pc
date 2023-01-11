// 优惠券状态
export const COUPONS_STATE = {
  SHOW: 1, // 启用/显示
  HIDE: 2, // 禁用/隐藏
};

export const COUPONS_STATE_TEXT = {
  [COUPONS_STATE.SHOW]: "启用",
  [COUPONS_STATE.HIDE]: "禁用",
};

export const COUPONS_STATE_OPTIONS = () => [
  {
    label: COUPONS_STATE_TEXT[COUPONS_STATE.SHOW],
    value: COUPONS_STATE.SHOW,
  },
  {
    label: COUPONS_STATE_TEXT[COUPONS_STATE.HIDE],
    value: COUPONS_STATE.HIDE,
  },
];

// 优惠券类型
export const COUPONS_TYPE = {
  FULL_MINUS: 1, // 满减券
  DISTRIBUTION: 2, // 配送券
};
export const COUPONS_TYPE_TEXT = {
  [COUPONS_TYPE.FULL_MINUS]: "满减券",
  [COUPONS_TYPE.DISTRIBUTION]: "配送券",
};
export const COUPONS_TYPE_OPTIONS = () => [
  {
    label: COUPONS_TYPE_TEXT[COUPONS_TYPE.FULL_MINUS],
    value: COUPONS_TYPE.FULL_MINUS,
  },
  {
    label: COUPONS_TYPE_TEXT[COUPONS_TYPE.DISTRIBUTION],
    value: COUPONS_TYPE.DISTRIBUTION,
  },
];

// 商品类型
export const APPLY_PRODUCT_TYPE = {
  ALL: 1, // 全部商品
  PART: 2, // 部分商品
};
export const APPLY_PRODUCT_TYPE_TEXT = {
  [APPLY_PRODUCT_TYPE.ALL]: "全部商品",
  [APPLY_PRODUCT_TYPE.PART]: "部分商品",
};
export const APPLY_PRODUCT_TYPE_OPTIONS = () => [
  {
    label: APPLY_PRODUCT_TYPE_TEXT[APPLY_PRODUCT_TYPE.ALL],
    value: APPLY_PRODUCT_TYPE.ALL,
  },
  {
    label: APPLY_PRODUCT_TYPE_TEXT[APPLY_PRODUCT_TYPE.PART],
    value: APPLY_PRODUCT_TYPE.PART,
  },
];

// 服务点类型
export const SERVE_TYPE = {
  ALL: 1, // 全部服务点
  PART: 2, // 部分服务点
};
export const SERVE_TYPE_TEXT = {
  [SERVE_TYPE.ALL]: "全部服务点",
  [SERVE_TYPE.PART]: "部分服务点",
};
export const SERVE_TYPE_OPTIONS = () => [
  {
    label: SERVE_TYPE_TEXT[SERVE_TYPE.ALL],
    value: SERVE_TYPE.ALL,
  },
  {
    label: SERVE_TYPE_TEXT[SERVE_TYPE.PART],
    value: SERVE_TYPE.PART,
  },
];

// 单位内限制数量类型
export const UNIT_LIMIT_TYPE = {
  DAYS: 1, // 天
  WEEKS: 2, // 周
  MONTHS: 3, // 月
  UNLIMITED: 4, // 不限
};
export const UNIT_LIMIT_TYPE_TEXT = {
  [UNIT_LIMIT_TYPE.DAYS]: "天",
  [UNIT_LIMIT_TYPE.WEEKS]: "周",
  [UNIT_LIMIT_TYPE.MONTHS]: "月",
  [UNIT_LIMIT_TYPE.UNLIMITED]: "不限",
};

export const UNIT_LIMIT_OPTIONS = () => [
  {
    label: UNIT_LIMIT_TYPE_TEXT[UNIT_LIMIT_TYPE.DAYS],
    value: UNIT_LIMIT_TYPE.DAYS,
  },
  {
    label: UNIT_LIMIT_TYPE_TEXT[UNIT_LIMIT_TYPE.WEEKS],
    value: UNIT_LIMIT_TYPE.WEEKS,
  },
  {
    label: UNIT_LIMIT_TYPE_TEXT[UNIT_LIMIT_TYPE.MONTHS],
    value: UNIT_LIMIT_TYPE.MONTHS,
  },
  {
    label: UNIT_LIMIT_TYPE_TEXT[UNIT_LIMIT_TYPE.UNLIMITED],
    value: UNIT_LIMIT_TYPE.UNLIMITED,
  },
];

// 奖励优惠券状态
export const REWARD_COUPONS_STATE = {
  GIVE: 1, // 赠送
  NOT_GIFTED: 2, // 不赠送
};
export const REWARD_COUPONS_STATE_TEXT = {
  [REWARD_COUPONS_STATE.GIVE]: "赠送",
  [REWARD_COUPONS_STATE.NOT_GIFTED]: "不赠送",
};
export const REWARD_COUPONS_STATE_OPTIONS = () => [
  {
    label: REWARD_COUPONS_STATE_TEXT[REWARD_COUPONS_STATE.GIVE],
    value: REWARD_COUPONS_STATE.GIVE,
  },
  {
    label: REWARD_COUPONS_STATE_TEXT[REWARD_COUPONS_STATE.NOT_GIFTED],
    value: REWARD_COUPONS_STATE.NOT_GIFTED,
  },
];

// 优惠劵过期类型
export const COUPONS_EXPIRE_TYPE = {
  DESIGNATE_DATE: 1, // 指定到期时间
  HOLS_AFFETER: 2, //  领取后X小时
  DYCE_AFFETER: 3, //  领取后X天
};

export const COUPONS_EXPIRE_TYPE_TEXT = {
  [COUPONS_EXPIRE_TYPE.DESIGNATE_DATE]: "指定到期时间",
  [COUPONS_EXPIRE_TYPE.HOLS_AFFETER]: "领取后X小时",
  [COUPONS_EXPIRE_TYPE.DYCE_AFFETER]: "领取后X天",
};

export const COUPONS_EXPIRE_TYPE_OPTIONS = () => [
  {
    label: COUPONS_EXPIRE_TYPE_TEXT[COUPONS_EXPIRE_TYPE.DESIGNATE_DATE],
    value: COUPONS_EXPIRE_TYPE.DESIGNATE_DATE,
  },
  {
    label: COUPONS_EXPIRE_TYPE_TEXT[COUPONS_EXPIRE_TYPE.HOLS_AFFETER],
    value: COUPONS_EXPIRE_TYPE.HOLS_AFFETER,
  },
  {
    label: COUPONS_EXPIRE_TYPE_TEXT[COUPONS_EXPIRE_TYPE.DYCE_AFFETER],
    value: COUPONS_EXPIRE_TYPE.DYCE_AFFETER,
  },
];

// 优惠劵领劵中心
export const COUPONS_RELATION_TYPE = {
  COLLECTION_ACTIVITY: 1, // 领券活动
  INTEGRAL_SIGNIN: 2, // 积分签到
  NEWCOMER_ACTIVITY: 3, // 新人活动
};

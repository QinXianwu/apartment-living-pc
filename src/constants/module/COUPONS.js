// 优惠券状态
export const COUPONS_STATE = {
  SHOW: 1, // 启用/显示
  HIDE: 2, // 禁用/隐藏
};

export const COUPONS_STATE_TEXT = {
  [COUPONS_STATE.SHOW]: "启用",
  [COUPONS_STATE.HIDE]: "禁用",
};

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
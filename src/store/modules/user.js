import CONST from "@/constants/index";
const userInfo = localStorage.getItem("user_info") || "{}";

const state = {
  userInfo: JSON.parse(userInfo || {}),
  provinceList: [],
};

const mutations = {
  SET_USER_INFO(state, data) {
    state.userInfo = data;
  },
  SET_PROVINCE_LIST(state, data) {
    state.provinceList = data;
  },
};

const actions = {};

const getters = {
  // 是否平台账号
  isAdmin({ userInfo }) {
    const role = userInfo?.roles?.length ? userInfo.roles[0] : {};
    return role?.roleKey === CONST.ACCOUNT_TYPE.ADMIN;
  },
  // 是否供应商账号
  isVendor({ userInfo }) {
    const role = userInfo?.roles?.length ? userInfo.roles[0] : {};
    return role?.roleKey === CONST.ACCOUNT_TYPE.VENDOR;
  },
  // 是否服务点账号
  isService({ userInfo }) {
    const role = userInfo?.roles?.length ? userInfo.roles[0] : {};
    return role?.roleKey === CONST.ACCOUNT_TYPE.SERVICE;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

import CONST from "@/constants/index";
const userData = JSON.parse(localStorage.getItem("user_info") || "{}");

const state = {
  userInfo: userData,
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
  // 服务点ID
  serviceStationId({ userInfo }) {
    const role = userInfo?.roles?.length ? userInfo.roles[0] : {};
    if (role?.roleKey === CONST.ACCOUNT_TYPE.SERVICE)
      return userInfo?.serviceStationId || "";
    return "";
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

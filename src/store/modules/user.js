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

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

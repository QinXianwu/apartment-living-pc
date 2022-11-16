const state = {
  active: 1, //当前步骤
  userInfo: null, //客户信息
  agentInfo: null, //经销商信息
};

const mutations = {
  SET_ACTIVE(state, data) {
    state.active = data;
  },
  SET_USER_INFO(state, data) {
    state.userInfo = data;
  },
  SET_AGENT_INFO(state, data) {
    state.agentInfo = data;
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

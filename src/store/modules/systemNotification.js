const state = {
  messageList: [],
};

const mutations = {
  SET_MESSAGE_LIST(state, data) {
    state.messageList = data;
  },
};

const actions = {
  GetSystemMessageListAction({ commit }) {
    commit("SET_MESSAGE_LIST", []);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

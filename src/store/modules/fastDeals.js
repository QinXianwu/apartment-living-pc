import api from "@/api/module";
// import JSONbig from "json-bigint"; // 解决超过 16 位数字精度丢失问题

const state = {
  secKillSessionListAll: [], // 秒杀场次列表
};

const mutations = {
  SET_SEC_KILL_SESSION_LIST_ALL(state, data) {
    state.secKillSessionListAll = data;
  },
};

const actions = {
  // 获取秒杀场次列表
  async GetSecKillSessionAllAction({ commit, state }, isRefresh = false) {
    if (state.secKillSessionListAll.length !== 0 && !isRefresh)
      return state.secKillSessionListAll;
    const [, data] = await api.FastDeals.GetSessionCountListAll();
    commit("SET_SEC_KILL_SESSION_LIST_ALL", data?.length ? data : []);
    return data?.length ? data : [];
  },
};

const getters = {
  secKillSessionOptions(state) {
    const options = state.secKillSessionListAll?.length
      ? state.secKillSessionListAll
      : [];
    if (!options?.length) return options;
    return options.map((item) => ({
      value: item.id,
      label: `${item.startTime} - ${item.endTime}`,
    }));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

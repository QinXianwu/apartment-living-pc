import api from "@/api/module";

const state = {
  accountByRoleList: [], // 账号角色列表
};

const mutations = {
  SET_ACCOUNT_BY_ROLE_LIST(state, data) {
    state.accountByRoleList = data;
  },
};

const actions = {
  async GetPointSaleListAction({ commit, state }, isRefresh = false) {
    if (state.accountByRoleList.length !== 0 && !isRefresh)
      return state.accountByRoleList;
    const [, data] = await api.AccountRoleManage.GetAccountByRoleList();
    if (!data?.length) return;
    commit("SET_ACCOUNT_BY_ROLE_LIST", data);
    return data || [];
  },
};

const getters = {
  // 账号角色options
  accountByRoleOptions(state) {
    if (!state.accountByRoleList?.length) return [];
    return state.accountByRoleList.map((item) => ({
      label: item.name,
      value: item.id,
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

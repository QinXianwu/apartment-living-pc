import api from "@/api/module";
const state = {
  menuTreeList: [], // 角色菜单
};

const mutations = {
  SET_MENU_TREE_LIST(state, data) {
    state.menuTreeList = data;
  },
};

const actions = {
  async GetMenuTreeListAction({ commit, state }, isRefresh = false) {
    if (state.menuTreeList.length !== 0 && !isRefresh)
      return state.menuTreeList;
    const [, data] = await api.AccountRoleManage.GetMenuTree();
    if (!data?.length) return;
    commit("SET_MENU_TREE_LIST", data);
    return data || [];
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

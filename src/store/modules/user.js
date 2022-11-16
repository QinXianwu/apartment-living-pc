import api from "@/api/module";
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

const actions = {
  async GetPointSaleListAction({ commit, state }, isRefresh = false) {
    if (state.provinceList.length !== 0 && !isRefresh)
      return state.provinceList;
    const [, data] = await api.AccountRoleManage.GetProvinceList();
    commit("SET_PROVINCE_LIST", data?.length ? data : []);
    return data || [];
  },
};

const getters = {
  // 省份options
  provinceOptions(state) {
    if (!state.provinceList?.length) return [];
    const options = state.provinceList.map((item) => ({
      label: item.province,
      value: item.id,
      // children: [],
    }));
    return options;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

import CONST from "@/constants/index";
import api from "@/api/module";

const state = {
  courierPeopleList: [], // 配送员列表
};

const mutations = {
  SET_COURIER_PEOPLE_LIST(state, data) {
    state.courierPeopleList = data;
  },
};

const actions = {
  // 配送员列表
  async GetCourierPeopleListAction({ commit, state }, isRefresh = false) {
    if (state.courierPeopleList.length !== 0 && !isRefresh)
      return state.courierPeopleList;
    const [, data] = await api.Courier.GetCourierListAll({
      status: CONST.COURIER_AUDIT_STATE.SUCCESS_CHECK,
    });
    const list = data?.length ? data : [];
    commit("SET_COURIER_PEOPLE_LIST", list);
    return list;
  },
};

const getters = {
  courierPeopleOptions(state) {
    const option = state.courierPeopleList;
    if (!option?.length) return [];
    return option.map((item) => ({
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

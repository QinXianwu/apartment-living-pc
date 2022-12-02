import api from "@/api/module";
const state = {
  menuTreeList: [], // 角色菜单
  serviceStationList: [], // 服务点列表
  supplierList: [], // 供应商列表
};

const mutations = {
  SET_MENU_TREE_LIST(state, data) {
    state.menuTreeList = data;
  },
  SET_SERVICE_STATION_LIST(state, data) {
    state.serviceStationList = data;
  },
  SET_SUPPLIER_LIST(state, data) {
    state.supplierList = data;
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
  // 服务点
  async GetServiceStationListAction({ commit, state }, isRefresh = false) {
    if (state.serviceStationList.length !== 0 && !isRefresh)
      return state.serviceStationList;
    const [, data] = await api.ServiceStation.GetList();
    if (!data?.length) return;
    commit("SET_SERVICE_STATION_LIST", data);
    return data || [];
  },
  // 供应商
  async GetSupplierListAction({ commit, state }, isRefresh = false) {
    if (state.supplierList.length !== 0 && !isRefresh)
      return state.supplierList;
    const [, data] = await api.Supplier.GetList();
    if (!data?.length) return;
    commit("SET_SUPPLIER_LIST", data);
    return data || [];
  },
};

const getters = {
  serviceStationOptions({ serviceStationList }) {
    if (!serviceStationList?.length) return [];
    return serviceStationList.map((item) => ({
      label: item.name,
      value: String(item.id),
    }));
  },
  supplierOptions({ supplierList }) {
    if (!supplierList?.length) return [];
    return supplierList.map((item) => ({
      label: item.name,
      value: String(item.id),
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

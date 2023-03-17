import { regionData } from "element-china-area-data";

const sidebarOpened = localStorage.getItem("sidebarStatus");
const state = {
  sidebar: {
    opened: sidebarOpened ? !!+sidebarOpened : true,
    withoutAnimation: false,
  },
  device: "desktop",
  size: localStorage.getItem("size") || "medium",
  // 全局读取的配置
  SysGlobal: {
    ...(window.SysGlobal || {}),
    ConfigInfo: {
      ...(window.SysGlobal?.ConfigInfo || {}),
      CommonStatic:
        import.meta.env.VITE_APP_BASE_API_URL ||
        window.SysGlobal?.ConfigInfo?.CommonStatic,
    },
  },
};

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      localStorage.setItem("sidebarStatus", 1);
    } else {
      localStorage.setItem("sidebarStatus", 0);
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    localStorage.setItem("sidebarStatus", 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  SET_SIZE: (state, size) => {
    state.size = size;
    localStorage.setItem("size", size);
  },
};

const actions = {
  toggleSideBar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit("CLOSE_SIDEBAR", withoutAnimation);
  },
  toggleDevice({ commit }, device) {
    commit("TOGGLE_DEVICE", device);
  },
  setSize({ commit }, size) {
    commit("SET_SIZE", size);
  },
};

const getters = {
  addressLinkageOptions() {
    return regionData;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

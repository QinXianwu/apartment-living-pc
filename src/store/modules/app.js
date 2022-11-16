const sidebarOpened = localStorage.getItem("sidebarStatus");
const state = {
  sidebar: {
    opened: sidebarOpened ? !!+sidebarOpened : true,
    withoutAnimation: false,
  },
  device: "desktop",
  size: localStorage.getItem("size") || "medium",
  isAudio: localStorage.getItem("isAudio") === "1", // 是否开启声音
  // 全局读取的配置
  McatGlobal: window.McatGlobal || {},
};

const getters = {};

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
  SET_IS_AUDIO(state, is) {
    state.isAudio = is;
    localStorage.setItem("isAudio", is ? 1 : 0);
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

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

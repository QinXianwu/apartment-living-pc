const menuSliderOpened = localStorage.getItem("menuSliderOpened");
const state = {
  menuSlider: {
    opened: menuSliderOpened ? !!+menuSliderOpened : true,
  },
  menuIdList: localStorage.getItem("menuIdList") || "",
};

const mutations = {
  TOGGLE_MENU: (state) => {
    // 打开或者关闭菜单栏
    state.menuSlider.opened = !state.menuSlider.opened;
    if (state.menuSlider.opened) {
      localStorage.setItem("menuSliderOpened", 1); //打开
    } else {
      localStorage.setItem("menuSliderOpened", 0); //关闭
    }
  },
  OPEN_MENU: (state) => {
    // 打开菜单栏
    state.menuSlider.opened = true;
    localStorage.setItem("menuSliderOpened", 1); //打开
  },
  SET_MENUIDLIST: (state, menuIdList) => {
    //暂时不用，用链接带参数而不是cookie
    state.menuIdList = menuIdList;
    localStorage.setItem("menuIdList", menuIdList); //关闭
  },
  CLOSE_MENU: (state) => {
    // 关闭菜单栏
    state.menuSlider.opened = false;
    localStorage.setItem("menuSliderOpened", 0); //关闭
  },
};

const actions = {
  toggleMenu({ commit }) {
    commit("TOGGLE_MENU");
  },
  openMenu({ commit }) {
    commit("OPEN_MENU");
  },
  setMenuIdList({ commit }, value) {
    commit("SET_MENUIDLIST", value);
  },
  closeMenu({ commit }) {
    commit("CLOSE_MENU");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

import Vue from "vue";
import api from "@/api/module";
import CONST from "@/constants/index";
import CookieStore from "@/utils/common";
import ELEMENT from "element-ui";
import router, { resetRouter } from "@/router/index";

const state = {
  state: CookieStore.getCookie("user_sessino") || null,
};

const mutations = {
  SET_USER_SIGNIN(state, data) {
    CookieStore.setCookie("user_sessino", data?.token, data?.date || 1);
    localStorage.setItem("user_info", data?.userInfo);
    Object.assign(state, data);
  },
  SET_USER_SIGNOUT(state) {
    CookieStore.delCookie("user_sessino");
    Object.keys(state).forEach((k) => Vue.delete(state, k));
  },
};

const actions = {
  // 退出登录
  LogoutAsync({ commit }) {
    api.Authorization.OutLogin();
    resetRouter(); // 重置路由
    commit("SET_USER_SIGNOUT");
    localStorage.setItem("user_info", "{}");
    location.href = "/";
  },
  // 去登录
  LoginAsync({ commit }) {
    resetRouter();
    router.push({ path: "/401" });
    commit("SET_USER_SIGNOUT");
    setTimeout(() => {
      window.introduction && window.introduction.exit();
    });
    ELEMENT.MessageBox.alert(
      "没有授权或者授权过期了，点击确定跳转到登录页"
    ).then(() => {
      location.href = "/";
      // router.push({ path: "/Authorization/Login" });
    });
  },
  // 登录
  async Login({ commit }, userInfo) {
    const [, res] = await api.Authorization.Login({
      ...userInfo,
    });
    if (res?.code === CONST.AJAX_CODE.SUCCESS && res?.data) {
      const token = res.data?.access_token;
      const userInfo = JSON.stringify(res?.data?.sysUser || "");
      commit("SET_USER_SIGNIN", { token, userInfo, date: 1 });
      location.href = "/";
      ELEMENT.Message.success("登录成功");
    } else {
      ELEMENT.Message.error(res?.msg || "账号密码有误,请重试");
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

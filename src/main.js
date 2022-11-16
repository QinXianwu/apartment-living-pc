import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import api from "@/api/module";
import "@/plugins/index";
import "./assets/styles/index.scss";
import "./icons"; // icon
import "./permission/index"; // 权限控制相关
import hasPermission from "./permission/hasPermission";
import PERMISSION_ID from "@/permission/PERMISSION_ID";
// import { i18n } from "@/lang/index"; // 多语言
import "virtual:svg-icons-register";

import CONST from "@/constants/index";
import CookieStore from "@/utils/common";
import Clipboard from "v-clipboard"; //复制到剪贴板功能
Vue.use(Clipboard);

// 公用组件
import SearchForm from "@/components/SearchForm"; //搜索栏
import TablePanel from "@/components/TablePanel"; //表格
import Pagination from "@/components/Pagination"; //分页
import ImageView from "@/components/ImageView"; //图片
import DrawerPopup from "@/components/DrawerPopup"; //抽屉弹窗
import PageWrapper from "@/components/PageWrapper"; //基础的布局组件

// 公用组件 注册
Vue.component("SearchForm", SearchForm);
Vue.component("TablePanel", TablePanel);
Vue.component("Pagination", Pagination);
Vue.component("ImageView", ImageView);
Vue.component("DrawerPopup", DrawerPopup);
Vue.component("PageWrapper", PageWrapper);

// 注册filter
import filters from "@/filters/index";
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]));

Vue.config.productionTip = false;
Vue.prototype.AJAX_CODE = CONST.AJAX_CODE;
Vue.prototype.$PERMISSION_ID = PERMISSION_ID; // 权限ID
Vue.prototype.$hasPermission = hasPermission; // 权限判断
Vue.prototype.$http = api;
Vue.prototype.$CONST = CONST; // 全局挂载常量
Vue.prototype.$CookieStore = CookieStore;

new Vue({
  el: "#app",
  router,
  store,
  // i18n,
  render: (h) => h(App),
});

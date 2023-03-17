import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import Element from "element-ui";
// import { i18n } from "@/lang/index"; // 定制多语言，暂时注释

Vue.use(Element, {
  size: "small",
  // i18n: (key, value) => i18n.t(key, value),
});

import Vue from "vue";
import VueI18n from "vue-i18n";
import { deepCopy } from "@/utils/index";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import CONST from "@/constants/index";

const elementLocale = {
  zh_CN: zhLocale,
  en_US: enLocale,
};

/**
 * 获取所有语言包
 */
const getAllLangs = () => {
  const modulesFiles = require.context("./", true, /\.js$/);
  const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
    if (moduleName !== "index") {
      const value = modulesFiles(modulePath);
      modules[moduleName] = Object.assign(
        value.default,
        elementLocale[moduleName]
      );
    }
    return modules;
  }, {});
  return modules;
};

const locales = deepCopy(getAllLangs(), {}); // 合并标准版的语言包和定制的语言包

Vue.use(VueI18n);

const DEFAULT_LANG = localStorage.getItem(CONST.CACHE_KEY.LANGUAGE) || "zh_CN"; // 默认语言

export const i18n = new VueI18n({
  locale: DEFAULT_LANG, // 语言标识//this.$i18n.locale // 通过切换locale的值来实现语言切换,当 locale 的值为"zh-CN"时，版本为中文；当 locale 的值为"en-US",版本为英文。
  messages: locales,
  silentFallbackWarn: true, // 避免回退警告
});

/**
 * 对外提供方法修改语音
 * 同时给body添加类名，方便修改样式
 * @param {*} lang
 */
export const langSetup = (lang) => {
  Object.keys(locales).forEach((lang) => {
    document.body.classList.remove(`lang-${lang}`);
  });
  document.body.classList.add(`lang-${lang}`);
  document.body.setAttribute("lang", lang);
  //把当前语言设置到vue的配置里面，方便在代码中读取
  Vue.config.lang = lang;
  i18n.locale = lang;
  localStorage.setItem(CONST.CACHE_KEY.LANGUAGE, lang);
};

/**
 * 获取浏览器默认语言
 */
export const getLocalLang = () => {
  return navigator.language || navigator.userLanguage; //常规浏览器语言和IE浏览器
};

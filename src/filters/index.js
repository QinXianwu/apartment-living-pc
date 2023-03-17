// Vue 的全局过滤器
const files = require.context("./module", true, /.js$/);
let moduleList = {};
files.keys().forEach((item) => {
  moduleList = { ...moduleList, ...files(item).default };
});

export default {
  ...moduleList,
};

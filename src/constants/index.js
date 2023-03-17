const modulesFiles = require.context("./module/", true, /\.js$/);
const constants = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  modules = {
    ...modules,
    ...value,
  };
  return modules;
}, {});

export default constants;

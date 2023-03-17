const modulesFiles = require.context("./PERMISSION_ID/", true, /\.js$/);
const constants = modulesFiles.keys().reduce((modules, modulePath) => {
  // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules = {
    ...modules,
    ...value.default,
  };
  return modules;
}, {});

export default constants;

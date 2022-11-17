import { filterAsyncRoutes } from "../config/index";
import home from "./home"; // 首页模块
import setUp from "./setUp"; // 系统设置模块
import error from "./error"; // 异常页面模块

// 排序直接作用于侧边栏菜到排序
const routerList = [home, setUp, error];

// 打包正式环境 返回仅配置权限ID的路由
export default process.env.VITE_APP_ENVIRONMENT === "prod"
  ? filterAsyncRoutes(routerList)
  : routerList;

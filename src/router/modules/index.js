import { filterAsyncRoutes } from "../config/index";
import home from "./home"; // 首页模块
import goods from "./goods"; // 商品模块
import order from "./order"; // 订单管理模块
import userHub from "./userHub"; // 用户中心模块
import vendorManage from "./vendorManage"; // 供应商管理模块
import serviceStationManage from "./serviceStationManage"; // 服务点管理模块
import operationsManage from "./operationsManage"; // 运营管理模块
import setUp from "./setUp"; // 系统设置模块
import systemMonitoring from "./systemMonitoring"; // 系统监控模块
import error from "./error"; // 异常页面模块

// 排序直接作用于侧边栏菜到排序
const routerList = [
  home,
  goods,
  order,
  userHub,
  vendorManage,
  serviceStationManage,
  operationsManage,
  systemMonitoring,
  setUp,
  error,
];

// 打包正式环境 返回仅配置权限ID的路由
export default process.env.VITE_APP_ENVIRONMENT === "prod"
  ? filterAsyncRoutes(routerList)
  : routerList;

// 统一输出组件描述json
import CuCubeModel from "./CuCube/Model.js";
import CuGoodsListModel from "./CuGoodsList/Model.js";
import CuImageModel from "./CuImage/Model.js";
import CuMenuModel from "./CuMenu/Model.js";
import CuSearchModel from "./CuSearch/Model.js";
import CuSwipeModel from "./CuSwipe/Model.js";
import CuTitleModel from "./CuTitle/Model.js";
import CuPackagesList from "./CuPackagesList/Model.js";
import CuLiveBlock from "./CuLiveBlock/Model.js";
export default [
  // 搜索框
  CuSearchModel,
  // 轮播图
  CuSwipeModel,
  // 标题
  CuTitleModel,
  // 商品列表
  CuGoodsListModel,
  // 自定义图片
  CuImageModel,
  // 魔方组件
  CuCubeModel,
  // 图文导航
  CuMenuModel,
  // 套餐列表
  CuPackagesList,
  // 直播列表
  CuLiveBlock,
];

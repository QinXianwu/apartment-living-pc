// 高德WebJsApi
// https://jimnox.gitee.io/amap-vue/intro/installation.html

// 全局引入
import Vue from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
const WebJsApi = {
  KEY: "371e861b35ddc64fc50d5042f53722d1", // 应用服务key
  PRIVATE_KEY: "eb38b68a1ff819c503d93eb535232df1", // 应用安全key
};

window._AMapSecurityConfig = {
  securityJsCode: WebJsApi.PRIVATE_KEY,
};

AMapLoader.load({
  key: WebJsApi.KEY,
  version: "1.4.15", // JSAPI 的版本
  plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  AMapUI: {
    // 是否加载 AMapUI，缺省不加载
    version: "1.1", // AMapUI 缺省 1.1
    plugins: [], // 需要加载的 AMapUI ui插件
  },
  Loca: {
    // 是否加载 Loca， 缺省不加载
    version: "1.3.2", // Loca 版本，缺省 1.3.2
  },
})
  .then((AMap) => {
    // 挂载全局变量
    Vue.prototype.$AMap = AMap;
    //实例化PlaceSearch 用于POI搜索
    AMap.service("AMap.PlaceSearch", () => {
      Vue.prototype.$PlaceSearch = new AMap.PlaceSearch({
        pageSize: 50,
        pageIndex: 1,
      });
    });
    AMap.plugin("AMap.Geocoder", () => {
      Vue.prototype.$Geocoder = new AMap.Geocoder({});
    });
    // AMap.plugin("AMap.DistrictSearch", function () {
    //   var districtSearch = new AMap.DistrictSearch({
    //     // 关键字对应的行政区级别，country表示国家
    //     level: "country",
    //     //  显示下级行政区级数，1表示返回下一级行政区
    //     subdistrict: 3,
    //   });

    //   // 搜索所有省/直辖市信息
    //   districtSearch.search("中国", function (status, result) {
    //     console.log(result);
    //     // 查询成功时，result即为对应的行政区信息
    //   });
    // });
  })
  .catch(() => {
    Vue.prototype.$AMap = {};
  });

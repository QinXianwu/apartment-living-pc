<template>
  <div class="ServiceStationPosition">
    <div class="content">
      <div class="input">
        <el-select
          filterable
          placeholder="请输入"
          v-model="searchText"
          class="input-medium"
          :filter-method="searchServiceStation"
          @change="changeServiceStation"
        >
          <el-option
            v-for="item in searchOptions"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          >
          </el-option>
        </el-select>
        <div class="form-tip">
          <span>在地图中可鼠标右键创建服务点</span>
        </div>
      </div>
      <div ref="ServiceStationMap" class="map" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ServiceStationPosition",
  components: {},
  props: {
    // 服务点名称
    serverName: {
      type: String,
      default: "",
    },
    // 所在城市
    address: {
      type: Array,
      default: () => [],
    },
    // 详情地址
    detailAddress: {
      type: String,
      default: "",
    },
    // 经度
    longitude: {
      type: [Number, String],
      default: "",
    },
    // 纬度
    latitude: {
      type: [Number, String],
      default: "",
    },
  },
  watch: {
    latitude(val) {
      if (val) {
        this.setPoint();
        this.addMarker();
      }
    },
    longitude(val) {
      if (val) {
        this.setPoint();
        this.addMarker();
      }
    },
  },
  data() {
    return {
      searchText: "",
      searchResult: [],
      marker: "",
      createPointData: "",
    };
  },
  computed: {
    searchOptions({ searchResult }) {
      if (!searchResult?.length) [];
      return searchResult;
    },
  },
  methods: {
    initMap() {
      if (!this.$AMap.Map) return;
      this.map = new this.$AMap.Map(this.$refs.ServiceStationMap, {
        // center: [117.000923, 36.675807],
      });
      this.initMenu();
      this.setPoint();
      this.addMarker();
    },
    // 初始化右键菜单
    initMenu() {
      const contextMenu = new this.$AMap.ContextMenu();
      // 右键创建服务点
      contextMenu.addItem("创建服务点", this.createPoint, 0);
      // 地图绑定鼠标右击事件——弹出右键菜单
      this.map.on("rightclick", (e) => {
        this.createPointData = e?.lnglat || {};
        contextMenu.open(this.map, e.lnglat);
      });
    },
    // 右键地图创建服务点
    createPoint() {
      if (!this.createPointData?.lat || !this.createPointData.lng)
        return this.$message.error("获取经纬度异常");
      this.$emit("update:longitude", this.createPointData.lng);
      this.$emit("update:latitude", this.createPointData.lat);
      if (!this.$Geocoder) {
        this.createPointData = "";
        return;
      }
      const lnglat = [this.createPointData.lng, this.createPointData.lat];
      this.handleAddress(lnglat);
      this.createPointData = "";
    },
    // 新增标记点
    addMarker() {
      if (!this.latitude || !this.longitude || !this.map) return;
      if (this.marker) this.map.remove(this.marker);
      this.marker = new this.$AMap.Marker({
        position: new this.$AMap.LngLat(this.longitude, this.latitude),
        title: this.serverName || "",
      });
      // 将创建的点标记添加到已有的地图实例
      this.map.add(this.marker);
    },
    // 设置点
    setPoint() {
      if (!this.latitude || !this.longitude || !this.map) return;
      this.map.setZoomAndCenter(15, [this.longitude, this.latitude]);
    },
    searchServiceStation(val) {
      if (!this.$PlaceSearch) return this.$message.error("初始化异常");
      this.$PlaceSearch.search(val, (status, result) => {
        if (result?.poiList?.pois?.length) {
          this.searchResult = result.poiList.pois;
        }
      });
    },
    changeServiceStation(val) {
      const data = this.searchOptions.find((item) => item.id === val);
      if (!data?.location?.lat || !data?.location?.lng) return;
      this.$emit("update:longitude", data.location.lng);
      this.$emit("update:latitude", data.location.lat);
      this.$emit("update:detailAddress", data?.address || "");
      const lnglat = [data.location.lng, data.location.lat];
      this.handleAddress(lnglat);
    },
    handleAddress(lnglat = []) {
      if (!lnglat?.length) return;
      this.$Geocoder.getAddress(lnglat, (status, result) => {
        if (status !== "complete" || result.info !== "OK")
          return this.$message.error("获取所在城市异常");
        const addressComponent = result?.regeocode?.addressComponent || "";
        this.searchText = result?.regeocode?.formattedAddress || "";
        if (!addressComponent) return;
        const address = [];
        const keyArr = ["province", "city", "district"];
        keyArr.forEach((key, index) => {
          address[index] = addressComponent[key] || "";
        });
        this.$emit("update:address", address);
      });
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>
<style lang="scss" scoped>
.ServiceStationPosition {
  .map {
    width: 500px;
    height: 500px;
  }
  .input {
    margin-bottom: 10px;
  }
}
</style>

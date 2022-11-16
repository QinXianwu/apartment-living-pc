// 自定义直播间展示
<template>
  <div class="live-container">
    <el-carousel v-if="list && list.length" height="182px">
      <el-carousel-item v-for="item in list" :key="item">
        <CuLiveBlock :item="item" />
      </el-carousel-item>
    </el-carousel>
    <div class="live-container-block" v-else>
      点击右侧【添加直播间】按钮添加直播间
    </div>
  </div>
</template>
<script>
import CuLiveBlock from "./components/CuLiveBlock.vue";
export default {
  name: "cu-live-block",
  components: { CuLiveBlock },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.live-container {
  &-block {
    width: 100%;
    height: 182px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    background-color: #d3dce6;
  }
}
</style>

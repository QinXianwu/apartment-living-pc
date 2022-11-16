<template>
  <!-- 图文菜单组件 -->
  <div class="custom-menu" :style="[componentStyle]">
    <div v-if="list.length" class="custom-menu-content" :style="[boxStyle]">
      <div
        class="menu_list"
        v-for="(item, index) in list"
        :key="index"
        @click="toClick(item)"
      >
        <img
          :style="[calStyle]"
          class="menu_list-img"
          :src="(item.image && item.image.url) || deafultImage"
          isSplicingDemainUrl
        />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computeSizeWithStyle } from "../utils/index";
import deafultImage from "@@/images/block.png";
export default {
  name: "cu-menu",
  data() {
    return {
      deafultImage,
    };
  },
  props: {
    // 菜单列表
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    color: {
      type: String,
      deafult: "#666666",
    },
    // 上下间距 pc端用渲染时额外乘以大概的倍率
    paddingTB: {
      type: Number,
      default: 0,
    },
    // 左右间距 pc端用渲染时额外乘以大概的倍率
    paddingLR: {
      type: Number,
      default: 0,
    },
    backgroundImage: {
      type: [String, Object],
      default: "",
    },
    height: {
      type: Number,
      default: 300,
    },
    // 图片宽度
    itemWidth: {
      type: Number,
      default: 100,
    },
    // 图片高度
    itemHeight: {
      type: Number,
      default: 140,
    },
  },
  methods: {
    // 点击事件
    toClick(data) {
      this.$emit("click", data);
    },
  },
  computed: {
    calStyle() {
      return computeSizeWithStyle({
        width: this.itemWidth,
        height: this.itemHeight,
      });
    },
    boxStyle() {
      return computeSizeWithStyle({
        color: this.color,
        paddingTop: this.paddingTB,
        paddingBottom: this.paddingTB,
        paddingLeft: this.paddingLR,
        paddingRight: this.paddingLR,
      });
    },
    componentStyle() {
      return computeSizeWithStyle({
        height: this.height,
        backgroundImage: this.backgroundImage?.url
          ? `url(${this.backgroundImage.url})`
          : "",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-menu {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  &-content {
    min-width: 100%;
    display: flex;
    // overflow-x: auto;
    padding-left: 10px;
    .menu_list {
      // width: 110px;
      flex-grow: 1;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-right: 10px;
      .menu_list-img {
        object-fit: cover;
      }
      span {
        width: 100%;
        height: 17px;
        font-size: 12px;
        font-weight: 500;
        line-height: 17px;
        margin-top: 6px;
        text-align: center;
        padding: 0 4%;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>

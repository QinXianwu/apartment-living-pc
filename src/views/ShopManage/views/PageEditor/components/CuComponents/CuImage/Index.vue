<template>
  <div class="custom-image">
    <div v-for="(item, index) in list" :key="index" :style="calStyle">
      <img
        :src="(item.image && item.image.url) || deafultBanner"
        alt=""
        :style="imgStyle"
      />
    </div>
  </div>
</template>
<script>
import deafultBanner from "@@/images/deafultBanner.png";
export default {
  name: "cu-image",
  props: {
    keyId: {
      type: String,
      default: "",
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
    // 圆弧
    borderRadius: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      deafult: "rem",
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    calStyle() {
      return {
        padding: `${this.paddingTB + this.unit} ${this.paddingLR + this.unit}`,
        borderRadius: `${this.borderRadius + this.unit}`,
      };
    },
    imgStyle() {
      return {
        borderRadius: `${this.borderRadius + this.unit}`,
      };
    },
  },
  data() {
    return {
      deafultBanner,
    };
  },
};
</script>
<style lang="scss">
.custom-image {
  img {
    width: 100%;
    transform-origin: center;
  }
}
</style>

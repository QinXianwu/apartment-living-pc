<template>
  <transition :name="excessiveDirection">
    <div
      v-show="followArrowShow !== arrowDirection || !followArrowShow"
      class="custom_swipe"
      :class="[mode]"
      :style="calPadding"
    >
      <ElCarousel trigger="click" arrow="never" :height="carouselHeight">
        <ElCarouselItem v-for="(item, index) in list" :key="index">
          <div class="custom_swipe-warper">
            <img
              :style="{
                ...imgBorderRadius,
              }"
              :src="(item.image && item.image.url) || deafultBanner"
              alt=""
            />
          </div>
        </ElCarouselItem>
      </ElCarousel>
    </div>
  </transition>
</template>
<script>
// 自定义轮播图  跟手机端不一样！！！请勿直接覆盖
import deafultBanner from "@@/images/deafultBanner.png";
export default {
  name: "cu-swipe",
  data() {
    return {
      deafultBanner,
    };
  },
  props: {
    keyId: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    // 模式
    mode: {
      type: String,
      default: "default",
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
    // 单位 计算属性没办法自动转换 pc端用px
    unit: {
      type: String,
      default: "rem",
    },
    // 图标宽度
    width: {
      tyle: String,
      default: "",
    },
    // 图标高度
    height: {
      tyle: [String, Number],
      default: 240,
    },
    // 跟随箭头显示隐藏
    followArrowShow: {
      type: String,
      default: "",
    },
    // 箭头方向
    arrowDirection: {
      type: String,
      default: "down",
    },
    // 过度方向
    excessiveDirection: {
      type: String,
      default: "down",
    },
    // 圆角
    borderRadius: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    carouselHeight() {
      if (this.mode === "default") {
        return this.height ? this.height + "px" : "240px";
      } else {
        return "100%";
      }
    },
    imgBorderRadius() {
      return {
        borderRadius: this.borderRadius + "px",
      };
    },
    calPadding() {
      return {
        padding: `${this.paddingTB * 50}px ${this.paddingLR * 50}px`,
      };
    },
  },
};
</script>
<style lang="scss">
.custom_swipe {
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  img {
    width: 100%;
    height: 100%;
  }
  &-warper {
    width: inherit;
    height: 100%;
    box-sizing: border-box;
  }
  .el-carousel__button {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
}
// 铺满铺满
.full_mode {
  width: 100%;
  height: 100%;
  z-index: 0;
  .el-carousel {
    width: 100%;
    height: 100%;
  }
  .el-carousel__container {
    width: 100%;
    height: 100%;
  }
  .custom_swipe .el-image img {
    width: 100%;
    height: 100%;
  }
}
</style>

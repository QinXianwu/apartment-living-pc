<template>
  <!-- 图文菜单组件 -->
  <div class="custom-package" :style="[componentStyle]" @click="clickMore">
    <div class="custom-package-bottom">
      <div
        v-if="list.length"
        :style="[boxStyle]"
        class="custom-package-content"
      >
        <div
          class="package_list"
          v-for="(item, index) in list"
          :key="index"
          @click.stop="toClick(item)"
          :style="[calStyle]"
        >
          <img
            class="package_list-img"
            :src="(item.image && item.image.url) || deafultImage"
            isSplicingDemainUrl
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computeSizeWithStyle } from "../utils/index";
import deafultImage from "@@/images/block.png";
export default {
  name: "cu-packages-list",
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
    // 上间距 pc端用渲染时额外乘以大概的倍率
    paddingT: {
      type: Number,
      default: 0,
    },
    // 下间距 pc端用渲染时额外乘以大概的倍率
    paddingB: {
      type: Number,
      default: 0,
    },
    // 左间距 pc端用渲染时额外乘以大概的倍率
    paddingL: {
      type: Number,
      default: 0,
    },
    // 右间距 pc端用渲染时额外乘以大概的倍率
    paddingR: {
      type: Number,
      default: 0,
    },
    // 背景图片
    backgroundImage: {
      type: Object,
      default: () => ({}),
    },
    // 整个组件的高度
    height: {
      type: Number,
      default: 400,
    },
    // 单项宽度
    itemWidth: {
      type: Number,
      default: 210,
    },
    // 单项宽度
    itemHeight: {
      type: Number,
      default: 140,
    },
    backgroundColor: {
      type: String,
      deafult: "",
    },
    borderWidth: {
      type: Number,
      deafult: 0,
    },
    // 容器边距 top
    boxPaddingT: {
      type: Number,
      deafult: 0,
    },
    // 容器边距 bottom
    boxPaddingB: {
      type: Number,
      deafult: 0,
    },
    // 容器边距 left
    boxPaddingL: {
      type: Number,
      deafult: 0,
    },
    // 容器边距 right
    boxPaddingR: {
      type: Number,
      deafult: 0,
    },
    // 点击背景触发的数据
    moreData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 点击事件
    toClick(data) {
      this.$emit("click", data);
    },
    // 点击背景图片
    clickMore() {
      if (this.moreData && this.moreData.url) {
        this.$emit("click", this.moreData);
      }
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
        width: this.list.length * (this.itemWidth + 20),
        height: this.itemHeight,
        backgroundColor: this.backgroundColor,
        borderWidth: this.borderWidth,
        paddingTop: this.boxPaddingT,
        paddingBottom: this.boxPaddingB,
        paddingLeft: this.boxPaddingL,
        paddingRight: this.boxPaddingR,
      });
    },
    componentStyle() {
      return computeSizeWithStyle({
        height: this.height,
        paddingTop: this.paddingT,
        paddingBottom: this.paddingB,
        paddingLeft: this.paddingL,
        paddingRight: this.paddingR,
        backgroundImage: this.backgroundImage?.url
          ? `url(${this.backgroundImage.url})`
          : "",
      });
    },
  },
  created() {
    console.log(this.boxStyle);
  },
};
</script>

<style lang="scss" scoped>
.custom-package {
  width: 100%;
  overflow: hidden;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-end;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  &-bottom {
    overflow-x: hidden;
    // padding: 0 10px;
  }
  &-content {
    flex-grow: 1;
    display: flex;
    // overflow-x: auto;
    border-radius: 5px;
    .package_list {
      flex-grow: 1;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-right: 10px;
      &:first-child {
        border-radius: 5px 0 0 5px;
        border: 1px 0 1px 1px;
      }
      &:last-child {
        border-radius: 0 5px 5px 0;
        border: 1px 0 1px 1px;
        margin-right: 10px;
      }
      .package_list-img {
        width: 100%;
        height: 100%;
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

<template>
  <!-- 商品列表组件 -->
  <div class="custom-package" :style="[componentStyle]">
    <div class="custom-package-tabs">
      <el-tabs v-model="currentVal">
        <el-tab-pane
          v-for="(item, index) in list"
          :key="index"
          :label="item.text"
          :name="item.id"
        >
          <div class="custom-package-content">
            <div class="package_list" :key="index" @click="toClick(item)">
              <img
                class="package_list-img"
                :src="item.image.url || deafultImage"
              />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { computeSizeWithStyle } from "../utils/index";
import deafultImage from "@@/images/block.png";
export default {
  name: "cu-goods-list",
  data() {
    return {
      currentVal: "",
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
    // 背景图片
    backgroundImage: {
      type: String,
      default: "",
    },
    // 整个组件的高度
    // height: {
    //   type: Number,
    //   default: 80,
    // },
  },
  watch: {
    list(val) {
      if (val && val.length) {
        this.currentVal = val[0].id;
      }
    },
  },
  methods: {
    // 点击事件
    toClick(data) {
      this.$emit("click", data);
    },
  },
  computed: {
    componentStyle() {
      return computeSizeWithStyle({
        // height: this.height,
        paddingTop: this.paddingTB,
        paddingBottom: this.paddingTB,
        paddingLeft: this.paddingLR,
        paddingRight: this.paddingLR,
        backgroundImage: this.backgroundImage
          ? `url(${this.backgroundImage})`
          : "",
      });
    },
  },
  created() {
    if (this.list?.length) {
      this.currentVal = this.list[0].id;
    }
  },
};
</script>

<style lang="scss">
.custom-package {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-sizing: border-box;
  &-tabs {
    width: 100%;
    overflow: hidden;
  }
  &-content {
    flex-grow: 1;
    display: flex;
    // overflow-x: auto;
    border-radius: 5px;
    margin-top: 5px;
    .package_list {
      flex-grow: 1;
      flex-shrink: 0;
      width: 100%;
      height: auto;
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
  .el-tabs__item.is-active {
    color: $main-font-color;
  }
  ::v-deep .el-tabs__active-bar {
    color: $main-font-color;
    background-color: $main-font-color;
  }
}
</style>

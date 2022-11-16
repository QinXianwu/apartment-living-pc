<template>
  <div class="components-list">
    <div class="components-list-title">基础组件</div>
    <div class="components-list-box">
      <div
        v-for="(item, index) in componentsTemplate"
        :key="index"
        class="components-list-item"
        @click="handleChooseItem(item)"
      >
        <img :src="item.icon" alt="" />
        <span>{{ item.label }}</span>
      </div>
    </div>
    <!-- <div class="components-list-tip">
      pc端在各浏览器下显示的效果可能有所差异，并且文本大小在移动端是动态适配的，此页面显示的效果仅供参考，请以移动端实际渲染效果为准
    </div> -->
  </div>
</template>
<script>
// 图片
import customSwipeIcon from "./images/customSwipe.png";
import customSearchIcon from "./images/customSearch.png";
import customImageIcon from "./images/customImage.png";
import customGoodsListIcon from "./images/newGoodList.png";
import customTitleIcon from "./images/customTitle.png";
import customMenuIcon from "./images/newMenu.png";
import customCubeIcon from "./images/customCube.png";
import customPackagesListIcon from "./images/packageList.png";
import customPCuLiveBlockIcon from "./images/CuLiveBlock.png";
//引入初始化模板
import ComponentsListModel from "../CuComponents/ComponentsListModel.js";
import { simpleCloneDeep } from "@/utils/index.js";
// 组件图标，组件.name ： 组件icon
const IconHash = {
  "cu-swipe": customSwipeIcon,
  "cu-search": customSearchIcon,
  "cu-image": customImageIcon,
  "cu-goods-list": customGoodsListIcon,
  "cu-title": customTitleIcon,
  "cu-menu": customMenuIcon,
  "cu-cube": customCubeIcon,
  "cu-packages-list": customPackagesListIcon,
  "cu-live-block": customPCuLiveBlockIcon,
};
export default {
  computed: {
    editorJson() {
      return this.$store.state.editor.editorJson;
    },
    selectIndex() {
      return this.$store.state.editor.selectIndex;
    },
    // 添加icon
    componentsTemplate() {
      return ComponentsListModel.map((item) => {
        return {
          ...item,
          icon: IconHash[item.cName],
        };
      });
    },
  },
  methods: {
    // 插入组件
    handleChooseItem(item) {
      // 插入时要注入id 因为拖拽组件要有唯一识别key  //拷贝一次 防止数据双绑
      const obj = {
        id: `${item.cName}-${this.editorJson.length}`,
        ...simpleCloneDeep(item),
      };
      if (this.selectIndex - this.selectIndex === 0) {
        this.$store.dispatch("editor/inserItem", {
          index: this.selectIndex + 1,
          item: obj,
        });
        this.$store.commit("editor/setSelectIndex", this.selectIndex + 1);
      } else {
        this.$store.dispatch("editor/inserItem", {
          index: this.editorJson.length,
          item: obj,
        });
        this.$store.commit("editor/setSelectIndex", this.editorJson.length - 1);
      }
      console.log(this.editorJson);
    },
  },
};
</script>
<style lang="scss">
.components-list {
  background-color: #fff;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  &-title {
    font-size: 14px;
    font-weight: 600;
    line-height: 50px;
    padding-left: 15px;
  }
  &-box {
    display: flex;
    flex-wrap: wrap;
  }
  &-item {
    width: 100px;
    height: 90px;
    font-size: 12px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    align-content: center;
    flex-direction: column;
    cursor: pointer;
    img {
      width: 30px;
      height: 30px;
    }
    &:hover {
      background-color: rgba(122, 122, 122, 0.1);
    }
  }
  &-tip {
    font-size: 12px;
    line-height: 20px;
    margin-top: 20px;
    color: $sub-font-color;
    text-indent: 2em;
  }
}
</style>

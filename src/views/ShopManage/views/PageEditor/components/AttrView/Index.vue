<template>
  <div class="custom-edit-warpper">
    <!-- 组件编辑 根据type类型显示对应的编辑选项 -->
    <div>
      <ElTabs v-model="editorTabType">
        <ElTabPane label="页面配置" name="page">
          <div class="tab_pane_box">
            <edit-page-title />
          </div>
        </ElTabPane>
        <ElTabPane label="组件配置" name="com">
          <div class="tab_pane_box">
            <div class="edit-title-filed">
              <span
                ><b>{{ selectComInfo.label }}</b></span
              >
            </div>
            <!-- 组件配置 -->
            <component
              :is="`edit-${selectComInfo.cName}`"
              v-if="selectComInfo.cName"
            />
          </div>
        </ElTabPane>
      </ElTabs>
    </div>
  </div>
</template>
<script>
import EditPageTitle from "./EditPageTitle.vue"; // 菜单编辑组件
// 编辑表单
import EditCuTitle from "@@/components/CuComponents/CuTitle/Edit.vue";

import EditCuSwipe from "@@/components/CuComponents/CuSwipe/Edit.vue"; // 轮播图编辑组件
import EditCuImage from "@@/components/CuComponents/CuImage/Edit.vue"; // 菜单编辑组件
import EditCuGoodsList from "@@/components/CuComponents/CuGoodsList/Edit.vue"; // 商品列表编辑组件

import EditCuSearch from "@@/components/CuComponents/CuSearch/Edit.vue"; // 菜单编辑组件
import EditCuMenu from "@@/components/CuComponents/CuMenu/Edit.vue"; // 菜单编辑组件
import EditCuPackagesList from "@@/components/CuComponents/CuPackagesList/Edit.vue"; // 套餐列表编辑组件
import EditCuCube from "@@/components/CuComponents/CuCube/Edit.vue"; // 魔方编辑组件
import EditCuLiveBlock from "@@/components/CuComponents/CuLiveBlock/Edit.vue"; // 直播编辑组件

export default {
  components: {
    EditPageTitle,
    EditCuSwipe,
    EditCuTitle,
    EditCuImage,
    EditCuGoodsList,
    EditCuSearch,
    EditCuMenu,
    EditCuCube,
    EditCuPackagesList,
    EditCuLiveBlock,
  },
  data() {
    return {
      editorTabType: "page",
    };
  },
  watch: {
    selectIndex(val) {
      if (this.editorTabType === "page" && val - val === 0) {
        this.editorTabType = "com";
      }
    },
  },
  computed: {
    selectIndex() {
      return this.$store.state.editor.selectIndex;
    },
    selectComInfo() {
      return this.$store.getters["editor/selectComInfo"];
    },
  },
};
</script>
<style lang="scss">
// 编辑区域
.custom-edit-warpper {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  .tab_pane_box {
    padding: 10px;
  }
  .description {
    display: block;
    color: #999999;
  }
  .edit-title-filed {
    padding-bottom: 15px;
    line-height: 30px;
    color: #333;
    font: normal 600 14px PingFang-SC-Medium, PingFang-SC;
  }
  .outer-input {
    margin: 10px 0;
  }
}
</style>

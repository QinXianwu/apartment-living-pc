<template>
  <MediaContainer :title="confirmForm.Description">
    <vuedraggable v-model="myJsonData" @update="updateData" itemKey="id">
      <transition-group>
        <div v-for="(element, index) in myJsonData" :key="element.id">
          <CuBlock
            :index="index"
            :isFixedBottom="element.isFixedBottom"
            :marginBottom="element.marginBottom * 50"
            :marginStyle="element.marginStyle"
            @click="pageIndexChange(index, element)"
          >
            <!-- 核心组件 -->
            <component :is="element.cName" v-bind="element" />
          </CuBlock>
        </div>
      </transition-group>
    </vuedraggable>
  </MediaContainer>
</template>
<script>
import MediaContainer from "@/components/MediaContainer"; // 预览媒体窗口
import vuedraggable from "vuedraggable"; //拖拽组件 pc端用
// 自定义页面组件
import CuSwipe from "@@/components/CuComponents/CuSwipe/Index.vue"; // 轮播图组件
import CuBlock from "@@/components/CuComponents/CuBlock/Index.vue"; // 选择框 pc端用
import CuImage from "@@/components/CuComponents/CuImage/Index.vue"; // 图片组件
import CuSearch from "@@/components/CuComponents/CuSearch/Index.vue"; // 搜索组件
import CuGoodsList from "@@/components/CuComponents/CuGoodsList/Index.vue"; // 搜索组件
import CuMenu from "@@/components/CuComponents/CuMenu/Index.vue";
import CuCube from "@@/components/CuComponents/CuCube/Index.vue"; // 魔方组件
import CuTitle from "@@/components/CuComponents/CuTitle/Index.vue"; //标题
import CuPackagesList from "@@/components/CuComponents/CuPackagesList/Index.vue"; //标题
import CuLiveBlock from "@@/components/CuComponents/CuLiveBlock/Index.vue";

export default {
  components: {
    MediaContainer,
    vuedraggable,
    CuSwipe,
    CuTitle,
    CuBlock,
    CuImage,
    CuSearch,
    CuGoodsList,
    CuMenu,
    CuCube,
    CuPackagesList,
    CuLiveBlock,
  },
  data() {
    return {
      myJsonData: [],
    };
  },
  computed: {
    confirmForm() {
      return this.$store.state.editor.confirmForm;
    },
    editorJson() {
      return this.$store.state.editor.editorJson;
    },
  },
  watch: {
    editorJson: {
      deep: true,
      handler(val) {
        this.myJsonData = [...val];
      },
    },
  },
  created() {
    this.myJsonData = [...this.editorJson];
  },
  methods: {
    OnClick(data, e) {
      console.log(data, e);
    },
    pageIndexChange(i) {
      this.$store.commit("editor/setSelectIndex", i);
    },
    updateData() {
      this.$store.commit("editor/setEditorJson", this.myJsonData);
    },
  },
};
</script>
<style lang="scss">
// 样式请看 common.scss
</style>

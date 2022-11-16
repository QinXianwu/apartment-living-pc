<template>
  <div class="custom-edit">
    <div>
      <span class="description">{{ imgProposalTips }}</span>
    </div>
    <div class="wrapper">
      <div
        v-for="(item, index) in formModel.list"
        :key="index + '_' + item.img"
        class="edit-block-item"
      >
        <i class="el-icon-close" @click="handleDeleteItem(index)"></i>
        <div class="edit-img-block">
          <UploadImg
            @handleImgChange="OnHandleImgChange"
            :img="item.image"
            :index="index"
          />
        </div>

        <div class="edit-input-filed">
          <EditNavigatorLink :index="index" :item="item" />
        </div>
      </div>
    </div>
    <div class="edit-block-item area-boder">
      <ElButton type="text" @click="addItem">
        <i class="el-icon-plus"></i> 添加图片
      </ElButton>
    </div>
    <div class="">
      <div class="outer-input">
        <span class="outer-input_label">图片高度：</span>
        <ElSlider
          style="width: 50%; margin-left: 10px"
          :min="0"
          :max="800"
          :step="10"
          v-model="formModel.height"
        ></ElSlider>
        <ElInputNumber
          style="margin-left: 10px"
          v-model="formModel.height"
          :min="0"
          :max="800"
          :step="10"
          controls-position="right"
        ></ElInputNumber>
      </div>
      <div class="outer-input">
        <span class="outer-input_label">上下边距：</span>
        <ElSlider
          style="width: 50%; margin-left: 10px"
          :min="0"
          :max="3"
          :step="0.1"
          v-model="formModel.paddingTB"
        ></ElSlider>
        <ElInputNumber
          style="margin-left: 10px"
          v-model="formModel.paddingTB"
          :min="0"
          :max="3"
          :step="0.1"
          controls-position="right"
        ></ElInputNumber>
      </div>
      <div class="outer-input">
        <span class="outer-input_label">左右边距：</span>
        <ElSlider
          style="width: 50%; margin-left: 10px"
          :min="0"
          :max="3"
          :step="0.1"
          v-model="formModel.paddingLR"
        ></ElSlider>
        <ElInputNumber
          style="margin-left: 10px"
          v-model="formModel.paddingLR"
          :min="0"
          :max="3"
          :step="0.1"
          controls-position="right"
        ></ElInputNumber>
      </div>
    </div>
  </div>
</template>

<script>
import EditMixin from "@@/mixins/EditMixin.js"; // 混入公共JS
import EditNavigatorLink from "@@/components/EditNavigatorLink/Index.vue";
export default {
  name: "edit-cu-swipe",
  mixins: [EditMixin],
  components: {
    EditNavigatorLink,
  },
  computed: {
    imgProposalTips() {
      return (
        this.formModel?.imgProposalTips ||
        "最多添加10张图片，建议尺寸：宽750px，高360px"
      );
    },
  },
  methods: {
    addItem() {
      this.$store.dispatch("editor/updateEditorJsonList", {
        index: this.selectIndex,
        val: {
          image: "",
          url: "",
        },
        type: "push",
      });
    },
  },
};
</script>

<style lang="scss"></style>

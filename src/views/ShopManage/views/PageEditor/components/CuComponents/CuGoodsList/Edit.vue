<template>
  <div class="custom-edit">
    <div>
      <span class="description"
        >建议图片尺寸比例为1:1，支持图片格式jpg/png</span
      >
    </div>
    <div class="wrapper">
      <div
        v-for="(item, index) in formModel.list"
        :key="index + '_' + item.image"
        class="edit-block-item"
      >
        <i class="el-icon-close" @click="handleDeleteItem(index)"></i>
        <div class="sortArea">
          <div class="flex align-center flex-item">
            <img
              v-if="index != 0"
              src="../../../images/uper.png"
              alt=""
              @click="handleAscSortItem(item, index)"
            /><img v-else src="../../../images/uper2.png" alt="" />
          </div>
          <div class="flex align-center flex-item">
            <img
              v-if="index !== formModel.list.length - 1"
              src="../../../images/down.png"
              alt=""
              @click="handleDescSortItem(item, index)"
            /><img v-else src="../../../images/down2.png" alt="" />
          </div>
        </div>
        <div class="edit-img-block">
          <UploadImg
            @handleImgChange="OnHandleImgChange"
            :img="item.image"
            :index="index"
          />
        </div>

        <div class="edit-input-filed">
          <div>
            <div class="flex">
              <span class="edit-input_label">{{ "文本：" }}</span>
              <ElInput v-model="item.text" placeholder="建议10字以内"></ElInput>
            </div>
            <EditNavigatorLink :index="index" :item="item" />
          </div>
        </div>
      </div>
    </div>
    <div class="edit-block-item area-boder mb10">
      <ElButton type="text" @click="addItem">
        <i class="el-icon-plus"></i> 添加数据
      </ElButton>
    </div>
    <ElForm
      :model="formModel"
      label-position="left"
      ref="form"
      label-width="100px"
      label-suffix="："
    >
      <!-- <ElFormItem label="文字颜色">
        <ElColorPicker v-model="formModel.color"></ElColorPicker>
      </ElFormItem> -->
      <ElFormItem label="上下边距">
        <div class="flex">
          <ElSlider
            style="width: 50%"
            :min="0"
            :max="100"
            :step="1"
            v-model="formModel.paddingTB"
          ></ElSlider>
          <div>
            <ElInputNumber
              style="margin-left: 10px"
              v-model="formModel.paddingTB"
              :min="0"
              :max="100"
              :step="1"
              controls-position="right"
            ></ElInputNumber>
          </div>
        </div>
      </ElFormItem>
      <ElFormItem label="左右边距">
        <div class="flex">
          <ElSlider
            style="width: 50%"
            :min="0"
            :max="100"
            :step="1"
            v-model="formModel.paddingLR"
          ></ElSlider>
          <div>
            <ElInputNumber
              style="margin-left: 10px"
              v-model="formModel.paddingLR"
              :min="0"
              :max="100"
              :step="1"
              controls-position="right"
            ></ElInputNumber>
          </div>
        </div>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script>
import EditMixin from "@@/mixins/EditMixin.js"; // 混入公共JS
import EditNavigatorLink from "@@/components/EditNavigatorLink/Index.vue";
import { NAVIGATOR_TYPE } from "@@/components/CuComponents/utils/constant.js";
export default {
  name: "edit-cu-goods-list",
  mixins: [EditMixin],
  components: {
    EditNavigatorLink,
  },
  methods: {
    addItem() {
      this.$store.dispatch("editor/updateEditorJsonList", {
        index: this.selectIndex,
        val: {
          id: "CuGoodsList_" + new Date().getTime(),
          image: {},
          navigator: {
            type: NAVIGATOR_TYPE.URL, // 跳转到商品
            value: "", // 商品ID
          },
          text: "标题",
        },
        type: "push",
      });
    },
  },
};
</script>

<style lang="scss"></style>

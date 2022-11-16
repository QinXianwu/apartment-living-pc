<template>
  <div class="custom-edit">
    <div>
      <span class="description"
        >建议图片尺寸为100*100px，支持图片格式jpg/png，最多上传8张</span
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
              <ElInput
                v-model="item.name"
                placeholder="10字内，可不填"
              ></ElInput>
            </div>
            <EditNavigatorLink :index="index" :item="item" />
          </div>
        </div>
      </div>
    </div>
    <div class="edit-block-item area-boder mb10">
      <ElButton type="text" @click="addItem">
        <i class="el-icon-plus"></i> 添加图片
      </ElButton>
    </div>
    <ElForm
      :model="formModel"
      label-position="left"
      ref="form"
      label-width="100px"
      label-suffix="："
      class="mt-10"
    >
      <ElFormItem label="文字颜色">
        <ElColorPicker v-model="formModel.color"></ElColorPicker>
      </ElFormItem>
      <ElFormItem label="背景图片">
        <div class="edit-upload-content">
          <UploadImg
            @handleImgChange="OnHandleBgImgChange"
            :img="formModel.backgroundImage || ''"
          />
        </div>
      </ElFormItem>
      <ElFormItem label="组件高度">
        <div class="flex">
          <ElSlider
            style="width: 50%"
            :min="0"
            :max="1000"
            :step="1"
            v-model="formModel.height"
          ></ElSlider>
          <div>
            <ElInputNumber
              style="margin-left: 10px"
              v-model="formModel.height"
              :min="0"
              :max="1000"
              :step="1"
              controls-position="right"
            ></ElInputNumber>
          </div>
        </div>
      </ElFormItem>
      <ElFormItem label="图片宽度">
        <div class="flex">
          <ElSlider
            style="width: 50%"
            :min="0"
            :max="1000"
            :step="1"
            v-model="formModel.itemWidth"
          ></ElSlider>
          <div>
            <ElInputNumber
              style="margin-left: 10px"
              v-model="formModel.itemWidth"
              :min="0"
              :max="1000"
              :step="1"
              controls-position="right"
            ></ElInputNumber>
          </div>
        </div>
      </ElFormItem>
      <ElFormItem label="图片高度">
        <div class="flex">
          <ElSlider
            style="width: 50%"
            :min="0"
            :max="1000"
            :step="1"
            v-model="formModel.itemHeight"
          ></ElSlider>
          <div>
            <ElInputNumber
              style="margin-left: 10px"
              v-model="formModel.itemHeight"
              :min="0"
              :max="1000"
              :step="1"
              controls-position="right"
            ></ElInputNumber>
          </div>
        </div>
      </ElFormItem>

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
export default {
  name: "edit-cu-menu",
  mixins: [EditMixin],
  components: {
    EditNavigatorLink,
  },
  methods: {
    addItem() {
      this.$store.dispatch("editor/updateEditorJsonList", {
        index: this.selectIndex,
        val: {
          image: "",
          url: "",
          name: "标题",
        },
        type: "push",
      });
    },
  },
};
</script>

<style lang="scss"></style>

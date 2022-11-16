<template>
  <ElForm
    :model="formModel"
    label-position="left"
    ref="form"
    label-width="100px"
    label-suffix="："
  >
    <ElFormItem :label="'标题'">
      <ElInput v-model="formModel.title" :placeholder="'请输入标题'"></ElInput>
    </ElFormItem>
    <ElFormItem :label="'样式选择'">
      <div class="edit-input_align">
        <ElTooltip
          v-for="(item, index) in appOptins"
          :key="index"
          effect="dark"
          :content="item.label"
          placement="bottom"
        >
          <img
            :class="
              formModel.styleObj.textAlign === item.val ? 'icon_active' : ''
            "
            :src="item.icon"
            :alt="item.label"
            @click="formModel.styleObj.textAlign = item.val"
          />
        </ElTooltip>
      </div>
    </ElFormItem>
    <ElFormItem label="字号">
      <ElInputNumber
        v-model="formModel.styleObj.fontSize"
        :min="0"
        :max="30"
        :step="1"
        controls-position="right"
      ></ElInputNumber>
    </ElFormItem>
    <ElFormItem label="粗体">
      <div class="flex">
        <div
          class="font-box"
          @click="formModel.styleObj.fontWeight = 'bold'"
          :class="{ 'active-box': formModel.styleObj.fontWeight === 'bold' }"
        >
          <strong>B</strong>
        </div>
        <div
          class="font-box"
          @click="formModel.styleObj.fontWeight = 'normal'"
          :class="{
            'active-box': formModel.styleObj.fontWeight === 'normal',
          }"
        >
          B
        </div>
      </div>
    </ElFormItem>
    <ElFormItem label="文字颜色">
      <ElColorPicker v-model="formModel.styleObj.color"></ElColorPicker>
    </ElFormItem>
    <ElFormItem label="背景颜色">
      <ElColorPicker
        v-model="formModel.styleObj.backGroundColor"
      ></ElColorPicker>
    </ElFormItem>
    <ElFormItem label="框架高度">
      <div class="flex">
        <ElSlider
          style="width: 50%; margin-left: 10px"
          :min="0"
          :max="100"
          :step="1"
          v-model="formModel.styleObj.height"
        />
        <div>
          <ElInputNumber
            style="margin-left: 10px"
            v-model="formModel.styleObj.height"
            :min="0"
            :max="100"
            :step="1"
            controls-position="right"
          ></ElInputNumber>
        </div>
      </div>
    </ElFormItem>
    <ElFormItem label="框架圆角">
      <div class="flex">
        <ElSlider
          style="width: 50%; margin-left: 10px"
          :min="0"
          :max="20"
          :step="1"
          v-model="formModel.styleObj.borderRadius"
        />
        <div>
          <ElInputNumber
            style="margin-left: 10px"
            v-model="formModel.styleObj.borderRadius"
            :min="0"
            :max="20"
            :step="1"
            controls-position="right"
          ></ElInputNumber>
        </div>
      </div>
    </ElFormItem>
  </ElForm>
</template>

<script>
import EditMixin from "@@/mixins/EditMixin.js"; // 混入公共JS
import icon_left from "./images/icon_left.png";
import icon_center from "./images/icon_center.png";
import icon_right from "./images/icon_right.png";
export default {
  mixins: [EditMixin],
  data() {
    return {
      appOptins: [
        {
          icon: icon_left,
          label: "左对齐",
          val: "left",
        },
        {
          icon: icon_center,
          label: "居中",
          val: "center",
        },
        {
          icon: icon_right,
          label: "右对齐",
          val: "right",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "@@/style/var.scss";
.font-box {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  text-align: center;
  margin-right: 10px;
  border: 1px solid $borderColor;
  transition: all 0.3s;
  background-color: #fff;
  cursor: pointer;
  &.active-box {
    background-color: #e1f3ed;
  }
}
</style>

<template>
  <ElForm
    :model="formModel"
    label-position="left"
    ref="form"
    label-width="100px"
    label-suffix="："
  >
    <ElFormItem label="提示">
      <ElInput
        v-model="formModel.placeholder"
        :placeholder="'请输入提示'"
      ></ElInput>
    </ElFormItem>
    <ElFormItem label="背景颜色">
      <div class="flex align-center">
        <ElColorPicker v-model="formModel.backgroundColor"></ElColorPicker
        >&nbsp;
        <ElButton type="text" @click="resetColr">重置</ElButton>
      </div>
    </ElFormItem>
  </ElForm>
</template>

<script>
import EditMixin from "@@/mixins/EditMixin.js"; // 混入公共JS
export default {
  name: "edit-cu-search",
  mixins: [EditMixin],
  methods: {
    resetColr() {
      this.formModel.backgroundColor = "#f5f5f5";
    },
  },
};
</script>

<style lang="scss"></style>

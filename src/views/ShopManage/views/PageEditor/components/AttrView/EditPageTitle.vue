<template>
  <ElForm
    label-position="left"
    ref="form"
    label-width="100px"
    label-suffix="："
  >
    <ElFormItem :label="'标题'">
      <ElInput
        v-model="title"
        :placeholder="'请输入标题'"
        @input="OnInputEvent"
      ></ElInput>
    </ElFormItem>
  </ElForm>
</template>

<script>
export default {
  data() {
    return {
      title: "",
    };
  },
  computed: {
    confirmForm() {
      return this.$store.state.editor.confirmForm;
    },
  },
  watch: {
    confirmForm(val) {
      this.title = val?.Description || "";
    },
  },
  created() {
    this.title = this.confirmForm?.Description || "";
  },
  methods: {
    OnInputEvent(val) {
      this.$store.commit("editor/setConfirmForm", {
        ...this.confirmForm,
        Description: val,
      });
    },
  },
};
</script>

<style lang="scss"></style>

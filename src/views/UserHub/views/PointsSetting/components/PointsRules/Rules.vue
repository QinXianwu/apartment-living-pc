<template>
  <div class="Rules">
    <div class="title">积分抵扣设置</div>
    <div class="content">
      <!--  -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Rules",
  components: {},
  data() {
    return {
      formData: {},
      rules: {
        meetAmount: [
          { required: true, message: "请输入满足金额", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  methods: {
    // 处理提交
    async handleSubmit() {
      // 表单校验
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) {
          return;
        }
      } catch (error) {
        return;
      }
      this.isLoading = true;
      this.isLoading = false;
      this.handleClose(true);
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.Rules {
  .title {
    font-size: 14px;
    font-weight: bold;
    color: $main-font-color;
  }
  .content {
    padding: 20px 0;
  }
}
</style>

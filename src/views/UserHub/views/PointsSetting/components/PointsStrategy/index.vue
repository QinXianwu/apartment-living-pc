<template>
  <!-- 积分攻略 -->
  <div class="PointsStrategy">
    <ActivityRules
      :rule.sync="formData.rule"
      title="积分攻略设置"
      formLabel="积分攻略"
    />
    <!-- 底部按钮 -->
    <FooterView :isShowSave="false" :cancelType="true" :showCancelBtn="false">
      <template>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button type="primary" @click="getDetail" plain>刷新</el-button>
      </template>
    </FooterView>
  </div>
</template>

<script>
import ActivityRules from "../ActivityRules.vue";
import FooterView from "@/components/Footer";

export default {
  name: "PointsStrategy",
  components: { ActivityRules, FooterView },
  data() {
    return {
      integralCarve: {},
      formData: {},
    };
  },
  computed: {},
  methods: {
    async getDetail() {
      const [, res] = await this.$http.PointsSetting.GetIntegralCarveDetail();
      this.integralCarve = res?.id ? res : {};
      this.formData = { ...this.integralCarve };
    },
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
      const quert = {
        ...this.integralCarve,
        ...this.formData,
      };
      const [, res] = await this.$http.PointsSetting.UpdateIntegralRule(quert);
      if (res) {
        this.getDetail();
        this.$message.success("保存成功");
      }
      this.isLoading = false;
    },
  },
  mounted() {
    this.getDetail();
  },
};
</script>
<style lang="scss" scoped>
.PointsStrategy {
  .title {
    font-size: 14px;
    font-weight: bold;
    color: $main-font-color;
  }
  .content {
    padding: 20px;
    span {
      margin: 0 10px;
      font-size: 14px;
    }
  }
}
</style>

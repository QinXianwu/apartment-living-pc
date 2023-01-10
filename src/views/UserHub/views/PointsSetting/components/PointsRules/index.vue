<template>
  <!-- 积分规则 -->
  <div class="PointsRules">
    <div class="title">积分抵扣设置</div>
    <div class="content">
      <el-form ref="form" :model="formData" :rules="rules" inline>
        <el-form-item label="" prop="consumeIntegral">
          <span>每</span>
          <el-input-number
            class="input-small"
            v-model="formData.consumeIntegral"
            :min="0"
            :controls="false"
            :precision="0"
            :step="1"
            placeholder="消费积分"
          />
          <span>积分</span>
        </el-form-item>
        <el-form-item label="" prop="discountAmount">
          <span>可抵扣</span>
          <el-input-number
            class="input-small"
            v-model="formData.discountAmount"
            :min="0"
            :controls="false"
            :precision="2"
            placeholder="抵扣金额"
            :step="1"
          />
          <span>元</span>
        </el-form-item>
        <div class="rate">
          <span>最多可抵扣订单总额的</span>
          <el-form-item label="" prop="discountOrderRate">
            <el-input-number
              class="input-small"
              v-model="formData.discountOrderRate"
              :min="0"
              :max="10"
              :controls="false"
              :precision="0"
              placeholder="抵扣比例"
              :step="1"
            />
            <span>%</span>
          </el-form-item>
        </div>
        <div class="rate">
          <span>消费可获得订单总额</span>
          <el-form-item label="" prop="percentageTotalRate">
            <el-input-number
              class="input-small"
              v-model="formData.percentageTotalRate"
              :min="0"
              :max="10"
              :controls="false"
              :precision="0"
              placeholder="积分比例"
              :step="1"
            />
            <span>%的积分</span>
            <i class="el-icon-warning" />
            <span>获得等额订单总价比例积分</span>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!-- 抵扣规则规则 -->
    <ActivityRules
      :rule.sync="formData.discountRule"
      title="抵扣规则设置"
      formLabel="抵扣规则"
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
  name: "PointsRules",
  components: { ActivityRules, FooterView },
  data() {
    return {
      integral: {},
      formData: {
        consumeStatus: 1, // 消费积分状态(1 => 设置了，2 => 未设置)
      },
      rules: {
        consumeIntegral: [
          { required: true, message: "请输入消费积分", trigger: "blur" },
          { min: 1, type: "number", message: "积分必须大于0", trigger: "blur" },
        ],
        discountAmount: [
          { required: true, message: "请输入抵扣金额", trigger: "blur" },
        ],
        discountOrderRate: [
          { required: true, message: "请输入抵扣比例", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  methods: {
    async getDetail() {
      const [, res] = await this.$http.PointsSetting.GetIntegralRuleDetail();
      this.integral = res?.id ? res : {};
      this.formData = { ...this.integral };
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
        ...this.integral,
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
.PointsRules {
  .title {
    font-size: 14px;
    font-weight: bold;
    color: $main-font-color;
  }
  .content {
    padding: 20px;
    .rate {
      line-height: 30px;
    }
    span {
      margin: 0 10px;
      font-size: 14px;
    }
  }
}
</style>

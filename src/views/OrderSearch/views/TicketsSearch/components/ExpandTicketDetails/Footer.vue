<template>
  <div class="FooterView">
    <div class="content">
      <div class="item">
        <span class="paySerialNumber">流水号：{{ payTradeNumber || "-" }}</span>
        <el-form
          ref="form"
          :rules="rules"
          :model="formData"
          inline
          hide-required-asterisk
        >
          <el-form-item label="" prop="paySerialNumber">
            <el-input
              class="input-small"
              placeholder="修改为新的流水号"
              v-model="formData.paySerialNumber"
            />
          </el-form-item>
          <el-form-item
            label=""
            label-width="10px"
            prop="paySerialNumberAmount"
          >
            <el-input-number
              class="amount input-mini"
              :min="0"
              :max="9999999999"
              :step="0.01"
              :precision="2"
              :controls="false"
              placeholder="请输入金额"
              v-model="formData.paySerialNumberAmount"
            />
          </el-form-item>
          <el-button type="primary" @click="UpdateSerialNumber"
            >提交修改</el-button
          >
        </el-form>
      </div>
      <div class="item">
        <el-form
          ref="interceptForm"
          :rules="rules"
          :model="formData"
          inline
          hide-required-asterisk
        >
          <el-form-item label="拦截用户退款：" prop="refundAmount">
            <el-input-number
              class="amount input-mini"
              :min="0"
              :max="9999999999"
              :step="0.01"
              :precision="2"
              :controls="false"
              placeholder="拦截金额"
              v-model="formData.refundAmount"
            />
          </el-form-item>
          <el-button type="danger" class="ml-10" @click="interceptRefundAmount"
            >提交拦截</el-button
          >
        </el-form>
      </div>
      <div class="item">
        <el-form
          ref="additionalForm"
          :rules="rules"
          :model="formData"
          inline
          hide-required-asterisk
        >
          <el-form-item
            label="补充额外流水号"
            prop="paySerialNumber_additional"
          >
            <el-input
              class="input-small"
              placeholder="请输入额外流水号"
              v-model="formData.paySerialNumber_additional"
            />
          </el-form-item>
          <el-form-item
            label=""
            label-width="10px"
            prop="paySerialNumberAmount_additional"
          >
            <el-input-number
              class="amount input-mini"
              :min="0"
              :max="9999999999"
              :step="0.01"
              :precision="2"
              :controls="false"
              placeholder="请输入金额"
              v-model="formData.paySerialNumberAmount_additional"
            />
          </el-form-item>
          <el-button type="primary" plain @click="additionalSerialNumber"
            >提交补充</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    payTradeNumber: {
      type: String,
      default: "",
    },
  },
  components: {},
  data() {
    return {
      formData: {},
      rules: {
        paySerialNumber: [
          { required: true, message: "请输入新流水号后再试", trigger: "blur" },
        ],
        paySerialNumberAmount: [
          { required: true, message: "请输入新流水号后再试", trigger: "blur" },
        ],
        refundAmount: [
          { required: true, message: "请输入拦截金额后再试", trigger: "blur" },
        ],
        paySerialNumber_additional: [
          {
            required: true,
            message: "请输入额外流水号后再试",
            trigger: "blur",
          },
        ],
        paySerialNumberAmount_additional: [
          {
            required: true,
            message: "请输入额外流水号所支付金额",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
    // 修改流水号
    async UpdateSerialNumber() {
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) return;
      } catch (error) {
        return;
      }
      this.$message.info("开发中...");
      console.log(this.formData);
    },
    // 补充额外流水号
    async additionalSerialNumber() {
      try {
        const valid = await this.$refs.additionalForm.validate();
        if (!valid) return;
      } catch (error) {
        return;
      }
      console.log(this.formData);
      this.$message.info("开发中...");
    },
    // 拦截用户退款金额
    async interceptRefundAmount() {
      try {
        const valid = await this.$refs.interceptForm.validate();
        if (!valid) return;
      } catch (error) {
        return;
      }
      console.log(this.formData);
      this.$message.info("开发中...");
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  font-size: 14px;
  line-height: 30px;
  border-top: 1px solid #eee;
  margin: 10px 0 0;
  padding: 20px 0 0 60px;
  .item {
    display: flex;
    flex-wrap: wrap;
    margin: 0 50px 0 0px;
  }
  .intercept {
    margin-bottom: 18px;
  }
  .amount {
    display: flex;
    align-items: center;
    &::after {
      content: "元";
      display: block;
      margin: 0 5px;
    }
  }
  .update-serial {
    margin: 0 50px 0 0;
  }
}
.paySerialNumber {
  margin: 0 50px 0 0;
}
</style>

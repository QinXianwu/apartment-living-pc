<template>
  <!-- 配送设置 -->
  <div class="SendSetUp view-container">
    <div class="title">配送设置</div>
    <div class="content">
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="配送类型" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio
              :label="item.value"
              v-for="item in $CONST.SEND_SETTING_TYPE_OPTIONS()"
              :key="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="配送金额"
          prop="amount"
          v-if="formData.type === $CONST.SEND_SETTING_TYPE.FIXED_FEE"
        >
          <el-input-number
            class="input-small"
            v-model="formData.amount"
            :min="0"
            :controls="false"
            :precision="2"
            placeholder="配送金额"
            :step="1"
          />
        </el-form-item>
        <el-form-item label="免配送费条件" prop="fullReduction">
          <el-input-number
            class="input-small"
            v-model="formData.fullReduction"
            :min="0"
            :controls="false"
            :precision="2"
            placeholder="满足金额"
            :step="1"
          />
          <div class="form-tip">
            满￥{{ formData.fullReduction || "-" }}可免配送费
          </div>
        </el-form-item>
        <el-form-item label="预计到达时间" prop="estimatedTime">
          <el-input-number
            class="input-small"
            v-model="formData.estimatedTime"
            :min="0"
            :controls="false"
            :precision="0"
            placeholder="预计到达时间"
            :step="1"
          />
          <span class="form-tip">单位：小时</span>
        </el-form-item>
        <el-form-item label="超时时间" prop="overtimeUnpaid">
          <el-input-number
            class="input-small"
            v-model="formData.overtimeUnpaid"
            :min="0"
            :controls="false"
            :precision="0"
            placeholder="超时时间"
            :step="1"
          />
          <span class="form-tip">单位：分钟</span>
          <div class="form-tip">
            提交订单超过{{
              formData.overtimeUnpaid || "-"
            }}分钟未付款自动取消订单
          </div>
        </el-form-item>
      </el-form>
    </div>
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
import FooterView from "@/components/Footer";
export default {
  name: "SendSetUp",
  components: { FooterView },
  data() {
    return {
      isUpdate: false,
      isLoading: false,
      detailInfo: {},
      formData: {
        type: this.$CONST.SEND_SETTING_TYPE.FIXED_FEE,
      },
      rules: {
        amount: [
          { required: true, message: "请输入配送金额", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  methods: {
    async getDetail() {
      const [, res] = await this.$http.Order.GetSendSettingDetail();
      this.detailInfo = res?.id ? { ...res } : {};
      this.formData = { ...this.formData, ...this.detailInfo };
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
      const query = {
        ...this.detailInfo,
        ...this.formData,
      };
      const [, res] = await this.$http.Order.UpdateSendSetting(query);
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
.SendSetUp {
  background: #fff;
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

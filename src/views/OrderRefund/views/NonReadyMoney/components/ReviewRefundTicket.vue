<template>
  <el-dialog
    title="退票审核"
    :visible.sync="visible"
    width="550px"
    @close="handleClose(false)"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="110px">
      <el-form-item label="退票类型:" prop="refundResult">
        <el-select
          class="input-medium"
          v-model="formData.refundResult"
          placeholder="请选择退票类型"
        >
          <el-option
            v-for="item in refundTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="退票失败原因:"
        prop="failReason"
        v-if="formData.refundResult !== $CONST.REFUND_ACTION_TYPE.SUCCESS"
      >
        <el-select
          class="input-medium"
          v-model="formData.failReason"
          placeholder="请输入退票失败原因"
        >
          <el-option
            v-for="item in FAIL_REASON_TYPE_OPTIONS"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" :loading="isLoading" @click="handleSubmit">
        保存
      </el-button>
      <el-button @click="handleClose(false)"> 取消 </el-button>
    </span>
  </el-dialog>
</template>
<script>
const FAIL_REASON_TYPE_OPTIONS = [
  {
    label: "查无信息",
  },
  {
    label: "已退票",
  },
  {
    label: "已改签",
  },
  {
    label: "已取出车票",
  },
  {
    label: "车次已停运",
  },
  {
    label: "其他",
  },
];
import dialogMixin from "@/mixins/dialogMixin";
export default {
  name: "UpdatePayAccountDiaog",
  mixins: [dialogMixin],
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
    // 批量ids
    ids: {
      type: Array,
      default: () => [],
    },
    // 是否批量
    isBatch: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    visible(val) {
      if (val && (this.isBatch || this.editInfo?.id)) {
        this.formData = {
          failReason: "",
          refundPrice: 0, // 后端规定 非现金为0
          refundResult: "",
        };
        if (this.isBatch) {
          this.formData.ids = this.ids;
        } else {
          this.formData.id = this.editInfo.id;
          this.formData.agentCode = this.editInfo?.refundAgentCode || "";
        }
      } else {
        this.formData = {
          failReason: "",
          refundPrice: 0, // 后端规定 非现金为0
          refundResult: "",
        };
      }
    },
  },
  data() {
    return {
      FAIL_REASON_TYPE_OPTIONS,
      formData: {
        failReason: "",
        refundPrice: 0, // 后端规定 非现金为0
        refundResult: "",
      },
      isLoading: false,
      rules: {
        refundResult: [
          {
            required: true,
            message: "请选择退票类型",
            trigger: "blur",
          },
        ],
        failReason: [
          {
            required: true,
            message: "请输入退票失败原因",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    refundTypeOptions({ isBatch }) {
      const options = this.$CONST.REFUND_ACTION_TYPE_OPTIONS();
      if (!isBatch) return options;
      const index = options.findIndex(
        (item) => item.value === this.$CONST.REFUND_ACTION_TYPE.SUCCESS
      );
      if (index >= 0) options.splice(index, 1);
      return options;
    },
  },
  mounted() {
    //
  },
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
      const [, res] = await this.$http.OrderRefund[
        this.isBatch ? "TicketingRefundBatchAction" : "TicketingRefundAction"
      ]({
        ...this.formData,
      });
      const isResult = Number(res?.code) === this.AJAX_CODE.SUCCESS;
      this.isLoading = false;
      this.$message[isResult ? "success" : "error"](
        res?.message ||
          `${this.isBatch ? "批量操作" : "审核"}${isResult ? "成功" : "失败"}`
      );
      if (isResult) this.handleClose(true);
    },
  },
};
</script>
<style lang="scss" scoped></style>

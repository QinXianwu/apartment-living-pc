<template>
  <el-dialog
    title="新增关联优惠劵"
    :visible.sync="visible"
    width="650px"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="150px">
      <el-form-item label="适用商品类型" prop="applyProductType">
        <el-radio-group v-model="formData.applyProductType">
          <el-radio :label="CONST.APPLY_PRODUCT_TYPE.ALL">{{
            CONST.APPLY_PRODUCT_TYPE_TEXT[CONST.APPLY_PRODUCT_TYPE.ALL]
          }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="扣减金额" prop="deductAmount">
        <el-input-number
          class="input-medium"
          v-model="formData.deductAmount"
          placeholder="请输入扣减金额"
          :controls="false"
          :precision="2"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="满足金额" prop="meetAmount">
        <el-input-number
          class="input-medium"
          v-model="formData.meetAmount"
          placeholder="请输入满足金额"
          :controls="false"
          :precision="2"
          :min="0"
        />
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
import CONST from "@/constants/index";
import dialogMixin from "@/mixins/dialogMixin";
export default {
  name: "AddCouponDiaog",
  mixins: [dialogMixin],
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.formData = {
          applyProductType: CONST.APPLY_PRODUCT_TYPE.ALL,
        };
      }
    },
  },
  data() {
    return {
      CONST,
      formData: {},
      isLoading: false,
      rules: {
        applyProductType: [
          { required: true, message: "请选择适用商品类型", trigger: "blur" },
        ],
        deductAmount: [
          { required: true, message: "请输入扣减金额", trigger: "blur" },
        ],
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
};
</script>
<style lang="scss" scoped></style>

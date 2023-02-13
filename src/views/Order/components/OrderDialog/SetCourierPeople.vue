<template>
  <div class="content" v-loading="isLoading">
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-suffix=":"
      label-width="120px"
    >
      <el-form-item label="配送服务点">
        <el-input
          disabled
          clearable
          class="input-medium"
          placeholder="配送服务点"
          :value="dataSource.serviceName || '-'"
        />
      </el-form-item>
      <el-form-item label="配送员" prop="courierId">
        <el-select
          filterable
          class="input-medium"
          placeholder="请选择配送员"
          v-model="formData.courierId"
        >
          <el-option
            v-for="item in courierOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="订单配送费">
        <span>￥{{ dataSource.voucherSendAmount | formatCurrency }}</span>
      </el-form-item>
      <el-form-item label="配送员服务费" prop="serverAmount">
        <el-input
          placeholder="请输入配送员服务费"
          class="input-medium"
          :value="formData.serverAmount"
          @input="(val) => onInputAmount(val)"
        >
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="action_footer">
      <el-button type="primary" :loading="isLoading" @click="handleSubmit"
        >确定</el-button
      >
      <el-button @click="$emit('close')">取消</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "SetCourierPeople",
  components: {},
  props: {
    dataSource: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    dataSource: {
      deep: true,
      handler() {
        this.initForm();
      },
    },
  },
  data() {
    return {
      isLoading: false,
      formData: {},
      rules: {
        courierId: [
          { required: true, message: "请选择配送员", trigger: "change" },
        ],
        serverAmount: [
          { required: true, message: "请输入配送员服务费", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      courierOptions: "operationsManage/courierPeopleOptions",
    }),
  },
  methods: {
    initForm() {
      this.formData = {};
    },
    onInputAmount(val) {
      //正则表达试
      val = val.match(/^\d*(\.?\d{0,2})/g)[0] || 0;
      //重新赋值给input
      this.$set(this.formData, "serverAmount", val);
    },
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
      if (this.isLoading) return;
      this.isLoading = true;
      this.$message.info("功能开发中...");
      // const [, res] = await this.$http.Coupons.UpdateCouponsActivityRule(
      //   this.activityRule
      // );
      this.isLoading = false;
      // this.$message[res ? "success" : "error"](
      //   res?.message || res ? "保存成功" : "保存失败"
      // );
      // if (res) this.handleClose(false);
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.content {
  ::v-deep .pagination {
    border-top: none;
  }
}
</style>

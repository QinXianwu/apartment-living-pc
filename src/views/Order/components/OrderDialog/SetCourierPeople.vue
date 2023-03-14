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
          v-loading="isCourierLoading"
        >
          <el-option
            v-for="item in courierOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="订单配送费">
        <span>￥{{ dataSource.voucherSendAmount | formatCurrency }}</span>
      </el-form-item>
      <el-form-item label="配送员服务费" prop="courierServiceAmount">
        <el-input
          placeholder="请输入配送员服务费"
          class="input-medium"
          :value="formData.courierServiceAmount"
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
import CONST from "@/constants/index";

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
    orderTypeData: {
      type: Object,
      default: () => ({}),
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
      isCourierLoading: false,
      formData: {},
      rules: {
        courierId: [
          { required: true, message: "请选择配送员", trigger: "change" },
        ],
        courierServiceAmount: [
          { required: true, message: "请输入配送员服务费", trigger: "blur" },
        ],
      },
      courierOptions: [],
    };
  },
  computed: {
    isGroupOrder({ orderTypeData }) {
      return !!orderTypeData?.isGroupOrder;
    },
  },
  methods: {
    initForm() {
      this.formData = {};
      this.GetCourierPeopleList();
    },
    async GetCourierPeopleList() {
      if (this.isCourierLoading) return;
      this.isCourierLoading = true;
      const query = {
        status: CONST.COURIER_AUDIT_STATE.SUCCESS_CHECK,
      };
      if (this.dataSource?.serviceId)
        query.serviceStationId = this.dataSource.serviceId;
      const [, data] = await this.$http.Courier.GetCourierListAll(query);
      this.isCourierLoading = false;
      this.courierOptions = data?.length ? data : [];
    },
    onInputAmount(val) {
      //正则表达试
      val = val.match(/^\d*(\.?\d{0,2})/g)[0] || 0;
      //重新赋值给input
      this.$set(this.formData, "courierServiceAmount", val);
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
      const [, res] = await this.$http.Order[
        this.isGroupOrder ? "UpdateGroupOrderByCourier" : "UpdateOrderByCourier"
      ]({
        ...this.formData,
        orderNo: this.dataSource.orderNo,
      });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || res ? "保存成功" : "保存失败"
      );
      if (res) this.$emit("refresh");
    },
  },
  mounted() {
    this.initForm();
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

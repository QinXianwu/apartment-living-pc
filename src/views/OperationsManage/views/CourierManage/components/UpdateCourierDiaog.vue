<template>
  <el-dialog
    width="750px"
    :title="`${editInfo && editInfo.id ? '编辑' : '新增'}配送员`"
    :visible.sync="visible"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <div class="content">
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="配送员名称" prop="name">
          <el-input
            class="input-medium"
            v-model="formData.name"
            placeholder="请输入配送员名称"
          />
        </el-form-item>
        <el-form-item label="配送员手机号" prop="phone">
          <el-input
            class="input-medium"
            v-model="formData.phone"
            placeholder="请输入配送员手机号"
          />
        </el-form-item>
        <el-form-item label="适用服务点" prop="serviceStationId">
          <el-select
            class="input-medium"
            placeholder="请选择适用服务点"
            v-model="formData.serviceStationId"
          >
            <el-option
              :key="index"
              :label="ele.label"
              :value="ele.value"
              v-for="(ele, index) in serviceStationOptions"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            class="input-medium"
            type="textarea"
            v-model="formData.remark"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" :loading="isLoading" @click="handleSubmit">
        保存
      </el-button>
      <el-button @click="handleClose(false)"> 取消 </el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import dialogMixin from "@/mixins/dialogMixin";

export default {
  name: "UpdateCourierDiaog",
  mixins: [dialogMixin],
  components: {},
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.courierInfo = {};
        this.formData = {};
        this.getDetail(val);
      }
    },
  },
  data() {
    return {
      formData: {},
      isLoading: false,
      isLoadingInfo: false,
      courierInfo: {},
      rules: {
        name: [
          { required: true, message: "请输入配送员名称", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入配送员手机号", trigger: "blur" },
          {
            pattern:
              /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            message: "请输入合法手机号",
            trigger: "blur",
          },
        ],
        serviceStationId: [
          { required: true, message: "请选择适用服务点", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      isService: "user/isService",
      serviceStationOptions: "accountRoleManage/serviceStationOptions",
    }),
  },
  methods: {
    async getDetail() {
      if (!this.editInfo?.id) return;
      this.isLoadingInfo = true;
      const [, res] = await this.$http.Courier.GetCourierDetail({
        id: this.editInfo.id,
      });
      this.isLoadingInfo = false;
      this.courierInfo = { ...(res || {}) };
      this.formData = { ...this.formData, ...this.courierInfo };
    },
    async handleSubmit() {
      // 表单校验
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) {
          return null;
        }
      } catch (error) {
        return error;
      }
      if (this.isLoading) return;
      this.isLoading = true;
      const query = {
        ...this.courierInfo,
        ...this.formData,
      };
      const id = this.editInfo?.id || "";
      const [, res] = await this.$http.Courier[
        id ? "UpdateCourier" : "AddCourier"
      ](query);
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || res
          ? `${id ? "编辑" : "新增"}成功`
          : `${id ? "编辑" : "新增"}失败`
      );
      if (res) this.handleClose(true);
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.content {
  margin: 0 0 40px;
  ::v-deep .pagination {
    border-top: none;
  }
}
.select-all {
  padding: 0 20px 5px;
  text-align: right;
}
</style>

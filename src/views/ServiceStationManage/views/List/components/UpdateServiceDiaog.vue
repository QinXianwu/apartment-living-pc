<template>
  <el-dialog
    width="700px"
    :title="dialogTitle"
    :visible.sync="visible"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="170px"
      v-loading="isLoadingService"
    >
      <el-form-item label="服务点名称" prop="name">
        <el-input
          class="input-medium"
          placeholder="请输入服务点名称"
          v-model="formData.name"
        />
      </el-form-item>
      <el-form-item label="管理员" prop="manager">
        <el-input
          class="input-medium"
          placeholder="请输入管理员"
          v-model="formData.manager"
        />
      </el-form-item>
      <el-form-item label="联系电话" prop="managePhone">
        <el-input
          class="input-medium"
          placeholder="请输入管理员联系电话"
          v-model="formData.managePhone"
        />
      </el-form-item>
      <el-form-item label="所在城市" prop="address">
        <el-cascader
          class="input-medium"
          v-model="formData.address"
          :options="addressLinkageOptions"
          :props="{ value: 'label' }"
        />
      </el-form-item>
      <el-form-item label="详情地址" prop="detailAddress">
        <el-input
          class="input-medium"
          placeholder="请输入详情地址"
          type="textarea"
          :rows="2"
          v-model="formData.detailAddress"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio-button
            v-for="(item, index) in $CONST.SERVICE_STATION_STATE_OPTIONS()"
            :key="index"
            :value="item.value"
            :label="item.value"
            >{{ item.label }}</el-radio-button
          >
        </el-radio-group>
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
import { mapGetters } from "vuex";
import { isPhone } from "@/utils/validate";
import dialogMixin from "@/mixins/dialogMixin";

export default {
  name: "UpdateServiceDiaog",
  mixins: [dialogMixin],
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      this.init();
      if (val) {
        this.getService();
      }
    },
  },
  data() {
    return {
      formData: {},
      isLoading: false,
      isLoadingService: false,
      rules: {
        name: [
          { required: true, message: "请输入服务点名称", trigger: "blur" },
        ],
        manager: [{ required: true, message: "请输入管理员", trigger: "blur" }],
        managePhone: [
          { required: true, message: "请输入管理员联系电话", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!isPhone(value)) {
                callback(new Error("手机号格式不正确，请输入11位手机号!"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        address: [
          { required: true, message: "请选择所在城市", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      addressLinkageOptions: "app/addressLinkageOptions",
    }),
    dialogTitle({ editInfo }) {
      const title = editInfo?.id ? "编辑" : "新增";
      return `${title}服务点`;
    },
  },
  methods: {
    init() {
      this.formData = {
        status: this.$CONST.SERVICE_STATION_STATE.ON,
      };
    },
    async getService() {
      if (!this.editInfo?.id) return;
      const [, res] = await this.$http.ServiceStation.GetServiceStationDetail({
        id: this.editInfo.id,
      });
      this.formData = { ...this.formData, ...(res || {}) };
      this.formData.address = [];
      if (this.formData?.province) {
        this.formData.address[0] = this.formData.province;
      }
      if (this.formData?.province && this.formData?.city) {
        this.formData.address[1] = this.formData.city;
      }
      if (
        this.formData?.province &&
        this.formData?.city &&
        this.formData?.district
      ) {
        this.formData.address[2] = this.formData.district;
      }
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
      const id = this.editInfo?.id || "";
      const query = { ...this.formData };
      const addressKeyArr = ["province", "city", "district"];
      if (query?.address?.length) {
        addressKeyArr.forEach((key, index) => {
          query[key] =
            index <= query.address.length ? query.address[index] : "";
        });
      }
      delete query.address;
      const [, res] = await this.$http.ServiceStation[
        id ? "UpdateServiceStation" : "AddServiceStation"
      ]({ ...query });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || `${id ? "编辑" : "新增"}服务点${res ? "成功" : "失败"}`
      );
      if (res) {
        this.$store.dispatch(
          "accountRoleManage/GetServiceStationListAction",
          true
        );
        this.handleClose(true);
      }
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.more-config {
  border: none;

  ::v-deep {
    .el-collapse-item__wrap,
    .el-collapse-item__header,
    .el-collapse-item__content {
      border: none;
    }
    .el-collapse-item__header {
      width: 155px;
      display: flex;
      justify-content: center;
      line-height: 20px;
      height: 20px;
      margin-bottom: 10px;
    }
  }
  .collapse-title {
    width: 100%;
    text-align: right;
    color: $--color-info;
    margin: 0 2px 0 0px;
  }
}
.select-all {
  padding: 0 20px;
  text-align: right;
}
</style>

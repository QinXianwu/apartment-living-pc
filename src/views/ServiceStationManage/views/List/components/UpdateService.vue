<template>
  <div class="UpdateService view-container">
    <div class="content">
      <div class="title">{{ dialogTitle }}</div>
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
        <el-form-item label="服务点联系方式" prop="phone">
          <el-input
            class="input-medium"
            placeholder="请输入服务点联系方式"
            v-model="formData.phone"
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
          <!-- <el-cascader
            class="input-medium"
            v-model="formData.address"
            :options="addressLinkageOptions"
            :props="{ value: 'label' }"
          /> -->
          <el-input
            class="input-medium"
            placeholder="请输入所在城市"
            :value="addressText"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="详情地址" prop="detailAddress">
          <el-input
            class="input-medium"
            placeholder="请输入详情地址"
            :disabled="true"
            type="textarea"
            :rows="2"
            v-model="formData.detailAddress"
          />
        </el-form-item>
        <el-form-item label="搜索服务点">
          <ServiceStationPosition
            :address.sync="formData.address"
            :serverName="formData.name || ''"
            :detailAddress.sync="formData.detailAddress"
            :latitude.sync="formData.latitude"
            :longitude.sync="formData.longitude"
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
    </div>
    <FooterView :cancelType="true" @cancel="$emit('close', false)">
      <template>
        <el-button type="primary" :loading="isLoading" @click="handleSubmit">
          保存
        </el-button>
      </template>
    </FooterView>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { isPhone } from "@/utils/validate";
import FooterView from "@/components/Footer";
import ServiceStationPosition from "./ServiceStationPosition.vue";

export default {
  name: "UpdateService",
  components: { ServiceStationPosition, FooterView },
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {},
  data() {
    const validatorPhone = (rule, value, callback) => {
      if (!isPhone(value)) {
        callback(new Error("手机号格式不正确，请输入11位手机号!"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        address: [],
      },
      isLoading: false,
      isLoadingService: false,
      rules: {
        name: [
          { required: true, message: "请输入服务点名称", trigger: "blur" },
        ],
        manager: [{ required: true, message: "请输入管理员", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入服务点联系电话", trigger: "blur" },
          { validator: validatorPhone, trigger: "blur" },
        ],
        managePhone: [
          { required: true, message: "请输入管理员联系电话", trigger: "blur" },
          { validator: validatorPhone, trigger: "blur" },
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
    addressText({ formData }) {
      if (!formData?.address?.length) return "";
      return formData.address.filter((item) => item).join(" / ");
    },
  },
  methods: {
    init() {
      this.formData = {
        address: [],
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
        this.$emit("close", true);
      }
    },
  },
  mounted() {
    this.init();
    this.getService();
  },
};
</script>
<style lang="scss" scoped>
.UpdateService {
  background: #fff;
  padding: 0 10px;
  margin: 0 0 60px;
  .title {
    font-size: 14px;
    font-weight: bold;
    color: $main-font-color;
    margin-bottom: 20px;
  }
  .content {
    padding: 10px 0;
    position: relative;
    z-index: 5;
  }
}
</style>

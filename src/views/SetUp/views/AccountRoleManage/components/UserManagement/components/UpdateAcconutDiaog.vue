<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    width="700px"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="170px">
      <el-form-item label="所属账号:" v-if="formData.parentAccount">
        <el-input
          :disabled="true"
          class="input-medium"
          v-model="formData.parentAccount"
        />
      </el-form-item>
      <el-form-item label="用户名:" prop="userName">
        <el-input
          class="input-medium"
          v-model="formData.userName"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item label="登录账号:" prop="account">
        <el-input
          class="input-medium"
          :disabled="!!editInfo.id"
          v-model="formData.account"
          placeholder="请输入登录账号"
        />
      </el-form-item>
      <el-form-item label="登录密码:" prop="password" v-if="!editInfo.id">
        <el-input
          type="password"
          class="input-medium"
          v-model="formData.password"
          placeholder="请输入登录密码"
        />
      </el-form-item>
      <el-form-item
        label="是否设置为管理员:"
        prop="administration"
        v-if="!editInfo.parentAccount"
      >
        <el-switch
          v-model="formData.administration"
          active-text="是"
          inactive-text="否"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="代售点:" prop="pointSaleId">
        <el-select
          multiple
          collapse-tags
          value-key="label"
          class="input-medium"
          placeholder="请选择代售点"
          v-loading="isLoadingSiteList"
          v-model="formData.pointSaleId"
        >
          <div class="select-all">
            <el-checkbox
              :value="formData.pointSaleId.length === pointSaleOptions.length"
              @change="selectAll('pointSaleId')"
              >全选</el-checkbox
            >
          </div>
          <el-option
            :key="index"
            :label="item.name"
            :value="Number(item.id)"
            v-for="(item, index) in pointSaleOptions"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电子订单号前缀:" prop="eOrderNumberPrefix">
        <el-input
          class="input-medium"
          v-model="formData.eOrderNumberPrefix"
          placeholder="请输入电子订单号前缀"
        />
      </el-form-item>
      <el-form-item label="接单量上限:" prop="receiveOrderLimit">
        <el-input-number
          class="input-medium"
          v-model="formData.receiveOrderLimit"
          :precision="0"
          :step="1"
          :min="0"
          :max="9999"
          placeholder="请输入接单量上限"
        />
      </el-form-item>
      <el-collapse
        accordion
        class="more-config"
        @change="(val) => (allocationName = val)"
      >
        <el-collapse-item name="allocationConfig">
          <template slot="title">
            <div class="collapse-title">
              <span>{{
                allocationName === "allocationConfig" ? "收起" : "展开"
              }}</span>
              <span>订单分配限制配置</span>
            </div>
          </template>
          <div class="more-config-content">
            <el-form-item
              v-for="item in selectFormDataArr"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
            >
              <el-select
                multiple
                collapse-tags
                :value-key="item.valueKey"
                class="input-medium"
                :placeholder="item.placeholder"
                v-model="formData[item.prop]"
              >
                <div class="select-all">
                  <el-checkbox
                    :value="formData[item.prop].length === item.options.length"
                    @change="selectAll(item.prop)"
                    >全选</el-checkbox
                  >
                </div>
                <el-option
                  :key="index"
                  :label="ele.label"
                  :value="ele.label"
                  v-for="(ele, index) in item.options"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-for="item in numberFormDateArr"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
            >
              <el-input-number
                class="input-medium"
                v-model="formData[item.prop]"
                :precision="item.precision"
                :step="item.step"
                :min="item.min"
                :max="item.max"
                :placeholder="item.placeholder"
              />
              <div class="form-tip" v-if="item.tipText">
                <span> {{ item.tipText }} </span>
              </div>
            </el-form-item>
            <el-form-item
              label="接单有无特殊要求限制:"
              prop="specialRequirements"
            >
              <el-select
                v-model="formData.specialRequirements"
                placeholder="请选择接单有无特殊要求限制"
                class="input-medium"
              >
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in $CONST.SPECIAL_REQUIREMENTS_OPTIONS()"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
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
import dialogMixin from "@/mixins/dialogMixin";
import { selectFormData, numberFormDate } from "../config/index";
export default {
  name: "UpdateAcconutDiaog",
  mixins: [dialogMixin],
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible() {
      this.getPointSaleOptions();
      this.init();
    },
  },
  data() {
    return {
      selectFormData,
      numberFormDate,
      formData: {
        pointSaleId: [],
        receiveOrderProvince: [],
        receiveOrderArriveProvince: [],
        documentType: [],
        designatedSeats: [],
      },
      pointSaleOptions: [], // 代售点列表
      allocationName: "",
      isLoading: false,
      isLoadingSiteList: false,
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        account: [
          {
            required: true,
            message: "请输入登录账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      provinceOptions: "user/provinceOptions", // 省份列表
    }),
    dialogTitle({ editInfo }) {
      const title = editInfo?.id
        ? editInfo?.parentAccount
          ? "编辑子"
          : "编辑"
        : editInfo && editInfo.pid
        ? "新增子"
        : "新增";
      return `${title}账号`;
    },
    selectFormDataArr({ provinceOptions, selectFormData }) {
      return selectFormData.map((item) => {
        const temObj = {};
        if (
          item?.prop === "receiveOrderProvince" ||
          item?.prop === "receiveOrderArriveProvince"
        ) {
          item.options = provinceOptions;
        }
        return { ...item, ...temObj };
      });
    },
    numberFormDateArr({ numberFormDate }) {
      return numberFormDate;
    },
  },
  methods: {
    init() {
      this.formData = {
        userName: "",
        account: "",
        password: "",
        administration: false,
        parentAccount: this.editInfo?.parentAccount || "",
        specialRequirements: this.$CONST.SPECIAL_REQUIREMENTS.UNLIMITED,
        pointSaleId: [],
        receiveOrderProvince: [],
        receiveOrderArriveProvince: [],
        documentType: [],
        designatedSeats: [],
      };
      // 修改
      if (!this.editInfo?.id) return;
      this.formData = { ...this.formData, ...this.editInfo };
      if (this.formData?.pointSaleId) {
        const arr = JSON.parse(this.formData?.pointSaleId || "[]");
        this.formData.pointSaleId = arr?.length ? arr : "";
      }
      const str2arr = [
        "receiveOrderProvince",
        "receiveOrderArriveProvince",
        "documentType",
        "designatedSeats",
      ];
      str2arr.map((formKey) => {
        this.formData[formKey] = JSON.parse(this.formData[formKey] || "[]");
      });
    },
    // 获取代售点列表
    async getPointSaleOptions() {
      this.isLoadingSiteList = true;
      const [, res] =
        await this.$http.AccountRoleManage.GetAccountByPointSale();
      this.pointSaleOptions = res?.length ? res : [];
      this.isLoadingSiteList = false;
    },
    // 全选select
    selectAll(formKey) {
      const optionMap = {
        pointSaleId: true,
        documentType: "PASSPORT_TYPE_OPTIONS",
        designatedSeats: "SEAT_OPTIONS",
        receiveOrderProvince: true,
        receiveOrderArriveProvince: true,
      };
      if (!optionMap[formKey]) return;
      let options = [];
      if (formKey === "pointSaleId") {
        options = this.pointSaleOptions.map((item) => ({
          label: Number(item.id),
        }));
      } else if (
        formKey === "receiveOrderProvince" ||
        formKey === "receiveOrderArriveProvince"
      ) {
        options = this.provinceOptions;
      } else {
        options = this.$CONST[optionMap[formKey]]();
      }
      if (this.formData[formKey]?.length === options.length) {
        this.formData[formKey] = [];
        return;
      }
      this.formData[formKey] = options.map((item) => item.label);
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
      const pid = this.editInfo?.pid || "";
      const query = { ...this.formData };
      const pointSaleId = this.formData.pointSaleId;
      const receiveOrderProvince = this.formData.receiveOrderProvince;
      const receiveOrderArriveProvince =
        this.formData.receiveOrderArriveProvince;
      const documentType = this.formData.documentType;
      const designatedSeats = this.formData.designatedSeats;
      query.pointSaleId = JSON.stringify(pointSaleId);
      query.documentType = JSON.stringify(documentType);
      query.designatedSeats = JSON.stringify(designatedSeats);
      query.receiveOrderProvince = JSON.stringify(receiveOrderProvince);
      query.receiveOrderArriveProvince = JSON.stringify(
        receiveOrderArriveProvince
      );
      if (pid) query.id = pid;
      delete query.pid;
      delete query.parentAccount;

      const [, res] = await this.$http.AccountRoleManage[
        id ? "UpdateAccount" : pid ? "AddSubAccount" : "AddAccount"
      ]({ ...query });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message ||
          `${id ? "编辑" : pid ? "新增子" : "新增"}账号${res ? "成功" : "失败"}`
      );
      if (res) this.handleClose(true);
    },
  },
  mounted() {
    this.$store.dispatch("user/GetPointSaleListAction");
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

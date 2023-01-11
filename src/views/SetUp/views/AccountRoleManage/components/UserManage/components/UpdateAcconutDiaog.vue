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
      v-loading="isLoadingUser"
    >
      <el-form-item label="登录账号:" prop="userName">
        <el-input
          class="input-medium"
          :disabled="!!editInfo.userId"
          v-model="formData.userName"
          placeholder="请输入登录账号"
        />
      </el-form-item>
      <el-form-item label="用户昵称:" prop="nickName">
        <el-input
          class="input-medium"
          v-model="formData.nickName"
          placeholder="请输入用户昵称"
        />
      </el-form-item>
      <el-form-item label="登录密码:" prop="password" v-if="!editInfo.userId">
        <el-input
          type="password"
          class="input-medium"
          v-model="formData.password"
          placeholder="请输入登录密码"
        />
      </el-form-item>
      <div class="more-config-content">
        <el-form-item
          v-for="item in selectFormDataArr"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        >
          <el-select
            :multiple="item.multiple"
            collapse-tags
            class="input-medium"
            :value-key="item.valueKey"
            :placeholder="item.placeholder"
            v-model="formData[item.prop]"
          >
            <div
              class="select-all"
              v-if="item.multiple && item.isShowSelectAll"
            >
              <el-checkbox
                :value="formData[item.prop].length === item.options.length"
                @change="selectAll(item.prop)"
                >全选</el-checkbox
              >
            </div>
            <el-option
              :key="index"
              :label="ele.label"
              :value="ele.value"
              v-for="(ele, index) in item.options"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="服务点:" prop="serviceStationId">
        <el-select
          class="input-medium"
          placeholder="请选择服务点"
          clearable
          v-model="formData.serviceStationId"
          :disabled="!!formData.supplierId"
          @change="$forceUpdate()"
        >
          <el-option
            :value="ele.value"
            :label="ele.label"
            :key="index"
            v-for="(ele, index) in serviceStationOptions"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商:" prop="supplierId">
        <el-select
          clearable
          class="input-medium"
          placeholder="请选择供应商"
          v-model="formData.supplierId"
          :disabled="!!formData.serviceStationId"
          @change="$forceUpdate()"
        >
          <el-option
            :value="ele.value"
            :label="ele.label"
            :key="index"
            v-for="(ele, index) in supplierOptions"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码:" prop="phonenumber">
        <el-input
          class="input-medium"
          v-model="formData.phonenumber"
          placeholder="请输入手机号码"
        />
      </el-form-item>
      <el-form-item label="邮箱地址:" prop="email">
        <el-input
          class="input-medium"
          v-model="formData.email"
          placeholder="请输入邮箱地址"
        />
      </el-form-item>
      <!-- <el-collapse
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
              <span>更多配置</span>
            </div>
          </template>
        </el-collapse-item>
      </el-collapse> -->
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
import { digits2Str } from "@/utils/index";
import dialogMixin from "@/mixins/dialogMixin";
import { selectFormData } from "../config/index";
import { mapGetters } from "vuex";
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
    visible(val) {
      this.init();
      if (val) {
        this.$store.dispatch("accountRoleManage/GetServiceStationListAction");
        this.$store.dispatch("accountRoleManage/GetSupplierListAction");
        this.getUserInfo();
      }
    },
  },
  data() {
    return {
      selectFormData,
      formData: {
        postIds: [],
      },
      allocationName: "",
      isLoading: false,
      isLoadingUser: false,
      postOptions: [],
      roleOptions: [],
      serviceList: [],
      supplierList: [],
      rules: {
        userName: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "登录账号长度必须介于 2 和 20 之间",
            trigger: "blur",
          },
        ],
        nickName: [
          { required: true, message: "请输入用户昵称", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "用户密码长度必须介于 5 和 20 之间",
            trigger: "blur",
          },
        ],
        roleIds: [{ required: true, message: "请选择角色", trigger: "blur" }],
        serviceStationId: [
          { required: true, message: "请选择服务点", trigger: "blur" },
        ],
        supplierId: [
          { required: true, message: "请选择供应商", trigger: "blur" },
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        phonenumber: [
          { required: false, message: "请输入手机号", trigger: "blur" },
          {
            pattern:
              /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            message: "请输入合法手机号",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      serviceStationOptions: "accountRoleManage/serviceStationOptions",
      supplierOptions: "accountRoleManage/supplierOptions",
    }),
    dialogTitle({ editInfo }) {
      const title = editInfo?.userId ? "编辑" : "新增";
      return `${title}账号`;
    },
    selectFormDataArr({ postOptions, roleOptions, selectFormData }) {
      return selectFormData.map((item) => {
        const temObj = {};
        if (item?.prop === "roleIds")
          item.options = roleOptions.map((item) => ({
            label: item.roleName,
            value: item.roleId,
          }));
        if (item?.prop === "postIds")
          item.options = postOptions.map((item) => ({
            label: item.postName,
            value: item.postId,
          }));
        return { ...item, ...temObj };
      });
    },
  },
  methods: {
    init() {
      this.formData = {
        userName: "",
        account: "",
        password: "",
        postIds: [],
        serviceStationId: "",
        supplierId: "",
      };
    },
    async getUserInfo() {
      this.isLoadingUser = true;
      const [, res] = await this.$http.AccountRoleManage.GetUserInfo({
        userId: this.editInfo?.userId || "",
      });
      this.isLoadingUser = false;
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        if (this.editInfo?.userId)
          this.$message.error(res?.msg || "获取用户信息异常");
        return;
      }
      this.postOptions = res?.posts?.length ? res.posts : [];
      this.roleOptions = res?.roles?.length ? res.roles : [];
      this.formData = {
        ...(res?.data || {}),
        postIds: res?.postIds?.length ? res.postIds : [],
        roleIds: res?.roleIds?.length ? res?.roleIds[0] : [],
        password: "",
      };
      digits2Str(this.formData, ["supplierId", "serviceStationId"]);
    },
    // 全选select
    selectAll(formKey) {
      const optionMap = {
        postIds: true,
      };
      if (!optionMap[formKey]) return;
      let options = [];
      if (formKey === "postIds") {
        options = this.postOptions.map((item) => ({ value: item.postId }));
      } else {
        options = this.$CONST[optionMap[formKey]]();
      }
      if (this.formData[formKey]?.length === options.length) {
        this.formData[formKey] = [];
        return;
      }
      this.formData[formKey] = options.map((item) => item.value);
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
      const id = this.editInfo?.userId || "";
      const query = {
        ...this.formData,
        roleIds: this.formData?.roleIds?.length
          ? this.formData.roleIds
          : this.formData?.roleIds
          ? [this.formData?.roleIds]
          : [],
      };

      const [, res] = await this.$http.AccountRoleManage[
        id ? "UpdateUser" : "AddUser"
      ]({ ...query });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || `${id ? "编辑" : "新增"}账号${res ? "成功" : "失败"}`
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

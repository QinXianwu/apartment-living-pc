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
      v-loading="isLoadingMenu"
    >
      <el-form-item
        label="上级部门"
        prop="parentId"
        v-if="formData.parentId !== 0"
      >
        <el-cascader
          class="input-medium"
          :options="menuOptions"
          placeholder="选择上级部门"
          :show-all-levels="false"
          :disabled="isAddSubMenu"
          v-model="formData.parentId"
          v-loading="isLoadingDeptOptions"
          :props="{
            value: 'deptId',
            label: 'deptName',
            checkStrictly: true,
            emitPath: false,
          }"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="部门名称" prop="deptName">
        <el-input
          class="input-medium"
          v-model="formData.deptName"
          placeholder="请输入部门名称"
        />
      </el-form-item>
      <el-form-item label="显示排序" prop="orderNum">
        <el-input-number
          :min="0"
          class="input-medium"
          controls-position="right"
          placeholder="请输入显示排序"
          v-model="formData.orderNum"
        />
      </el-form-item>
      <el-form-item label="部门状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio
            v-for="item in $CONST.MENU_STATE_OPTIONS()"
            :key="item.value"
            :label="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号码:" prop="phonenumber">
        <el-input
          class="input-medium"
          v-model="formData.phonenumber"
          placeholder="请输入手机号码"
        />
      </el-form-item>
      <el-form-item label="邮箱地址" prop="email">
        <el-input
          class="input-medium"
          v-model="formData.email"
          placeholder="请输入邮箱地址"
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
import { handleTree } from "@/utils";
import dialogMixin from "@/mixins/dialogMixin";

export default {
  name: "UpdateDeptDiaog",
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
        this.getDeptOptions();
        this.getDeptInfo();
      }
    },
  },
  data() {
    return {
      formData: {},
      allocationName: "",
      menuOptions: [],
      isLoading: false,
      isAddSubMenu: false,
      isLoadingMenu: false,
      isLoadingDeptOptions: false,
      rules: {
        parentId: [
          { required: true, message: "请选择上级部门", trigger: "blur" },
        ],
        deptName: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
        ],
        orderNum: [
          { required: true, message: "请输入部门顺序", trigger: "blur" },
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        phonenumber: [
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
    dialogTitle({ editInfo, isAddSubMenu }) {
      const title = isAddSubMenu
        ? "新增子"
        : editInfo?.deptId
        ? "编辑"
        : "新增";
      return `${title}部门`;
    },
  },
  methods: {
    init() {
      const parentId = this.editInfo?.parentId || "";
      // 是否为新增子部门
      this.isAddSubMenu =
        typeof parentId === "number" && !this.editInfo?.deptId;
      this.formData = {
        parentId: this.editInfo?.parentId || "",
        status: this.$CONST.DEPT_STATE.ON,
      };
    },
    async getDeptOptions() {
      if (this.isLoadingDeptOptions) return;
      this.isLoadingDeptOptions = true;
      const query = {};
      if (this.editInfo?.deptId) query.deptId = this.editInfo.deptId;
      const [, res] = await this.$http.DepartmentPostManage[
        this.editInfo?.deptId
          ? "GetDepartmentExcludeChildList"
          : "GetDepartmentList"
      ](query);
      this.isLoadingDeptOptions = false;
      this.menuOptions = res?.length ? handleTree(res, "deptId") : [];
    },
    async getDeptInfo() {
      if (this.isLoadingMenu || !this.editInfo?.deptId) return;
      this.isLoadingMenu = true;
      const [, res] = await this.$http.DepartmentPostManage.GetDepartmentInfo({
        deptId: this.editInfo?.deptId || "",
      });
      this.isLoadingMenu = false;
      if (!res) {
        this.$message.error(res?.msg || "获取部门信息异常");
        return;
      }
      this.formData = { ...res };
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
      const id = this.editInfo?.deptId || "";
      const query = { ...this.formData };
      const [, res] = await this.$http.DepartmentPostManage[
        id ? "UpdateDepartment" : "AddDepartment"
      ]({ ...query });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || `${id ? "编辑" : "新增"}部门${res ? "成功" : "失败"}`
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
  padding: 0 20px 5px;
  text-align: right;
}
</style>

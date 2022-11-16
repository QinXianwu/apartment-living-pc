<template>
  <el-dialog
    :title="`分配${
      Number(editInfo && editInfo.parentAccountId) ? '子账号' : '账号'
    }权限`"
    :visible.sync="visible"
    width="550px"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="150px">
      <el-form-item label="登录账号:" prop="account">
        <el-input :disabled="true" v-model="formData.account"></el-input>
      </el-form-item>
      <el-form-item
        label="所属账号:"
        prop="parentAccount"
        v-if="Number(editInfo && editInfo.parentAccountId)"
      >
        <el-input :disabled="true" v-model="formData.parentAccount"></el-input>
      </el-form-item>
      <el-form-item label="所属角色:" prop="roleId">
        <el-select v-model="formData.roleId">
          <el-option
            v-for="(item, index) in accountByRoleOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
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
import dialogMixin from "@/mixins/dialogMixin";
import { mapGetters } from "vuex";
export default {
  name: "SelectRoleDiaog",
  mixins: [dialogMixin],
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      if (val && this.editInfo?.id) {
        this.formData = { ...this.editInfo };
      } else {
        this.formData = {};
      }
    },
  },
  data() {
    return {
      formData: {},
      isLoading: false,
      rules: {
        roleId: [
          {
            required: true,
            message: "请选择所属角色",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      accountByRoleOptions: "accountRoleManage/accountByRoleOptions",
    }),
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
      const id = this.editInfo?.id || "";
      const query = { userId: id, roles: [this.formData.roleId] };
      const pointSaleId = this.formData.pointSaleId
        ? [Number(this.formData.pointSaleId)]
        : [];
      query.pointSaleId = JSON.stringify(pointSaleId);
      const [, res] =
        await this.$http.AccountRoleManage.AccountDistributionRole({
          ...query,
        });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || `分配账号权限${res ? "成功" : "失败"}`
      );
      if (res) this.handleClose(true);
    },
  },
};
</script>
<style lang="scss" scoped></style>

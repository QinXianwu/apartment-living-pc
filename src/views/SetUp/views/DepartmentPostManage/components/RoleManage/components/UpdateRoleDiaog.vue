<template>
  <el-dialog
    :title="`${editInfo && editInfo.roleId ? '编辑' : '新增'}角色`"
    :visible.sync="visible"
    width="650px"
    @close="handleClose(false)"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="150px"
      v-loading="isLoadingRole"
    >
      <el-form-item label="角色名称:" prop="roleName">
        <el-input
          class="input-medium"
          v-model="formData.roleName"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="roleKey">
        <span slot="label">
          <el-tooltip
            content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)"
            placement="top"
          >
            <i class="el-icon-question"></i>
          </el-tooltip>
          权限字符
        </span>
        <el-input
          v-model="formData.roleKey"
          placeholder="请输入权限字符"
          class="input-medium"
        />
      </el-form-item>
      <el-form-item label="角色顺序" prop="roleSort">
        <el-input-number
          v-model="formData.roleSort"
          controls-position="right"
          class="input-medium"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          clearable
          class="input-medium"
          placeholder="角色状态"
          v-model="formData.status"
        >
          <el-option
            v-for="item in $CONST.ROLE_STATE_OPTIONS()"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="菜单权限">
        <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand"
          >展开/折叠</el-checkbox
        >
        <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll"
          >全选/全不选</el-checkbox
        >
        <el-checkbox
          v-model="formData.menuCheckStrictly"
          @change="handleCheckedTreeConnect"
          >父子联动</el-checkbox
        >
        <el-tree
          class="tree-border input-medium"
          :data="formMenuOptions"
          show-checkbox
          ref="MenuTree"
          node-key="id"
          :check-strictly="!formData.menuCheckStrictly"
          :props="defaultProps"
          v-loading="isLoadingPermission"
        ></el-tree>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          class="input-medium"
          placeholder="请输入内容"
          v-model="formData.remark"
        ></el-input>
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
import { mapState } from "vuex";
export default {
  name: "UpdatePayAccountDiaog",
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
        this.getUserInfo();
        this.getRoleByMenuPermission();
        this.$store.dispatch("accountRoleManage/GetMenuTreeListAction");
      }
    },
  },
  data() {
    return {
      formData: {},
      isLoading: false,
      isLoadingRole: false,
      isLoadingPermission: false,
      menuExpand: false, // 展开/折叠
      menuNodeAll: false, // 全选/全不选
      menuOptions: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      rules: {
        roleName: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur",
          },
        ],
        roleKey: [
          {
            required: true,
            message: "请输入权限字符",
            trigger: "blur",
          },
        ],
        roleSort: [
          {
            required: true,
            message: "请输入角色顺序",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      menuTreeList: (state) => state.accountRoleManage.menuTreeList,
    }),
    formMenuOptions({ editInfo, menuOptions, menuTreeList }) {
      return editInfo?.roleId ? menuOptions : menuTreeList;
    },
  },
  mounted() {
    //
  },
  methods: {
    init() {
      this.formData = {
        status: "0",
        menuIds: [],
        deptIds: [],
        menuCheckStrictly: true,
      };
    },
    // 获取角色详情
    async getUserInfo() {
      if (this.isLoadingRole || !this.editInfo?.roleId) return;
      this.isLoadingRole = true;
      const [, res] = await this.$http.AccountRoleManage.GetRoleDetail({
        roleId: this.editInfo?.roleId || "",
      });
      this.isLoadingRole = false;
      if (!res) return this.$message.error(res?.msg || "获取角色信息异常");
      this.formData = { ...this.formData, ...res };
    },
    // 获取角色下的菜单权限
    async getRoleByMenuPermission() {
      if (this.isLoadingPermission || !this.editInfo?.roleId) return;
      this.isLoadingPermission = true;
      const [, res] = await this.$http.AccountRoleManage.GetRoleByMenuTree({
        roleId: this.editInfo?.roleId || "",
      });
      this.isLoadingPermission = false;
      if (res?.code !== this.AJAX_CODE.SUCCESS)
        return this.$message.error(res?.msg || "获取角色菜单权限异常");
      this.menuOptions = res?.menus?.length ? res.menus : [];
      const checkedKeys = res?.checkedKeys?.length ? res.checkedKeys : [];
      checkedKeys.forEach((v) => {
        this.$nextTick(() => {
          this.$refs.MenuTree.setChecked(v, true, false);
        });
      });
    },
    // 树权限（展开/折叠）
    handleCheckedTreeExpand(value) {
      this.formMenuOptions.map((item) => {
        this.$refs.MenuTree.store.nodesMap[item.id].expanded = value;
      });
    },
    // 树权限（全选/全不选）
    handleCheckedTreeNodeAll(value) {
      this.$refs.MenuTree.setCheckedNodes(value ? this.formMenuOptions : []);
    },
    // 树权限（父子联动）
    handleCheckedTreeConnect(value) {
      this.formData.menuCheckStrictly = value ? true : false;
    },
    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.MenuTree.getCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.MenuTree.getHalfCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
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
      const id = this.editInfo?.roleId || "";
      this.formData.menuIds = this.getMenuAllCheckedKeys();
      const [, res] = await this.$http.AccountRoleManage[
        id ? "UpdateRole" : "AddRole"
      ]({ ...this.formData });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || `${id ? "编辑" : "新增"}角色${res ? "成功" : "失败"}`
      );
      if (res) {
        this.isLoading = false;
        this.handleClose(true);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.tree-border {
  margin-top: 5px;
  border: 1px solid #e5e6e7;
  background: #ffffff none;
  border-radius: 4px;
}
</style>

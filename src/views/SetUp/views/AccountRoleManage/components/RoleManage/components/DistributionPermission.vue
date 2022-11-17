<template>
  <el-dialog
    title="分配角色权限"
    width="550px"
    :visible.sync="visible"
    append-to-body
    @close="handleClose(false)"
  >
    <div class="tree">
      <el-form ref="form" label-width="80px">
        <el-form-item label="角色名称:">
          <span>{{ (editInfo && editInfo.name) || "-" }}</span>
        </el-form-item>
        <el-form-item label="角色权限:">
          <el-tree
            ref="tree"
            v-loading="loadingTree"
            show-checkbox
            node-key="nodeKey"
            :data="permissionTree"
            :default-expanded-keys="defaultChecked"
            :default-checked-keys="defaultChecked"
            :props="defaultProps"
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
import dialogMixin from "@/mixins/dialogMixin";
export default {
  name: "DistributionPermission",
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
      if (val && this.editInfo?.id) {
        this.getRolePermission();
      }
    },
    permissionTree(val) {
      console.log(val);
    },
  },
  computed: {
    defaultChecked({ permissionList }) {
      if (!permissionList?.length) return [];
      const checkedArr = [];
      permissionList.map((item, index) => {
        if (item.isContain) checkedArr.push(`${item.id}-${index}`);
        item.subordinate.forEach((secondItem, index) => {
          if (secondItem.isContain)
            checkedArr.push(`${secondItem.id}-${index}`);
        });
      });
      return checkedArr;
    },
    permissionTree({ permissionList }) {
      if (!permissionList?.length) return [];
      return permissionList.map((item, index) => {
        const first_options = {
          id: item.id,
          label: item.tag,
          value: item.id,
          isContain: item.isContain,
          nodeKey: `${item.id}-${index}`,
        };
        if (!item.subordinate?.length) return first_options;
        first_options.subordinate = [];
        item.subordinate.forEach((secondItem, index) => {
          const second_options = {
            id: secondItem.id,
            label: secondItem.tag,
            value: secondItem.id,
            isContain: item.isContain,
            nodeKey: `${secondItem.id}-${index}`,
          };
          first_options.subordinate.push(second_options);
        });
        return first_options;
      });
    },
    // 选中之后权限ID
    permissionDataIds({ selectPermissionData, permissionTree }) {
      const treeMap = {};
      if (!permissionTree?.length) return [];
      permissionTree.map((item) => {
        treeMap[item.id] = [];
        item.subordinate.forEach((subItem) => {
          const curData = selectPermissionData.find(
            (ele) => ele === subItem.nodeKey
          );
          if (curData) treeMap[item.id].push(subItem.id);
        });
      });
      console.log(treeMap);
      const ids = [];
      for (const key in treeMap) {
        if (treeMap[key]?.length) ids.push(key, ...treeMap[key]);
      }
      return ids;
    },
  },
  data() {
    return {
      selectPermissionData: [],
      permissionList: [],
      defaultProps: {
        label: "label",
        children: "subordinate",
      },
      loadingTree: false,
      isLoading: false,
    };
  },
  mounted() {
    //
  },
  methods: {
    // 获取角色权限
    async getRolePermission() {
      this.loadingTree = true;
      const [, res] = await this.$http.AccountRoleManage.GetRolePermissionList({
        id: this.editInfo.id,
      });
      console.log(res);
      this.loadingTree = false;
      this.permissionList = res?.length ? res : [];
    },
    getCheckedKeys() {
      this.selectPermissionData = this.$refs.tree.getCheckedKeys();
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys(["1583002528687493121-1"]);
    },
    // 处理提交
    async handleSubmit() {
      if (!this.editInfo.id) return this.$message.error("获取该角色ID异常");
      this.getCheckedKeys();
      this.isLoading = true;
      const [, res] = await this.$http.AccountRoleManage.UpdateRolePermission({
        resourceIds: this.permissionDataIds,
        roleId: this.editInfo.id,
      });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || `分配角色权限${res ? "成功" : "失败"}`
      );
      if (res) {
        this.handleClose(false);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>

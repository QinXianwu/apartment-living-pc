<template>
  <div class="AlibabaPay">
    <div class="action">
      <el-button type="primary" @click="handleAdd"> 新增角色 </el-button>
    </div>
    <TablePanel :tableData="list" :tableHead="column">
      <!-- 操作 -->
      <template #action="{ scope }">
        <div class="action-groud">
          <el-button type="text" @click="handleEdit(scope)"> 编辑 </el-button>
          <el-button type="text" @click="handlePermission(scope)">
            分配权限
          </el-button>
          <el-button type="text" @click="handleDelete(scope)"> 删除 </el-button>
        </div>
      </template>
    </TablePanel>
    <!-- 分页 -->
    <Pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="page.size"
      :current-page="page.current"
      :total="total"
    />
    <!-- 编辑/新增角色 -->
    <UpdateRoleDiaog
      :editInfo="editInfo"
      :show.sync="showUpdateRole"
      @close="close"
    />
    <!-- 分配权限 -->
    <DistributionPermission
      :editInfo="editInfo"
      :show.sync="showUpdatePermission"
      @close="close"
    />
  </div>
</template>

<script>
import { column } from "./config";
import UpdateRoleDiaog from "./components/UpdateRoleDiaog.vue";
import DistributionPermission from "./components/DistributionPermission.vue";

export default {
  name: "AlibabaPay",
  components: { UpdateRoleDiaog, DistributionPermission },
  data() {
    return {
      column, //表格头
      list: [],
      editInfo: "",
      showUpdateRole: false,
      showUpdatePermission: false,
      page: {
        size: 10,
        current: 1,
      },
      query: {},
      total: 0,
      rules: [], //过滤规则
    };
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      this.page.size = val;
      this.page.current = 1;
      this.getList(true);
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getList(false);
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showUpdateRole = false;
      this.showUpdatePermission = false;
      if (isRefresh) this.getList();
    },
    handleAdd() {
      this.editInfo = "";
      this.showUpdateRole = true;
    },
    handleEdit(item) {
      this.editInfo = item;
      this.showUpdateRole = true;
    },
    handlePermission(item) {
      this.editInfo = item;
      this.showUpdatePermission = true;
    },
    async handleDelete({ id }) {
      if (!id) return this.$message.error("获取不到当前角色ID");
      try {
        await this.$confirm("确定要删除当前角色吗?", "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [err] = await this.$http.AccountRoleManage.DeleteRole({ id });
        let msg = err ? err.Message : "删除成功";
        this.$confirm(msg, "删除提示", {
          showClose: false,
          showCancelButton: false,
          type: !err ? "success" : "error",
        }).then(() => {
          if (!err) {
            this.getList();
            this.$store.dispatch(
              "accountRoleManage/GetPointSaleListAction",
              true
            );
          }
        });
      } catch (error) {
        error;
      }
    },
    async getList(isClear) {
      if (isClear) this.page.current = 1;
      const query = {
        ...this.page,
        paramData: { ...this.query },
      };
      const [, res] = await this.$http.AccountRoleManage.GetRoleList(query);
      this.list = res?.list?.length ? res.list : [];
      this.total = res.total;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.action {
  padding: 0 0 15px;
}
</style>

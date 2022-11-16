<template>
  <div class="UserManagement">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <div class="action">
        <el-button type="primary" @click="handleAdd"> 新增账号 </el-button>
      </div>
      <TablePanel :tableData="list" :tableHead="column">
        <template #parentAccount="{ scope }">
          <span>{{ scope.parentAccount || "-" }}</span>
        </template>
        <template #roleName="{ scope }">
          <span>{{ scope.roleName || "-" }}</span>
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleEdit(scope)"> 编辑 </el-button>
            <el-button
              type="text"
              @click="handleAddSub(scope)"
              v-if="!Number(scope.parentAccountId)"
            >
              新增子账号
            </el-button>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link more"> 更多 </span>
              <el-dropdown-menu
                slot="dropdown"
                style="min-width: 100px; text-align: center"
              >
                <el-dropdown-item>
                  <div @click.stop="handleSelectRole(scope)">
                    <span>分配账号权限</span>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click.stop="handleUpdatePassword(scope)">
                    <span>修改账号密码</span>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div class="delete" @click.stop="handleDelete(scope)">
                    <span>删除</span>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
    </div>
    <UpdateAcconutDiaog
      :editInfo="editInfo"
      :show.sync="isUpdateAccount"
      @close="close"
    />
    <SelectRoleDiaog
      :editInfo="editInfo"
      :show.sync="isSelectRole"
      @close="close"
    />
    <UpdatePasswordDiaog
      :editInfo="editInfo"
      :show.sync="isUpdatePassword"
      @close="close"
    />
  </div>
</template>

<script>
import { column, formData } from "./config";
import SelectRoleDiaog from "./components/SelectRoleDiaog.vue";
import UpdateAcconutDiaog from "./components/UpdateAcconutDiaog.vue";
import UpdatePasswordDiaog from "./components/UpdatePasswordDiaog.vue";
export default {
  name: "UserManagement",
  components: { SelectRoleDiaog, UpdateAcconutDiaog, UpdatePasswordDiaog },
  data() {
    return {
      formData,
      column, //表格头
      editInfo: "",
      isUpdateAccount: false,
      isSelectRole: false,
      isUpdatePassword: false,
      list: [],
      page: {
        size: 10,
        current: 1,
      },
      total: 0,
      query: {}, //过滤规则
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
    onSearch(data) {
      this.query = { ...data };
      this.getList(true);
    },
    handleAdd() {
      this.editInfo = "";
      this.isUpdateAccount = true;
    },
    handleAddSub(item) {
      console.log(item);
      if (!item?.id) return this.$message.error("获取该用户ID异常");
      this.editInfo = { pid: item.id, parentAccount: item.account };
      this.isUpdateAccount = true;
    },
    handleEdit(item) {
      this.editInfo = item;
      this.isUpdateAccount = true;
    },
    handleSelectRole(item) {
      this.editInfo = item;
      this.isSelectRole = true;
    },
    handleUpdatePassword(item) {
      this.editInfo = item;
      this.isUpdatePassword = true;
    },
    async handleDelete({ id }) {
      if (!id) return this.$message.error("获取该用户ID异常");
      try {
        await this.$confirm("确定要删除该账号吗?", "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [err] = await this.$http.AccountRoleManage.DeleteAccount({ id });
        let msg = err ? err.Message : "删除成功";
        this.$confirm(msg, "删除提示", {
          showClose: false,
          showCancelButton: false,
          type: !err ? "success" : "error",
        }).then(() => {
          if (!err) this.getList();
        });
      } catch (error) {
        error;
      }
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.isUpdateAccount = false;
      this.isSelectRole = false;
      if (isRefresh) this.getList();
    },
    async getList(isClear) {
      if (isClear) this.page.page = 1;
      const query = {
        ...this.page,
        paramData: { ...this.query },
      };
      const [, res] = await this.$http.AccountRoleManage.GetAccountList(query);
      this.list = res?.list || [];
      this.total = res?.total || 0;
    },
  },
  mounted() {
    this.getList();
    this.$store.dispatch("accountRoleManage/GetPointSaleListAction");
  },
};
</script>
<style lang="scss" scoped>
.action {
  padding: 10px 0 15px;
}
.action-groud {
  .more {
    color: $menuActiveText;
    cursor: pointer;
  }
}
</style>

<template>
  <div class="UserManage">
    <div class="content">
      <SearchForm
        isShowExport
        isReturnFormData
        :formData="formData"
        @on-search="onSearch"
        @on-export="onExport"
      >
        <template #buttonRright>
          <el-button @click="onImport">导入</el-button>
        </template>
      </SearchForm>
      <div class="action">
        <el-button type="primary" @click="handleAdd"> 新增用户 </el-button>
      </div>
      <TablePanel :tableData="list" :tableHead="column">
        <template #deptName="{ scope }">
          <span>{{ (scope.dept && scope.dept.deptName) || "-" }}</span>
        </template>
        <template #status="{ scope }">
          <el-switch
            v-model="scope.status"
            :active-value="$CONST.USER_STATE.ON"
            :inactive-value="$CONST.USER_STATE.OFF"
            @change="handleStatusChange(scope)"
          >
          </el-switch>
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud" v-if="scope.userId !== 1">
            <el-button type="text" @click="handleEdit(scope)"> 编辑 </el-button>
            <el-button type="text" @click="handleDelete(scope)">
              删除
            </el-button>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link more"> 更多 </span>
              <el-dropdown-menu
                slot="dropdown"
                style="min-width: 100px; text-align: center"
              >
                <el-dropdown-item>
                  <div @click.stop="handleUpdatePassword(scope)">
                    <span>修改账号密码</span>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click.stop="handleAssignRole(scope)">
                    <span>分配角色</span>
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
        :page-size="page.pageSize"
        :current-page="page.pageNum"
        :total="total"
      />
    </div>
    <UpdateAcconutDiaog
      :editInfo="editInfo"
      :show.sync="isUpdateAccount"
      @close="close"
    />
    <UpdatePasswordDiaog
      :editInfo="editInfo"
      :show.sync="isUpdatePassword"
      @close="close"
    />
    <AssignRoleListDiaog
      :editInfo="editInfo"
      :show.sync="isAssignRole"
      @close="close"
    />
    <ImportUserDiaog :show.sync="isImportUser" @close="close" />
  </div>
</template>

<script>
import { column, formData } from "./config";
import downloadFilelMixin from "@/mixins/downloadFilelMixin";
import ImportUserDiaog from "./components/ImportUserDiaog.vue";
import UpdateAcconutDiaog from "./components/UpdateAcconutDiaog.vue";
import UpdatePasswordDiaog from "./components/UpdatePasswordDiaog.vue";
import AssignRoleListDiaog from "./components/AssignRoleListDiaog.vue";

export default {
  name: "UserManage",
  mixins: [downloadFilelMixin],
  components: {
    ImportUserDiaog,
    UpdateAcconutDiaog,
    UpdatePasswordDiaog,
    AssignRoleListDiaog,
  },
  data() {
    return {
      formData,
      column, //表格头
      editInfo: "",
      isUpdateAccount: false,
      isUpdatePassword: false,
      isImportUser: false,
      isExporting: false,
      isAssignRole: false,
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      query: {}, //过滤规则
    };
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
      this.getList(true);
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getList(false);
    },
    onSearch(data) {
      this.query = { ...data };
      if (data?.createDate?.length) {
        this.query.params = {};
        this.query.params["beginTime"] = data.createDate[0];
        this.query.params["endTime"] = data.createDate[1];
        delete this.query.createDate;
      }
      this.getList(true);
    },
    async onExport(data) {
      if (this.isExporting) return false;
      const query = { ...data };
      if (data?.createDate?.length) {
        query.params = {};
        query.params["beginTime"] = data.createDate[0];
        query.params["endTime"] = data.createDate[1];
        delete query.createDate;
      }
      this.isExporting = true;
      const [, res] = await this.$http.ExportImport.ExportUserList({
        ...this.page,
        ...this.query,
      });
      this.isExporting = false;
      if (!res) return this.$message.error("导出失败");
      this.onExportDownloadFile({
        data: res,
        tipText: "导出成功，是否进行下载？",
        fileName: "用户列表",
      });
    },
    async onImport() {
      this.isImportUser = true;
    },
    handleAdd() {
      this.editInfo = "";
      this.isUpdateAccount = true;
    },
    handleEdit(item) {
      this.editInfo = item;
      this.isUpdateAccount = true;
    },
    async handleStatusChange(item) {
      const tipText =
        item?.status === this.$CONST.USER_STATE.ON ? "启用" : "停用";
      try {
        await this.$confirm(`确定要${tipText}该用户吗?`, tipText, {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.AccountRoleManage.UpdateUserStatus({
          userId: item?.userId || "",
          status: item?.status,
        });
        const msg = res ? res?.msg || `${tipText}成功` : `${tipText}失败`;
        this.$confirm(msg, "删除提示", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) this.getList();
          else {
            item.status =
              item?.status === this.$CONST.USER_STATE.ON
                ? this.$CONST.USER_STATE.OFF
                : this.$CONST.USER_STATE.ON;
          }
        });
      } catch (error) {
        item.status =
          item?.status === this.$CONST.USER_STATE.ON
            ? this.$CONST.USER_STATE.OFF
            : this.$CONST.USER_STATE.ON;
        console.error(error);
      }
    },
    handleUpdatePassword(item) {
      this.editInfo = item;
      this.isUpdatePassword = true;
    },
    handleAssignRole(item) {
      this.editInfo = item;
      this.isAssignRole = true;
    },
    async handleDelete({ userId }) {
      try {
        await this.$confirm("确定要删除该账号吗?", "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.AccountRoleManage.DeleteUser({
          userId,
        });
        const msg = res ? res?.msg || `删除成功` : `删除失败`;
        this.$confirm(msg, "删除提示", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) this.getList();
        });
      } catch (error) {
        console.error(error);
        error;
      }
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.isUpdateAccount = false;
      this.isSelectRole = false;
      this.isImportUser = false;
      this.isAssignRole = false;
      if (isRefresh) this.getList();
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.AccountRoleManage.GetUserList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取用户列表异常");
      }
      this.list = res?.rows || [];
      this.total = res?.total || 0;
    },
  },
  mounted() {
    this.getList();
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

<template>
  <div class="RoleManage">
    <SearchForm
      isShowExport
      isReturnFormData
      :formData="formData"
      @on-search="onSearch"
      @on-export="onExport"
    />
    <div class="action">
      <el-button type="primary" @click="handleAdd"> 新增角色 </el-button>
    </div>
    <TablePanel :tableData="list" :tableHead="column">
      <template #status="{ scope }">
        <el-switch
          v-model="scope.status"
          :active-value="$CONST.ROLE_STATE.ON"
          :inactive-value="$CONST.ROLE_STATE.OFF"
          @change="handleStatusChange(scope)"
        >
        </el-switch>
      </template>
      <!-- 操作 -->
      <template #action="{ scope }">
        <div class="action-groud" v-if="scope.roleId !== 1">
          <el-button
            type="text"
            v-if="isAction(scope)"
            @click="handleEdit(scope)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            v-if="isAction(scope)"
            @click="handleDelete(scope)"
          >
            删除
          </el-button>
          <el-button
            type="text"
            v-if="isAction(scope)"
            @click="handleAssignUsers(scope)"
          >
            分配用户
          </el-button>
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
    <!-- 编辑/新增角色 -->
    <UpdateRoleDiaog
      :editInfo="editInfo"
      :show.sync="showUpdateRole"
      @close="close"
    />
    <AddAssignUserDiaog
      :roleInfo="roleInfo"
      :show.sync="showAddAssignUser"
      @close="closeAssignUser"
    />
    <DrawerPopup v-model="showAssignUsers">
      <AssignUsersList
        @close="close"
        ref="AssignUsersList"
        @addAssignUser="handleAddAssignUser"
        :editInfo="editInfo"
        v-if="showAssignUsers"
      />
    </DrawerPopup>
  </div>
</template>

<script>
import { formData, column } from "./config";
import downloadFilelMixin from "@/mixins/downloadFilelMixin";
import UpdateRoleDiaog from "./components/UpdateRoleDiaog.vue";
import AssignUsersList from "./components/AssignUsersList.vue";
import AddAssignUserDiaog from "./components/AddAssignUserDiaog.vue";
import { mapGetters } from "vuex";

export default {
  name: "RoleManage",
  mixins: [downloadFilelMixin],
  components: { UpdateRoleDiaog, AssignUsersList, AddAssignUserDiaog },
  data() {
    return {
      formData,
      column, //表格头
      list: [],
      editInfo: "",
      roleInfo: "",
      isExporting: false,
      showUpdateRole: false,
      showAssignUsers: false,
      showAddAssignUser: false,
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      query: {},
      total: 0,
      rules: [], //过滤规则
    };
  },
  computed: {
    ...mapGetters({
      isAdmin: "user/isAdmin",
    }),
  },
  methods: {
    isAction(item) {
      return (
        this.isAdmin ||
        (item?.roleKey !== this.$CONST.ACCOUNT_TYPE.VENDOR &&
          item?.roleKey !== this.$CONST.ACCOUNT_TYPE.SERVICE)
      );
    },
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
      const [, res] = await this.$http.ExportImport.ExportRoleList({
        ...this.page,
        ...query,
      });
      this.isExporting = false;
      if (!res) return this.$message.error("导出失败");
      this.onExportDownloadFile({
        data: res,
        tipText: "导出成功，是否进行下载？",
        fileName: "角色列表",
      });
    },
    async handleStatusChange(item) {
      const tipText =
        item?.status === this.$CONST.ROLE_STATE.ON ? "启用" : "停用";
      try {
        await this.$confirm(`确定要${tipText}该角色吗?`, tipText, {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.AccountRoleManage.UpdateRoleStatus({
          roleId: item?.roleId || "",
          status: item?.status,
        });
        const msg = res ? res?.msg || `${tipText}成功` : `${tipText}失败`;
        this.$confirm(msg, "操作结果", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) this.getList();
          else {
            item.status =
              item?.status === this.$CONST.ROLE_STATE.ON
                ? this.$CONST.ROLE_STATE.OFF
                : this.$CONST.ROLE_STATE.ON;
          }
        });
      } catch (error) {
        item.status =
          item?.status === this.$CONST.ROLE_STATE.ON
            ? this.$CONST.ROLE_STATE.OFF
            : this.$CONST.ROLE_STATE.ON;
        console.error(error);
      }
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showUpdateRole = false;
      this.showAssignUsers = false;
      if (isRefresh) this.getList();
    },
    handleAdd() {
      this.editInfo = "";
      this.showUpdateRole = true;
    },
    handleEdit({ roleId }) {
      this.editInfo = { roleId };
      this.showUpdateRole = true;
    },
    handleAssignUsers({ roleId }) {
      this.editInfo = { roleId };
      this.showAssignUsers = true;
    },
    handleAddAssignUser(val) {
      this.roleInfo = val;
      this.showAddAssignUser = true;
    },
    closeAssignUser(val) {
      this.roleInfo = "";
      this.showAddAssignUser = false;
      if (val) this.$refs.AssignUsersList.getList();
    },
    async handleDelete({ roleId }) {
      if (!roleId) return this.$message.error("获取不到当前角色ID");
      try {
        await this.$confirm("确定要删除当前角色吗?", "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.AccountRoleManage.DeleteRole({
          roleId,
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
        error;
      }
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.AccountRoleManage.GetRoleList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取角色列表异常");
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
  padding: 0 0 15px;
}
</style>

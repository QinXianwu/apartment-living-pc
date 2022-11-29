<template>
  <div class="AssignUsersList">
    <div class="content">
      <SearchForm
        isReturnFormData
        :formData="AssignUsers_formData"
        @on-search="onSearch"
      />
      <div class="action">
        <el-button type="primary" @click="handleAdd"> 新增用户 </el-button>
        <el-button type="primary" @click="$emit('close')">返回</el-button>
      </div>
      <TablePanel :tableData="list" :tableHead="AssignUsers_column">
        <template #status="{ scope }">
          <el-tag
            :type="scope.status === $CONST.USER_STATE.OFF ? 'danger' : ''"
            >{{ $CONST.USER_STATE_TEXT[scope.status] }}</el-tag
          >
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleDelete(scope)">
              取消授权
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
    </div>
  </div>
</template>

<script>
import { AssignUsers_formData, AssignUsers_column } from "../config";

export default {
  name: "AssignUsersList",
  components: {},
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  data() {
    return {
      AssignUsers_formData,
      AssignUsers_column,
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
  mounted() {
    this.getList();
  },
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
      this.getList(true);
    },
    handleAdd() {
      this.$emit("addAssignUser", {
        roleId: this.editInfo.roleId,
      });
    },
    async handleDelete({ userId }) {
      try {
        await this.$confirm("确定要取消授权改该账号吗?", "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.AccountRoleManage.DeleteRoleByUser({
          userId,
          roleId: this.editInfo.roleId,
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
    async getList(isClear) {
      if (!this.editInfo?.roleId) return;
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
        roleId: this.editInfo.roleId,
      };
      const [, res] = await this.$http.AccountRoleManage.GetRoleByAllocatedList(
        query
      );
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取角色所分配的用户列表异常");
      }
      this.list = res?.rows || [];
      this.total = res?.total || 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.action {
  margin: 20px 0;
}
</style>

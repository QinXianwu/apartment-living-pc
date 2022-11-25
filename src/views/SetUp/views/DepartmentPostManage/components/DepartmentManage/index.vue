<template>
  <div class="DepartmentManage">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <div class="action">
        <el-button type="primary" @click="handleAdd"> 新增部门 </el-button>
        <el-button type="primary" @click="handleExpandAll" plain>
          {{ isExpandAll ? "折叠部门列表" : "展开部门列表" }}
        </el-button>
      </div>
      <TablePanel
        v-if="refreshTable"
        rowKey="deptId"
        :tableData="list"
        :tableHead="column"
        :isExpandAll="isExpandAll"
      >
        <template #status="{ scope }">
          <el-tag
            :type="scope.status === $CONST.DEPT_STATE.OFF ? 'danger' : ''"
            >{{ $CONST.DEPT_STATE_TEXT[scope.status] }}</el-tag
          >
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleEdit(scope)"> 编辑 </el-button>
            <el-button type="text" @click="handleDelete(scope)">
              删除
            </el-button>
            <el-button
              type="text"
              v-if="scope.status !== $CONST.DEPT_STATE.OFF"
              @click="handleSubAdd(scope)"
            >
              新增子部门
            </el-button>
          </div>
        </template>
      </TablePanel>
      <!-- 分页 -->
      <!-- <Pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="page.pageSize"
        :current-page="page.pageNum"
        :total="total"
      /> -->
    </div>
    <UpdateDeptDiaog
      :editInfo="editInfo"
      :show.sync="isUpdateDept"
      @close="close"
    />
  </div>
</template>

<script>
import { handleTree } from "@/utils";
import { column, formData } from "./config";
import UpdateDeptDiaog from "./components/UpdateDeptDiaog.vue";
export default {
  name: "DepartmentManage",
  components: { UpdateDeptDiaog },
  data() {
    return {
      formData,
      column, //表格头
      editInfo: "",
      isUpdateDept: false,
      isExpandAll: false,
      refreshTable: true, // 重新渲染表格状态
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
      this.getList(true);
    },
    handleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => (this.refreshTable = true));
    },
    handleAdd() {
      this.editInfo = "";
      this.isUpdateDept = true;
    },
    handleSubAdd({ deptId }) {
      this.editInfo = { parentId: deptId };
      this.isUpdateDept = true;
    },
    handleEdit({ deptId }) {
      this.editInfo = { deptId: deptId };
      this.isUpdateDept = true;
    },
    async handleDelete({ deptId }) {
      try {
        await this.$confirm("确定要删除该部门吗?", "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.DepartmentPostManage.DeleteDepartment({
          deptId,
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
      this.isUpdateDept = false;
      if (isRefresh) this.getList();
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        // ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.DepartmentPostManage.GetDepartmentList(
        query
      );
      this.list = res?.length ? handleTree(res, "deptId") : [];
      // this.total = res?.total || 0;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.view-container {
  background: #fff;
}
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

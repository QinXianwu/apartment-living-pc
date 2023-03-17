<template>
  <div class="PostManage">
    <SearchForm
      isShowExport
      isReturnFormData
      :formData="formData"
      @on-search="onSearch"
      @on-export="onExport"
    />
    <div class="action">
      <el-button type="primary" @click="handleAdd"> 新增岗位 </el-button>
    </div>
    <TablePanel :tableData="list" :tableHead="column">
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
    <!-- 编辑/新增岗位 -->
    <UpdatePostDiaog
      :editInfo="editInfo"
      :show.sync="showUpdatePost"
      @close="close"
    />
  </div>
</template>

<script>
import { formData, column } from "./config";
import downloadFilelMixin from "@/mixins/downloadFilelMixin";
import UpdatePostDiaog from "./components/UpdatePostDiaog.vue";

export default {
  name: "PostManage",
  mixins: [downloadFilelMixin],
  components: { UpdatePostDiaog },
  data() {
    return {
      formData,
      column, //表格头
      list: [],
      editInfo: "",
      isExporting: false,
      showUpdatePost: false,
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
    onSearch(data) {
      this.query = { ...data };
      this.getList(true);
    },
    async onExport(data) {
      if (this.isExporting) return false;
      const query = { ...data };
      this.isExporting = true;
      const [, res] = await this.$http.ExportImport.ExportPostList({
        ...this.page,
        ...query,
      });
      this.isExporting = false;
      if (!res) return this.$message.error("导出失败");
      this.onExportDownloadFile({
        data: res,
        tipText: "导出成功，是否进行下载？",
        fileName: "岗位列表",
      });
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showUpdatePost = false;
      if (isRefresh) this.getList();
    },
    handleAdd() {
      this.editInfo = "";
      this.showUpdatePost = true;
    },
    handleEdit({ postId }) {
      this.editInfo = { postId };
      this.showUpdatePost = true;
    },
    async handleDelete({ postId }) {
      if (!postId) return this.$message.error("获取不到当前岗位ID");
      try {
        await this.$confirm("确定要删除当前岗位吗?", "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.DepartmentPostManage.DeletePost({
          postId,
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
      if (isClear) this.page.current = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.DepartmentPostManage.GetPostList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取岗位列表异常");
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

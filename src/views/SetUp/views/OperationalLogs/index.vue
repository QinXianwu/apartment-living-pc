<template>
  <div class="OnlineUsers view-container">
    <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
    <TablePanel :tableData="list" :tableHead="column">
      <template #index="{ index }">
        {{ index + 1 }}
      </template>
      <!-- 操作 -->
      <template #action="{ scope }">
        <div class="action-groud">
          <el-button type="text" @click="handleDelete(scope)"> 强退 </el-button>
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
</template>

<script>
import { formData, column } from "./config";

export default {
  name: "OnlineUsers",
  components: {},
  data() {
    return {
      formData,
      column, //表格头
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      query: {},
      total: 0,
      rules: [], //过滤规则
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
    async handleDelete({ tokenId }) {
      try {
        await this.$confirm("确定要强制退出当前用户吗?", "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.SystemMonitoring.DeleteOnlineUser({
          tokenId: tokenId || "",
        });
        const msg = res ? res?.msg || `强制成功` : `强制失败`;
        this.$confirm(msg, "强制退出提示", {
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
      const [, res] = await this.$http.SystemMonitoring.GetOnlineUserList(
        query
      );
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取在线用户列表异常");
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
.view-container {
  background: #fff;
}
.action {
  padding: 0 0 15px;
}
</style>

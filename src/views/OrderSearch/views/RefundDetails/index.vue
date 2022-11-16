<template>
  <div class="view-container">
    <div class="content">
      <SearchForm
        isShowExport
        isReturnFormData
        :formData="formData"
        @on-search="onSearch"
        @on-export="onExport"
      />
      <TicketDetails />
      <div class="batch">
        <el-button type="primary">导出当前页</el-button>
        <el-button type="primary">导出当前条件全部</el-button>
      </div>
      <TablePanel :tableData="list" :tableHead="column">
        <!-- 操作 -->
        <template #action="{}">
          <div class="action-groud">
            <el-button type="text" @click="customerService"> 客服 </el-button>
          </div>
        </template>
      </TablePanel>
      <!-- 分页 -->
      <Pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="page.rows"
        :current-page="page.page"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import { column, formData } from "./config";
import TicketDetails from "./components/TicketDetails.vue";
export default {
  name: "RefundDetails",
  components: { TicketDetails },
  data() {
    return {
      formData,
      column, //表格头
      list: [],
      page: {
        rows: 10,
        page: 1,
      },
      total: 0,
      rules: [], //过滤规则
    };
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      this.page.rows = val;
      this.page.page = 1;
      // this.getList(true);
    },
    handleCurrentChange(val) {
      this.page.page = val;
      // this.getList(false);
    },
    onSearch(data) {
      console.log(data);
      this.rules = {};
      // this.getList(true);
    },
    // 导出
    async onExport() {
      if (this.isExporting) return false;
      this.isExporting = true;
      const res = true;
      // const [, res] = await this.$http.ExportImport.ExportWinExchange({
      //   ActCode: this.ActCode,
      //   ...this.searchQuery,
      // });
      this.isExporting = false;
      if (res) {
        try {
          await this.$confirm("导出成功，是否进行下载？", "导出提示", {
            confirmButtonText: "去下载",
            cancelButtonText: "取消",
            type: "success",
          });
          console.log("去下载");
          // 去下载
          // this.$router.push({ name: "ExportList" });
        } catch (e) {
          e;
        }
      }
    },
    customerService() {
      console.log("客服");
    },
    async getList(isClear) {
      if (isClear) this.page.page = 1;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.view-container {
  background-color: #fff;
}
.bulk-operations {
  padding: 10px 0;
}
.batch {
  padding: 10px 0;
}
</style>

<template>
  <div class="view-container">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <Orther />
      <div class="bulk-operations">
        <el-button type="primary" @click="onExportExcel">导出Excel</el-button>
        <el-button type="primary" @click="onExportCredential"
          >导出证件</el-button
        >
        <el-button type="primary" @click="onOneImport">一键导入</el-button>
        <span class="ml-10">
          <el-button type="primary" @click="onUnableBuyTickets"
            >无法购票</el-button
          >
          <el-tooltip
            effect="dark"
            content="若遇到紧急情况无法退票，可先勾选车票，再点击无法退票按钮进行操作"
            placement="right"
          >
            <span>
              <i class="el-icon-question ml-10"></i>
            </span>
          </el-tooltip>
        </span>
      </div>
      <TablePanel :tableData="list" :tableHead="column">
        <template #fromToStationName="{ scope }">
          <span>
            {{ scope.departStation - scope.arrivalStation }}
          </span>
        </template>
        <!-- 操作 -->
        <template #action="{}">
          <div class="action-groud">
            <el-button type="text" @click="handleAction">
              <span>审核通过</span>
            </el-button>
            <el-button type="text" @click="handleAction">
              <span>审核失败</span>
            </el-button>
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
  </div>
</template>

<script>
import { column, formData } from "./config";
import Orther from "./components/Orther.vue";
export default {
  name: "ReadyMoney",
  components: { Orther },
  data() {
    return {
      formData,
      column, //表格头
      list: [],
      page: {
        current: 1,
        size: 10,
      },
      query: {},
      total: 0,
      ticketInfo: {},
      isLoading: false,
      isExporting: false,
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
      // console.log(data);
      this.query = { ...data };
      if (data?.ticketDate?.length) {
        this.query.departStartTime = data.ticketDate[0];
        this.query.departEndTime = data.ticketDate[1];
      }
      delete this.query.ticketDate;
      this.getList(true);
    },
    onExportExcel() {
      console.log("onExportExcel");
    },
    onExportCredential() {
      console.log("onExportCredential");
    },
    onOneImport() {
      console.log("onOneImport");
    },
    onUnableBuyTickets() {
      console.log("onUnableBuyTickets");
    },
    handleAction() {
      console.log("操作");
    },
    async getList(isClear) {
      if (this.isLoading) return;
      if (isClear) this.page.current = 1;
      this.isLoading = true;
      const [, res] = await this.$http.OrderRefund.GetTicketingRefundCashList({
        ...this.page,
        paramData: { ...this.query },
      });
      this.isLoading = false;
      this.list = res?.list || [];
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
  background-color: #fff;
}
.bulk-operations {
  padding: 10px 0;
}
</style>

<template>
  <div class="view-container">
    <div class="content">
      <SearchForm
        isShowExport
        isReturnFormData
        :formData="queryFormData"
        @on-search="onSearch"
        @on-export="onExport"
      />
      <TicketDetails :ticketInfo="ticketInfo" />
      <TablePanel :tableData="list" :tableHead="column" />
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
import { mapGetters } from "vuex";
import { column, formData } from "./config";
import { DownloadFile } from "@/utils/index";
import TicketDetails from "./components/TicketDetails.vue";
export default {
  name: "Refund",
  components: { TicketDetails },
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
  computed: {
    ...mapGetters({
      pointSaleOptions: "agent/pointSaleOptions",
    }),
    queryFormData({ formData, pointSaleOptions }) {
      const data = [...formData];
      const item = data.find((item) => item.prop === "code");
      if (item) item.options = pointSaleOptions;
      return data;
    },
  },
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
      this.getTicketingRefundInfo({ code: data?.code || "" });
      this.query = { ...data };
      if (data?.refundTicketDate?.length) {
        this.query.refundTicketStartTime = data.refundTicketDate[0];
        this.query.refundTicketEndTime = data.refundTicketDate[1];
      }
      delete this.query.refundTicketDate;
      this.getList(true);
    },
    // 导出
    async onExport(data) {
      if (this.isExporting) return false;
      const query = { ...data };
      if (data?.refundTicketDate?.length) {
        this.query.refundTicketStartTime = data.refundTicketDate[0];
        this.query.refundTicketEndTime = data.refundTicketDate[1];
      }
      delete query.refundTicketDate;
      this.isExporting = true;
      const [, res] = await this.$http.ExportImport.ExportRefundTicket({
        size: -1,
        current: 1,
        paramData: { ...query },
      });
      this.isExporting = false;
      if (!res) return this.$message.error("导出失败");
      try {
        await this.$confirm("导出成功，是否进行下载？", "导出提示", {
          confirmButtonText: "去下载",
          cancelButtonText: "取消",
          type: "success",
        });
        const fileName = this.$options.filters.formatDate(
          Date.now(),
          "yyyy-MM-dd hh:mm:ss"
        );
        DownloadFile({
          data: res,
          FileName: "退票_" + fileName,
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8 ",
        });
      } catch (e) {
        // e;
      }
    },
    async getList(isClear) {
      if (this.isLoading) return;
      if (isClear) this.page.current = 1;
      this.isLoading = true;
      const [, res] = await this.$http.OrderQuery.GetTicketRefundList({
        ...this.page,
        paramData: { ...this.query },
      });
      this.isLoading = false;
      this.list = res?.list || [];
      this.total = res?.total || 0;
    },
    async getTicketingRefundInfo({ code }) {
      if (!code) return (this.ticketInfo = {});
      const [, res] = await this.$http.OrderQuery.GetTicketRefundDetail({
        code,
      });
      this.ticketInfo = res ? res : {};
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

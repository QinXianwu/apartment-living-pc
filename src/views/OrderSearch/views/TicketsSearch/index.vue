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
      <TablePanel :tableData="list" :tableHead="column" expand>
        <template #departTime="{ scope }">
          <span class="text-html">{{ scope.departTime }}</span>
        </template>
        <template #trainNumber="{ scope }">
          <span class="text-html">{{ scope.trainNumber }}</span>
        </template>
        <template #fromToStationName="{ scope }">
          <span class="text-html">{{ scope.fromToStationName }}</span>
        </template>
        <template #ticketCount="{ scope }">
          <span class="text-html">{{ scope.ticketCount }}</span>
        </template>
        <template #orderDate="{ scope }">
          <span class="text-html">{{ scope.handleTime }}</span>
        </template>
        <!-- 展开行-订单详情 -->
        <template #expand="{ scope }">
          <ExpandTicketDetails :ticketingId="scope.id" />
        </template>
        <!-- 操作 -->
        <template #action="{}">
          <div class="action-groud">
            <el-button type="text" @click="sendMessage"> 发送通知 </el-button>
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
import { mapGetters } from "vuex";
import { column, formData } from "./config";
import { DownloadFile } from "@/utils/index";
import TicketDetails from "./components/TicketDetails.vue";
import ExpandTicketDetails from "./components/ExpandTicketDetails";
export default {
  name: "TicketsSearch",
  components: { TicketDetails, ExpandTicketDetails },
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
      const item = data.find((item) => item.prop === "agentCode");
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
      this.getTicketingStatisticsInfo({ agentCode: data?.agentCode || "" });
      this.query = { ...data };
      if (data?.ticketDate?.length) {
        this.query.departStartTime = data.ticketDate[0];
        this.query.departEndTime = data.ticketDate[1];
      }
      delete this.query.ticketDate;
      this.getList(true);
    },
    // 导出
    async onExport(data) {
      if (this.isExporting) return false;
      const query = { ...data };
      if (data?.ticketDate?.length) {
        query.departStartTime = data.ticketDate[0];
        query.departEndTime = data.ticketDate[1];
      }
      delete query.ticketDate;
      this.isExporting = true;
      const [, res] = await this.$http.ExportImport.ExportTicketing({
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
          FileName: "出票_" + fileName,
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8 ",
        });
      } catch (e) {
        // e;
      }
    },
    sendMessage() {
      console.log("发送通知");
    },
    async getList(isClear) {
      if (this.isLoading) return;
      if (isClear) this.page.current = 1;
      this.isLoading = true;
      const [, res] = await this.$http.OrderQuery.GetTicketingList({
        ...this.page,
        paramData: { ...this.query },
      });
      this.isLoading = false;
      this.list = res?.list || [];
      this.total = res?.total || 0;
    },
    async getTicketingStatisticsInfo({ agentCode }) {
      if (!agentCode) return (this.ticketInfo = {});
      const [, res] = await this.$http.OrderQuery.GetTicketingStatistics({
        agentCode,
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
.text-html {
  white-space: pre-wrap;
}
</style>

<template>
  <div class="view-container">
    <div class="content">
      <SearchForm
        isReturnFormData
        :formData="queryFormData"
        @on-search="onSearch"
      />
      <TablePanel :tableData="list" :tableHead="column" />
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

export default {
  name: "DaySalePointSettlement",
  components: {},
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
      isLoading: false,
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
      this.query = { ...data };
      if (data?.settlementDate?.length) {
        this.query.startTime = data.settlementDate[0];
        this.query.endTime = data.settlementDate[1];
      }
      delete this.query.settlementDate;
      this.getList(true);
    },
    async getList(isClear) {
      if (this.isLoading) return;
      if (isClear) this.page.current = 1;
      this.isLoading = true;
      const [, res] = await this.$http.OrderQuery.GetEveryHourClearingList({
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
.batch {
  padding: 10px 0;
}
</style>

<template>
  <div class="view-container">
    <div class="title">最近结算时间点记录</div>
    <div class="content">
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
import { column } from "./config";
export default {
  name: "SettlementRecentlyList",
  components: {},
  data() {
    return {
      column, //表格头
      list: [],
      page: {
        rows: 10,
        page: 1,
      },
      total: 0,
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
.title {
  height: 20px;
  margin: 0 20px 10px 0;
  font-size: 14px;
  font-weight: 700;
  color: #282828;
  line-height: 20px;
}
</style>

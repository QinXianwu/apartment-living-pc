<template>
  <div class="view-container">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
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

export default {
  name: "AfterSalesLogistics",
  components: {},
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
</style>

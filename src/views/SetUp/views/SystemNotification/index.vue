<template>
  <div class="view-container">
    <div class="content">
      <TablePanel :tableData="list" :tableHead="column">
        <!-- 操作 -->
        <template #action="{}">
          <div class="action-groud">
            <el-button type="text" @click="customerService"> 查看 </el-button>
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
  name: "SystemNotification",
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
    customerService() {
      console.log("客服");
    },
    async getList(isClear) {
      if (isClear) this.page.page = 1;
      this.list = [{ title: "广州市公告一" }];
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

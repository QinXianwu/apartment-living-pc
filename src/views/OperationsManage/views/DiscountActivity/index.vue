<template>
  <div class="Coupons view-container">
    <div class="content">
      <div class="action">
        <el-button type="primary" @click="handleAdd"> 新增折扣活动 </el-button>
      </div>
      <TablePanel ref="TablePanel" :tableData="list" :tableHead="column">
        <template #status="{ scope }">
          <el-tag
            :type="scope.status === CONST.COUPONS_STATE.HIDE ? 'danger' : ''"
            >{{ CONST.COUPONS_STATE_TEXT[scope.status] }}</el-tag
          >
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleEdit(scope)">编辑</el-button>
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
  </div>
</template>

<script>
import CONST from "@/constants/index";
import { column } from "./config";

export default {
  name: "Coupons",
  components: {},
  data() {
    return {
      CONST,
      column,
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      query: {},
      total: 0,
      editInfo: "",
      showUpdateActivity: false,
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
    handleAdd() {
      this.editInfo = "";
      this.showUpdateActivity = true;
    },
    handleEdit(data) {
      this.editInfo = { id: data.id };
      this.showUpdateActivity = true;
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showUpdateActivity = false;
      if (isRefresh) this.getList();
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] =
        await this.$http.OperationsManage.GetPieceDiscountActivityList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取商品件折扣活动列表异常");
      }
      const data = res?.rows?.length ? res.rows : [];
      this.list = data;
      this.total = res?.total || 0;
    },
  },
  filters: {},
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

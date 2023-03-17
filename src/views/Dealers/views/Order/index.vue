<template>
  <div class="DealersList view-container">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <TablePanel :tableData="list" :tableHead="column">
        <template #info="{ scope }">
          <div class="userInfo">
            <ImageView class="user-avatar mr-10" :src="scope.userHead" />
            <div class="user-name">
              <el-tooltip
                effect="dark"
                :content="scope.userName || ''"
                placement="right-start"
              >
                <span>{{ scope.userName || "-" }}</span>
              </el-tooltip>
            </div>
          </div>
        </template>
        <template #cumulativeCommissions="{ scope }">
          <span
            >￥{{
              (parseFloat(scope.firstAmount) + parseFloat(scope.secondAmount))
                | formatCurrency
            }}</span
          >
        </template>
        <template #firstDistributor="{ scope }">
          <div class="dealers-info" v-if="scope.firstDistributor">
            <span>用户：{{ scope.firstDistributor.userName || "-" }}</span>
            <span>可得佣金：{{ scope.firstAmount | formatCurrency }}</span>
          </div>
          <span v-else>-</span>
        </template>
        <template #secondDistributor="{ scope }">
          <div class="dealers-info" v-if="scope.secondDistributor">
            <span>用户：{{ scope.secondDistributor.userName || "-" }}</span>
            <span>可得佣金：{{ scope.secondAmount | formatCurrency }}</span>
          </div>
          <span v-else>-</span>
        </template>
        <template #status="{ scope }">
          <el-tag :type="getActivityTab(scope)">{{
            CONST.DEALERS_ORDER_STATE_TEXT[scope.status]
          }}</el-tag>
        </template>
        <!-- 操作 -->
        <!-- <template #action="{ scope }">
          <div class="action-groud"></div>
        </template> -->
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
import { column, formData, tabType } from "./config";

export default {
  name: "DealersList",
  components: {},
  data() {
    return {
      CONST,
      formData,
      column, //表格头
      editInfo: "",
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      query: {}, //过滤规则
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
    getActivityTab(data) {
      const keyArr = [...tabType()];
      const tabTypeItem = keyArr.find((item) => item.is === data?.status);
      return tabTypeItem?.tabType || "";
    },
    onSearch(data) {
      this.query = { ...data };
      this.getList(true);
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.Dealers.GetDealersOrderList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取分销商订单列表异常");
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
.userInfo {
  display: flex;
  align-items: center;
  .user-avatar {
    width: 60px;
    height: 60px;
  }
  .user-name {
    @include overflow-eps(1);
  }
}
.dealers-info {
  display: flex;
  flex-direction: column;
  text-align: left;
  span {
    @include overflow-eps(2);
  }
}
.action {
  padding: 0 0 15px;
}
</style>

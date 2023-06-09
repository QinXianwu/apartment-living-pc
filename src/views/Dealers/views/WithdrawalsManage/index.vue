<template>
  <div class="DealersList view-container">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <TablePanel :tableData="list" :tableHead="column">
        <template #info="{ scope }">
          <div class="userInfo">
            <ImageView
              class="user-avatar mr-10"
              :src="scope.distributor && scope.distributor.userHead"
            />
            <div class="user-name">
              <el-tooltip
                effect="dark"
                :content="
                  (scope.distributor && scope.distributor.userName) || ''
                "
                placement="right-start"
              >
                <span>{{
                  (scope.distributor && scope.distributor.userName) || "-"
                }}</span>
              </el-tooltip>
            </div>
          </div>
        </template>
        <template #phone="{ scope }">
          <span>{{
            (scope.distributor && scope.distributor.phone) || "-"
          }}</span>
        </template>
        <template #type="{ scope }">
          <span>{{ CONST.WITHDRAWALS_TYPE_TEXT[scope.type] }}</span>
        </template>
        <template #status="{ scope }">
          <el-tag :type="getActivityTab(scope)">{{
            CONST.WITHDRAWALS_STATE_TEXT[scope.status]
          }}</el-tag>
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button
              type="text"
              @click="
                handleReview({
                  id: scope.id,
                  status: CONST.WITHDRAWALS_STATE.NOT_PAY,
                })
              "
              v-if="scope.status === CONST.WITHDRAWALS_STATE.NO_CHECK"
              >审核通过</el-button
            >
            <el-button
              type="text"
              @click="
                handleReview({
                  id: scope.id,
                  status: CONST.WITHDRAWALS_STATE.SUCCESS_CHECK,
                })
              "
              v-if="scope.status === CONST.WITHDRAWALS_STATE.NOT_PAY"
              >确认打款</el-button
            >
            <el-button
              type="text"
              @click="
                handleReview({
                  id: scope.id,
                  status: CONST.WITHDRAWALS_STATE.FAIL_CHECK,
                })
              "
              v-if="scope.status === CONST.WITHDRAWALS_STATE.NO_CHECK"
              >驳回</el-button
            >
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
    async handleReview({ id, status }) {
      const title =
        status === CONST.WITHDRAWALS_STATE.NOT_PAY
          ? "通过"
          : status === CONST.WITHDRAWALS_STATE.SUCCESS_CHECK
          ? "确认打款"
          : "驳回";
      try {
        await this.$confirm(`是否确认'${title}'该提现申请？`, `${title}提示`, {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.Dealers.UpdateDealersWithdrawals({
          id,
          status,
        });
        const msg = res ? res?.msg || `${title}成功` : `${title}失败`;
        this.$confirm(msg, `${title}提示`, {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) {
            this.getList();
          }
        });
      } catch (error) {
        console.error(error);
        error;
      }
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.Dealers.GetWithdrawalsList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取分销商提现列表异常");
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
.action {
  padding: 0 0 15px;
}
</style>

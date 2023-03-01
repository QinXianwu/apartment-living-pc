<template>
  <div class="CourierManage">
    <div class="content">
      <SearchForm
        isReturnFormData
        :formData="searchForm"
        @on-search="onSearch"
      />
      <div class="action">
        <el-button type="primary" @click="handleAdd"> 新增配送员 </el-button>
      </div>
      <TablePanel :tableData="list" :tableHead="column">
        <template #status="{ scope }">
          <el-tag :type="getActivityTab(scope)">{{
            CONST.COURIER_AUDIT_STATE_TEXT[scope.status]
          }}</el-tag>
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleEdit(scope)">编辑</el-button>
            <el-button
              type="text"
              @click="
                handleReview({
                  id: scope.id,
                  status: CONST.COURIER_AUDIT_STATE.SUCCESS_CHECK,
                })
              "
              v-if="scope.status === CONST.COURIER_AUDIT_STATE.NO_CHECK"
              >审核通过</el-button
            >
            <el-button
              type="text"
              @click="
                handleReview({
                  id: scope.id,
                  status: CONST.COURIER_AUDIT_STATE.INTERDICTED,
                })
              "
              v-if="scope.status === CONST.COURIER_AUDIT_STATE.SUCCESS_CHECK"
              >停职</el-button
            >
            <el-button
              type="text"
              @click="
                handleReview({
                  id: scope.id,
                  status: CONST.COURIER_AUDIT_STATE.FAIL_CHECK,
                })
              "
              v-if="scope.status === CONST.COURIER_AUDIT_STATE.NO_CHECK"
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
    <UpdateCourierDiaog
      :editInfo="editInfo"
      :show.sync="showActivityDiaog"
      @close="close"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CONST from "@/constants/index";
import { column, formData, activityTab } from "./config";
import UpdateCourierDiaog from "./components/UpdateCourierDiaog.vue";

export default {
  name: "CourierManage",
  components: {
    UpdateCourierDiaog,
  },
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
      showActivityDiaog: false,
    };
  },
  computed: {
    ...mapGetters({
      serviceStationOptions: "accountRoleManage/serviceStationOptions",
    }),
    searchForm({ serviceStationOptions }) {
      const serviceItem = formData.find(
        (item) => item.prop === "serviceStationId"
      );
      if (serviceItem) serviceItem.options = serviceStationOptions;
      return formData;
    },
  },
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
      const keyArr = [...activityTab()];
      const tabTypeItem = keyArr.find((item) => item.is === data?.status);
      return tabTypeItem?.tabType || "";
    },
    onSearch(data) {
      this.query = { ...data };
      this.getList(true);
    },
    handleAdd() {
      this.editInfo = "";
      this.showActivityDiaog = true;
    },
    handleEdit(data) {
      this.editInfo = { id: data.id };
      this.showActivityDiaog = true;
    },
    async handleReview({ id, status }) {
      const title =
        status === CONST.COURIER_AUDIT_STATE.SUCCESS_CHECK
          ? "通过"
          : status === CONST.COURIER_AUDIT_STATE.INTERDICTED
          ? "停职"
          : "驳回";
      try {
        await this.$confirm(`是否确认'${title}'该配送员？`, `${title}提示`, {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.Courier.UpdateCourierStatus({
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
            this.$store.dispatch(
              "operationsManage/GetCourierPeopleListAction",
              true
            );
          }
        });
      } catch (error) {
        console.error(error);
        error;
      }
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showActivityDiaog = false;
      if (isRefresh) this.getList();
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.Courier.GetCourierList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取配送员列表异常");
      }
      this.list = res?.rows || [];
      this.total = res?.total || 0;
    },
  },
  mounted() {
    this.getList();
    this.$store.dispatch("accountRoleManage/GetServiceStationListAction");
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

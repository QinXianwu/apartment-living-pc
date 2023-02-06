<template>
  <div class="CourierManage view-container">
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
            $CONST.COURIER_AUDIT_STATE_TEXT[scope.status]
          }}</el-tag>
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleEdit(scope)">编辑</el-button>
            <!-- <el-button
              type="text"
              @click="stopActivity(scope)"
              v-if="scope.status === $CONST.ACT_STATUS.HAVE_IN_HAND"
              >停止</el-button
            > -->
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
import { column, formData, activityTab } from "./config";
import UpdateCourierDiaog from "./components/UpdateCourierDiaog.vue";

export default {
  name: "CourierManage",
  components: { UpdateCourierDiaog },
  data() {
    return {
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
    async stopActivity({ id }) {
      try {
        await this.$confirm(`是否确认停止ID为'${id}'的秒杀活动？`, "停止活动", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.FastDeals.StopSecKillActivity({
          id,
        });
        const msg = res ? res?.msg || `停止成功` : `停止失败`;
        this.$confirm(msg, "停止活动", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) this.getList();
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

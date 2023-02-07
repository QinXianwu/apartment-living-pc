<template>
  <div class="GroupActivity view-container">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <div class="action">
        <el-button type="primary" @click="handleAdd"> 新增拼团活动 </el-button>
      </div>
      <TagPage :state.sync="query.status" @getList="getList" />
      <TablePanel :tableData="list" :tableHead="column">
        <template #status="{ scope }">
          <el-tag :type="getActivityTab(scope)">{{
            $CONST.ACTIVITY_STATUS_TEXT[scope.status]
          }}</el-tag>
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleEdit(scope)">编辑</el-button>
            <el-button type="text" @click="stopActivity(scope)">停止</el-button>
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
    <ChooseGoodsDiaog
      isRadio
      showGroupPrice
      :isStation="isService"
      :selectIds="selectGoodsIds"
      :show.sync="showGoodsDiaog"
      @close="chooseClose"
      @on-success="chooseGoodsSuccess"
    />
    <UpdateActivityDiaog
      :editInfo="editInfo"
      :selectGoods="selectGoods"
      :show.sync="showActivityDiaog"
      @chooseGoods="chooseGoods"
      @close="close"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { column, formData, activityTab } from "./config";
import TagPage from "./components/TagPage.vue";
import ChooseGoodsDiaog from "@/components/ChooseGoodsDiaog";
import UpdateActivityDiaog from "./components/UpdateActivityDiaog.vue";

export default {
  name: "GroupActivity",
  components: { TagPage, ChooseGoodsDiaog, UpdateActivityDiaog },
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
      query: {
        status: "",
      }, //过滤规则
      selectGoodsIds: [],
      selectGoods: [],
      showGoodsDiaog: false,
      showActivityDiaog: false,
    };
  },
  computed: {
    ...mapGetters({
      isService: "user/isService",
    }),
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
      if (data?.activityDate?.length) {
        this.query["startTime"] = data.activityDate[0];
        this.query["endTime"] = data.activityDate[1];
      }
      delete this.query.activityDate;
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
        await this.$confirm(`是否确认停止ID为'${id}'的拼团活动？`, "停止活动", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.OperationsManage.StopGroupActivity({
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
    chooseGoods(data) {
      this.showGoodsDiaog = true;
      this.selectGoodsIds = data?.length ? data : [];
    },
    chooseClose() {
      this.showGoodsDiaog = false;
    },
    chooseGoodsSuccess(data) {
      this.selectGoods = data?.length ? data : [];
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
      const [, res] = await this.$http.OperationsManage.GetGroupActivityList(
        query
      );
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取拼团活动列表异常");
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

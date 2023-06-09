<template>
  <div class="GroupActivity view-container">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <div class="action">
        <el-button type="primary" @click="handleAdd"> 新增拼团活动 </el-button>
      </div>
      <TagPage :tabs="tabs" :state.sync="query.status" @getList="getList" />
      <TablePanel :tableData="list" :tableHead="column">
        <template #goodsInfo="{ scope }">
          <div class="goodsInfo">
            <ImageView
              customClass="table-img"
              :src="scope.product && scope.product.mainImage"
            />
            <div class="name">
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.product && scope.product.productName"
                placement="right"
              >
                <span>{{ scope.product && scope.product.productName }}</span>
              </el-tooltip>
            </div>
          </div>
        </template>
        <!-- 拼团价 -->
        <template #groupPrice="{ scope }">
          <span>
            {{ scope.product | priceRange("groupPriceMin", "groupPriceMax") }}
          </span>
        </template>
        <template #hot="{ scope }">
          <el-tag
            :type="scope.hot === $CONST.GROUP_HOT_TYPE.NOT ? 'danger' : ''"
          >
            <span>{{ $CONST.GROUP_HOT_TYPE_TEXT[scope.hot] }}</span>
          </el-tag>
        </template>
        <template #status="{ scope }">
          <div>
            <el-tag :type="getActivityTab(scope)">
              <span>{{ $CONST.ACTIVITY_STATUS_TEXT[scope.status] }}</span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.reject"
                placement="right"
                v-if="scope.status === $CONST.ACTIVITY_STATUS.FAIL_CHECK"
              >
                <i class="el-icon-warning" style="color: #ff4949" />
              </el-tooltip>
            </el-tag>
          </div>
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button
              type="text"
              @click="handleEdit(scope)"
              v-if="scope.status === $CONST.ACTIVITY_STATUS.NOT_START"
              >编辑</el-button
            >
            <el-button type="text" @click="handleEdit(scope)" v-else
              >查看</el-button
            >
            <el-button
              type="text"
              @click="
                handleReview({
                  id: scope.id,
                  status: $CONST.ACTIVITY_STATUS.NOT_START,
                })
              "
              v-if="isAdmin && scope.status === $CONST.ACTIVITY_STATUS.NO_CHECK"
              >审核通过</el-button
            >
            <el-button
              type="text"
              @click="
                handleReviewFail({
                  id: scope.id,
                  status: $CONST.ACTIVITY_STATUS.FAIL_CHECK,
                })
              "
              v-if="isAdmin && scope.status === $CONST.ACTIVITY_STATUS.NO_CHECK"
              >审核驳回</el-button
            >
            <el-button
              type="text"
              @click="stopActivity(scope)"
              v-if="scope.status === $CONST.ACTIVITY_STATUS.HAVE_IN_HAND"
              >停止</el-button
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
    <AuditFailDialog
      :editInfo="editInfo"
      :show.sync="showAuditFail"
      @close="close"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { column, formData, tabs, activityTab } from "./config";
import TagPage from "@/components/TagPage";
import ChooseGoodsDiaog from "@/components/ChooseGoodsDiaog";
import AuditFailDialog from "./components/AuditFailDialog.vue";
import UpdateActivityDiaog from "./components/UpdateActivityDiaog.vue";

export default {
  name: "GroupActivity",
  components: {
    TagPage,
    ChooseGoodsDiaog,
    UpdateActivityDiaog,
    AuditFailDialog,
  },
  data() {
    return {
      formData,
      column,
      tabs,
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
      showAuditFail: false,
    };
  },
  computed: {
    ...mapGetters({
      isAdmin: "user/isAdmin",
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
      this.editInfo = { write: true };
      this.showActivityDiaog = true;
    },
    handleEdit(data) {
      this.editInfo = {
        id: data.id,
        write: data?.status === this.$CONST.ACTIVITY_STATUS.NOT_START,
      };
      this.showActivityDiaog = true;
    },
    handleReviewFail({ id, status }) {
      this.editInfo = { id, status };
      this.showAuditFail = true;
    },
    async handleReview({ id, status }) {
      const title =
        status === this.$CONST.ACTIVITY_STATUS.NOT_START ? "通过" : "驳回";
      try {
        await this.$confirm(`是否确认'${title}'该活动？`, `${title}提示`, {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.OperationsManage.AuditGroupActivity({
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
      this.showAuditFail = false;
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
.goodsInfo {
  display: flex;
  align-items: center;
  .table-img {
    width: 60px;
    height: 60px;
  }
  .name {
    margin-left: 10px;
    @include overflow-eps(2);
  }
}
.action {
  padding: 0 0 15px;
}
</style>

<template>
  <div class="FeedbackList view-container">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <!-- <div class="action"></div> -->
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
        <template #status="{ scope }">
          <el-tag
            :type="
              scope.status === $CONST.FEED_BACK_STATE.A_S_HANDLE
                ? 'danger'
                : 'success'
            "
            >{{ $CONST.FEED_BACK_STATE_TEXT[scope.status] }}</el-tag
          >
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button
              type="text"
              @click="handleFeedback(scope)"
              v-if="scope.status === $CONST.FEED_BACK_STATE.A_S_HANDLE"
              >标记完成</el-button
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
    <UpdateActivityDiaog
      :editInfo="editInfo"
      :show.sync="showActivityDiaog"
      @close="close"
    />
  </div>
</template>
<script>
import { digits2Str } from "@/utils";
import { column, formData } from "./config";
import UpdateActivityDiaog from "./components/UpdateActivityDiaog.vue";

export default {
  name: "FeedbackList",
  components: { UpdateActivityDiaog },
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
    onSearch(data) {
      this.query = { ...data };
      if (data?.activityDate?.length) {
        this.query["startTime"] = data.activityDate[0];
        this.query["endTime"] = data.activityDate[1];
      }
      delete this.query.activityDate;
      this.getList(true);
    },
    handleEdit(data) {
      this.editInfo = { id: data.id };
      this.showActivityDiaog = true;
    },
    async handleFeedback({ id }) {
      try {
        await this.$confirm(`是否确认处理该问题？`, "确认处理", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.OperationsManage.UpdateFeedbackStatus({
          id,
          status: this.$CONST.FEED_BACK_STATE.A_S_PROCESSED,
        });
        const msg = res ? res?.msg || `处理成功` : `处理失败`;
        this.$confirm(msg, "处理活动", {
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
      const [, res] = await this.$http.OperationsManage.GetFeedbackList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取问题反馈列表异常");
      }
      this.list = res?.rows || [];
      this.list.forEach((item) => {
        item.imageList =
          typeof item?.images === "string" ? item.images.split(",") : [];
        digits2Str(item, ["id", "userId"]);
      });
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

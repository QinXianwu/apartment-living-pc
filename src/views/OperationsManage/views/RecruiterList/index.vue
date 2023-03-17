<template>
  <div class="RecruiterList view-container">
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
        <template #type="{ scope }">
          <span>{{ $CONST.RECRUITER_TYPE_TEXT[scope.type] }}</span>
        </template>
        <template #status="{ scope }">
          <el-tag
            :type="
              scope.status === $CONST.RECRUITER_STATE.A_S_HANDLE
                ? 'danger'
                : 'success'
            "
            >{{ $CONST.RECRUITER_STATE_TEXT[scope.status] }}</el-tag
          >
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="lookDetails(scope)"
              >查看详情</el-button
            >
            <el-button
              type="text"
              @click="handleFeedback(scope)"
              v-if="scope.status === $CONST.RECRUITER_STATE.A_S_HANDLE"
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
    <RecruiterDetailsDiaog
      :editInfo="editInfo"
      :show.sync="showDetailsDiaog"
      @close="close"
    />
  </div>
</template>
<script>
// import { digits2Str } from "@/utils";
import { column, formData } from "./config";
import RecruiterDetailsDiaog from "./components/RecruiterDetailsDiaog.vue";

export default {
  name: "RecruiterList",
  components: { RecruiterDetailsDiaog },
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
      showDetailsDiaog: false,
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
      this.getList(true);
    },
    lookDetails(data) {
      this.editInfo = { ...data };
      this.showDetailsDiaog = true;
    },
    async handleFeedback({ id }) {
      try {
        await this.$confirm(`是否确认处理该问题？`, "确认处理", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.OperationsManage.UpdateRecruiterStatus(
          {
            id,
            status: this.$CONST.RECRUITER_STATE.A_S_PROCESSED,
          }
        );
        const msg = res ? res?.msg || `处理成功` : `处理失败`;
        this.$confirm(msg, "处理结果", {
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
      this.showDetailsDiaog = false;
      if (isRefresh) this.getList();
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.OperationsManage.GetRecruiterList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取招聘记录列表异常");
      }
      this.list = res?.rows || [];
      // this.list.forEach((item) => {
      //   digits2Str(item, ["id", "userId"]);
      // });
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

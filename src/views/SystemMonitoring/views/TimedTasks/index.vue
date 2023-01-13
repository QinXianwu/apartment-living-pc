<template>
  <div class="TimedTasks view-container">
    <SearchForm
      isShowExport
      isReturnFormData
      :formData="formData"
      @on-search="onSearch"
      @on-export="onExport"
    />
    <div class="action">
      <el-button type="primary" @click="handleAdd"> 新增任务 </el-button>
    </div>
    <TablePanel :tableData="list" :tableHead="column">
      <template #jobGroup="{ scope }">
        <el-tag>{{ $CONST.JOB_GROUP_TEXT[scope.jobGroup] }}</el-tag>
      </template>
      <template #status="{ scope }">
        <el-switch
          v-model="scope.status"
          :active-value="$CONST.JOB_STATE.ON"
          :inactive-value="$CONST.JOB_STATE.OFF"
          @change="handleStatusChange(scope)"
        >
        </el-switch>
      </template>
      <!-- 操作 -->
      <template #action="{ scope }">
        <div class="action-groud">
          <el-button type="text" @click="handleEdit(scope)"> 编辑 </el-button>
          <el-button type="text" @click="handleDelete(scope)"> 删除 </el-button>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link more"> 更多 </span>
            <el-dropdown-menu
              slot="dropdown"
              style="min-width: 100px; text-align: center"
            >
              <el-dropdown-item>
                <div @click.stop="handleRun(scope)">
                  <span>执行一次</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click.stop="lookDetail(scope)">
                  <span>任务详情</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click.stop="handleDispatchLog(scope)">
                  <span>调度日志</span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
    <!-- 编辑/新增任务 -->
    <UpdateTaskDiaog
      :editInfo="editInfo"
      :show.sync="showUpdateTask"
      :cronExpression.sync="cronExpression"
      @close="close"
      @buildExpression="showBuildExpression = true"
    />
    <!-- 任务详情 -->
    <TaskDetailDiaog
      :editInfo="editInfo"
      :show.sync="showTaskDetail"
      @close="close"
    />
    <!-- 生成表达式 -->
    <BuildExpressionDiaog
      @close="closeBuildExpression"
      :show.sync="showBuildExpression"
      :cronExpression.sync="cronExpression"
    />
    <DispatchLogDiaog
      :logInfo="logInfo"
      :show.sync="showLogDetail"
      @close="closeLogDetail"
    />
    <DrawerPopup v-model="showDispatchLog">
      <DispatchLogList
        v-if="showDispatchLog"
        ref="DispatchLog"
        :editInfo="editInfo"
        @close="close"
        @lookDetail="handleLogDetail"
      />
    </DrawerPopup>
  </div>
</template>

<script>
import { formData, column } from "./config";
import downloadFilelMixin from "@/mixins/downloadFilelMixin";
import UpdateTaskDiaog from "./components/UpdateTaskDiaog.vue";
import TaskDetailDiaog from "./components/TaskDetailDiaog.vue";
import DispatchLogList from "./components/DispatchLogList.vue";
import DispatchLogDiaog from "./components/DispatchLogDiaog.vue";
import BuildExpressionDiaog from "./components/BuildExpressionDiaog.vue";

export default {
  name: "TimedTasks",
  mixins: [downloadFilelMixin],
  components: {
    UpdateTaskDiaog,
    TaskDetailDiaog,
    DispatchLogList,
    DispatchLogDiaog,
    BuildExpressionDiaog,
  },
  data() {
    return {
      formData,
      column, //表格头
      list: [],
      editInfo: "",
      logInfo: "",
      cronExpression: "",
      isExporting: false,
      showUpdateTask: false,
      showTaskDetail: false,
      showDispatchLog: false,
      showLogDetail: false,
      showBuildExpression: false,
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      query: {},
      total: 0,
      rules: [], //过滤规则
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
    async onExport(data) {
      if (this.isExporting) return false;
      const query = { ...data };
      this.isExporting = true;
      const [, res] = await this.$http.ExportImport.ExportScheduleJobList({
        ...this.page,
        ...query,
      });
      this.isExporting = false;
      if (!res) return this.$message.error("导出失败");
      this.onExportDownloadFile({
        data: res,
        tipText: "导出成功，是否进行下载？",
        fileName: "定时任务列表",
      });
    },
    async handleStatusChange(item) {
      const tipText = `${
        item?.status === this.$CONST.JOB_STATE.ON ? "启用" : "停用"
      }"${item?.jobName || "该"}"任务`;
      try {
        await this.$confirm(`确定要${tipText}吗?`, tipText, {
          type: "warning",
          showClose: false,
        });
        const [, res] =
          await this.$http.SystemMonitoring.UpdateScheduleTaskStatus({
            jobId: item?.jobId || "",
            status: item?.status,
          });
        const msg = res ? res?.msg || `${tipText}成功` : `${tipText}失败`;
        this.$confirm(msg, "操作结果", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) this.getList();
          else {
            item.status =
              item?.status === this.$CONST.JOB_STATE.ON
                ? this.$CONST.JOB_STATE.OFF
                : this.$CONST.JOB_STATE.ON;
          }
        });
      } catch (error) {
        item.status =
          item?.status === this.$CONST.JOB_STATE.ON
            ? this.$CONST.JOB_STATE.OFF
            : this.$CONST.JOB_STATE.ON;
        console.error(error);
      }
    },
    async handleRun(item) {
      const tipText = `${item?.jobName || ""}`;
      try {
        await this.$confirm(`确认要立即执行一次"${tipText}"任务吗?`, {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.SystemMonitoring.RunScheduleTask({
          jobId: item?.jobId || "",
          jobGroup: item?.jobGroup || "",
        });
        const msg = res ? res?.msg || `执行成功` : `执行失败`;
        this.$confirm(msg, "操作结果", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        });
      } catch (error) {
        console.error(error);
      }
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showUpdateTask = false;
      this.showDispatchLog = false;
      this.showTaskDetail = false;
      if (isRefresh) this.getList();
    },
    closeBuildExpression() {
      this.showBuildExpression = false;
    },
    handleAdd() {
      this.editInfo = "";
      this.showUpdateTask = true;
    },
    handleEdit({ jobId }) {
      this.editInfo = { jobId };
      this.showUpdateTask = true;
    },
    lookDetail({ jobId }) {
      this.editInfo = { jobId };
      this.showTaskDetail = true;
    },
    handleDispatchLog(item) {
      this.editInfo = { ...item };
      this.showDispatchLog = true;
    },
    handleLogDetail(val) {
      this.logInfo = val;
      this.showLogDetail = true;
    },
    closeLogDetail() {
      this.logInfo = "";
      this.showLogDetail = false;
    },
    async handleDelete({ jobName, jobId }) {
      const name = jobName ? `"${jobName}"` : "该";
      try {
        await this.$confirm(`确定要删除${name}任务吗?`, "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.SystemMonitoring.DeleteScheduleTask({
          jobId,
        });
        const msg = res ? res?.msg || `删除成功` : `删除失败`;
        this.$confirm(msg, "删除提示", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) this.getList();
        });
      } catch (error) {
        error;
      }
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.SystemMonitoring.GetScheduleTaskList(
        query
      );
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取定时任务列表异常");
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
.action {
  padding: 0 0 15px;
}
.action-groud {
  .more {
    color: $menuActiveText;
    cursor: pointer;
  }
}
</style>

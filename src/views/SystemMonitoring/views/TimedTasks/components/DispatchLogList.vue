<template>
  <div class="DispatchLogList">
    <div class="content">
      <SearchForm
        isShowExport
        isReturnFormData
        :formData="DispatchLog_formData"
        @on-search="onSearch"
        @on-export="onExport"
      />
      <div class="action">
        <el-button
          :disabled="isDisabledDelete"
          @click="handleDelete"
          type="danger"
        >
          批量删除
        </el-button>
        <el-button type="danger" @click="handleClean"> 清空日志 </el-button>
        <el-button type="primary" @click="$emit('close')">返回</el-button>
      </div>
      <TablePanel
        ref="TablePanel"
        :checkbox="true"
        :isShowTopCheck="false"
        :tableData="list"
        :tableHead="DispatchLog_column"
        @selection-change="handleSelectionChange"
      >
        <template #status="{ scope }">
          <el-tag
            :type="scope.status === $CONST.JOB_STATE.OFF ? 'danger' : ''"
            >{{ $CONST.JOB_STATE_TEXT[scope.status] }}</el-tag
          >
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="lookDetail(scope)">
              查看详情
            </el-button>
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
import downloadFilelMixin from "@/mixins/downloadFilelMixin";
import { DispatchLog_formData, DispatchLog_column } from "../config";

export default {
  name: "DispatchLogList",
  components: {},
  mixins: [downloadFilelMixin],
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  data() {
    return {
      DispatchLog_formData,
      DispatchLog_column,
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      query: {}, //过滤规则
      isExporting: false,
      selectDataMap: {},
      isDisabledDelete: true,
    };
  },
  computed: {},
  mounted() {
    this.DispatchLog_formData.map((item) => {
      if (item.prop === "jobName") {
        item.value = this.editInfo?.jobName || "";
        this.query.jobName = item.value;
      } else if (item.prop === "jobGroup") {
        item.value = this.editInfo?.jobGroup || "";
        this.query.jobGroup = item.value;
      }
    });
    this.getList();
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
    onSearch(data) {
      this.query = { ...data };
      if (data?.runTime?.length) {
        this.query.params = {};
        this.query.params["beginTime"] = data.runTime[0];
        this.query.params["endTime"] = data.runTime[1];
        delete this.query.runTime;
      }
      this.getList(true);
    },
    async onExport(data) {
      if (this.isExporting) return false;
      const query = { ...data };
      if (data?.runTime?.length) {
        query.params = {};
        query.params["beginTime"] = data.runTime[0];
        query.params["endTime"] = data.runTime[1];
        delete query.runTime;
      }
      this.isExporting = true;
      const [, res] = await this.$http.ExportImport.ExportScheduleJobLogList({
        ...this.page,
        ...query,
      });
      this.isExporting = false;
      if (!res) return this.$message.error("导出失败");
      this.onExportDownloadFile({
        data: res,
        tipText: "导出成功，是否进行下载？",
        fileName: "任务调度日志列表",
      });
    },
    lookDetail(item) {
      this.$emit("lookDetail", item);
    },
    async handleDelete() {
      const ids = Object.keys(this.selectDataMap).join(",");
      try {
        await this.$confirm(
          `是否确认删除调度日志编号为${ids}的数据项？`,
          "删除提示",
          {
            type: "warning",
            showClose: false,
          }
        );
        const [, res] = await this.$http.SystemMonitoring.DeleteScheduleTaskLog(
          {
            jobLogId: ids,
          }
        );
        const msg = res ? res?.msg || `删除成功` : `删除失败`;
        this.$confirm(msg, "删除提示", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) {
            this.selectDataMap = {};
            this.isDisabledDelete = true;
            this.getList();
          }
        });
      } catch (error) {
        console.error(error);
        error;
      }
    },
    async handleClean() {
      try {
        await this.$confirm("是否确认清空所有调度日志数据项?", "清空提示", {
          type: "warning",
          showClose: false,
        });
        const [, res] =
          await this.$http.SystemMonitoring.DeleteAllScheduleTaskLog();
        const msg = res ? res?.msg || `清空成功` : `清空失败`;
        this.$confirm(msg, "清空提示", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) {
            this.selectDataMap = {};
            this.isDisabledDelete = true;
            this.getList();
          }
        });
      } catch (error) {
        console.error(error);
        error;
      }
    },
    initSelection() {
      if (!this.list?.length) return;
      this.list.forEach((item) => {
        if (this.selectDataMap[item?.jobLogId]) {
          this.$nextTick(() => {
            this.$refs.TablePanel.setSelection(item, true);
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.list.forEach((item) => {
        // 存在于当前页以及map 但不存在 val -> 去掉
        const index = val.findIndex(
          (vItem) => vItem?.jobLogId === item.jobLogId
        );
        if (this.selectDataMap[item.jobLogId] && index < 0)
          delete this.selectDataMap[item.jobLogId];
      });
      val.forEach((item) => (this.selectDataMap[item.jobLogId] = { ...item }));
      this.isDisabledDelete = !Object.keys(this.selectDataMap).length;
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.SystemMonitoring.GetScheduleTaskLogList(
        query
      );
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取任务调度日志列表异常");
      }
      this.list = res?.rows || [];
      this.total = res?.total || 0;
      this.initSelection();
    },
  },
};
</script>
<style lang="scss" scoped>
.action {
  margin: 20px 0;
}
</style>

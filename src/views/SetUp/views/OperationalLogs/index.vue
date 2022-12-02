<template>
  <div class="OperationalLogs view-container">
    <SearchForm
      isShowExport
      isReturnFormData
      :formData="formData"
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
    </div>
    <TablePanel
      ref="TablePanel"
      :checkbox="true"
      :isShowTopCheck="false"
      :tableData="list"
      :tableHead="column"
      @selection-change="handleSelectionChange"
    >
      <template #businessType="{ scope }">
        <el-tag :type="getBusinessType(scope.businessType)">{{
          $CONST.SYS_ACTION_TYPE_TEXT[scope.businessType]
        }}</el-tag>
      </template>
      <template #status="{ scope }">
        <el-tag
          :type="scope.status === $CONST.SYS_ACTION_STATE.FAIL ? 'danger' : ''"
          >{{ $CONST.SYS_ACTION_STATE_TEXT[scope.status] }}</el-tag
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
    <!-- 日志详情 -->
    <LogDetailDiaog
      :editInfo="operLogData"
      :show.sync="showLogDetail"
      @close="close"
    />
  </div>
</template>

<script>
import { formData, column } from "./config";
import downloadFilelMixin from "@/mixins/downloadFilelMixin";
import LogDetailDiaog from "./components/LogDetailDiaog.vue";

export default {
  name: "OperationalLogs",
  mixins: [downloadFilelMixin],
  components: { LogDetailDiaog },
  data() {
    return {
      formData,
      column, //表格头
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      query: {},
      total: 0,
      selectDataMap: {},
      isDisabledDelete: true,
      isExporting: false,
      showLogDetail: false,
      operLogData: {},
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
      if (data?.actionDate?.length) {
        this.query.params = {};
        this.query.params["beginTime"] = data.actionDate[0];
        this.query.params["endTime"] = data.actionDate[1];
        delete this.query.actionDate;
      }
      this.getList(true);
    },
    async onExport(data) {
      if (this.isExporting) return false;
      const query = { ...data };
      if (data?.actionDate?.length) {
        query.params = {};
        query.params["beginTime"] = data.actionDate[0];
        query.params["endTime"] = data.actionDate[1];
        delete query.actionDate;
      }
      this.isExporting = true;
      const [, res] = await this.$http.ExportImport.ExportOperLogList({
        ...this.page,
        ...query,
      });
      this.isExporting = false;
      if (!res) return this.$message.error("导出失败");
      this.onExportDownloadFile({
        data: res,
        tipText: "导出成功，是否进行下载？",
        fileName: "系统操作日志列表",
      });
    },
    lookDetail(data) {
      this.operLogData = { ...data };
      this.showLogDetail = true;
    },
    close() {
      this.operLogData = {};
      this.showLogDetail = false;
    },
    getBusinessType(type) {
      const ACTION_TYPE = this.$CONST.SYS_ACTION_TYPE;
      const str1 = `${ACTION_TYPE.ADD},${ACTION_TYPE.UPDATE}`;
      const str2 = `${ACTION_TYPE.LICENSING}`;
      const str3 = `${ACTION_TYPE.DELETE},${ACTION_TYPE.FORCE_OUT},${ACTION_TYPE.CLEAR_DATA}`;
      const str4 = `${ACTION_TYPE.EXPORT},${ACTION_TYPE.IMPORT},${ACTION_TYPE.GENERATE_CODE}`;
      if (str1.includes(type)) return "info";
      else if (str2.includes(type)) return "primary";
      else if (str3.includes(type)) return "danger";
      else if (str4.includes(type)) return "warning";
    },
    async handleDelete() {
      const ids = Object.keys(this.selectDataMap).join(",");
      try {
        await this.$confirm(
          `是否确认删除日志编号为${ids}的数据项？`,
          "删除提示",
          {
            type: "warning",
            showClose: false,
          }
        );
        const [, res] = await this.$http.OperationalLogs.DeleteOperLog({
          operId: ids,
        });
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
        await this.$confirm("是否确认清空所有操作日志数据项？?", "清空提示", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.OperationalLogs.DeleteAllOperLog();
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
        if (this.selectDataMap[item?.operId]) {
          this.$nextTick(() => {
            this.$refs.TablePanel.setSelection(item, true);
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.list.forEach((item) => {
        // 存在于当前页以及map 但不存在 val -> 去掉
        const index = val.findIndex((vItem) => vItem?.operId === item.operId);
        if (this.selectDataMap[item.operId] && index < 0)
          delete this.selectDataMap[item.operId];
      });
      val.forEach((item) => (this.selectDataMap[item.operId] = { ...item }));
      this.isDisabledDelete = !Object.keys(this.selectDataMap).length;
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.OperationalLogs.GetList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取操作日志列表异常");
      }
      this.list = res?.rows || [];
      this.total = res?.total || 0;
      this.initSelection();
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
</style>

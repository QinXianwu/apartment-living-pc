<template>
  <div class="DictionaryManage view-container">
    <SearchForm
      isShowExport
      isReturnFormData
      :formData="formData"
      @on-search="onSearch"
      @on-export="onExport"
    />
    <div class="action">
      <el-button type="primary" @click="handleAdd"> 新增字典 </el-button>
      <el-button type="primary" @click="handleCache" plain>
        刷新缓存
      </el-button>
    </div>
    <TablePanel :tableData="list" :tableHead="column">
      <template #dictType="{ scope }">
        <el-button type="text" @click="lookDictDetail(scope)">
          {{ scope.dictType }}
        </el-button>
      </template>
      <template #status="{ scope }">
        <el-tag
          :type="scope.status === $CONST.DICT_STATE.OFF ? 'danger' : ''"
          >{{ $CONST.DICT_STATE_TEXT[scope.status] }}</el-tag
        >
      </template>
      <!-- 操作 -->
      <template #action="{ scope }">
        <div class="action-groud" v-if="scope.dictId !== 1">
          <el-button type="text" @click="handleEdit(scope)"> 编辑 </el-button>
          <el-button type="text" @click="handleDelete(scope)"> 删除 </el-button>
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
    <!-- 编辑/新增字典 -->
    <UpdateDictDiaog
      :editInfo="editInfo"
      :show.sync="showUpdateDict"
      @close="close"
    />
    <UpdateDictDataDiaog
      :editInfo="dictInfo"
      :show.sync="showUpdateDictData"
      @close="closeAssignUser"
    />
    <DrawerPopup v-model="showDictDataList">
      <DictDataList
        @close="close"
        ref="DictDataList"
        @updateDictData="handleUpdateDictData"
        :editInfo="editInfo"
        v-if="showDictDataList"
      />
    </DrawerPopup>
  </div>
</template>

<script>
import { formData, column } from "./config";
import downloadFilelMixin from "@/mixins/downloadFilelMixin";
import UpdateDictDiaog from "./components/UpdateDictDiaog.vue";
import DictDataList from "./components/DictDataListList.vue";
import UpdateDictDataDiaog from "./components/UpdateDictDataDiaog.vue";

export default {
  name: "DictionaryManage",
  mixins: [downloadFilelMixin],
  components: { UpdateDictDiaog, DictDataList, UpdateDictDataDiaog },
  data() {
    return {
      formData,
      column, //表格头
      list: [],
      editInfo: "",
      dictInfo: "",
      isExporting: false,
      showUpdateDict: false,
      showDictDataList: false,
      showUpdateDictData: false,
      page: {
        pageSize: 10,
        pageNum: 1,
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
      if (data?.createDate?.length) {
        this.query.params = {};
        this.query.params["beginTime"] = data.createDate[0];
        this.query.params["endTime"] = data.createDate[1];
        delete this.query.createDate;
      }
      this.getList(true);
    },
    async onExport(data) {
      if (this.isExporting) return false;
      const query = { ...data };
      if (data?.createDate?.length) {
        query.params = {};
        query.params["beginTime"] = data.createDate[0];
        query.params["endTime"] = data.createDate[1];
        delete query.createDate;
      }
      this.isExporting = true;
      const [, res] = await this.$http.ExportImport.ExportDictList({
        ...this.page,
        ...query,
      });
      this.isExporting = false;
      if (!res) return this.$message.error("导出失败");
      this.onExportDownloadFile({
        data: res,
        tipText: "导出成功，是否进行下载？",
        fileName: "字典列表",
      });
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showUpdateDict = false;
      this.showDictDataList = false;
      this.showUpdateDictData = false;
      if (isRefresh) this.getList();
    },
    handleAdd() {
      this.editInfo = "";
      this.showUpdateDict = true;
    },
    handleEdit({ dictId }) {
      this.editInfo = { dictId };
      this.showUpdateDict = true;
    },
    async handleCache() {
      //
    },
    lookDictDetail({ dictId }) {
      this.editInfo = { dictId };
      this.showDictDataList = true;
    },
    handleUpdateDictData(val) {
      this.dictInfo = val;
      this.showUpdateDictData = true;
    },
    closeAssignUser(val) {
      this.dictInfo = "";
      this.showUpdateDictData = false;
      if (val) this.$refs.DictDataList.getList();
    },
    async handleDelete({ dictId }) {
      if (!dictId) return this.$message.error("获取不到当前字典ID");
      try {
        await this.$confirm("确定要删除当前字典吗?", "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.DictionaryManage.DeleteDictionary({
          dictId,
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
      const [, res] = await this.$http.DictionaryManage.GetDictionaryList(
        query
      );
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取字典列表异常");
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
</style>

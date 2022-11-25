<template>
  <div class="DictDataList">
    <div class="action">
      <el-button type="primary" @click="$emit('close')">返回</el-button>
    </div>
    <div class="content">
      <SearchForm
        isShowExport
        isReturnFormData
        :formData="formData"
        @on-search="onSearch"
        @on-export="onExport"
        @selectChange="onSelectChange"
      />
      <div class="action">
        <el-button type="primary" @click="handleAdd"> 新增 </el-button>
      </div>
      <TablePanel :tableData="list" :tableHead="DictDetail_column">
        <template #dictLabel="{ scope }">
          <span v-if="scope.listClass === '' || scope.listClass === 'default'">
            {{ scope.dictLabel }}
          </span>
          <el-tag
            v-else
            :type="scope.listClass === 'primary' ? '' : scope.listClass"
          >
            {{ scope.dictLabel }}
          </el-tag>
        </template>
        <template #status="{ scope }">
          <el-tag
            :type="scope.status === $CONST.USER_STATE.OFF ? 'danger' : ''"
            >{{ $CONST.USER_STATE_TEXT[scope.status] }}</el-tag
          >
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleEdit(scope)"> 编辑 </el-button>
            <el-button type="text" @click="handleDelete(scope)">
              删除
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
import { DictDetail_formData, DictDetail_column } from "../config";
export default {
  name: "DictDataList",
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
      DictDetail_formData,
      DictDetail_column,
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      query: {}, //过滤规则
      isExporting: false,
      dictType: "",
      dictDetail: {},
      dictDataOptions: [],
    };
  },
  computed: {
    formData({ dictDetail, dictDataOptions, DictDetail_formData }) {
      const item = DictDetail_formData.find((item) => item.prop === "dictType");
      if (item) {
        item.options = dictDataOptions.map((item) => ({
          value: item.dictType,
          label: item.dictName,
        }));
        item.value = dictDetail?.dictType || "";
        item.defaultValue = dictDetail?.dictType || "";
      }
      return DictDetail_formData;
    },
  },
  mounted() {
    this.init();
    this.getDictDataOptions();
  },
  methods: {
    async init() {
      const [, data] = await this.$http.DictionaryManage.GetDictionaryInfo({
        dictId: this.editInfo?.dictId || "",
      });
      if (!data) {
        this.$message.error(data?.msg || "获取字典详情异常");
      }
      if (data?.dictType) {
        this.query.dictType = data.dictType;
        this.dictType = data.dictType;
      }
      this.dictDetail = data || {};
      this.getList();
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
      this.getList(true);
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getList(false);
    },
    onSelectChange(item) {
      if (item?.prop === "dictType") {
        this.dictType = item.val;
      }
    },
    onSearch(data) {
      this.query = { ...data };
      this.getList(true);
    },
    async onExport(data) {
      if (this.isExporting) return false;
      const query = { ...data };
      this.isExporting = true;
      const [, res] = await this.$http.ExportImport.ExportDictDataList({
        ...this.page,
        ...query,
      });
      this.isExporting = false;
      if (!res) return this.$message.error("导出失败");
      const item = this.dictDataOptions.find(
        (item) => item.dictType === query?.dictType
      );
      this.onExportDownloadFile({
        data: res,
        tipText: "导出成功，是否进行下载？",
        fileName: item?.dictName || "字典数据",
      });
    },
    handleAdd() {
      this.$emit("updateDictData", {
        dictType: this.dictType,
      });
    },
    handleEdit({ dictCode }) {
      this.$emit("updateDictData", {
        dictCode: dictCode,
        dictType: this.dictType,
      });
    },
    async handleDelete({ dictCode }) {
      try {
        await this.$confirm("确定要取消该字典吗?", "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.DictionaryManage.DeleteDictionaryData({
          dictCode,
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
        console.error(error);
        error;
      }
    },
    // 获取字典数据选择框列表
    async getDictDataOptions() {
      const [, res] = await this.$http.DictionaryManage.GetDictionaryOptions();
      this.dictDataOptions = res?.length ? res : [];
    },
    async getList(isClear) {
      if (!this.editInfo?.dictId) return;
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.DictionaryManage.GetDictionaryDataList(
        query
      );
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取字典数据列表异常");
      }
      this.list = res?.rows || [];
      this.total = res?.total || 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.action {
  margin: 20px 0;
}
.el-form-item {
  padding: 0 18px;
}
</style>

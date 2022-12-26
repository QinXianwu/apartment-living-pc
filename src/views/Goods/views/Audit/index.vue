<template>
  <div class="GoodsAudit view-container">
    <div class="content">
      <SearchForm
        isReturnFormData
        :formData="searchForm"
        @on-search="onSearch"
      />
      <div class="action">
        <el-button type="primary" @click="handleAdd">审核通过</el-button>
        <el-button type="danger" @click="handleAdd">审核驳回</el-button>
      </div>
      <TablePanel
        :tableData="list"
        :tableHead="column"
        :checkbox="true"
        :isShowTopCheck="false"
        @selection-change="handleSelectionChange"
      >
        <template #status="{ scope }">
          <el-tag
            :type="
              scope.status === $CONST.AUDIT_TYPE.FAIL_CHECK ? 'danger' : ''
            "
            v-if="scope.status !== ''"
            >{{ $CONST.AUDIT_TYPE_TEXT[scope.status] }}</el-tag
          >
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleEdit(scope)"> 编辑 </el-button>
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
import { mapGetters } from "vuex";
import { formData, column } from "./config";

export default {
  name: "GoodsAudit",
  components: {},
  data() {
    return {
      formData,
      column,
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      query: {},
      total: 0,
      selectDataMap: {},
    };
  },
  computed: {
    ...mapGetters({
      supplierOptions: "accountRoleManage/supplierOptions",
      categoryAllOptions: "goods/CategoryAllOptions",
    }),
    searchForm({ formData, categoryAllOptions, supplierOptions }) {
      const categoryItem = formData.find((item) => item.prop === "categoryId");
      if (categoryItem) categoryItem.options = categoryAllOptions;
      const supplierItem = formData.find((item) => item.prop === "supplierId");
      if (supplierItem) supplierItem.options = supplierOptions;
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
    onSearch(data) {
      this.query = { ...data };
      this.getList(true);
    },
    handleAdd() {
      //
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
            this.getList();
          }
        });
      } catch (error) {
        console.error(error);
        error;
      }
    },
    handleSelectionChange(val) {
      this.list.forEach((item) => {
        // 存在于当前页以及map 但不存在 val -> 去掉
        const index = val.findIndex((vItem) => vItem?.id === item.id);
        if (this.selectDataMap[item.id] && index < 0)
          delete this.selectDataMap[item.id];
      });
      val.forEach((item) => (this.selectDataMap[item.id] = { ...item }));
      this.isDisabledDelete = !Object.keys(this.selectDataMap).length;
    },
    initSelection() {
      if (!this.list?.length) return;
      this.list.forEach((item) => {
        if (this.selectDataMap[item?.id]) {
          this.$nextTick(() => {
            this.$refs.TablePanel.setSelection(item, true);
          });
        }
      });
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.GoodsAudit.GetList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取商品列表异常");
      }
      this.list = res?.rows || [];
      this.total = res?.total || 0;
    },
  },
  mounted() {
    this.getList();
    this.$store.dispatch("goods/GetCategoryAllAction");
    this.$store.dispatch("accountRoleManage/GetSupplierListAction");
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

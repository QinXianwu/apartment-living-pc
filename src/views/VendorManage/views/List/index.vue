<template>
  <div class="VendorList view-container">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <div class="action">
        <el-button type="primary" @click="handleAdd">新增供应商</el-button>
      </div>
      <TablePanel :tableData="list" :tableHead="column">
        <template #address="{ scope }">
          <span>{{ scope | filtersAddress }}</span>
        </template>
        <template #status="{ scope }">
          <el-tag
            :type="scope.status === $CONST.SUPPLIER_STATE.OFF ? 'danger' : ''"
            >{{ $CONST.SUPPLIER_STATE_TEXT[scope.status] }}</el-tag
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
    <UpdateSupplierDiaog
      :show.sync="showSupplierDetail"
      :editInfo="editInfo"
      @close="close"
    />
  </div>
</template>

<script>
import { formData, column } from "./config";
import UpdateSupplierDiaog from "./components/UpdateSupplierDiaog.vue";
export default {
  components: { UpdateSupplierDiaog },
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
      editInfo: {},
      total: 0,
      showSupplierDetail: false,
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
    handleAdd() {
      this.editInfo = {};
      this.showSupplierDetail = true;
    },
    handleEdit(item) {
      this.editInfo = { id: item?.id || "" };
      this.showSupplierDetail = true;
    },
    handleRemark() {
      //
    },
    retroactivePoints() {
      //
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showSupplierDetail = false;
      if (isRefresh) this.getList();
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.Supplier.GetSupplierList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取供应商列表异常");
      }
      const data = res?.rows?.length ? res?.rows : [];
      this.list = data || [];
      this.total = res?.total || 0;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.VendorList {
  background: #fff;
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
}
</style>

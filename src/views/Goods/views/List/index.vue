<template>
  <div class="GoodsList view-container">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <div class="action">
        <el-button type="primary" @click="handleAdd">新增商品</el-button>
        <el-button type="primary" plain>批量上架</el-button>
        <el-button type="primary" plain>批量下架</el-button>
      </div>
      <TablePanel :tableData="list" :tableHead="column">
        <template #goodsTab="{ scope }">
          {{ $CONST.PROTOCOL_TYPE_TEXT[scope.type] }}
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
import { formData, column } from "./config";

export default {
  name: "GoodsList",
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
      this.$router.push({
        name: "GoodsEdit",
        query: { productNo: "", serviceId: "" },
      });
    },
    handleEdit() {
      this.$router.push({
        name: "GoodsEdit",
        query: { productNo: "", serviceId: "" },
      });
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
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.Goods.GetList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取商品列表异常");
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

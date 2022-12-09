<template>
  <div class="GoodsCategory view-container">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <div class="action">
        <el-button type="primary" @click="handleAdd">新增分类</el-button>
      </div>
      <TablePanel :tableData="list" :tableHead="column">
        <template #icon="{ scope }">
          <ImageView class="mainImg" :src="scope.icon | formatImage" />
        </template>
        <template #navigationShow="{ scope }">
          <el-switch
            v-model="scope.navigationShow"
            :active-value="$CONST.CATEGORY_NAV_STATE.ON"
            :inactive-value="$CONST.CATEGORY_NAV_STATE.OFF"
          >
            <!-- @change="handleStatusChange(scope)" -->
          </el-switch>
        </template>
        <template #hotShow="{ scope }">
          <el-switch
            v-model="scope.hotShow"
            :active-value="$CONST.CATEGORY_HOT_TYPE.YES"
            :inactive-value="$CONST.CATEGORY_HOT_TYPE.NOT"
          >
          </el-switch>
        </template>
        <template #status="{ scope }">
          <el-tag
            :type="scope.status === $CONST.CATEGORY_STATE.OFF ? 'danger' : ''"
            >{{ $CONST.CATEGORY_STATE_TEXT[scope.status] }}</el-tag
          >
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleEdit(scope)">编辑</el-button>
            <el-button type="text" @click="handleDelete(scope)">删除</el-button>
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
      editInfo: {},
      showUpdataCategory: false,
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
      this.editInfo = "";
      this.showUpdataCategory = true;
    },
    handleEdit() {
      //
    },
    close() {
      this.editInfo = "";
      this.showUpdataCategory = false;
    },
    async handleDelete({ id }) {
      try {
        await this.$confirm(
          `是否确认删除日志编号为${id}的数据项？`,
          "删除提示",
          {
            type: "warning",
            showClose: false,
          }
        );
        const [, res] = await this.$http.OperationalLogs.DeleteOperLog({
          operId: id,
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
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.GoodsCategory.GetList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取商品分类列表异常");
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
.mainImg {
  width: 60px;
  height: 60px;
  margin-right: 10px;
}
</style>

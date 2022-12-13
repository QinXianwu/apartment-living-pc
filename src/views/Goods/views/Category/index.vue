<template>
  <div class="GoodsCategory view-container">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <div class="action">
        <el-button type="primary" @click="handleAdd">新增分类</el-button>
      </div>
      <TablePanel :tableData="list" :tableHead="column">
        <template #icon="{ scope }">
          <ImageView class="mainImg" :src="scope.icon" />
        </template>
        <template #navigationShow="{ scope }">
          <el-tag
            :type="
              scope.navigationShow === $CONST.CATEGORY_NAV_STATE.HIDE
                ? 'danger'
                : ''
            "
            >{{ $CONST.CATEGORY_NAV_STATE_TEXT[scope.navigationShow] }}</el-tag
          >
        </template>
        <template #hotShow="{ scope }">
          <el-tag
            :type="
              scope.hotShow === $CONST.CATEGORY_HOT_TYPE.NOT ? 'danger' : ''
            "
            >{{ $CONST.CATEGORY_HOT_TYPE_TEXT[scope.hotShow] }}</el-tag
          >
        </template>
        <template #status="{ scope }">
          <el-switch
            v-model="scope.status"
            :active-value="$CONST.CATEGORY_STATE.ON"
            :inactive-value="$CONST.CATEGORY_STATE.OFF"
            @change="handleStatusChange(scope)"
          >
          </el-switch>
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
    <UpdateCategoryDiaog
      :editInfo="editInfo"
      :show.sync="showUpdataCategory"
      @close="close"
    />
  </div>
</template>

<script>
import { formData, column } from "./config";
import UpdateCategoryDiaog from "./components/UpdateCategoryDiaog.vue";

export default {
  name: "GoodsList",
  components: { UpdateCategoryDiaog },
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
    handleEdit({ id }) {
      this.editInfo = { id };
      this.showUpdataCategory = true;
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showUpdataCategory = false;
      if (isRefresh) this.getList(isRefresh);
    },
    async handleDelete({ id, name }) {
      try {
        await this.$confirm(`确认删除 '${name}' 分类吗？`, "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.GoodsCategory.DeleteCategory(
          JSON.stringify([id])
        );
        const msg = res ? res?.msg || `删除成功` : `删除失败`;
        this.$confirm(msg, "删除提示", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) {
            this.getList();
            this.$store.dispatch("goods/GetCategoryAllAction", true);
          }
        });
      } catch (error) {
        console.error(error);
        error;
      }
    },
    async handleStatusChange(item) {
      const tipText =
        item?.status === this.$CONST.CATEGORY_STATE.ON ? "启用" : "禁止";
      try {
        await this.$confirm(`确定要${tipText}该分类吗?`, tipText, {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.GoodsCategory.UpdateCategoryStatus({
          id: item?.id || "",
          status: item.status,
        });
        const msg = res ? res?.msg || `${tipText}成功` : `${tipText}失败`;
        this.$store.dispatch("goods/GetCategoryAllAction", true);
        this.$confirm(msg, "操作结果", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) this.getList();
        });
      } catch (error) {
        item.status =
          item?.status === this.$CONST.CATEGORY_STATE.ON
            ? this.$CONST.CATEGORY_STATE.OFF
            : this.$CONST.CATEGORY_STATE.ON;
        console.error(error);
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

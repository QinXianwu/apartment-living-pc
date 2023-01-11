<template>
  <el-dialog
    width="950px"
    title="选择商品"
    :visible.sync="visible"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <TablePanel
        ref="TablePanel"
        :tableData="list"
        :tableHead="tableHead"
        :checkbox="true"
        :isShowTopCheck="false"
        v-loading="isLoadingList"
        @selection-change="handleSelectionChange"
      >
        <template #goodsInfo="{ scope }">
          <div class="goodsInfo">
            <ImageView customClass="table-img" :src="scope.mainImage" />
            <div class="name">
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.productName"
                placement="right"
              >
                <span>{{ scope.productName }}</span>
              </el-tooltip>
            </div>
          </div>
        </template>
      </TablePanel>
      <!-- 分页 -->
      <Pagination
        :fixed="false"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="page.pageSize"
        :current-page="page.pageNum"
        :total="total"
      />
    </div>
    <span slot="footer">
      <el-button type="primary" :loading="isLoading" @click="handleSubmit">
        保存
      </el-button>
      <el-button @click="handleClose(false)"> 取消 </el-button>
    </span>
  </el-dialog>
</template>
<script>
import { digits2Str } from "@/utils/index";
import { column, formData } from "./config";
import dialogMixin from "@/mixins/dialogMixin";

export default {
  name: "ChooseGoodsDiaog",
  mixins: [dialogMixin],
  components: {},
  props: {
    selectIds: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    visible(val) {
      if (val) this.getList(val);
      else this.selectDataMap = {};
    },
  },
  data() {
    return {
      column,
      formData,
      isLoading: false,
      isLoadingList: false,
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      query: {}, //过滤规则
      selectDataMap: {},
    };
  },
  computed: {
    tableHead({ column }) {
      const filterPropStr = "action";
      return column.filter((item) => !filterPropStr.includes(item.prop));
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
    async getList(isClear) {
      this.isLoadingList = true;
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.Goods.GetList(query);
      this.isLoadingList = false;
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取服务点商品列表异常");
      }
      const data = res?.rows?.length ? res.rows : [];
      data.forEach((item) =>
        digits2Str(item, ["id", "categoryId", "stationId", "supplierId"])
      );
      this.list = data;
      this.total = res?.total || 0;
      this.initSelection();
    },
    initSelection() {
      if (!this.list?.length) return;
      const ids = this.selectIds?.length ? this.selectIds : [];
      ids.forEach((id) => {
        const item = this.list.find((item) => item.id === id);
        if (!this.selectDataMap[id] && item) this.selectDataMap[id] = item;
      });
      this.list.forEach((item) => {
        if (this.selectDataMap[item?.id]) {
          this.$nextTick(() => {
            this.$refs.TablePanel.setSelection(item, true);
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.list.forEach((item) => {
        // 存在于当前页以及map 但不存在 val -> 去掉
        const index = val.findIndex((vItem) => vItem?.id === item.id);
        if (this.selectDataMap[item.id] && index < 0)
          delete this.selectDataMap[item.id];
      });
      val.forEach((item) => (this.selectDataMap[item.id] = { ...item }));
    },
    async handleSubmit() {
      // if (!Object.keys(this.selectDataMap).length)
      //   return this.$message.error("请选择商品后再试");
      this.$emit("on-success", Object.values(this.selectDataMap));
      this.handleClose(true);
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.content {
  ::v-deep .pagination {
    border-top: none;
  }
}
.goodsInfo {
  display: flex;
  align-items: center;
  .table-img {
    width: 60px;
    height: 60px;
  }
  .name {
    margin-left: 10px;
    @include overflow-eps(2);
  }
}
</style>

<template>
  <el-dialog
    width="1050px"
    title="选择规格"
    :visible.sync="visible"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <div class="content">
      <TablePanel
        ref="TablePanel"
        :tableData="
          list.slice(
            (page.pageNum - 1) * page.pageSize,
            page.pageNum * page.pageSize
          )
        "
        :tableHead="tableHead"
        :checkbox="!isRadio"
        :isShowTopCheck="false"
        v-loading="isLoadingList"
        @selection-change="handleSelectionChange"
      >
        <!-- 复选框(只允许选中一个) -->
        <template #custom_checkbox="{ scope }">
          <div class="checkbox">
            <el-checkbox
              :value="!!selectDataMap[scope[onlyKey]]"
              @change="handleRadioChange(scope)"
            >
            </el-checkbox>
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
import { mapGetters } from "vuex";
// import { digits2Str } from "@/utils/index";
import { column } from "./GoodsSpecs/config";
import dialogMixin from "@/mixins/dialogMixin";

export default {
  name: "ChooseSpecsDiaog",
  mixins: [dialogMixin],
  components: {},
  props: {
    productNo: {
      type: String,
      default: "",
    },
    // 选中的唯一标识key
    onlyKey: {
      type: String,
      default: "id",
    },
    // 是否是单选
    isRadio: {
      type: Boolean,
      default: false, // 默认多选
    },
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
    tableHead({ isRadio, column, list }) {
      let isDeleteId2 = true;
      try {
        list.forEach((item) => {
          if (item?.specificationValueName2) {
            isDeleteId2 = false;
            throw new Error();
          }
        });
      } catch (error) {
        //
      }
      const filterPropStr = `action,${isRadio ? "" : "custom_checkbox"},${
        isDeleteId2 ? "specificationValueName2" : ""
      }`;
      return column.filter((item) => !filterPropStr.includes(item.prop));
    },
    ...mapGetters({
      serviceStationId: "user/serviceStationId",
    }),
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
    },
    async getList(isClear) {
      this.isLoadingList = true;
      if (isClear) this.page.pageNum = 1;
      const [, res] = await this.$http.Goods.GetGoodsInfo({
        productNo: this.productNo,
      });
      this.isLoadingList = false;
      const data = res?.productStockPriceList || [];
      // data.forEach((item) => digits2Str(item, ["id"]));
      this.list = data;
      this.total = data?.total || 0;
      this.initSelection();
    },
    initSelection() {
      if (!this.list?.length) return;
      const ids = this.selectIds?.length
        ? this.isRadio
          ? [this.selectIds[0]]
          : this.selectIds
        : [];
      ids.forEach((id) => {
        const item = this.list.find((item) => item[this.onlyKey] === id);
        if (!this.selectDataMap[id] && item) this.selectDataMap[id] = item;
      });
      this.list.forEach((item) => {
        if (this.selectDataMap[item[this.onlyKey]]) {
          this.$nextTick(() => {
            this.$refs.TablePanel.setSelection(item, true);
          });
        }
      });
    },
    // 单选
    handleRadioChange(item) {
      if (!this.isRadio) return;
      if (this.selectDataMap[item[this.onlyKey]]) {
        this.selectDataMap = {};
      } else {
        this.selectDataMap = { [item[this.onlyKey]]: item };
      }
    },
    // 多选
    handleSelectionChange(val) {
      if (this.isRadio) return;
      this.list.forEach((item) => {
        // 存在于当前页以及map 但不存在 val -> 去掉
        const index = val.findIndex(
          (vItem) => vItem[this.onlyKey] === item[this.onlyKey]
        );
        if (this.selectDataMap[item[this.onlyKey]] && index < 0)
          delete this.selectDataMap[item[this.onlyKey]];
      });
      val.forEach(
        (item) => (this.selectDataMap[item[this.onlyKey]] = { ...item })
      );
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

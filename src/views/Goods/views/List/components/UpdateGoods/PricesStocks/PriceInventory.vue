<template>
  <div class="PriceInventory">
    <div class="action">
      <div class="batch-input" v-if="showBatchInput">
        <span class="mr-10 form-tip">{{ batchData.label }}</span>
        <el-input-number
          v-model="batchData.val"
          placeholder="请输入"
          :precision="batchData.precision"
          :max="batchData.max"
          :min="batchData.min"
          :controls="false"
          class="input-small"
        />
        <el-button
          class="ml-10"
          type="text"
          @click="
            showBatchInput = false;
            batchData.val = '';
          "
        >
          取消
        </el-button>
      </div>
      <div class="btn-list" v-else>
        <template v-for="(item, index) in actionHead">
          <el-button
            :key="index"
            v-if="item.btnText"
            type="text"
            @click="batchAction(item.prop)"
          >
            {{ item.btnText }}
          </el-button>
        </template>
      </div>
      <el-button
        type="primary"
        v-if="batchData.val || batchData.val === 0"
        @click="handleBatch"
        >一键填充</el-button
      >
      <el-button type="primary" @click="clearedList">清空</el-button>
    </div>
    <div class="content">
      <TablePanel
        :tableData="
          list.slice(
            (page.pageNum - 1) * page.pageSize,
            page.pageNum * page.pageSize
          )
        "
        :tableHead="tableHead"
      >
        <template #images="{ scope }">
          <Uploader :list.sync="scope.images" />
        </template>
      </TablePanel>
      <!-- 分页 -->
      <Pagination
        :fixed="false"
        :pageSizes="[5, 10, 20, 50, 100]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="page.pageSize"
        :current-page="page.pageNum"
        :total="list.length"
      />
    </div>
  </div>
</template>

<script>
import { dynamic_column, column } from "../../../config/pricesStocks";
import Uploader from "@/components/Uploader";
export default {
  name: "PriceInventory",
  components: { Uploader },
  props: {
    isDiscount: {
      type: Boolean,
      default: false,
    },
    skuList: {
      type: Array,
      default: () => [],
    },
    skuData: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    skuList(val) {
      if (!val?.length) this.list = [];
      else {
        this.list = this.skuRowList.map((item) => ({
          ...item,
          images: [],
        }));
      }
    },
    list(val) {
      this.$emit("update:skuData", val?.length ? val : []);
    },
  },
  data() {
    return {
      column,
      dynamic_column,
      list: [],
      batcOld: {},
      batchData: {
        val: "",
        key: "",
        label: "",
        precision: 2,
        max: 999999999999,
        min: 0,
      },
      showBatchInput: false,
      page: {
        pageNum: 1,
        pageSize: 5,
      },
    };
  },
  computed: {
    actionHead({ isDiscount, column }) {
      if (isDiscount) return column;
      const props = "discount,discountPrice";
      return column.filter((item) => !props.includes(item.prop));
    },
    tableHead({ skuList, dynamic_column, actionHead }) {
      let tempHead1 = [];
      if (skuList?.length <= 1) {
        tempHead1 = dynamic_column.filter(
          (item) => item.prop !== "specificationValueName2"
        );
      } else {
        tempHead1 = dynamic_column;
      }
      return [].concat(
        tempHead1,
        [
          {
            label: "规格图片",
            prop: "images",
            type: "custom",
            minWidth: 100,
          },
        ],
        actionHead
      );
    },
    // 规格列表下的规格值组合
    skuRowList({ skuList }) {
      if (!skuList?.length) return [];
      else if (skuList.length <= 1)
        return skuList[0].productSpecificationValueList?.length
          ? skuList[0].productSpecificationValueList.map((ele) => ({
              specificationValueId1: ele.id,
              specificationValueId2: "",
              specificationValueName1: ele.specificationValueName,
              specificationValueName2: "",
            }))
          : [];
      const list = [];
      skuList.forEach((item, index) => {
        const tempIndex = index + 1;
        if (
          item.productSpecificationValueList?.length &&
          skuList.length > tempIndex
        ) {
          item.productSpecificationValueList.forEach((ele) => {
            skuList[tempIndex].productSpecificationValueList.forEach((i) => {
              list.push({
                specificationValueId1: ele.id,
                specificationValueId2: i.id,
                specificationValueName1: ele.specificationValueName,
                specificationValueName2: i.specificationValueName,
              });
            });
          });
        }
      });
      return list;
    },
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
    },
    clearedList() {
      this.list = this.skuRowList.map((item) => ({
        ...item,
        images: [],
      }));
    },
    batchAction(key) {
      this.batchData.key = key;
      this.batchData.val = "";
      const item = this.column.find((item) => item.prop === key);
      if (key === "discount") {
        this.batchData.precision = item.precision;
        this.batchData.max = item.max;
      } else {
        this.batchData.precision = this.batcOld.precision;
        this.batchData.max = this.batcOld.max;
      }
      this.batchData.label = item.btnText;
      this.showBatchInput = true;
    },
    // 批量操作
    handleBatch() {
      if (!this.skuList?.length)
        return this.$message.error("请选择商品规格后再试");
      const updateObj = {};
      const sellPrice = this.list?.length ? this.list[0].sellPrice : "";
      const discount = this.list?.length ? this.list[0].discount : "";
      const discountPrice = this.list?.length ? this.list[0].discountPrice : "";
      if (this.batchData.key === "discount") {
        // 批量输入折扣
        updateObj.discount = this.batchData.val;
        // 计算折扣价
        if (sellPrice)
          updateObj.discountPrice = (
            (sellPrice * updateObj.discount * 100000) /
            1000000
          ).toFixed(2);
      } else if (this.batchData.key === "discountPrice") {
        // 批量输入折扣价
        updateObj.discountPrice = this.batchData.val;
        // 计算折扣
        if (sellPrice)
          updateObj.discount = (
            (updateObj.discountPrice * 1000000) /
            sellPrice /
            100000
          ).toFixed(1);
      } else if (this.batchData.key === "sellPrice") {
        // 批量输入销售价
        updateObj.sellPrice = this.batchData.val;
        // 计算折扣价
        if (discount && this.isDiscount)
          updateObj.discountPrice = (
            (discount * updateObj.sellPrice * 1000000) /
            10000000
          ).toFixed(2);
        // 计算折扣
        else if (discountPrice && this.isDiscount)
          updateObj.discount = (
            (discountPrice * 1000000) /
            updateObj.sellPrice /
            100000
          ).toFixed(1);
      } else {
        updateObj[this.batchData.key] = this.batchData.val;
      }
      this.list = this.list.map((item) => ({
        ...item,
        ...updateObj,
      }));
      this.showBatchInput = false;
      this.batchData.val = "";
    },
  },
  mounted() {
    this.batcOld = { ...this.batchData };
  },
};
</script>
<style lang="scss" scoped>
.content {
  padding: 10px 0;
}
.action {
  display: flex;
  padding: 0 0 15px;
  .btn-list {
    margin-right: 20px;
  }
  .batch-input {
    margin-right: 20px;
  }
}
</style>

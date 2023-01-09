<template>
  <div class="PriceInventory">
    <div class="action" v-if="!isDisableForm">
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
        @click="batchActionList"
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
          <Uploader :list.sync="scope.images" :isOperation="!isDisableForm" />
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="batchActionRow(scope)"
              >单行填充</el-button
            >
            <el-button type="text" @click="closeRow(scope)"> 清空 </el-button>
          </div>
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
import { mapState, mapGetters } from "vuex";
import Uploader from "@/components/Uploader";
import { dynamic_column, column } from "../../config/index";
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
    productStockPriceList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    skuList() {
      this.init();
    },
    list(val) {
      this.$emit("update:skuData", val?.length ? val : []);
    },
    // productStockPriceList(val) {
    //   if (val?.length) this.init();
    // },
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
      productNo: "",
    };
  },
  computed: {
    ...mapState({
      isDisableForm: (state) => state.goods.isDisableForm,
    }),
    ...mapGetters({
      isVendor: "user/isVendor",
    }),
    actionHead({ isVendor, isDiscount, column }) {
      if (isVendor)
        return column.filter((item) => item.prop === "originalPrice");
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
        actionHead,
        [
          {
            label: "操作",
            prop: "action",
            type: "custom",
            fixed: "right",
            width: 250,
          },
        ]
      );
    },
    initData({ column }) {
      const obj = {
        images: [],
      };
      column.forEach((item) => (obj[item.prop] = 0));
      return obj;
    },
  },
  methods: {
    init() {
      const data = this.getSkuCombo(this.skuList);
      if (!this.productStockPriceList?.length) {
        this.list = data;
        return;
      }
      this.productStockPriceList.forEach((item) => {
        let oldItem = data.find((ele) => {
          item.specificationValueId1 = item?.specificationValueId1 || "";
          item.specificationValueId2 = item?.specificationValueId2 || "";
          if (
            (item.specificationValueId1 === ele.specificationValueId1 &&
              item.specificationValueId2 === ele.specificationValueId2) ||
            (item.specificationValueId1 === ele.specificationValueId2 &&
              item.specificationValueId2 === ele.specificationValueId1)
          )
            return ele;
          else return null;
        });
        if (!oldItem) return;
        for (const key in item) {
          if (key === "images")
            oldItem.images = item[key] ? [{ url: item[key] }] : "";
          else oldItem[key] = item[key] || oldItem[key] || 0;
        }
      });
      this.list = data;
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
    },
    clearedList() {
      this.list = this.getSkuCombo(this.skuList).map((item) => ({
        ...item,
        ...this.initData,
        images: item?.images || [],
      }));
    },
    closeRow(item) {
      this.column.forEach((ele) => (item[ele.prop] = 0));
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
        if (this.batchData.val > sellPrice)
          return this.$message.error("折扣价不得大于销售价");
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
      return updateObj;
    },
    batchActionRow(item) {
      const data = this.handleBatch();
      for (const key in data) {
        item[key] = data[key];
      }
      // this.showBatchInput = false;
      // this.batchData.val = "";
    },
    batchActionList() {
      const data = this.handleBatch();
      this.list = this.list.map((item) => ({
        ...item,
        ...data,
      }));
      this.showBatchInput = false;
      this.batchData.val = "";
    },
    // sku列表组合
    getSkuCombo(skuList = []) {
      if (!skuList?.length) return [];
      const skuComboData = [];
      skuList.map((item, index) => {
        const nextIndex = index + 1;
        const nextItem = skuList.length > nextIndex ? skuList[nextIndex] : {};
        const valArr = item?.productSpecificationValueList || [];
        const nextValArr = nextItem?.productSpecificationValueList || [];
        const itemValArr = valArr.map((ele) => {
          const oldItem = this.list.find(
            (listItem) =>
              listItem.specificationValueId1 === ele?.specificationValueId &&
              !listItem.specificationValueId2
          );
          const tempObj = oldItem || {
            ...this.specificationItem(ele),
            ...this.initData,
          };
          return tempObj;
        });
        if (
          skuList.length === 1 ||
          (skuList.length - 1 >= nextIndex && !nextValArr.length)
        ) {
          itemValArr.forEach((i) => skuComboData.push(i));
        } else if (skuList.length - 1 >= nextIndex && nextValArr.length) {
          valArr.forEach((ele) => {
            nextValArr.forEach((v) => {
              const oldItem = this.list.find(
                (listItem) =>
                  listItem.specificationValueId1 ===
                    ele?.specificationValueId &&
                  listItem.specificationValueId2 === v?.specificationValueId
              );
              const tempData = {
                ...this.specificationItem(ele, v),
                ...this.initData,
              };
              skuComboData.push(oldItem || tempData);
            });
          });
        }
      });
      return skuComboData;
    },
    specificationItem(data1, data2) {
      return {
        specificationValueId1: data1?.specificationValueId || "",
        specificationValueId2: data2?.specificationValueId || "",
        specificationValueName1: data1?.specificationValueName || "",
        specificationValueName2: data2?.specificationValueName || "",
      };
    },
    async getQuery() {
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        try {
          for (const index in this.list) {
            if (!this.list[index]?.images || !this.list[index]?.images?.length)
              throw Error("请上传相关商品规格图片");
          }
        } catch (error) {
          console.error(error);
          return this.$message.error(error);
        }
        const data = this.list.map((item) => ({
          ...item,
          images: item.images[0].url,
        }));
        resolve({
          productStockPriceList: data,
        });
      });
    },
  },
  mounted() {
    const { query } = this.$route;
    this.productNo = query?.productNo || "";
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

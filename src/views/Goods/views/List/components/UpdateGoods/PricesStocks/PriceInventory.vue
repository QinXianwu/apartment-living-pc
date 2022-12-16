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
        <template v-for="(item, index) in column">
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
      <el-button type="primary">清空</el-button>
    </div>
    <div class="content">
      <TablePanel :tableData="list" :tableHead="tableHead">
        <template #goodsTab="{ scope }">
          {{ $CONST.PROTOCOL_TYPE_TEXT[scope.type] }}
        </template>
      </TablePanel>
    </div>
  </div>
</template>

<script>
import { dynamic_column, column } from "../../../config/pricesStocks";
export default {
  name: "PriceInventory",
  components: {},
  props: {
    skuList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    skuList(val) {
      if (!val?.length) this.list = [];
    },
  },
  data() {
    return {
      column,
      list: [],
      batchData: {
        val: "",
        key: "",
        label: "",
        precision: 2,
        max: 999999999999,
        min: 0,
      },
      showBatchInput: false,
    };
  },
  computed: {
    tableHead() {
      return [...dynamic_column, ...column];
    },
  },
  methods: {
    batchAction(key) {
      this.batchData.key = key;
      this.batchData.val = "";
      const item = this.column.find((item) => item.prop === key);
      if (key === "discount") {
        this.batchData.precision = item.precision;
        this.batchData.max = item.max;
      }
      this.batchData.label = item.btnText;
      this.showBatchInput = true;
    },
    handleBatch() {
      console.log(this.batchData);
      if (!this.skuList?.length)
        return this.$message.error("请选择商品规格后再试");
    },
  },
  mounted() {
    //
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

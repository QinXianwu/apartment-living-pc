<template>
  <div class="PricesStocks">
    <div class="title">价格与库存</div>
    <div class="content">
      <el-form label-width="120px">
        <el-form-item label="商品规格">
          <GoodsSpecifica
            ref="GoodsSpecifica"
            :specificaList.sync="specificaList"
          />
        </el-form-item>
        <el-form-item label="价格库存">
          <PriceInventory ref="PriceInventory" :skuList="specificaList" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import GoodsSpecifica from "./GoodsSpecifica.vue";
import PriceInventory from "./PriceInventory.vue";

export default {
  name: "PricesStocks",
  components: { GoodsSpecifica, PriceInventory },
  props: {},
  data() {
    return {
      specificaList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.PricesStocks {
  padding: 20px 20px 0;
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .action {
    padding: 10px 0;
  }
  ::v-deep .el-radio-button__inner {
    padding: 9px 20px;
  }
}
</style>

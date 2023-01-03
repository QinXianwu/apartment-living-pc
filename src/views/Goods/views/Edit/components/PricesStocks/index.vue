<template>
  <div class="PricesStocks">
    <div class="title">价格与库存</div>
    <div class="content">
      <el-form label-width="120px">
        <el-form-item label="商品规格">
          <GoodsSpecifica
            ref="GoodsSpecifica"
            :specificaList.sync="specificaList"
            :productSpecificationList="productSpecificationList"
          />
        </el-form-item>
        <el-form-item label="价格库存">
          <PriceInventory
            ref="PriceInventory"
            :isDiscount="discountIs === CONST.DISCOUNTED_TYPE.YES"
            :skuList="specificaList"
            :skuData.sync="skuData"
            :productStockPriceList="productStockPriceList"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import { digits2Str } from "@/utils/index";
import GoodsSpecifica from "./GoodsSpecifica.vue";
import PriceInventory from "./PriceInventory.vue";

export default {
  name: "PricesStocks",
  components: { GoodsSpecifica, PriceInventory },
  props: {
    productInfo: {
      type: Object,
      default: () => ({}),
    },
    discountIs: {
      type: [Number, String],
      default: CONST.DISCOUNTED_TYPE.NOT,
    },
  },
  data() {
    return {
      CONST,
      specificaList: [],
      skuData: [],
      productSpecificationList: [], // 规格实体
      productStockPriceList: [], // 价格库存实体
    };
  },
  computed: {},
  watch: {
    productInfo(val) {
      if (val) this.init();
    },
  },
  methods: {
    init() {
      // 数据库18位id转换为字符串
      const data1 = this.productInfo?.productSpecificationList || [];
      const ids = ["id", "specificationId"];
      const valIds1 = ["id", "productSpecificationId", "specificationValueId"];
      const valIds2 = ["id", "specificationValueId1", "specificationValueId2"];
      data1.map((item) => {
        digits2Str(item, ids);
        if (!item?.productSpecificationValueList?.length) return;
        item.productSpecificationValueList.map((ele) => {
          digits2Str(ele, valIds1);
        });
      });
      this.productSpecificationList = data1;

      const data2 = this.productInfo?.productStockPriceList || [];
      data2.forEach((item) => digits2Str(item, valIds2));
      this.productStockPriceList = data2;
    },
    async getQuery() {
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        const data1 = await this.$refs.GoodsSpecifica.getQuery();
        if (!data1?.productSpecificationList) {
          return this.$message.error("请选择商品规格后再试");
        }
        const data2 = await this.$refs.PriceInventory.getQuery();
        resolve({
          ...data1,
          ...data2,
        });
      });
    },
  },
  mounted() {
    this.init();
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

<template>
  <div class="ProcurementDetail view-container">
    <div class="title">采购订单详情</div>
    <PriceBlock title="订单号" :value="editInfo.pdOrderNo || '-'" />
    <ProcurementInfo :orderInfo="orderInfo" />
    <FooterView :cancelType="true" @cancel="$emit('close', false)" />
  </div>
</template>
<script>
import { digits2Str } from "@/utils/index";
import PriceBlock from "./PriceBlock.vue";
import ProcurementInfo from "./ProcurementInfo.vue";
import FooterView from "@/components/Footer";

export default {
  name: "ProcurementDetail",
  components: { PriceBlock, ProcurementInfo, FooterView },
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {},
  data() {
    return {
      isLoading: false,
      orderInfo: {},
      serviceStationInfo: {},
      supplierInfo: {},
      page: {
        pageNum: 1,
        pageSize: 5,
      },
    };
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
    },
    async getOrderDetail() {
      if (!this.editInfo?.pdOrderNo) return;
      const [, res] = await this.$http.Order.GetPurchaseOrderDetail({
        pdOrderNo: this.editInfo.pdOrderNo || "",
      });
      if (!res) return this.$message.error("获取订单详情异常");
      const keys1 = ["id", "serviceId"];
      digits2Str(res, keys1);
      const keys2 = ["id", "productStockPriceId"];
      this.orderInfo = { ...res };
      const skuList = this.orderInfo?.orderDetailsList?.length
        ? this.orderInfo.orderDetailsList
        : [];
      skuList.forEach((item) => digits2Str(item, keys2));
      this.orderInfo.orderDetailsList = skuList;
    },
  },
  filters: {},
  mounted() {
    if (this.editInfo?.pdOrderNo) {
      this.orderInfo = {};
      this.getOrderDetail();
    }
  },
};
</script>
<style lang="scss" scoped>
.ProcurementDetail {
  background: #fff;
  padding: 0 10px;
  margin: 0 0 60px;
  .title {
    font-size: 15px;
    font-weight: bold;
    color: $main-font-color;
    margin-bottom: 20px;
  }
  .label {
    font-size: 14px;
    color: $main-font-color;
  }
  .goods-img {
    width: 100px;
    height: 100px;
  }
  .putNum {
    width: 120px;
  }
}
</style>

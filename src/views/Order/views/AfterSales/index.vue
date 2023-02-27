<template>
  <div class="AfterSales">
    <OrderData ref="OrderData" :orderTypeData="{ isAfterSale: true }">
    </OrderData>
  </div>
</template>

<script>
import OrderData from "../../components/OrderList";

export default {
  name: "AfterSales",
  components: { OrderData },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped></style>

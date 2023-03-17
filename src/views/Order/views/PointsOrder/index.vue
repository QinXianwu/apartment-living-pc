<template>
  <div class="PointsOrder">
    <OrderData ref="OrderData" :orderTypeData="{ isPointsOrder: true }">
    </OrderData>
  </div>
</template>

<script>
import OrderData from "../../components/OrderList";

export default {
  name: "PointsOrder",
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

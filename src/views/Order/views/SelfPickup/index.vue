<template>
  <div class="SelfPickup">
    <OrderData ref="OrderData" :orderTypeData="{ isSelfPickupOrder: true }">
    </OrderData>
  </div>
</template>

<script>
import OrderData from "../../components/OrderList";

export default {
  name: "SelfPickup",
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

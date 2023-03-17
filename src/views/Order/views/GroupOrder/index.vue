<template>
  <div class="GroupOrder">
    <OrderData ref="OrderData" :orderTypeData="{ isGroupOrder: true }">
    </OrderData>
  </div>
</template>

<script>
import OrderData from "../../components/OrderList";

export default {
  name: "GroupOrder",
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

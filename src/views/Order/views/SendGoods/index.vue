<template>
  <div class="SendGoods">
    <OrderData ref="OrderData" :orderTypeData="{ isSendOrder: true }">
    </OrderData>
  </div>
</template>

<script>
import OrderData from "../../components/OrderList";

export default {
  name: "SendGoods",
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

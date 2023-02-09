<template>
  <div class="SendGoods">
    <OrderData :orderTypeData="{ isSendOrder: true }" />
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

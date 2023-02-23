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
  methods: {
    handleConfirm(data) {
      console.log(data);
    },
  },
  mounted() {
    this.$store.dispatch("operationsManage/GetCourierPeopleListAction");
  },
};
</script>
<style lang="scss" scoped></style>

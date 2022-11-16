<template>
  <div class="SupplierPayList">
    <!-- 近日结算列表 -->
    <SettlementRecentlyList />
    <!-- 已打款结算列表 -->
    <HasPaySettlementList />
  </div>
</template>

<script>
import HasPaySettlementList from "./components/HasPaySettlementList/index.vue";
import SettlementRecentlyList from "./components/SettlementRecentlyList/index.vue";

export default {
  name: "SupplierPayList",
  components: { HasPaySettlementList, SettlementRecentlyList },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped></style>

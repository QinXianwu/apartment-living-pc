<template>
  <div class="CourierInfo">
    <div class="title">配送员信息</div>
    <div class="content">
      <TableBlock :tableData="tableData1" :valueWidth="250" />
    </div>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import TableBlock from "@/components/TableBlock";
export default {
  name: "CourierInfo",
  components: { TableBlock },
  props: {
    courierInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      CONST,
      column: [],
    };
  },
  computed: {
    tableData1({ courierInfo }) {
      return [
        { label: "配送员", value: courierInfo?.courierName },
        { label: "配送服务费", value: courierInfo?.courierServiceAmount },
      ];
    },
  },
  methods: {},
  filters: {},
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.CourierInfo {
  padding: 20px 0;
  .title {
    font-size: 14px;
    font-weight: bold;
    color: $sub-font-color;
    margin-bottom: 20px;
  }
  .content {
    margin-bottom: 20px;
  }
}
</style>

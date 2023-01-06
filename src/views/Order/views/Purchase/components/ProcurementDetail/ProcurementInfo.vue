<template>
  <div class="ProcurementInfo">
    <div class="title">服务点收件信息</div>
    <TableBlock :tableData="tableData" />
  </div>
</template>

<script>
import TableBlock from "@/components/TableBlock";
export default {
  name: "ProcurementInfo",
  components: { TableBlock },
  data() {
    return {
      tableData: [
        { label: "1", value: "abc" },
        { label: "2", value: "ABC" },
      ],
    };
  },
  computed: {},
  methods: {},
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.ProcurementInfo {
  padding: 20px 0;
  .title {
    font-size: 14px;
    font-weight: bold;
    color: $sub-font-color;
    margin-bottom: 20px;
  }
}
</style>

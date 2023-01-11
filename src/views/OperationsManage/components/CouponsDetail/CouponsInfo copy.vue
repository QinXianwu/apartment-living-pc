<template>
  <div class="CouponsInfo">
    <div class="title">适用商品</div>
    <div class="content">
      <TableBlock :tableData="tableData2" :valueWidth="350" />
      <!-- <TablePanel
        ref="TablePanel"
        :tableData="
          list.slice(
            (page.pageNum - 1) * page.pageSize,
            page.pageNum * page.pageSize
          )
        "
        :tableHead="column"
      >
        <template #putNumTotalAmount="{ scope }">
          {{
            (Number(scope.originalPrice || 0) * Number(scope.putNum || 0))
              | formatCurrency
          }}
        </template>
      </TablePanel> -->
      <!-- 分页 -->
      <Pagination
        :fixed="false"
        :pageSizes="[5, 10, 20, 50, 100]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="page.pageSize"
        :current-page="page.pageNum"
        :total="list.length"
      />
    </div>
  </div>
</template>

<script>
import TableBlock from "@/components/TableBlock";
// import { ProcurementDetailColumn } from "../../config/index";
export default {
  name: "CouponsInfo",
  components: { TableBlock },
  props: {
    couponsInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      column: [],
      page: {
        pageNum: 1,
        pageSize: 5,
      },
    };
  },
  computed: {
    tableData1({ couponsInfo }) {
      const serviceStationInfo = couponsInfo?.atServiceStation || {};
      return [
        { label: "服务点名称", value: serviceStationInfo?.name },
        { label: "联系人", value: serviceStationInfo?.manager },
        { label: "联系方式", value: serviceStationInfo?.phone },
        { label: "服务点地址", prop: "address", type: "custom" },
        { label: "备注", value: couponsInfo.remark },
      ];
    },
    tableData2({ couponsInfo }) {
      const supplierInfo = couponsInfo?.atSupplier || {};
      return [{ label: "供应商", value: supplierInfo?.name }];
    },
    list({ couponsInfo }) {
      return couponsInfo?.orderDetailsList || [];
    },
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.CouponsInfo {
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
  .goodsInfo {
    display: flex;
    align-items: center;
    .goods-name {
      margin-left: 10px;
    }
  }
  .table-img {
    width: 60px;
    height: 60px;
  }
}
</style>

<template>
  <div class="ProcurementInfo">
    <div class="title">服务点收件信息</div>
    <div class="content">
      <TableBlock :tableData="tableData1">
        <template #address>
          <span>
            {{ (orderInfo?.atServiceStation || {}) | filtersAddress }}
          </span>
        </template>
      </TableBlock>
    </div>
    <div class="title">供应商信息</div>
    <div class="content">
      <TableBlock :tableData="tableData2" />
    </div>
    <div class="title">采购信息</div>
    <div class="content">
      <TableBlock :tableData="tableData3">
        <template #goodsInfo>
          <div class="goodsInfo">
            <ImageView customClass="table-img" :src="orderInfo.mainImage" />
            <span class="goods-name">{{ orderInfo.productName || "-" }}</span>
          </div>
        </template>
      </TableBlock>
      <TablePanel
        ref="TablePanel"
        :tableData="
          list.slice(
            (page.pageNum - 1) * page.pageSize,
            page.pageNum * page.pageSize
          )
        "
        :tableHead="column"
      >
        <!-- 入库总价 -->
        <template #putNumTotalAmount="{ scope }">
          {{
            (Number(scope.originalPrice || 0) * Number(scope.putNum || 0))
              | formatCurrency
          }}
        </template>
      </TablePanel>
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
import { ProcurementDetailColumn } from "../../config/index";
export default {
  name: "ProcurementInfo",
  components: { TableBlock },
  props: {
    orderInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      column: ProcurementDetailColumn,
      page: {
        pageNum: 1,
        pageSize: 5,
      },
    };
  },
  computed: {
    tableData1({ orderInfo }) {
      const serviceStationInfo = orderInfo?.atServiceStation || {};
      return [
        { label: "服务点名称", value: serviceStationInfo?.name, minWidth: 350 },
        { label: "联系人", value: serviceStationInfo?.manager, minWidth: 350 },
        { label: "联系方式", value: serviceStationInfo?.phone, minWidth: 350 },
        { label: "服务点地址", prop: "address", type: "custom", minWidth: 350 },
        { label: "备注", value: orderInfo.remark, minWidth: 350 },
      ];
    },
    tableData2({ orderInfo }) {
      const supplierInfo = orderInfo?.atSupplier || {};
      return [{ label: "供应商", value: supplierInfo?.name }];
    },
    tableData3() {
      return [{ label: "商品信息", prop: "goodsInfo", type: "custom" }];
    },
    list({ orderInfo }) {
      return orderInfo?.orderDetailsList || [];
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
.ProcurementInfo {
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

<template>
  <div class="ApplicableServiceStation">
    <div class="title">适用服务点</div>
    <div class="content">
      <TableBlock :tableData="tableData1" :valueWidth="250" />
      <div
        class="station-list"
        v-if="couponsInfo.applyStationStatus === CONST.SERVE_TYPE.PART"
      >
        <TablePanel ref="TablePanel" :tableData="list" :tableHead="column">
          <template #address="{ scope }">
            <div class="address">
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope | filtersAddress"
                placement="right"
              >
                <span>{{ scope | filtersAddress }}</span>
              </el-tooltip>
            </div>
          </template>
          <template #status="{ scope }">
            <el-tag
              :type="
                scope.status === CONST.SERVICE_STATION_STATE.OFF ? 'danger' : ''
              "
              >{{ CONST.SERVICE_STATION_STATE_TEXT[scope.status] }}</el-tag
            >
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
  </div>
</template>

<script>
import CONST from "@/constants/index";
import { StationColumn } from "./config/index";
import TableBlock from "@/components/TableBlock";

export default {
  name: "ApplicableServiceStation",
  components: { TableBlock },
  props: {
    couponsInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      CONST,
      column: StationColumn,
      page: {
        pageNum: 1,
        pageSize: 5,
      },
    };
  },
  computed: {
    tableData1({ couponsInfo }) {
      return [
        {
          label: "适用服务点类型",
          value: couponsInfo?.applyStationStatus
            ? CONST.SERVE_TYPE_TEXT[couponsInfo.applyStationStatus]
            : "",
        },
      ];
    },
    list({ couponsInfo, page }) {
      if (couponsInfo?.applyStationStatus === CONST.SERVE_TYPE.ALL) return [];
      const stationList = couponsInfo?.stationList || [];
      return stationList.slice(
        (page.pageNum - 1) * page.pageSize,
        page.pageNum * page.pageSize
      );
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
.ApplicableServiceStation {
  padding: 20px 0;

  .title {
    font-size: 15px;
    font-weight: bold;
    color: $main-font-color;
    margin-bottom: 20px;
  }

  .address {
    @include overflow-eps(2);
  }
}
</style>

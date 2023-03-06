<template>
  <div class="ApplicableServiceStation">
    <div class="title">适用服务点</div>
    <div class="content">
      <el-form ref="form" :model="formData" :rules="rules" label-width="150px">
        <el-form-item label="适用服务点类型" prop="applyStationStatus">
          <el-radio-group v-model="formData.applyStationStatus">
            <el-radio-button
              v-for="(item, index) in CONST.SERVE_TYPE_OPTIONS()"
              :label="item.value"
              :value="item.value"
              :key="index"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="适用服务点"
          v-if="formData.applyStationStatus === $CONST.SERVE_TYPE.PART"
        >
          <el-button type="text" @click="chooseStation">选择服务点</el-button>
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
                  scope.status === CONST.SERVICE_STATION_STATE.OFF
                    ? 'danger'
                    : ''
                "
                >{{ CONST.SERVICE_STATION_STATE_TEXT[scope.status] }}</el-tag
              >
            </template>
            <!-- 操作 -->
            <template #action="{ index }">
              <div class="action-groud">
                <el-button type="text" @click="handleDelete(index)">
                  删除
                </el-button>
              </div>
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
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import { StationColumn } from "./config/index";
export default {
  name: "ApplicableServiceStation",
  components: {},
  props: {
    selectStation: {
      type: Array,
      default: () => [],
    },
    couponsInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    selectStation(val) {
      this.list = val?.length ? val : [];
    },
    couponsInfo(val) {
      if (val) this.init();
    },
  },
  data() {
    return {
      CONST,
      column: StationColumn,
      selectIds: [],
      formData: {
        applyStationStatus: CONST.SERVE_TYPE.ALL,
      },
      rules: {},
      list: [],
      page: {
        pageNum: 1,
        pageSize: 5,
      },
    };
  },
  computed: {
    ids({ list }) {
      if (!list?.length) return [];
      return list.map((item) => item.id);
    },
  },
  methods: {
    init() {
      // this.formData.applyStationStatus =
      //   this.couponsInfo?.applyStationStatus || CONST.SERVE_TYPE.ALL;
      // if (this.couponsInfo?.applyStationStatus === CONST.SERVE_TYPE.ALL) {
      //   this.list = [];
      //   return;
      // }
      // const stationList = this.couponsInfo?.stationList || [];
      this.formData.applyStationStatus = CONST.SERVE_TYPE.ALL;
      this.list = [];
      const stationList = [];
      this.list = [].concat(stationList);
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
    },
    chooseStation() {
      this.$emit("chooseStation", this.ids);
    },
    handleDelete(index) {
      this.list.splice(index, 1);
    },
    async getQuery() {
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        // 表单校验
        try {
          const valid = await this.$refs.form.validate();
          if (!valid) {
            return null;
          }
        } catch (error) {
          return error;
        }
        const applyStationStatus = this.formData.applyStationStatus;
        if (
          applyStationStatus === CONST.SERVE_TYPE.PART &&
          !this.list?.length
        ) {
          return this.$message.error("请选择服务点后再试");
        }
        resolve({
          ...this.formData,
          applyStationList:
            applyStationStatus === CONST.SERVE_TYPE.ALL ? [] : this.ids,
        });
      });
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.ApplicableServiceStation {
  background: #fff;
  padding: 0 10px;
  margin: 0 0 60px;
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

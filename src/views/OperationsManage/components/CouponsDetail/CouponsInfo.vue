<template>
  <div class="CouponsInfo">
    <div class="title">基本信息</div>
    <div class="content">
      <TableBlock :tableData="tableData1" :valueWidth="250">
        <template #conditionsApply>
          <span>满足￥{{ couponsInfo.meetAmount | formatCurrency }}可使用</span>
        </template>
        <template #expireTime>
          <span>{{ couponsInfo | couponDateText }}</span>
        </template>
        <template #unitLimitType>
          <span
            v-if="couponsInfo.unitLimitType === CONST.UNIT_LIMIT_TYPE.UNLIMITED"
          >
            {{ CONST.UNIT_LIMIT_TYPE_TEXT[couponsInfo.unitLimitType] }}
          </span>
          <span v-else
            >{{ couponsInfo.unitLimitCount }}张/{{
              CONST.UNIT_LIMIT_TYPE_TEXT[couponsInfo.unitLimitType]
            }}</span
          >
        </template>
        <template #status>
          <el-tag
            :type="
              couponsInfo.status === CONST.COUPONS_STATE.HIDE ? 'danger' : ''
            "
            >{{ CONST.COUPONS_STATE_TEXT[couponsInfo.status] }}</el-tag
          >
        </template>
      </TableBlock>
    </div>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import TableBlock from "@/components/TableBlock";
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
      CONST,
      column: [],
    };
  },
  computed: {
    tableData1({ couponsInfo }) {
      return [
        { label: "优惠劵名称", value: couponsInfo?.name },
        {
          label: "优惠劵面值",
          value: couponsInfo?.deductAmount,
          type: "money",
        },
        { label: "适用条件", prop: "conditionsApply", type: "custom" },
        { label: "发行量", value: couponsInfo?.totalLimitCount },
        { label: "单位内限制", prop: "unitLimitType", type: "custom" },
        { label: "过期时间", prop: "expireTime", type: "custom" },
        { label: "状态", prop: "status", type: "custom" },
      ];
    },
  },
  methods: {},
  filters: {
    couponDateText(item) {
      if (item?.expireTimeType === CONST.COUPONS_EXPIRE_TYPE.DESIGNATE_DATE)
        return `${item?.expireTime || "-"} 到期`;
      else if (item?.expireTimeType === CONST.COUPONS_EXPIRE_TYPE.HOLS_AFFETER)
        return `${item.expireTimeCount || "-"} 小时后到期`;
      else if (item?.expireTimeType === CONST.COUPONS_EXPIRE_TYPE.DYCE_AFFETER)
        return `${item?.expireTimeCount || "-"} 天后到期`;
      else return "";
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

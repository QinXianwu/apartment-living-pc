<template>
  <div class="NewcomerCoupon">
    <div class="sub-title">第一重好礼（指定添加满减券与配送券）</div>
    <div class="form">
      <div class="el-form-item" style="margin-bottom: 0">
        <div class="el-form-item__label">是否赠送优惠劵</div>
        <el-radio-group v-model="couponStatus" style="line-height: 50px">
          <el-radio
            :label="item.value"
            v-for="item in CONST.REWARD_COUPONS_STATE_OPTIONS()"
            :key="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </div>
    </div>
    <div class="action" v-if="couponStatus === CONST.REWARD_COUPONS_STATE.GIVE">
      <el-button type="primary" @click="handleAddCoupon">添加优惠券</el-button>
    </div>
    <div class="coupon" v-if="couponStatus === CONST.REWARD_COUPONS_STATE.GIVE">
      <div
        class="coupon-item"
        v-for="(item, index) in couponConfigList"
        :key="index"
      >
        <div class="coupon-item-l">
          <div class="info-l">
            <span class="price">
              {{ item | couponPriceText }}
            </span>
          </div>
          <div class="info-r">
            <span v-if="item.type === CONST.COUPONS_TYPE.FULL_MINUS"
              >满{{ item.meetAmount }}减{{ item.deductAmount }}</span
            >
            <span>{{ item | couponDateText }}</span>
            <span>
              {{ CONST.APPLY_PRODUCT_TYPE_TEXT[item.applyProductType] }}可用
            </span>
          </div>
        </div>
        <div class="coupon-item-r">
          <div class="action">
            <el-button type="text" @click="handleDeleteCoupon(index)"
              >删除</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <AddCouponDiaog
      :show.sync="showAddCoupon"
      @close="close"
      @addCoupon="addCoupon"
    />
  </div>
</template>

<script>
import CONST from "@/constants/index";
import filters from "@/filters/index";
import AddCouponDiaog from "./AddCouponDiaog.vue";

export default {
  name: "NewcomerCoupon",
  components: { AddCouponDiaog },
  data() {
    return {
      CONST,
      showAddCoupon: false,
      couponStatus: CONST.REWARD_COUPONS_STATE.GIVE,
      couponConfigList: [],
    };
  },
  computed: {},
  methods: {
    handleDeleteCoupon(index) {
      this.couponConfigList.splice(index, 1);
    },
    handleAddCoupon() {
      this.showAddCoupon = true;
    },
    addCoupon(res) {
      // if (!this.list[res?.index]) return;
      // const item = this.list[res.index];
      this.couponConfigList.push({ ...(res?.data || {}) });
    },
    close(isRefresh = false) {
      this.showAddCoupon = false;
      if (isRefresh) this.$emit("close", true);
    },
    async getQuery() {
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        // 表单校验
        // try {
        //   const valid = await this.$refs.form.validate();
        //   if (!valid) {
        //     return null;
        //   }
        // } catch (error) {
        //   return error;
        // }
        if (
          this.couponStatus === CONST.REWARD_COUPONS_STATE.GIVE &&
          !this.couponConfigList?.length
        )
          return this.$message.error("请添加优惠券后再试");
        resolve({
          couponStatus: this.couponStatus,
          couponConfigList:
            this.couponStatus === CONST.REWARD_COUPONS_STATE.NOT_GIVE
              ? []
              : this.couponConfigList,
        });
      });
    },
  },
  filters: {
    couponPriceText(item) {
      if (item?.type === CONST.COUPONS_TYPE.FULL_MINUS)
        return filters.formatCurrency(item.deductAmount);
      else if (item?.type === CONST.COUPONS_TYPE.DISTRIBUTION)
        return CONST.COUPONS_TYPE_TEXT[item.type];
      return;
    },
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
.NewcomerCoupon {
  padding: 20px 20px 5px;

  .title {
    font-size: 15px;
    font-weight: bold;
    color: $main-font-color;
  }
  .sub-title {
    font-size: 13px;
    font-weight: bold;
    color: $sub-font-color;
    margin-bottom: 15px;
  }
  .action {
    padding: 10px 0 20px;
  }
}

.coupon {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 20px;

  &-item {
    min-width: 280px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    padding: 10px 20px;
    margin: 10px 30px 10px 0;
    box-shadow: 0px 1px 5px 0px rgba(204, 204, 204, 0.5);
    &-l {
      width: 100%;
      display: flex;
      align-items: center;
      // justify-content: space-between;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }
    .price {
      font-weight: bold;
      font-size: 24px;
    }
    .price::before {
      content: "￥";
      font-size: 14px;
    }
    .info-r {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      color: #666;
      font-size: 14px;
      line-height: 32px;
    }
  }
}
</style>

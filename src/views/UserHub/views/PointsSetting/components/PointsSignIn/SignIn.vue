<template>
  <div class="SignIn">
    <div class="title">签到获得积分设置</div>
    <div class="content">
      <el-form ref="form" label-width="120px">
        <el-form-item label="活动时间">
          <el-radio-group
            v-model="limitTimeStatus"
            @change="changeLimitTimeStatus"
          >
            <el-radio
              :label="item.value"
              v-for="item in CONST.ACTIVITY_LIMIT_DATE_TYPE_OPTIONS()"
              :key="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
          <el-date-picker
            v-if="
              limitTimeStatus === CONST.ACTIVITY_LIMIT_DATE_TYPE.LIMITED_TIME
            "
            class="ml-10"
            v-model="activityDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="(val) => $emit('update:activityTime', val)"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          :label="`第${convertToChinaNum(item.signReward.continueDay)}天`"
          v-for="(item, index) in list"
          :key="index"
        >
          <el-radio-group v-model="item.signReward.integralStatus">
            <el-radio
              :label="item.value"
              v-for="item in CONST.REWARD_INTEGRAL_STATE_OPTIONS()"
              :key="item.value"
              >{{ item.label }}积分</el-radio
            >
          </el-radio-group>
          <div
            class="input"
            v-if="
              item.signReward.integralStatus ===
              CONST.REWARD_INTEGRAL_STATE.GIVE
            "
          >
            <el-input
              placeholder="请输入"
              class="input-medium"
              :value="item.signReward.integral"
              @input="(val) => onInputIntegral(val, index)"
            >
              <template slot="append">分</template>
            </el-input>
          </div>
          <el-form-item label="是否赠送优惠劵">
            <el-radio-group
              v-model="item.signReward.couponStatus"
              @change="(val) => changeCouponStatus(val, index)"
            >
              <el-radio
                :label="item.value"
                v-for="item in CONST.REWARD_COUPONS_STATE_OPTIONS()"
                :key="item.value"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <div
            class="coupon-content"
            v-if="
              item.signReward.couponStatus === CONST.REWARD_COUPONS_STATE.GIVE
            "
          >
            <el-button type="primary" @click="handleAddCoupon(index)"
              >新增关联优惠劵</el-button
            >
            <div class="coupon">
              <div
                class="coupon-item"
                v-for="(ele, _index_) in item.couponConfigList"
                :key="_index_"
              >
                <div class="coupon-item-l">
                  <div class="info-l">
                    <span class="price">
                      {{ ele.deductAmount | formatCurrency }}
                    </span>
                  </div>
                  <div class="info-r">
                    <span>满{{ ele.meetAmount }}减{{ ele.deductAmount }}</span>
                    <span>{{ ele | couponDateText }}</span>
                    <span>
                      {{
                        CONST.APPLY_PRODUCT_TYPE_TEXT[ele.applyProductType]
                      }}可用
                    </span>
                  </div>
                </div>
                <div class="coupon-item-r">
                  <div class="action">
                    <el-button type="text" @click="handleDeleteCoupon"
                      >删除</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <AddCouponDiaog
      :editInfo="editInfo"
      :show.sync="showAddCoupon"
      @close="close"
    />
  </div>
</template>

<script>
import CONST from "@/constants/index";
import { convertToChinaNum } from "@/utils/index";
import AddCouponDiaog from "./AddCouponDiaog.vue";

export default {
  name: "SignIn",
  components: { AddCouponDiaog },
  props: {
    limitType: {
      type: [String, Number],
      default: "",
    },
    activityTime: {
      type: Array,
      default: () => [],
    },
    signRewardList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      CONST,
      editInfo: {},
      list: [],
      activityDate: [],
      dayCount: 7,
      limitTimeStatus: "",
      showAddCoupon: false,
    };
  },
  watch: {
    signRewardList() {
      this.init();
    },
  },
  computed: {},
  methods: {
    convertToChinaNum,
    onInputIntegral(val, index) {
      //正则表达试
      val = val.match(/^\d*(\d{0,0})/g)[0] || 0;
      //重新赋值给input
      this.list[index].signReward.integral = val;
    },
    changeCouponStatus(val, index) {
      if (val === CONST.REWARD_COUPONS_STATE.NOT_GIFTED) {
        this.list[index].couponConfigList = [];
      }
    },
    changeLimitTimeStatus(val) {
      this.$emit("update:limitType", val);
      if (val === CONST.ACTIVITY_LIMIT_DATE_TYPE.LONG_ACTIVITY) {
        this.activityDate = [];
        this.$emit("update:activityTime", []);
      }
    },
    handleAddCoupon(index) {
      this.editInfo = { index };
      this.showAddCoupon = true;
    },
    handleDeleteCoupon() {
      //
    },
    close(isRefresh = false) {
      this.showAddCoupon = false;
      if (isRefresh) this.$emit("refresh", true);
    },
    init() {
      this.list = [];
      this.activityDate = this.activityTime || [];
      this.limitTimeStatus = this.limitType;
      if (!this.signRewardList?.length) {
        for (let index = 0; index < this.dayCount; index++) {
          this.list.push({
            signReward: {
              continueDay: index + 1,
              couponIds: [],
              integral: 0,
              couponStatus: CONST.REWARD_COUPONS_STATE.GIVE,
              integralStatus: CONST.REWARD_INTEGRAL_STATE.GIVE,
            },
            couponConfigList: [],
          });
        }
      } else {
        for (const index in this.signRewardList) {
          this.list.push({
            signReward: {
              ...(this.signRewardList[index]?.signReward || {}),
            },
            couponConfigList:
              this.signRewardList[index]?.couponConfigList || [],
          });
        }
      }
    },
  },
  filters: {
    couponDateText(item) {
      if (item?.expireTimeType === CONST.COUPONS_EXPIRE_TYPE.DESIGNATE_DATE)
        return `${item.expireTime || "-"} 到期`;
      else if (item?.expireTimeType === CONST.COUPONS_EXPIRE_TYPE.HOLS_AFFETER)
        return `${item.expireTime || "-"} 小时后到期`;
      else if (item?.expireTimeType === CONST.COUPONS_EXPIRE_TYPE.DYCE_AFFETER)
        return `${item.expireTime || "-"} 天后到期`;
      else return "";
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.SignIn {
  .title {
    font-size: 14px;
    font-weight: bold;
    color: $main-font-color;
  }
  .content {
    padding: 20px 0;
  }
  .input {
    margin: 10px 0;
  }
}
.coupon {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  &-item {
    width: 280px;
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
    }
  }
}
</style>

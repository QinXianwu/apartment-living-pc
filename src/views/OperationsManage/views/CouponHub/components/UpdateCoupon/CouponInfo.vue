<template>
  <div class="CouponInfo">
    <div class="title">基本信息</div>
    <div class="content">
      <el-form ref="form" :model="formData" :rules="rules" label-width="150px">
        <el-form-item label="优惠券名称" prop="name">
          <el-input
            placeholder="请输入优惠券名称"
            v-model="formData.name"
            class="input-medium"
          />
        </el-form-item>
        <el-form-item label="优惠券类型" prop="type">
          <el-radio-group v-model="formData.type" @change="changeCouponType">
            <el-radio
              v-for="item in CONST.COUPONS_TYPE_OPTIONS()"
              :label="item.value"
              :key="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="优惠劵面值"
          prop="deductAmount"
          v-if="formData.type === CONST.COUPONS_TYPE.FULL_MINUS"
        >
          <el-input-number
            class="input-medium"
            v-model="formData.deductAmount"
            placeholder="请输入优惠劵面值"
            :controls="false"
            :precision="2"
            :min="0"
          />
        </el-form-item>
        <el-form-item
          label="满足金额"
          prop="meetAmount"
          v-if="formData.type === CONST.COUPONS_TYPE.FULL_MINUS"
        >
          <el-input-number
            class="input-medium"
            v-model="formData.meetAmount"
            placeholder="请输入满足金额"
            :controls="false"
            :precision="2"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="单位内限制类型" prop="unitLimitType">
          <el-input
            placeholder="请输入限制数量"
            v-model="formData.unitLimitCount"
            class="input-medium"
            :disabled="
              formData.unitLimitType === CONST.UNIT_LIMIT_TYPE.UNLIMITED
            "
            @input="unitLimitCountInput"
          >
            <el-select
              slot="prepend"
              placeholder="请选择限制类型"
              v-model="formData.unitLimitType"
              class="input-select-type"
              @change="changeUnitLimitType"
            >
              <el-option
                v-for="item in CONST.UNIT_LIMIT_OPTIONS()"
                :label="item.label"
                :key="item.value"
                :value="item.value"
              />
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="过期类型" prop="expireTimeType">
          <el-radio-group
            v-model="formData.expireTimeType"
            @change="changeExpire"
          >
            <el-radio
              v-for="item in CONST.COUPONS_EXPIRE_TYPE_OPTIONS()"
              :label="item.value"
              :key="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
          <div class="input">
            <el-date-picker
              v-if="
                formData.expireTimeType ===
                CONST.COUPONS_EXPIRE_TYPE.DESIGNATE_DATE
              "
              v-model="formData.expireTime"
              type="datetime"
              :picker-options="datePickerOptions"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
            />
            <el-input-number
              v-else
              placeholder="请输入过期时长"
              v-model="formData.expireTimeCount"
              class="input-medium"
              :min="1"
              :max="9999999999"
              :step="1"
              :precision="0"
            />
          </div>
        </el-form-item>
        <el-form-item label="发行量" prop="totalLimitCount">
          <el-input-number
            class="input-medium"
            v-model="formData.totalLimitCount"
            placeholder="请输入发行量"
            :controls="false"
            :precision="0"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio-button
              v-for="(item, index) in CONST.COUPONS_STATE_OPTIONS()"
              :label="item.value"
              :value="item.value"
              :key="index"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import CONST from "@/constants/index";
export default {
  name: "CouponInfo",
  components: {},
  props: {
    couponsInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    couponsInfo(val) {
      if (val) this.init();
    },
  },
  data() {
    const validateMeetAmount = (rule, value, callback) => {
      if (value !== 0 && !value) {
        callback(new Error("请输入满足金额"));
      } else if (value === 0 || value < this.formData?.deductAmount) {
        callback(new Error("满足金额须大于优惠劵面值"));
      } else {
        callback();
      }
    };
    const validateUnitLimit = (rule, value, callback) => {
      if (
        value !== 0 &&
        !value &&
        this.formData.unitLimitType !== CONST.UNIT_LIMIT_TYPE.UNLIMITED
      ) {
        callback(new Error("请输入限制数量"));
      } else {
        callback();
      }
    };
    return {
      CONST,
      formData: {},
      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        },
      },
      rules: {
        name: [
          { required: true, message: "请输入优惠券名称", trigger: "blur" },
        ],
        deductAmount: [
          { required: true, message: "请输入优惠劵面值", trigger: "blur" },
        ],
        meetAmount: [
          { required: true, message: "请输入满足金额", trigger: "blur" },
          { validator: validateMeetAmount, trigger: "blur" },
        ],
        unitLimitType: [
          { required: true, message: "请选择限制类型", trigger: "blur" },
          { validator: validateUnitLimit, trigger: "blur" },
        ],
        totalLimitCount: [
          {
            required: true,
            message: "请输入优惠劵发行量",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
    init() {
      this.formData = {
        type: CONST.COUPONS_TYPE.FULL_MINUS,
        status: CONST.COUPONS_STATE.SHOW,
        unitLimitType: CONST.UNIT_LIMIT_TYPE.UNLIMITED,
        expireTimeType: CONST.COUPONS_EXPIRE_TYPE.DESIGNATE_DATE,
        expireTimeCount: 1,
        ...(this.couponsInfo || {}),
      };
    },
    unitLimitCountInput(val) {
      val = val.match(/^\d*(\d{0})/g)[0];
      this.$nextTick(() => {
        this.formData.unitLimitCount = val;
      });
      this.$forceUpdate();
    },
    changeUnitLimitType(val) {
      if (val === CONST.UNIT_LIMIT_TYPE.UNLIMITED) {
        this.formData.unitLimitCount = "";
      }
    },
    changeCouponType(val) {
      if (val === CONST.COUPONS_TYPE.DISTRIBUTION) {
        this.formData.deductAmount = "";
        this.formData.meetAmount = "";
      }
    },
    changeExpire(val) {
      if (val !== CONST.COUPONS_EXPIRE_TYPE.DESIGNATE_DATE) {
        this.formData.expireTimeCount = 1;
      }
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
        if (
          this.formData?.expireTimeType ===
            CONST.COUPONS_EXPIRE_TYPE.DESIGNATE_DATE &&
          !this.formData?.expireTime
        )
          return this.$message.error("请选择过期日期");
        resolve({
          ...this.formData,
        });
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.CouponInfo {
  background: #fff;
  padding: 0 10px;
  margin: 0 0 60px;
  .title {
    font-size: 15px;
    font-weight: bold;
    color: $main-font-color;
    margin-bottom: 20px;
  }
  .input-select-type {
    width: 80px;
  }
}
</style>

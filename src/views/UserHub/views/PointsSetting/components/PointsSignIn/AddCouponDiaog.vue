<template>
  <el-dialog
    title="新增关联优惠劵"
    :visible.sync="visible"
    width="1100px"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
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
      <el-form-item
        label="扣减金额"
        prop="deductAmount"
        v-if="formData.type === CONST.COUPONS_TYPE.FULL_MINUS"
      >
        <el-input-number
          class="input-medium"
          v-model="formData.deductAmount"
          placeholder="请输入扣减金额"
          :controls="false"
          :precision="2"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="适用商品类型" prop="applyProductType">
        <el-radio-group v-model="formData.applyProductType">
          <el-radio :label="CONST.APPLY_PRODUCT_TYPE.ALL">{{
            CONST.APPLY_PRODUCT_TYPE_TEXT[CONST.APPLY_PRODUCT_TYPE.ALL]
          }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="适用服务点类型" prop="applyStationStatus">
        <el-radio-group v-model="formData.applyStationStatus">
          <el-radio :label="CONST.SERVE_TYPE.ALL">{{
            CONST.SERVE_TYPE_TEXT[CONST.SERVE_TYPE.ALL]
          }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="单位内限制数量类型" prop="unitLimitType">
        <el-radio-group v-model="formData.unitLimitType">
          <el-radio :label="CONST.UNIT_LIMIT_TYPE.UNLIMITED">{{
            CONST.UNIT_LIMIT_TYPE_TEXT[CONST.UNIT_LIMIT_TYPE.UNLIMITED]
          }}</el-radio>
        </el-radio-group>
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
            type="date"
            :picker-options="datePickerOptions"
            value-format="yyyy-MM-dd"
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
      <el-form-item label="发放总数量" prop="totalLimitCount">
        <el-input-number
          class="input-medium"
          v-model="formData.totalLimitCount"
          placeholder="请输入发放总数量"
          :controls="false"
          :precision="0"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="优惠券规则" prop="rule">
        <Tinymce ref="Editor" v-model="formData.rule" :height="500" />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" :loading="isLoading" @click="handleSubmit">
        保存
      </el-button>
      <el-button @click="handleClose(false)"> 取消 </el-button>
    </span>
  </el-dialog>
</template>
<script>
import CONST from "@/constants/index";
import Tinymce from "@/components/Tinymce";
import dialogMixin from "@/mixins/dialogMixin";
export default {
  name: "AddCouponDiaog",
  mixins: [dialogMixin],
  components: { Tinymce },
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.formData = {
          type: CONST.COUPONS_TYPE.FULL_MINUS,
          applyProductType: CONST.APPLY_PRODUCT_TYPE.ALL,
          applyStationStatus: CONST.SERVE_TYPE.ALL,
          status: CONST.COUPONS_STATE.SHOW,
          unitLimitType: CONST.UNIT_LIMIT_TYPE.UNLIMITED,
          expireTimeType: CONST.COUPONS_EXPIRE_TYPE.DESIGNATE_DATE,
          expireTimeCount: 1,
          rule: "",
        };
      }
    },
  },
  data() {
    const validateMeetAmount = (rule, value, callback) => {
      if (value !== 0 && !value) {
        callback(new Error("请输入满足金额"));
      } else if (value === 0 || value < this.formData?.deductAmount) {
        callback(new Error("满足金额须大于扣减金额"));
      } else {
        callback();
      }
    };
    return {
      CONST,
      formData: {},
      isLoading: false,
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
          { required: true, message: "请输入扣减金额", trigger: "blur" },
        ],
        meetAmount: [
          { required: true, message: "请输入满足金额", trigger: "blur" },
          { validator: validateMeetAmount, trigger: "blur" },
        ],
        totalLimitCount: [
          {
            required: true,
            message: "请输入优惠劵发放总数量",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
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
    // 处理提交
    async handleSubmit() {
      // 表单校验
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) {
          return;
        }
      } catch (error) {
        return;
      }
      this.isLoading = true;
      this.isLoading = false;
      if (
        this.formData?.expireTimeType ===
          CONST.COUPONS_EXPIRE_TYPE.DESIGNATE_DATE &&
        !this.formData?.expireTime
      )
        return this.$message.error("请选择过期日期");
      this.$emit("addCoupon", {
        index: this.editInfo?.index,
        data: this.formData,
      });
      this.handleClose(true);
    },
  },
};
</script>
<style lang="scss" scoped></style>

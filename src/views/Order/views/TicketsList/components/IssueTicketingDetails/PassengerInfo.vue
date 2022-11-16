<template>
  <div class="PassengerInfo">
    <div class="info-content">
      <div class="info-item">
        <div class="info-item-main">
          <CopyButton :copyString="passengerInfo.passengerName || '-'">
            <span>{{ passengerInfo.passengerName || "-" }}</span>
            <span class="copy">复制</span>
          </CopyButton>
        </div>
        <div class="info-footer">
          <span class="label mr-10">出票姓名</span>
          <div class="value">
            <el-input
              class="name-input"
              v-model="formData.ticketName"
              placeholder="请输入出票姓名"
            />
            <span class="form-tip">（同音不同字时填写票机展示姓名）</span>
          </div>
        </div>
      </div>
      <div class="info-item">
        <div class="info-item-main">
          <CopyButton :copyString="passengerInfo.passportNumber">
            <span>{{ passengerInfo.passportNumber || "-" }}</span>
            <span class="copy">复制</span>
          </CopyButton>
        </div>
        <div class="info-footer">
          <span class="label mr-10">{{
            $CONST.PASSENGER_TYPE_TEXT[passengerInfo.passengerType]
          }}</span>
          <div class="value">
            <el-radio-group class="info-radiogroup" v-model="formData.seatName">
              <el-radio
                :key="ele.value"
                :label="ele.label"
                class="info-radiogroup-item"
                v-for="ele in seatTypeOptions"
                >{{ ele.label }}</el-radio
              >
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="info-item">
        <div class="info-item-main">
          <div></div>
        </div>
        <div class="info-footer">
          <div
            class="otherData"
            v-for="(item, index) in fromOptions"
            :key="index"
          >
            <div class="value">
              <el-input
                class="min-input"
                :min="item.min"
                :max="item.max"
                :type="item.type"
                :minlength="item.minlength"
                :maxlength="item.maxlength"
                :disabled="item.disabled"
                v-model="formData[item.prop]"
                @input="(e) => inputChange(e, item)"
                placeholder="请输入"
              />
            </div>
            <span
              class="label ml-10 mr-10 amount-label"
              v-if="item.prop === 'realTicketPrice'"
            >
              {{ ticketInfo.ticketPrice }}
            </span>
            <span class="label ml-10 mr-10" v-else>
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CopyButton from "@/components/CopyButton/index";

export default {
  name: "PassengerInfo",
  components: { CopyButton },
  props: {
    ticketInfo: {
      type: Object,
      default: () => ({}),
    },
    seatTypeOptions: {
      type: Array,
      default: () => [],
    },
    passengerInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formData: {
        ticketName: "",
        seatName: "",
        carriageNo: "",
        seatNo: "",
        realTicketPrice: "",
      },
      rules: {
        ticketName: { required: true, message: "请输入出票姓名" },
        seatName: { required: true, message: "请选择乘客座位类型" },
        carriageNo: { required: true, message: "请输入车厢" },
        seatNo: { required: true, message: "请输入乘客座号" },
        realTicketPrice: { required: true, message: "请输入出票金额" },
      },
    };
  },
  computed: {
    fromOptions({ formData }) {
      return [
        {
          prop: "carriageNo",
          label: "车厢",
          callback: this.inputChange,
        },
        {
          prop: "seatNo",
          label: "座号",
          callback: this.inputChange,
        },
        {
          type: "number",
          min: 0,
          max: 9999999999,
          prop: "realTicketPrice",
          label: formData?.realTicketPrice || 0,
          tipLabel: "金额",
          callback: this.inputChange,
        },
      ];
    },
  },
  methods: {
    inputChange(value, item) {
      if (!item?.prop) return;
      let newValue = value;
      if (item?.type === "number") {
        newValue = newValue.match(/^\d*(\.?\d{0,2})/g)[0] || null;
        const min = item?.min || 0;
        const max = item?.max || 9999999999;
        if (Number(value) < min) {
          this.$message.error(`最小${item?.tipLabel || "值"}必须大于${min}`);
          newValue = min;
        } else if (Number(value) > max) {
          this.$message.error(`最大${item?.tipLabel || "值"}必须小于${max}`);
          newValue = max;
        }
      }
      this.formData[item.prop] = String(newValue);
    },
    // 校验表单
    formValidation() {
      const result = {
        validation: false,
        message: "校验未通过",
      };
      for (const key in this.rules) {
        const item = this.rules[key];
        // 必填校验
        if (item?.required && !this.formData[key]) {
          result.message = item?.message || "校验未通过";
          // throw new Error(result.message);
          this.$message.error(result.message);
          console.error(result.message);
          return Promise.reject(false);
        }
      }
      result.validation = true;
      result.message = "校验通过";
      return Promise.resolve(true);
    },
  },
  mounted() {
    if (this.seatTypeOptions?.length) {
      const itemSeat = this.seatTypeOptions.find(
        (item) => item.label === this.ticketInfo.seatName
      );
      this.formData.seatName = itemSeat
        ? itemSeat.label
        : this.seatTypeOptions[0].label;
    } else {
      this.formData.seatName = this.ticketInfo.seatName;
    }
    this.formData.ticketName = this.passengerInfo.passengerName;
    this.formData.realTicketPrice = this.ticketInfo.ticketPrice;
  },
};
</script>
<style lang="scss" scoped>
.info-content {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}
.info-item {
  margin-left: 35px;

  &-main {
    padding: 0 0 30px;
    span {
      font-size: 22px;
      font-weight: 500;
      color: $main-font-color;
    }
  }
  .copy {
    font-size: 12px;
    font-weight: 400;
    color: #666666;
    margin: 0 10px;
    padding: 2px 10px;
    background: #eee;
  }
}
.info-footer {
  display: flex;
  align-items: baseline;
  padding: 0 5px;
  .otherData {
    display: flex;
    align-items: baseline;
  }
  .label {
    font-size: 14px;
    font-weight: 400;
    color: $sub-font-color;
  }
  .label.amount-label {
    display: flex;
    padding: 4px 8px;
    background-color: $--color-danger;
    font-weight: 700;
    color: #ffffff;
    border-radius: 20px;
    &::after {
      content: "元";
      display: block;
    }
  }
  .value {
    display: flex;
    flex-direction: column;
  }
  .info-radiogroup {
    max-width: 250px;
    &-item {
      margin: 0 10px 10px;
    }
  }
}
.name-input {
  width: 150px;
}
.min-input {
  width: 100px;
}
</style>

<!-- 选择无票类型 -->
<template>
  <div class="SelectNoTicketType">
    <el-dialog
      title="选择无票类型"
      :visible.sync="show"
      width="600px"
      :before-close="handleClose"
    >
      <div class="content">
        <el-form
          ref="form"
          :rules="rules"
          :model="formData"
          label-width="100px"
        >
          <el-form-item label="无票类型" prop="type">
            <el-select
              class="input-medium"
              v-model="formData.type"
              placeholder="请选择无票类型"
            >
              <el-option
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-for="item in errorTypeOptions"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="无票原因"
            prop="resultMsg"
            v-if="formData.type === CONST.ORDER_RESULT_CODE.OTHER"
          >
            <el-input class="input-medium" v-model="formData.resultMsg" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="saveData">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dialogMixin from "@/mixins/dialogMixin";
import CONST from "@/constants/index";
export default {
  name: "SelectNoTicketType",
  mixins: [dialogMixin],
  props: {
    noTicketResult: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      CONST,
      formData: {
        type: "",
        resultMsg: "",
      },
      rules: {
        type: [
          { required: true, message: "请选择无票类型", trigger: "change" },
        ],
        resultMsg: [
          { required: true, message: "请输入无票原因", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    errorTypeOptions() {
      return CONST.ORDER_RESULT_CODE_OPTIONS().filter(
        (item) => item.value !== CONST.ORDER_RESULT_CODE.SUCCESS
      );
    },
  },
  methods: {
    async saveData() {
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) return;
      } catch (error) {
        return;
      }
      if (this.formData.type !== CONST.ORDER_RESULT_CODE.OTHER) {
        this.formData.resultMsg =
          CONST.ORDER_RESULT_CODE_TEXT[this.formData.type];
      }
      this.$emit("update:noTicketResult", this.formData);
      this.$emit("on-success", false);
      this.handleClose();
    },
  },
};
</script>
<style lang="scss" scoped>
.input-medium {
  width: 380px;
}
</style>

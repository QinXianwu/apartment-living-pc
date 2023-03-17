<template>
  <div class="MembershipInfo">
    <div class="title">基本信息</div>
    <div class="content">
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="会员卡名称" prop="name">
          <el-input
            placeholder="请输入会员卡名称"
            v-model="formData.name"
            class="input-medium"
          />
        </el-form-item>
        <el-form-item label="会员折扣" prop="productDiscount">
          <div class="input-flex">
            <div class="input-content input-medium">
              <el-input-number
                class="input-medium"
                v-model="formData.productDiscount"
                placeholder="请输入会员折扣"
                :controls="false"
                :precision="1"
              />
              <span class="append el-input-group__append">折</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            class="input-medium"
            placeholder="请输入内容"
            v-model="formData.remark"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import CONST from "@/constants/index";
export default {
  name: "MembershipInfo",
  components: {},
  props: {
    infoData: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    infoData(val) {
      if (val) this.init();
    },
  },
  data() {
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
          { required: true, message: "请输入会员卡名称", trigger: "blur" },
        ],
        productDiscount: [
          { required: true, message: "请输入会员折扣", trigger: "blur" },
          {
            type: "number",
            min: 0.1,
            max: 10,
            message: "会员折扣不得小于0.1且不得大于10",
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
    init() {
      this.formData = {
        ...(this.infoData || {}),
      };
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
.MembershipInfo {
  background: #fff;
  padding: 0 10px;
  margin: 0 0 20px;
  .title {
    font-size: 15px;
    font-weight: bold;
    color: $main-font-color;
    margin-bottom: 20px;
  }
  .input-flex {
    display: flex;
    align-items: center;
    .input-content {
      display: flex;
      align-items: center;
    }
    .append {
      width: max-content;
      margin: 0;
    }
  }
}
</style>

<template>
  <el-dialog
    title="补发积分"
    :visible.sync="show"
    width="850px"
    :before-close="handleClose"
  >
    <div class="content">
      <div class="userInfo">
        <PriceBlock title="用户名称" :value="editInfo.nickName || '-'" />
        <PriceBlock
          title="总积分"
          :value="integralTotal"
          v-loading="isLoadingIntegral"
        />
      </div>
      <el-form ref="form" :rules="rules" :model="formData" label-width="100px">
        <el-form-item label="补发类型" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio-button
              :label="item.value"
              v-for="(item, index) in CONST.FLUCTUA_TYPE_OPTIONS()"
              :key="index"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="补发积分" prop="integral">
          <el-input-number
            class="input-medium"
            v-model="formData.integral"
            :step="1"
            :min="0"
            :max="999999"
            placeholder="请输入补发积分"
          />
          <el-button
            class="ml-10"
            type="primary"
            @click="handleSubmit"
            :loading="isLoading"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
      <UserIntegralList ref="UserIntegralList" :userId="editInfo.userId" />
    </div>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import CONST from "@/constants/index";
import dialogMixin from "@/mixins/dialogMixin";
import PriceBlock from "./PriceBlock.vue";
import UserIntegralList from "./UserIntegralList.vue";

export default {
  name: "UpdateIntegral",
  mixins: [dialogMixin],
  components: { PriceBlock, UserIntegralList },
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      if (val) this.init();
    },
  },
  data() {
    return {
      CONST,
      isLoading: false,
      isLoadingIntegral: false,
      integralTotal: 0,
      formData: {
        integral: "",
        type: CONST.FLUCTUA_TYPE.REVENUE,
      },
      rules: {
        integral: [
          { required: true, message: "请输入补发积分", trigger: "blur" },
          {
            type: "number",
            min: 1,
            message: "补发积分必须大于0",
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
        integral: "",
        type: CONST.FLUCTUA_TYPE.REVENUE,
      };
      this.getUserIntegral();
      this.$nextTick(() => {
        this.$refs.UserIntegralList.getList(true);
      });
    },
    async getUserIntegral() {
      if (this.isLoadingIntegral) return;
      this.isLoadingIntegral = true;
      const [, res] = await this.$http.UserHub.GetUserByIntegral({
        userId: this.editInfo.userId,
      });
      this.isLoadingIntegral = false;
      this.integralTotal =
        res?.code !== this.AJAX_CODE.SUCCESS ? 0 : res?.data || 0;
    },
    async handleSubmit() {
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) return;
      } catch (error) {
        return;
      }
      if (this.isLoading) return;
      this.isLoading = true;
      const integral =
        this.formData?.type === CONST.FLUCTUA_TYPE.REVENUE
          ? this.formData.integral
          : Number(`-${this.formData.integral}`);
      const [, res] = await this.$http.UserHub.AddUserIntegral({
        userId: this.editInfo.userId,
        userName: this.editInfo.nickName,
        ...this.formData,
        integral,
        sourceType: 5,
      });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || `补发${res ? "成功" : "失败"}`
      );
      if (res) this.init();
    },
  },
};
</script>
<style lang="scss" scoped>
.userInfo {
  padding: 10px 30px 20px;
}
</style>

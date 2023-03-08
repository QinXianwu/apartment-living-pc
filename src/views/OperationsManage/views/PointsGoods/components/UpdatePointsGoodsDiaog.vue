<template>
  <el-dialog
    width="1050px"
    :title="`${editInfo && editInfo.id ? '编辑' : '新增'}积分商品`"
    :visible.sync="visible"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <div class="content" v-loading="isLoadingInfo">
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="积分" prop="integral">
          <el-input-number
            class="input-medium"
            v-model="formData.integral"
            placeholder="积分"
            :min="0"
            :controls="false"
            :precision="0"
            :step="1"
          />
        </el-form-item>
        <el-form-item label="库存" prop="stockCount">
          <el-input-number
            class="input-medium"
            v-model="formData.stockCount"
            placeholder="库存"
            :min="0"
            :controls="false"
            :precision="0"
            :step="1"
          />
        </el-form-item>
      </el-form>
    </div>
    <ActivityGoods
      isRadio
      ref="ActivityGoods"
      :goodsList="goodsList"
      :selectGoods="selectGoods"
      @updateSelectList="$emit('update:selectGoods', $event)"
      @chooseGoods="(val) => $emit('chooseGoods', val)"
    />
    <GoodsSpecs
      isRadio
      ref="GoodsSpecs"
      :productNo="productNo"
      :specsList="specsList"
      :selectSpecs="selectSpecs"
      @updateSelectList="$emit('update:selectSpecs', $event)"
      @chooseSpecs="(val) => $emit('chooseSpecs', val)"
    />
    <span slot="footer">
      <el-button type="primary" :loading="isLoading" @click="handleSubmit">
        保存
      </el-button>
      <el-button @click="handleClose(false)"> 取消 </el-button>
    </span>
  </el-dialog>
</template>
<script>
import dialogMixin from "@/mixins/dialogMixin";
import GoodsSpecs from "./GoodsSpecs";
import ActivityGoods from "@/views/OperationsManage/components/ActivityGoods";

export default {
  name: "UpdatePointsGoodsDiaog",
  mixins: [dialogMixin],
  components: { ActivityGoods, GoodsSpecs },
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
    selectGoods: {
      type: Array,
      default: () => [],
    },
    selectSpecs: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.detailInfo = {};
        this.formData = {};
        this.goodsList = [];
        this.specsList = [];
        this.getDetail(val);
      }
    },
  },
  data() {
    return {
      formData: {},
      isLoading: false,
      isLoadingInfo: false,
      detailInfo: {},
      goodsList: [],
      specsList: [],
      rules: {
        integral: [
          { required: true, message: "请输入积分", trigger: "blur" },
          {
            type: "number",
            min: 1,
            message: "积分必须大于0",
            trigger: "blur",
          },
        ],
        stockCount: [
          { required: true, message: "请输入库存", trigger: "blur" },
          {
            type: "number",
            min: 1,
            message: "库存必须大于0",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    productNo({ goodsList, selectGoods }) {
      if (goodsList?.length) return goodsList[0]?.productNo || "";
      else if (selectGoods) return selectGoods[0]?.productNo || "";
      return "";
    },
  },
  methods: {
    async getDetail() {
      if (!this.editInfo?.id) return;
      this.isLoadingInfo = true;
      const [, res] = await this.$http.Goods.GetIntegralGoodsDetail({
        id: this.editInfo.id,
      });
      this.isLoadingInfo = false;
      this.detailInfo = { ...(res || {}) };
      this.goodsList = this.detailInfo?.product?.id
        ? [this.detailInfo.product]
        : [];
      this.$emit("update:selectGoods", this.goodsList);
      this.specsList = this.detailInfo?.product?.productStockPriceList || [];
      this.formData = { ...this.formData, ...this.detailInfo };
    },
    async handleSubmit() {
      // 表单校验
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) {
          return null;
        }
      } catch (error) {
        return error;
      }
      const GoodsInfo = await this.$refs.ActivityGoods.getQuery();
      const SpecsInfo = await this.$refs.GoodsSpecs.getQuery();
      if (
        Number(this.formData?.stockCount) > Number(GoodsInfo?.product?.stock)
      ) {
        return this.$message.error("库存数量不得大于商品剩余库存");
      }
      if (this.isLoading) return;
      this.isLoading = true;
      const query = {
        ...this.detailInfo,
        ...this.formData,
        ...GoodsInfo,
        ...SpecsInfo,
      };
      const id = this.editInfo?.id || "";
      const [, res] = await this.$http.Goods[
        id ? "UpdateIntegralGoods" : "AddIntegralGoods"
      ](query);
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || res
          ? `${id ? "编辑" : "新增"}成功`
          : `${id ? "编辑" : "新增"}失败`
      );
      if (res) this.handleClose(true);
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.content {
  margin: 0 0 40px;
  ::v-deep .pagination {
    border-top: none;
  }
}
.select-all {
  padding: 0 20px 5px;
  text-align: right;
}
</style>

<template>
  <div class="ApplicableGoods">
    <div class="title">适用商品</div>
    <div class="content">
      <el-form ref="form" :model="formData" :rules="rules" label-width="150px">
        <el-form-item label="适用商品类型" prop="applyProductType">
          <el-radio-group v-model="formData.applyProductType">
            <!-- <el-radio-button
              v-for="(item, index) in CONST.APPLY_PRODUCT_TYPE_OPTIONS()"
              :label="item.value"
              :value="item.value"
              :key="index"
              >{{ item.label }}</el-radio-button
            > -->
            <el-radio-button
              :label="CONST.APPLY_PRODUCT_TYPE.ALL"
              :value="CONST.APPLY_PRODUCT_TYPE.ALL"
              >全部商品</el-radio-button
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="适用商品"
          v-if="formData.applyProductType === $CONST.APPLY_PRODUCT_TYPE.PART"
        >
          <el-button type="text" @click="chooseGoods">选择商品</el-button>
          <TablePanel
            ref="TablePanel"
            :tableData="
              list.slice(
                (page.pageNum - 1) * page.pageSize,
                page.pageNum * page.pageSize
              )
            "
            :tableHead="column"
          >
            <template #goodsInfo="{ scope }">
              <div class="goodsInfo">
                <ImageView customClass="table-img" :src="scope.mainImage" />
                <div class="name">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="scope.productName"
                    placement="right"
                  >
                    <span>{{ scope.productName }}</span>
                  </el-tooltip>
                </div>
              </div>
            </template>
            <!-- 操作 -->
            <template #action="{ index }">
              <div class="action-groud">
                <el-button type="text" @click="handleDelete(index)">
                  删除
                </el-button>
              </div>
            </template>
          </TablePanel>
          <!-- 分页 -->
          <Pagination
            :fixed="false"
            :pageSizes="[5, 10, 20, 50, 100]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="page.pageSize"
            :current-page="page.pageNum"
            :total="list.length"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import { GoodsColumn } from "./config/index";
import { digits2Str } from "@/utils/index";
export default {
  name: "ApplicableGoods",
  components: {},
  props: {
    selectGoods: {
      type: Array,
      default: () => [],
    },
    couponsInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    selectGoods(val) {
      this.list = val?.length ? val : [];
    },
    couponsInfo(val) {
      if (val) this.init();
    },
  },
  data() {
    return {
      CONST,
      column: GoodsColumn,
      formData: {
        applyProductType: CONST.APPLY_PRODUCT_TYPE.ALL,
      },
      rules: {},
      list: [],
      page: {
        pageNum: 1,
        pageSize: 5,
      },
    };
  },
  computed: {
    ids({ list }) {
      if (!list?.length) return [];
      return list.map((item) => item.id);
    },
  },
  methods: {
    init() {
      // this.formData.applyProductType =
      //   this.couponsInfo?.applyProductType || CONST.APPLY_PRODUCT_TYPE.ALL;
      // if (this.couponsInfo?.applyProductType === CONST.APPLY_PRODUCT_TYPE.ALL) {
      //   this.list = [];
      //   return;
      // }
      // const goodsList = this.couponsInfo?.productList || [];

      this.formData.applyProductType = CONST.APPLY_PRODUCT_TYPE.ALL;
      const goodsList = [];
      goodsList.forEach((item) =>
        digits2Str(item, ["categoryId", "supplierId"])
      );
      this.list = [].concat(goodsList);
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
    },
    chooseGoods() {
      this.$emit("chooseGoods", this.ids);
    },
    handleDelete(index) {
      this.list.splice(index, 1);
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
        const applyProductType = this.formData.applyProductType;
        if (
          applyProductType === CONST.APPLY_PRODUCT_TYPE.PART &&
          !this.list?.length
        ) {
          return this.$message.error("请选择商品后再试");
        }
        resolve({
          ...this.formData,
          applyProductList:
            applyProductType === CONST.APPLY_PRODUCT_TYPE.ALL ? [] : this.ids,
        });
      });
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.ApplicableGoods {
  background: #fff;
  padding: 0 10px;
  margin: 0 0 60px;
  .title {
    font-size: 15px;
    font-weight: bold;
    color: $main-font-color;
    margin-bottom: 20px;
  }
  .goodsInfo {
    width: 100%;
    display: flex;
    align-items: center;
    .table-img {
      width: 60px;
      height: 60px;
    }
    .name {
      margin-left: 10px;
      @include overflow-eps(2);
    }
  }
}
</style>

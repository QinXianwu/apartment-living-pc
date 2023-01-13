<template>
  <div class="NewcomerGoods">
    <div class="sub-title">第二重好礼（指定添加商品）</div>
    <div class="form">
      <div class="el-form-item" style="margin-bottom: 0">
        <div class="el-form-item__label">是否赠送商品</div>
        <el-radio-group v-model="productStatus" style="line-height: 50px">
          <el-radio
            :label="item.value"
            v-for="item in CONST.GOODS_GIVE_STATE_OPTIONS()"
            :key="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </div>
    </div>
    <div class="content" v-if="productStatus === CONST.GOODS_GIVE_STATE.GIVE">
      <div class="action">
        <el-button type="primary" @click="handleAddGoods">添加商品</el-button>
      </div>
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
        <!-- 新人价 -->
        <template #couple="{ scope }">
          <span>
            {{ scope | priceRange("coupleMin", "coupleMax") }}
          </span>
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
    </div>
    <ChooseGoodsDiaog
      showCouple
      :selectIds="ids"
      :show.sync="showGoodsDiaog"
      @close="close"
      @on-success="chooseGoodsSuccess"
    />
  </div>
</template>

<script>
import CONST from "@/constants/index";
import { GoodsColumn } from "../config";
import { digits2Str } from "@/utils/index";
import ChooseGoodsDiaog from "@/components/ChooseGoodsDiaog";

export default {
  name: "NewcomerGoods",
  components: { ChooseGoodsDiaog },
  props: {
    newComerInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    newComerInfo(val) {
      if (val) this.init();
    },
  },
  data() {
    return {
      CONST,
      column: GoodsColumn,
      showGoodsDiaog: false,
      productStatus: CONST.GOODS_GIVE_STATE.GIVE,
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
      this.productStatus =
        this.newComerInfo?.productStatus || CONST.GOODS_GIVE_STATE.GIVE;
      if (this.productStatus === CONST.GOODS_GIVE_STATE.NOT_GIVE) {
        this.list = [];
        return;
      }
      const goodsList = this.newComerInfo?.productList || [];
      goodsList.forEach((item) =>
        digits2Str(item, ["id", "categoryId", "supplierId"])
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
    handleAddGoods() {
      this.showGoodsDiaog = true;
    },
    handleDelete(index) {
      this.list.splice(index, 1);
    },
    chooseGoodsSuccess(data) {
      this.list = data?.length ? data : [];
    },
    close(isRefresh = false) {
      this.showGoodsDiaog = false;
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
          this.productStatus === CONST.REWARD_COUPONS_STATE.GIVE &&
          !this.list?.length
        )
          return this.$message.error("请添加商品后再试");
        const productList =
          this.productStatus === CONST.REWARD_COUPONS_STATE.NOT_GIVE
            ? []
            : this.list;
        resolve({
          productStatus: this.productStatus,
          productList,
          productIdList: productList.map((item) => item.id),
        });
      });
    },
  },
  filters: {},
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.NewcomerGoods {
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
  .goodsInfo {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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

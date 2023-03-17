<template>
  <div class="PointsGoods view-container">
    <div class="content">
      <div class="action">
        <el-button @click="getList(true)"> 刷新 </el-button>
        <el-button type="primary" @click="handleAdd"> 新增积分商品 </el-button>
      </div>
      <TagPage :tabs="tabs" :state.sync="query.status" @getList="getList" />
      <TablePanel :tableData="list" :tableHead="column">
        <template #goodsInfo="{ scope }">
          <div class="goodsInfo">
            <ImageView
              customClass="table-img"
              :src="scope.product && scope.product.mainImage"
            />
            <div class="name">
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.product && scope.product.productName"
                placement="right"
              >
                <span>{{ scope.product && scope.product.productName }}</span>
              </el-tooltip>
            </div>
          </div>
        </template>
        <template #categoryName="{ scope }">
          <span>{{
            (scope.product && scope.product.categoryName) || "-"
          }}</span>
        </template>
        <template #supplierName="{ scope }">
          <span>{{
            (scope.product && scope.product.supplierName) || "-"
          }}</span>
        </template>
        <template #status="{ scope }">
          <el-tag
            :type="
              scope.status === $CONST.GOODS_OPER_STATE.REMOVAL ? 'danger' : ''
            "
            >{{ $CONST.GOODS_OPER_STATE_TEXT[scope.status] }}</el-tag
          >
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleEdit(scope)">编辑</el-button>
            <el-button type="text" @click="handleDelete(scope)">删除</el-button>
          </div>
        </template>
      </TablePanel>
      <!-- 分页 -->
      <Pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="page.pageSize"
        :current-page="page.pageNum"
        :total="total"
      />
    </div>
    <ChooseGoodsDiaog
      isRadio
      :selectIds="selectGoodsIds"
      :show.sync="showGoodsDiaog"
      @close="chooseClose"
      @on-success="chooseGoodsSuccess"
    />
    <ChooseSpecsDiaog
      isRadio
      :productNo="productNo"
      :selectIds="selectSpecsIds"
      :show.sync="showSpecsDiaog"
      @close="chooseClose"
      @on-success="chooseSpecsSuccess"
    />
    <UpdatePointsGoodsDiaog
      :editInfo="editInfo"
      :selectGoods.sync="selectGoods"
      :selectSpecs="selectSpecs"
      :show.sync="showActivityDiaog"
      @chooseGoods="chooseGoods"
      @chooseSpecs="chooseSpecs"
      @close="close"
    />
  </div>
</template>
<script>
import { column, tabs } from "./config";
import TagPage from "@/components/TagPage";
import ChooseSpecsDiaog from "./components/ChooseSpecsDiaog.vue";
import ChooseGoodsDiaog from "@/components/ChooseGoodsDiaog";
import UpdatePointsGoodsDiaog from "./components/UpdatePointsGoodsDiaog.vue";

export default {
  name: "PointsGoods",
  components: {
    TagPage,
    ChooseGoodsDiaog,
    ChooseSpecsDiaog,
    UpdatePointsGoodsDiaog,
  },
  data() {
    return {
      column,
      tabs,
      editInfo: "",
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      //过滤规则
      query: {
        status: "",
      },
      selectGoodsIds: [],
      selectSpecsIds: [],
      selectGoods: [],
      selectSpecs: [],
      showGoodsDiaog: false,
      showSpecsDiaog: false,
      showActivityDiaog: false,
    };
  },
  watch: {
    selectGoods() {
      // console.log(val);
      // const id = val?.length ? val[0].id : "";
      // const oldId = this.selectGoodsIds?.length ? this.selectGoodsIds[0] : "";
      // if (id !== oldId)
      this.selectSpecs = [];
    },
  },
  computed: {
    productNo({ selectGoods }) {
      if (selectGoods) return selectGoods[0]?.productNo || "";
      return "";
    },
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageNum = 1;
      this.getList(true);
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getList(false);
    },
    handleAdd() {
      this.editInfo = "";
      this.showActivityDiaog = true;
    },
    handleEdit(data) {
      this.editInfo = { id: data.id };
      this.showActivityDiaog = true;
    },
    async handleDelete({ id }) {
      try {
        await this.$confirm(`是否确认删除商品ID为${id}的数据项？`, "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.Goods.DeleteIntegralGoods({ id });
        const msg = res ? res?.msg || `删除成功` : `删除失败`;
        this.$confirm(msg, "删除提示", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) {
            this.selectDataMap = {};
            this.getList();
          }
        });
      } catch (error) {
        console.error(error);
        error;
      }
    },
    chooseGoods(data) {
      this.showGoodsDiaog = true;
      this.selectGoodsIds = data?.length ? data : [];
    },
    chooseSpecs(data) {
      this.showSpecsDiaog = true;
      this.selectSpecsIds = data?.length ? data : [];
    },
    chooseClose() {
      this.showGoodsDiaog = false;
      this.showSpecsDiaog = false;
    },
    chooseGoodsSuccess(data) {
      this.selectGoods = data?.length ? data : [];
      if (!this.selectGoods?.length) this.selectSpecs = [];
    },
    chooseSpecsSuccess(data) {
      this.selectSpecs = data?.length ? data : [];
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showActivityDiaog = false;
      if (isRefresh) this.getList();
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.Goods.GetIntegralGoodsList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取积分商品列表异常");
      }
      this.list = res?.rows || [];
      this.total = res?.total || 0;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.PointsGoods {
  background: #fff;
}
.goodsInfo {
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
.action {
  padding: 0 0 15px;
}
</style>

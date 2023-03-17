<template>
  <div class="Client">
    <div class="action">
      <el-button type="primary" plain @click="getList"> 刷新 </el-button>
      <el-button type="primary" @click="handleAdd" v-if="!list.length">
        新增会员卡
      </el-button>
    </div>
    <div class="content">
      <TablePanel :tableData="list" :tableHead="column">
        <template #productDiscount="{ scope }">
          <span>{{ scope.productDiscount }}折</span>
        </template>
        <template #productType="{ scope }">
          <span>{{ $CONST.APPLY_PRODUCT_TYPE_TEXT[scope.productType] }}</span>
        </template>
        <template #aging="{ scope }">
          <span>{{ scope | filtersAging }}</span>
        </template>
        <template #status="{ scope }">
          <el-tag
            :type="scope.status === $CONST.MEMBERSHIP_STATE.OFF ? 'danger' : ''"
            >{{ $CONST.MEMBERSHIP_STATE_TEXT[scope.status] }}</el-tag
          >
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleEdit(scope)"> 编辑 </el-button>
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
      :selectIds="selectGoodsIds"
      :show.sync="showGoodsDiaog"
      @close="chooseClose"
      @on-success="chooseGoodsSuccess"
    />
    <DrawerPopup v-model="showUpdateMembership">
      <UpdateMembership
        v-if="showUpdateMembership"
        :editInfo="editInfo"
        :selectGoods="selectGoods"
        @close="close"
        @chooseGoods="chooseGoods"
      />
    </DrawerPopup>
  </div>
</template>

<script>
import CONST from "@/constants/index";
import { formData, column } from "./config";
import ChooseGoodsDiaog from "@/components/ChooseGoodsDiaog";
import UpdateMembership from "./components/UpdateMembership";
export default {
  components: { ChooseGoodsDiaog, UpdateMembership },
  data() {
    return {
      formData,
      column, //表格头
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      query: {},
      editInfo: {},
      total: 0,
      selectGoods: [],
      selectGoodsIds: [],
      showGoodsDiaog: false,
      showUpdateMembership: false,
    };
  },
  computed: {},
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
    onSearch(data) {
      this.query = { ...data };
      this.getList(true);
    },
    handleAdd() {
      this.editInfo = {};
      this.showUpdateMembership = true;
    },
    handleEdit(item) {
      this.editInfo = { id: item.id };
      this.showUpdateMembership = true;
    },
    chooseGoods(data) {
      this.showGoodsDiaog = true;
      this.selectGoodsIds = data?.length ? data : [];
    },
    chooseGoodsSuccess(data) {
      this.selectGoods = data?.length ? data : [];
    },
    chooseClose() {
      this.showGoodsDiaog = false;
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showGoodsDiaog = false;
      this.showUpdateMembership = false;
      if (isRefresh) this.getList();
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.UserHub.GetMemberCardlList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取会员卡列表异常");
      }
      const data = res?.rows?.length ? res?.rows : [];
      this.list = data || [];
      this.total = res?.total || 0;
    },
  },
  filters: {
    filtersAging(data) {
      const tempArr = [];
      if (data.monthType === CONST.MEMBERSHIP_SHOW_STATE.SHOW) {
        tempArr.push(`月卡(${data?.monthDay || "~"}天)`);
      }
      if (data.seasonType === CONST.MEMBERSHIP_SHOW_STATE.SHOW) {
        tempArr.push(`季卡(${data?.seasonDay || "~"}天)`);
      }
      if (data.yearType === CONST.MEMBERSHIP_SHOW_STATE.SHOW) {
        tempArr.push(`年卡(${data?.yearDay || "~"}天)`);
      }
      return tempArr.join("，");
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.Client {
  background: #fff;
  .action {
    padding: 10px 0 20px;
  }
}
</style>

<template>
  <div class="ActivityList">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <div class="action">
        <el-button type="primary" @click="handleAdd"> 新增场次 </el-button>
      </div>
      <TablePanel :tableData="list" :tableHead="column">
        <!-- <template #status="{ scope }">
          <el-switch
            v-model="scope.status"
            :active-value="$CONST.SESSION_COUNT_STATE.ON"
            :inactive-value="$CONST.SESSION_COUNT_STATE.OFF"
            @change="handleStatusChange(scope)"
          >
          </el-switch>
        </template> -->
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
    <UpdateActivityDiaog
      :editInfo="editInfo"
      :show.sync="showActivityDiaog"
      @close="close"
    />
  </div>
</template>
<script>
import { column, formData } from "./config";
import UpdateActivityDiaog from "./components/UpdateActivityDiaog.vue";

export default {
  name: "ActivityList",
  components: { UpdateActivityDiaog },
  data() {
    return {
      formData,
      column, //表格头
      editInfo: "",
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      query: {}, //过滤规则
      showActivityDiaog: false,
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
      this.editInfo = "";
      this.showActivityDiaog = true;
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
      const [, res] = await this.$http.FastDeals.GetActivityList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取秒杀活动列表异常");
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
.action {
  padding: 0 0 15px;
}
</style>

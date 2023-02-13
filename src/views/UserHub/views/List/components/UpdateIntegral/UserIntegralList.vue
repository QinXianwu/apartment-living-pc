<template>
  <div class="UserIntegralList">
    <TablePanel :tableData="list" :tableHead="column" v-loading="isLoading">
      <template #type="{ scope }">
        <span>{{ $CONST.FLUCTUA_TYPE_TEXT[scope.type] }}</span>
      </template>
    </TablePanel>
    <!-- 分页 -->
    <Pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :pageSizes="[5, 10, 20, 50, 100]"
      :page-size="page.pageSize"
      :current-page="page.pageNum"
      :total="total"
      :fixed="false"
    />
  </div>
</template>

<script>
export default {
  name: "UserIntegralList",
  components: {},
  props: {
    userId: String,
  },
  data() {
    return {
      column: [
        {
          label: "变动积分",
          prop: "integral",
        },
        {
          label: "变动类型",
          prop: "type",
          type: "custom",
        },
        {
          label: "变动时间",
          prop: "createTime",
          width: 160,
        },
      ],
      list: [],
      page: {
        pageNum: 1,
        pageSize: 5,
      },
      total: 0,
      isLoading: false,
    };
  },
  watch: {
    // userId(val) {
    //   if (val) this.getList();
    // },
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
    async getList(isClear) {
      if (!this.userId || this.isLoading) return;
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        userId: this.userId,
      };
      this.isLoading = true;
      const [, res] = await this.$http.UserHub.GetUserIntegralList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取用户积分记录异常");
      }
      this.isLoading = false;
      const data = res?.rows?.length ? res?.rows : [];
      this.list = data || [];
      this.total = res?.total || 0;
    },
  },
  mounted() {
    // this.getList();
  },
};
</script>
<style lang="scss" scoped>
.UserIntegralList {
  padding: 30px;
}
</style>

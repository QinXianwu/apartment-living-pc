<template>
  <div class="UserList view-container">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <TablePanel :tableData="list" :tableHead="column">
        <template #info="{ scope }">
          <div class="userInfo">
            <ImageView class="user-avatar mr-10" :src="scope.wxAvatarUrl" />
            <div class="user-name">
              <el-tooltip
                effect="dark"
                :content="scope | filtersName"
                placement="right-start"
              >
                <span>{{ scope | filtersName }}</span>
              </el-tooltip>
            </div>
          </div>
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="lookDetail(scope)"> 查看 </el-button>
            <el-button type="text" @click="handleRemark(scope)">
              备注
            </el-button>
            <el-button type="text" @click="retroactivePoints(scope)">
              补发积分
            </el-button>
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
    <DrawerPopup v-model="showUserDetail">
      <UserDetail v-if="showUserDetail" :editInfo="editInfo" @close="close" />
    </DrawerPopup>
  </div>
</template>

<script>
import { formData, column } from "./config";
import UserDetail from "./components/UserDetail.vue";
export default {
  components: { UserDetail },
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
      showUserDetail: false,
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
    lookDetail(item) {
      this.editInfo = {
        userId: item?.userId || "",
      };
      this.showUserDetail = true;
    },
    handleRemark() {
      //
    },
    retroactivePoints() {
      //
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showUserDetail = false;
      if (isRefresh) this.getList();
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.UserHub.GetList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取定时任务列表异常");
      }
      const data = res?.rows?.length ? res?.rows : [];
      data.forEach((item) => {
        if (item?.userId) item.userId = this.$JSONbig.stringify(item.userId);
      });
      this.list = data || [];
      this.total = res?.total || 0;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.UserList {
  background: #fff;
  .userInfo {
    display: flex;
    align-items: center;
    .user-avatar {
      width: 60px;
      height: 60px;
    }
    .user-name {
      @include overflow-eps(1);
    }
  }
}
</style>

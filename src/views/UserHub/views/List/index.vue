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
                :content="scope.nickName || ''"
                placement="right-start"
              >
                <span>{{ scope.nickName || "-" }}</span>
              </el-tooltip>
            </div>
          </div>
        </template>
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="lookDetail(scope)"> 查看 </el-button>
            <el-button type="text" @click="retroactivePoints(scope)">
              补发积分
            </el-button>
            <el-popover
              placement="bottom-start"
              trigger="manual"
              transition="popover"
              v-model="showRemarkInputMap[scope.userId]"
            >
              <el-button
                class="remark-btn"
                type="text"
                slot="reference"
                @click="
                  showRemarkInputMap = {};
                  showRemarkInputMap[scope.userId] =
                    !showRemarkInputMap[scope.userId];
                "
                >备注</el-button
              >
<<<<<<< HEAD
              <div class="addVal-input">
=======
              <div class="addVal-input" v-if="showRemarkInputMap[scope.userId]">
>>>>>>> d0739a6b459e4945672b0a74ebdfd09268e7f1ae
                <el-input
                  type="text"
                  placeholder="请输入备注"
                  class="input-small mr-10 mt-10"
                  v-model="remarkInputMap[scope.userId]"
                />
                <el-button
                  type="primary"
                  class="mt-10"
                  @click="handleRemark(scope)"
                  v-loading="isLoadingSetRemark"
                  >保存</el-button
                >
                <el-button
                  type="primary"
                  class="mt-10"
                  @click="showRemarkInputMap = {}"
                  >取消</el-button
                >
              </div>
            </el-popover>
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
    <UpdateIntegralDiaog
      :editInfo="editInfo"
      :show.sync="showUpdateIntegral"
      @close="close"
    />
    <DrawerPopup v-model="showUserDetail">
      <UserDetail v-if="showUserDetail" :editInfo="editInfo" @close="close" />
    </DrawerPopup>
  </div>
</template>

<script>
import { formData, column } from "./config";
import UpdateIntegralDiaog from "./components/UpdateIntegral";
import UserDetail from "./components/UserDetail.vue";
export default {
  components: { UserDetail, UpdateIntegralDiaog },
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
      showUpdateIntegral: false,
      showUserDetail: false,
      isLoadingSetRemark: false,
      remarkInputMap: {},
      showRemarkInputMap: {},
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
    async handleRemark({ userId }) {
      if (!this.remarkInputMap[userId])
        return this.$message.error("请输入备注后再试");
      if (this.isLoadingSetRemark) return;
      this.isLoadingSetRemark = true;
      const [, res] = await this.$http.UserHub.UpdateUserRemark({
        userId,
        remark: this.remarkInputMap[userId],
      });
      this.isLoadingSetRemark = false;
      this.$message[res ? "success" : "error"](
        res?.msg || `保存${res ? "成功" : "失败"}`
      );
      if (res) {
        this.showRemarkInputMap = {};
        this.getList();
      }
    },
    retroactivePoints({ userId, nickName }) {
      this.editInfo = { userId: userId || "", nickName: nickName || "" };
      this.showUpdateIntegral = true;
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showUserDetail = false;
      this.showUpdateIntegral = false;
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
        this.$message.error(res?.msg || "获取用户列表异常");
      }
      const data = res?.rows?.length ? res?.rows : [];
      this.remarkInputMap = {};
      this.showRemarkInputMap = {};
      data.forEach((item) => {
        if (item?.userId) item.userId = this.$JSONbig.stringify(item.userId);
        this.$set(this.remarkInputMap, item.userId, item?.remark || "");
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

<template>
  <el-dialog
    title="分配角色"
    :visible.sync="visible"
    width="800px"
    @close="handleClose(false)"
  >
    <div class="content">
      <TablePanel
        ref="TablePanel"
        v-loading="isLoadingList"
        :tableData="list"
        :checkbox="true"
        :isShowTopCheck="false"
        :tableHead="AssignRole_column"
        @selection-change="handleSelectionChange"
      />
      <!-- 分页 -->
      <!-- <Pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="page.pageSize"
        :current-page="page.pageNum"
        :total="total"
      /> -->
    </div>
    <span slot="footer">
      <el-button type="primary" :loading="isLoading" @click="handleSubmit">
        保存
      </el-button>
      <el-button @click="handleClose(false)"> 取消 </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { AssignRole_column } from "../config";
import dialogMixin from "@/mixins/dialogMixin";
export default {
  name: "AssignRoleListDiaog",
  mixins: [dialogMixin],
  components: {},
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      this.selectDataMap = {};
      if (val) this.getList();
    },
  },
  data() {
    return {
      AssignRole_column,
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      query: {}, //过滤规则
      selectDataMap: {},
      isLoading: false,
      isLoadingList: false,
    };
  },
  computed: {},
  mounted() {
    //
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
    initSelection() {
      if (!this.list?.length) return;
      this.list.forEach((item) => {
        if (this.selectDataMap[item?.roleId]) {
          this.$nextTick(() => {
            this.$refs.TablePanel.setSelection(item, true);
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.list.forEach((item) => {
        // 存在于当前页以及map 但不存在 val -> 去掉
        const index = val.findIndex((vItem) => vItem?.roleId === item.roleId);
        if (this.selectDataMap[item.roleId] && index < 0)
          delete this.selectDataMap[item.roleId];
      });
      val.forEach((item) => (this.selectDataMap[item.roleId] = { ...item }));
    },
    async getList(isClear) {
      if (!this.editInfo?.userId) return;
      this.isLoadingList = true;
      if (isClear) this.page.pageNum = 1;
      const query = {
        // ...this.page,
        ...this.query,
        userId: this.editInfo.userId,
      };
      const [, res] = await this.$http.AccountRoleManage.GetUserByRoleList(
        query
      );
      this.isLoadingList = false;
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取用户所分配的角色列表异常");
      }
      this.list = res?.roles || [];
      this.total = res?.total || 0;
      const roles = res?.user?.roles?.length ? res.user.roles : [];
      roles.map((item) => {
        if (item.roleId) this.selectDataMap[item.roleId] = item;
      });
      this.initSelection();
    },
    async handleSubmit() {
      this.isLoading = true;
      const [, res] = await this.$http.AccountRoleManage.UpdataUserByRole({
        userId: this.editInfo.userId || "",
        roleIds: Object.keys(this.selectDataMap).join(",") || "",
      });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.msg || `保存${res ? "成功" : "失败"}`
      );
      if (res) this.handleClose(true);
    },
  },
};
</script>
<style lang="scss" scoped>
.action {
  margin: 20px 0;
}
</style>

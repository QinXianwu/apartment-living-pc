<template>
  <div class="AlibabaPay">
    <div class="action">
      <el-button type="primary" @click="handleAdd"> 新增支付宝账号 </el-button>
    </div>
    <TablePanel :tableData="list" :tableHead="column">
      <!-- 操作 -->
      <template #action="{ scope }">
        <div class="action-groud">
          <el-button type="text" @click="handleLookRecord(scope)">
            <span>查看统计数据</span>
          </el-button>
          <el-button type="text" @click="handleEdit(scope)"> 编辑 </el-button>
          <el-button type="text" @click="handleDelete(scope)"> 删除 </el-button>
        </div>
      </template>
    </TablePanel>
    <!-- 分页 -->
    <Pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="page.size"
      :current-page="page.current"
      :total="total"
    />
    <!-- 编辑/新增角色 -->
    <UpdatePayAccountDiaog
      :editInfo="editInfo"
      :show.sync="showUpdatePayAccount"
      @close="close"
    />
    <DrawerPopup v-model="showDrawerPopup">
      <AlibabaPayRecord
        :accountDetail="accountDetail"
        @close="handleDrawerPopupClose"
      />
    </DrawerPopup>
  </div>
</template>

<script>
import { column } from "./config";
import vModelMixin from "@/mixins/vModelMixin";
import AlibabaPayRecord from "./components/AlibabaPayRecord.vue";
import UpdatePayAccountDiaog from "./components/UpdatePayAccountDiaog.vue";
export default {
  name: "AlibabaPay",
  mixins: [vModelMixin],
  components: { AlibabaPayRecord, UpdatePayAccountDiaog },
  data() {
    return {
      column, //表格头
      list: [],
      editInfo: "",
      accountDetail: "",
      showDrawerPopup: false,
      showUpdatePayAccount: false,
      page: {
        size: 10,
        current: 1,
      },
      query: {},
      total: 0,
    };
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      this.page.size = val;
      this.page.current = 1;
      this.getList(true);
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getList(false);
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showUpdatePayAccount = false;
      if (isRefresh) this.getList();
    },
    handleAdd() {
      this.editInfo = "";
      this.showUpdatePayAccount = true;
    },
    handleLookRecord(item) {
      this.accountDetail = item;
      this.showDrawerPopup = true;
    },
    handleEdit(item) {
      this.editInfo = item;
      this.showUpdatePayAccount = true;
    },
    // 关闭抽屉事件
    handleDrawerPopupClose() {
      this.accountDetail = "";
      this.showDrawerPopup = false;
    },
    async handleDelete({ id }) {
      if (!id) return this.$message.error("获取该账户ID异常");
      try {
        await this.$confirm("确定要删除当前支付宝账号吗?", "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [err] = await this.$http.PayConfig.DeleteAlipayAccount({ id });
        let msg = err ? err.Message : "删除成功";
        this.$confirm(msg, "删除提示", {
          showClose: false,
          showCancelButton: false,
          type: !err ? "success" : "error",
        }).then(() => {
          if (!err) this.getList();
        });
      } catch (error) {
        error;
      }
    },
    async getList(isClear) {
      if (isClear) this.page.current = 1;
      const query = {
        ...this.page,
        paramData: { ...this.query },
      };
      const [, res] = await this.$http.PayConfig.GetAlipayAccountList(query);
      this.list = res?.list?.length ? res.list : [];
      this.total = res.total;
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

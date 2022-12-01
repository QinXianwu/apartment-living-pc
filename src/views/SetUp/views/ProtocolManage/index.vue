<template>
  <div class="ProtocolManage view-container">
    <!-- <div class="action">
      <el-button @click="handleAdd" type="primary"> 新增 </el-button>
    </div> -->
    <TablePanel :tableData="list" :tableHead="column">
      <template #title="{ scope }">
        {{ $CONST.PROTOCOL_TYPE_TEXT[scope.type] }}
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
    <DrawerPopup v-model="showUpdateProtocol">
      <!-- 协议详情 -->
      <UpdateProtocol
        v-if="showUpdateProtocol"
        :editInfo="editInfo"
        @close="close"
      />
    </DrawerPopup>
  </div>
</template>

<script>
import { column } from "./config";
import downloadFilelMixin from "@/mixins/downloadFilelMixin";
import UpdateProtocol from "./components/UpdateProtocol.vue";

export default {
  name: "ProtocolManage",
  mixins: [downloadFilelMixin],
  components: { UpdateProtocol },
  data() {
    return {
      column, //表格头
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      query: {},
      total: 0,
      rules: [], //过滤规则
      showUpdateProtocol: false,
      editInfo: {},
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
      if (data?.actionDate?.length) {
        this.query.params = {};
        this.query.params["beginTime"] = data.actionDate[0];
        this.query.params["endTime"] = data.actionDate[1];
        delete this.query.actionDate;
      }
      this.getList(true);
    },
    handleAdd() {
      this.editInfo = "";
      this.showUpdateProtocol = true;
    },
    handleEdit(data) {
      this.editInfo = { ...data };
      this.showUpdateProtocol = true;
    },
    close(val) {
      this.editInfo = {};
      this.showUpdateProtocol = false;
      if (val) this.getList(val);
    },
    async getList(isClear) {
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
      };
      const [, res] = await this.$http.ProtocolManage.GetList(query);
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取协议列表异常");
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
.view-container {
  background: #fff;
}
.action {
  padding: 0 0 15px;
}
</style>

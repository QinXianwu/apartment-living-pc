<template>
  <el-dialog
    width="800px"
    title="选择用户"
    :visible.sync="visible"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <div class="content">
      <SearchForm
        isReturnFormData
        :formData="AssignUsers_formData"
        @on-search="onSearch"
      />
      <TablePanel
        ref="TablePanel"
        :tableData="list"
        :tableHead="column"
        v-loading="isLoadingList"
      >
        <!-- 复选框(只允许选中一个) -->
        <template #custom_checkbox="{ scope }">
          <div class="checkbox">
            <el-checkbox
              :value="!!selectDataMap[scope.userId]"
              @change="handleRadioChange(scope)"
            >
            </el-checkbox>
          </div>
        </template>
        <template #status="{ scope }">
          <el-tag
            :type="scope.status === $CONST.USER_STATE.OFF ? 'danger' : ''"
            >{{ $CONST.USER_STATE_TEXT[scope.status] }}</el-tag
          >
        </template>
      </TablePanel>
    </div>
    <span slot="footer">
      <!-- 分页 -->
      <Pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="page.pageSize"
        :current-page="page.pageNum"
        :total="total"
      />
      <el-button type="primary" :loading="isLoading" @click="handleSubmit">
        保存
      </el-button>
      <el-button @click="handleClose(false)"> 取消 </el-button>
    </span>
  </el-dialog>
</template>
<script>
import dialogMixin from "@/mixins/dialogMixin";
import { AssignUsers_formData, AssignUsers_column } from "../config";

export default {
  name: "AddAssignUserDiaog",
  mixins: [dialogMixin],
  components: {},
  props: {
    roleInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      if (val) this.getList(val);
    },
  },
  data() {
    return {
      AssignUsers_formData,
      AssignUsers_column,
      isLoading: false,
      isLoadingList: false,
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      query: {}, //过滤规则
      selectDataMap: {},
    };
  },
  computed: {
    column({ AssignUsers_column }) {
      const filterPropStr = "action";
      return AssignUsers_column.filter(
        (item) => !filterPropStr.includes(item.prop)
      );
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
    onSearch(data) {
      this.query = { ...data };
      this.getList(true);
    },
    async getList(isClear) {
      if (!this.roleInfo?.roleId) return;
      this.isLoadingList = true;
      if (isClear) this.page.pageNum = 1;
      const query = {
        ...this.page,
        ...this.query,
        roleId: this.roleInfo.roleId,
      };
      const [, res] =
        await this.$http.AccountRoleManage.GetRoleByUnallocatedList(query);
      this.isLoadingList = false;
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取角色所分配的用户列表异常");
      }
      this.list = res?.rows || [];
      this.total = res?.total || 0;
      this.initSelection();
    },
    initSelection() {
      if (!this.list?.length) return;
      // this.list.forEach((item) => {
      //   if (this.selectDataMap[item?.userId]) {
      //     this.$nextTick(() => {
      //       this.$refs.TablePanel.setSelection(item, true);
      //     });
      //   }
      // });
    },
    handleSelectionChange(val) {
      this.list.forEach((item) => {
        // 存在于当前页以及map 但不存在 val -> 去掉
        const index = val.findIndex((vItem) => vItem?.userId === item.userId);
        if (this.selectDataMap[item.userId] && index < 0)
          delete this.selectDataMap[item.userId];
      });
      val.forEach((item) => (this.selectDataMap[item.userId] = { ...item }));
    },
    // 单选
    handleRadioChange(item) {
      if (this.selectDataMap[item.userId]) {
        this.selectDataMap = {};
      } else {
        this.selectDataMap = {
          [item.userId]: item,
        };
      }
    },
    async handleSubmit() {
      if (!Object.keys({ ...this.selectDataMap })?.length)
        return this.$message.error("请选择用户后再试");
      const [, res] = await this.$http.AccountRoleManage.AddRoleByUser({
        roleId: this.roleInfo?.roleId,
        userIds: Object.keys({ ...this.selectDataMap }).join(","),
      });
      this.$message[res ? "success" : "error"](`添加${res ? "成功" : "失败"}`);
      if (res) {
        this.selectDataMap = {};
        this.handleClose(true);
      }
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped></style>

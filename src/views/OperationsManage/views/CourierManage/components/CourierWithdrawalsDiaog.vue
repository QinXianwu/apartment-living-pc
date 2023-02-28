<template>
  <el-dialog
    width="750px"
    :title="`配送员提现`"
    :visible.sync="visible"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <div class="content" v-loading="isLoadingList">
      <el-button type="text" @click="handleReview">审核通过</el-button>
    </div>
    <span slot="footer">
      <el-button @click="handleClose(false)"> 取消 </el-button>
    </span>
  </el-dialog>
</template>
<script>
import dialogMixin from "@/mixins/dialogMixin";

export default {
  name: "CourierWithdrawalsDiaog",
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
      if (val) {
        this.courierInfo = {};
      }
    },
  },
  data() {
    return {
      isLoading: false,
      isLoadingList: false,
    };
  },
  computed: {},
  methods: {
    async handleReview({ id, status }) {
      const title = "";
      try {
        await this.$confirm(`是否确认'${title}'该配送员？`, `${title}提示`, {
          type: "warning",
          showClose: false,
        });
        const [, res] = await this.$http.Courier.UpdateCourierStatus({
          id,
          status,
        });
        const msg = res ? res?.msg || `${title}成功` : `${title}失败`;
        this.$confirm(msg, `${title}提示`, {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) {
            this.getList();
            this.$store.dispatch(
              "operationsManage/GetCourierPeopleListAction",
              true
            );
          }
        });
      } catch (error) {
        console.error(error);
        error;
      }
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.content {
  margin: 0 0 40px;
  ::v-deep .pagination {
    border-top: none;
  }
}
.select-all {
  padding: 0 20px 5px;
  text-align: right;
}
</style>

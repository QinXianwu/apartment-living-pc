// 订单操作相关的弹窗集合组件
<template>
  <el-dialog
    :title="titleDialog"
    :visible.sync="visible"
    :width="width"
    @close="handleClose(false)"
  >
    <div class="order_dialog_main">
      <!-- 设置配送员 -->
      <SetCourierPeople
        :orderTypeData="orderTypeData"
        v-if="type === 'SetCourierPeople'"
        :dataSource="dataSource"
        @close="handleClose(false)"
        @refresh="handleClose(true)"
      />
    </div>
  </el-dialog>
</template>

<script>
import dialogMixin from "@/mixins/dialogMixin";
import SetCourierPeople from "./SetCourierPeople";
export default {
  mixins: [dialogMixin],
  components: {
    SetCourierPeople,
  },
  props: {
    // 订单数据
    dataSource: {
      type: [Object, String],
      default() {
        return {};
      },
    },
    // 显示的弹窗类型
    type: {
      type: String,
      default: "",
    },
    orderTypeData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    // 标题
    titleDialog({ type }) {
      switch (type) {
        case "SetCourierPeople":
          return "配送员";
        default:
          return "";
      }
    },
    width({ type }) {
      switch (type) {
        case "SetCourierPeople":
          return "700px";
        default:
          return "900px";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.order_dialog_main {
  ::v-deep.action_footer {
    text-align: right;
    padding: 30px 0 0;
  }
}
</style>

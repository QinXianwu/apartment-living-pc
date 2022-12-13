<template>
  <div class="UpdateSpecificaValue">
    <div class="content">
      <div class="action">
        <el-button @click="handleAdd" type="primary">新增规格值</el-button>
      </div>
    </div>
    <div class="footer">
      <footer
        :class="{ fullWidth: sidebar.opened, colseWidth: !sidebar.opened }"
      >
        <el-button @click="$emit('close')" type="primary">返回</el-button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UpdateSpecificaValue",
  components: {},
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["sidebar"]),
  },
  methods: {
    handleAdd() {
      //
    },
    async getList(isClear) {
      if (!this.editInfo?.id) return;
      if (isClear) this.page.pageNum = 1;
      const [, res] = await this.$http.GoodsSpecification.GetSpecificaValueList(
        {
          specificationId: this.$JSONbig.stringify(this.editInfo.id),
        }
      );
      if (res?.code !== this.AJAX_CODE.SUCCESS) {
        this.$message.error(res?.msg || "获取规格值列表异常");
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
footer {
  position: fixed;
  width: 100%;
  height: 50px;
  right: 0;
  bottom: 0;
  padding: 0 20px;
  box-sizing: border-box;
  background: #ffffff;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: $--table-border;
  &.fullWidth {
    width: calc(100% - #{$sideBarWidth});
  }
  &.colseWidth {
    width: calc(100% - #{$sideBarCloseWidth});
  }
}
</style>

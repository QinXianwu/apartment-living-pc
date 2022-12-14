<template>
  <div class="UpdateSpecificaValue">
    <div class="content">
      <div class="action">
        <el-button @click="handleAdd" type="primary">新增规格值</el-button>
      </div>
      <div class="list">
        <template v-if="list && list.length">
          <div class="list-item" v-for="(item, index) in list" :key="index">
            <div class="list-item-l">
              <span class="name">{{ item.specificationValueName }}</span>
            </div>
            <div class="list-item-r">
              <i class="icon el-icon-edit mr-10" @click="handleEdit(item)" />
              <i class="icon el-icon-delete mr-10" />
            </div>
          </div>
        </template>
        <div class="nothing" v-else>暂无规格</div>
      </div>
    </div>
    <div class="footer">
      <footer
        :class="{ fullWidth: sidebar.opened, colseWidth: !sidebar.opened }"
      >
        <el-button @click="$emit('close')" type="primary">返回</el-button>
      </footer>
    </div>
    <UpdateSpecificaValDiaog
      :editInfo="editValInfo"
      :show.sync="showUpdataSpecificaVal"
      @close="close"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UpdateSpecificaValDiaog from "./UpdateSpecificaValDiaog.vue";

export default {
  name: "UpdateSpecificaValue",
  components: { UpdateSpecificaValDiaog },
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  data() {
    return {
      list: [],
      showUpdataSpecificaVal: false,
      editValInfo: "",
    };
  },
  computed: {
    ...mapGetters(["sidebar"]),
  },
  methods: {
    handleAdd() {
      this.editValInfo = "";
      this.showUpdataSpecificaVal = true;
    },
    handleEdit(item) {
      this.editValInfo = item || "";
      this.showUpdataSpecificaVal = true;
    },
    close(isRefresh = false) {
      this.editValInfo = "";
      this.showUpdataSpecificaVal = false;
      if (isRefresh) this.getList(isRefresh);
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
.UpdateSpecificaValue {
  padding: 10px;
  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 10px;
    background: #f7f8fa;
  }
  .list-item {
    width: 250px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px 10px;
    margin: 0 10px 10px 0;
    background: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(75, 136, 249, 0.1);
    border-radius: 10px;
    &-l {
      width: 150px;
      word-wrap: break-word;
      padding: 0 20px 0 0;
      border-right: 1px solid #eee;
    }
  }
  .action {
    padding: 0 0 15px;
  }
  .icon {
    font-size: 18px;
    cursor: pointer;
    color: $--color-primary;
  }
  .nothing {
    width: 100%;
    text-align: center;
    color: $tip-font-color;
  }
}
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

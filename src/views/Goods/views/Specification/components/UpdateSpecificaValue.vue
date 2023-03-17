<template>
  <div class="UpdateSpecificaValue">
    <div class="content">
      <div class="action">
        <el-button @click="handleUpdate()" type="primary">新增规格值</el-button>
      </div>
      <div class="list">
        <template v-if="list && list.length">
          <div class="list-item" v-for="(item, index) in list" :key="index">
            <div class="list-item-l">
              <span class="name">{{ item.specificationValueName }}</span>
            </div>
            <div class="list-item-r">
              <i class="icon el-icon-edit mr-10" @click="handleUpdate(item)" />
              <i
                class="icon el-icon-delete mr-10"
                @click="handleDelete(item)"
              />
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
    return {
      list: [],
    };
  },
  computed: {
    ...mapGetters(["sidebar"]),
  },
  methods: {
    handleUpdate(item) {
      const data = {
        specificationId: this.editInfo.id,
        ...(item || {}),
      };
      this.$emit("showSpecificaVal", data);
    },
    async handleDelete({ id, specificationValueName }) {
      try {
        await this.$confirm(
          `是否确认删除规则值为'${specificationValueName}'的数据项？`,
          "删除提示",
          {
            type: "warning",
            showClose: false,
          }
        );
        const [, res] =
          await this.$http.GoodsSpecification.DeleteSpecificaValue(
            JSON.stringify([id])
          );
        const msg = res ? res?.msg || `删除成功` : `删除失败`;
        this.$confirm(msg, "删除提示", {
          showClose: false,
          showCancelButton: false,
          type: res ? "success" : "error",
        }).then(() => {
          if (res) this.getList();
        });
      } catch (error) {
        console.error(error);
        error;
      }
    },
    async getList() {
      if (!this.editInfo?.id) return;
      const [, res] = await this.$http.GoodsSpecification.GetSpecificaValueList(
        {
          specificationId: this.editInfo.id,
        }
      );
      this.list = res?.length ? res : [];
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

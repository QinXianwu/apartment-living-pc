<template>
  <ElDialog
    title="添加直播间"
    :visible.sync="visible"
    width="40%"
    @closed="handleClose"
    custom-class="edit-goods-dialog"
  >
    <LiveList
      ref="goodList"
      @add="handleAddGood"
      @remove="handleRemoveGood"
      v-model="isCheckedAll"
    />
    <template #footer>
      <span>
        <div class="edit-goods-dialog-footer">
          <div class="edit-goodlist-list-check">
            <i
              @click="checkAll(false)"
              v-if="isCheckedAll"
              class="el-icon-success"
            ></i>
            <i v-else @click="checkAll(true)" class="empty-check"></i>
            &nbsp;&nbsp; 全选 &nbsp;&nbsp;已选{{ selectGoodsCounts }}个直播间
          </div>
          <div>
            <ElButton type="primary" @click="handleClose">确定</ElButton>
          </div>
        </div>
      </span>
    </template>
  </ElDialog>
</template>
<script>
import { simpleCloneDeep } from "@/utils/index.js";
import LiveList from "@@/components/LiveList/Index.vue";
export default {
  components: { LiveList },
  data() {
    return {
      isCheckedAll: false,
      visible: false,
    };
  },
  computed: {
    selectGoodsCounts() {
      return this.selectComInfo?.list?.length || 0;
    },
    selectComInfo() {
      return this.$store.getters["editor/selectComInfo"];
    },
    isShowLiveDialog() {
      return this.$store.state.editor.isShowLiveDialog;
    },
  },
  watch: {
    visible(val) {
      this.$store.commit("editor/setIsShowLiveDialog", val);
    },
    isShowLiveDialog(val) {
      this.visible = val;
    },
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    // 商品选择回调
    handleAddGood(item) {
      console.log("item", item);
      const newCurrentData = simpleCloneDeep(this.selectComInfo);
      newCurrentData.list.push(item); // 添加商品ID
      this.$store.dispatch("editor/updateComInfoByIndex", {
        data: newCurrentData,
      });
    },
    // 移除商品回调
    handleRemoveGood(item) {
      const newCurrentData = simpleCloneDeep(this.selectComInfo);
      newCurrentData.list.forEach((pro, i) => {
        if (pro.ID === item.spu_id) {
          newCurrentData.list.splice(i, 1);
        }
      });
      this.$store.dispatch("editor/updateComInfoByIndex", {
        data: newCurrentData,
      });
    },
    checkAll(val) {
      this.$refs.goodList.handleCheckAll(val);
    },
  },
};
</script>
<style lang="scss" scoepd>
@import "@@/style/var.scss";
.edit-goods-dialog {
  .el-dialog__body {
    padding-bottom: 0;
  }
  &-footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 40px;
    > div {
      flex-grow: 1;
    }
    .edit-goodlist-list-check {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
</style>

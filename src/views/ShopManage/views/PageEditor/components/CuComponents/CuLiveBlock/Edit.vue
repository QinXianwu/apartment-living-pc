<template>
  <div class="custom-edit">
    <div>
      <span class="description">{{ imgProposalTips }}</span>
    </div>
    <div class="wrapper">
      <div
        v-for="(item, index) in formModel.list"
        :key="index + '_' + item.LiveRoomId"
        class="edit-block-item"
      >
        <i class="el-icon-close" @click="handleDeleteItem(index)"></i>
        <div class="left-block">
          <div class="edit_na_link">
            <span class="edit_na_link_label">房间名：</span>
            <div class="edit_na_btn">{{ item.LiveRoomName }}</div>
          </div>
          <div class="edit_na_link">
            <span class="edit_na_link_label">房间ID：</span>
            <div class="edit_na_btn">{{ item.LiveRoomId }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="edit-block-item area-boder">
      <ElButton type="text" @click="addItem">
        <i class="el-icon-plus"></i> 添加直播间
      </ElButton>
    </div>
  </div>
</template>

<script>
import EditMixin from "@@/mixins/EditMixin.js"; // 混入公共JS
export default {
  name: "edit-cu-live-block",
  mixins: [EditMixin],
  computed: {
    imgProposalTips() {
      return "直播间信息（名称、商品等）在移动端为实时同步，在pc端此处仅展示添加该直播间时的状态，实时信息以移动端的展示或直播列表的信息为准";
    },
  },
  methods: {
    addItem() {
      this.$store.commit("editor/setIsShowLiveDialog", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.left-block {
  width: 100%;
  text-align: left;
  .edit_na_link {
    margin-top: 0;
    margin-bottom: 10px;
  }
}
</style>

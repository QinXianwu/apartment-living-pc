<template>
  <div class="edit_na_link">
    <span class="edit_na_link_label">跳转位置：</span>
    <div
      class="edit_na_btn"
      @click="showLinkDialogAction({ item, index })"
      v-html="ButtonTip"
    ></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { NAVIGATOR_TYPE } from "@@/components/CuComponents/utils/constant.js";
export default {
  props: {
    index: Number,
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    goodsInfoHash() {
      return this.$store.state.editor.goodsInfoHash;
    },
    categoryInfoHash() {
      return this.$store.state.editor.categoryInfoHash;
    },
    ButtonTip() {
      if (!this.item?.navigator) return "添加跳转链接";
      const { type, value, miniPath, category_id, name } = this.item.navigator;
      // 普通地址

      if (type === NAVIGATOR_TYPE.URL)
        //    <p class="edit_p_tips">H5：${value || "空"}</p>
        return `
        <p class="edit_p_tips">小程序：${miniPath || "空"}</p>
      `;
      // 商品ID
      if (type === NAVIGATOR_TYPE.GOODS) {
        // 商品名称
        const GoodsName = this.goodsInfoHash[value]?.name || name || "";
        return `商品-${GoodsName}`;
      }
      // 商品ID
      if (type === NAVIGATOR_TYPE.CATEGORY) {
        // 商品名称
        const GoodsName =
          this.categoryInfoHash[category_id]?.name || name || "";
        return `分类-${GoodsName}`;
      }
      return "";
    },
  },
  methods: {
    ...mapActions({
      // 打开选择链接弹窗
      showLinkDialogAction: "editor/showLinkDialogAction",
    }),
  },
};
</script>

<style lang="scss">
.edit_na_link {
  display: flex;
  border-radius: 5px;
  background-color: #fff;
  align-items: center;
  margin-top: 8px;
}
.edit_na_link_label {
  flex-shrink: 0;
}
.edit_na_btn {
  flex-grow: 1;
  color: $--color-primary;
  cursor: pointer;
}
.edit_p_tips {
  text-align: left;
  word-break: break-all;
  line-height: 14px;
  & + .edit_p_tips {
    margin-top: 5px;
  }
}
</style>

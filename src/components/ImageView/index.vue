<template>
  <el-image
    class="ImageView"
    :class="customClass"
    :src="src"
    :fit="fit"
    :lazy="lazy"
    @click="$emit('click')"
    :preview-src-list="previewSrcList"
  >
    <template #error>
      <img class="image-slot" src="@/assets/images/img_error.png" alt="" />
    </template>
  </el-image>
</template>
<script>
export default {
  name: "ImageView",
  props: {
    src: {
      type: String,
      default: "",
    },
    fit: {
      type: String,
      default: "contain",
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    srcList: {
      type: Array,
      default() {
        return [];
      },
    },
    // 是否允许预览
    isPreviewImg: {
      type: Boolean,
      default: true,
    },
    customClass: {
      type: [Array, Object, String],
      default() {
        return [];
      },
    },
  },
  computed: {
    previewSrcList({ src, srcList, isPreviewImg }) {
      if (!isPreviewImg) return null; // 不允许预览
      return srcList.length ? srcList : [src];
    },
  },
};
</script>
<style lang="scss" scoped>
.ImageView {
  flex-shrink: 0;
}
.image-slot {
  width: inherit;
  height: inherit;
  flex-shrink: 0;
}
</style>

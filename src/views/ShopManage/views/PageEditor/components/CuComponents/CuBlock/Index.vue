<template>
  <div
    :class="calClass"
    :style="{
      bottom: marginBottom + 'px',
    }"
    @click="OnClick"
  >
    <slot></slot>
    <div
      @click="deleteComponent"
      v-if="selectIndex === index"
      class="device-content-delete"
    >
      <i class="el-icon-delete"></i>
    </div>
    <!-- 编辑长宽高 -->
    <!-- <i class="group-dot"></i>
    <i class="group-dot"></i>
    <i class="group-dot"></i>
    <i class="group-dot"></i>
    <i class="group-dot"></i>
    <i class="group-dot"></i> -->
  </div>
</template>
<script>
// 自定义拖 拽容器
export default {
  name: "cu-block",
  data() {
    return {};
  },
  computed: {
    calClass() {
      return [
        "group-mask",
        "item-drag",
        this.isShow ? "" : "hide",
        this.selectIndex === this.index ? "cur" : "",
        this.isFixedBottom && "fixedBottom",
      ];
    },
    selectIndex() {
      return this.$store.state.editor.selectIndex;
    },
  },
  props: {
    isShow: {
      type: Boolean,
      default() {
        return true;
      },
    },
    index: {
      type: Number,
      default() {
        return -1;
      },
    },
    // 是否底部固定
    isFixedBottom: {
      type: Boolean,
      default: false,
    },
    // 距離底部
    marginBottom: {
      type: Number,
      default: 0,
    },
    height: {
      type: String,
      default: "",
    },
    // 边距
    marginStyle: {
      type: Object,
      default() {
        return {
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        };
      },
    },
  },
  methods: {
    OnClick() {
      this.$emit("click");
    },
    // 删除组件
    deleteComponent() {
      this.$confirm("确定删除该组件？", "提示")
        .then(() => {
          this.$store.dispatch("editor/deleteItem", this.index);
          this.$store.commit("editor/setSelectIndex", -1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.group-mask {
  position: relative;
  z-index: 1;
  position: relative;
  .device-content-delete {
    width: 35px;
    height: 35px;
    top: -2px;
    right: 0;
    margin-right: -48px;
    border-radius: 5px;
    background: #ffffff;
    border: 1px solid #e4e7ed;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  &::after {
    position: absolute;
    content: " ";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
  }
}

.group-mask:active {
  cursor: move;
}

.group-mask:hover,
.group-mask.cur {
  &::after {
    border: 1px dashed #409eff;
  }
}

.group-action {
  position: absolute;
  line-height: 30px;
  width: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s;
  bottom: 0;
  right: -60px;
  display: none;
}

.group .group-action {
  display: block;
}

.group-action > div {
  transition: all 0.3s;
  color: white;
  text-align: center;
}

.group-action > div:hover {
  background-color: #409eff;
}

.group-action:before {
  content: "";
  width: 0;
  height: 0;
  border: 10px solid transparent;
  /*调整小三角形的大小*/
  border-right-color: rgba(0, 0, 0, 0.5);
  /*改变小三角的颜色（最好就是和父级div的背景颜色相同）;bottom是用于调整小三角的方向*/
  position: absolute;
  right: 100%;
  /*调整小三角形的位置*/
  bottom: 20px;
  /*调整小三角形的位置*/
  margin-top: 20px;
  /*调整小三角形的位置*/
}

.fixedBottom {
  position: absolute;
  bottom: 0;
}
</style>

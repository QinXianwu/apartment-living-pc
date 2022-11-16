// 编辑组件公用方法
import { simpleCloneDeep } from "@/utils/index.js";
import { mapActions } from "vuex";
import UploadImg from "@@/components/UploadImg/Index.vue";
export default {
  components: { UploadImg },
  data() {
    return {
      // 编辑表单的对象
      formModel: {},
    };
  },
  watch: {
    selectComInfo: {
      deep: true,
      handler(val) {
        this.formModel = val;
      },
    },
    formModel: {
      deep: true,
      handler(val) {
        this.$store.dispatch("editor/updateComInfoByIndex", { data: val });
      },
    },
  },
  computed: {
    selectComInfo() {
      return this.$store.getters["editor/selectComInfo"];
    },
    selectIndex() {
      return this.$store.state.editor.selectIndex;
    },
  },
  created() {
    this.formModel = simpleCloneDeep(this.selectComInfo);
  },
  methods: {
    ...mapActions({
      // 打开选择链接弹窗
      showLinkDialogAction: "editor/showLinkDialogAction",
      updateEditorJsonList: "editor/updateEditorJsonList",
      updateEditorJsonAttrByIndex: "editor/updateEditorJsonAttrByIndex",
    }),
    // 获取图片链接并注入对应数组
    // data是个数组 判断长度是否存在
    OnHandleImgChange(data, index) {
      if (!data?.length) {
        this.$message({
          type: "error",
          message: "图片上传失败",
        });
        return;
      }
      if (index === -1) {
        this.updateEditorJsonList({
          index: this.selectIndex,
          val: {
            image: data[0],
          },
          type: "push",
        });
      } else {
        let obj = this.selectComInfo.list[index];
        this.updateEditorJsonList({
          index: this.selectIndex,
          val: { ...obj, image: data[0] },
          type: "update",
          updateIndex: index,
        });
      }
    },
    // 修改背景图片
    OnHandleBgImgChange(data) {
      if (!data?.length) {
        this.$message({
          type: "error",
          message: "图片上传失败",
        });
        return;
      }
      this.updateEditorJsonAttrByIndex({
        index: this.selectIndex,
        attr: "backgroundImage",
        val: data[0],
      });
    },
    // 组件内删除item
    handleDeleteItem(i) {
      this.updateEditorJsonList({
        index: this.selectIndex,
        val: i,
        type: "splice",
      });
    },
    // 排序事件
    // 升序
    handleAscSortItem(item, index) {
      const newList = [...this.selectComInfo.list];
      newList[index] = newList.splice(index - 1, 1, item)[0];
      this.updateEditorJsonAttrByIndex({
        index: this.selectIndex,
        attr: "list",
        val: newList,
      });
    },
    // 降序
    handleDescSortItem(item, index) {
      const newList = [...this.selectComInfo.list];
      newList[index] = newList.splice(index + 1, 1, item)[0];
      this.updateEditorJsonAttrByIndex({
        index: this.selectIndex,
        attr: "list",
        val: newList,
      });
    },
  },
};

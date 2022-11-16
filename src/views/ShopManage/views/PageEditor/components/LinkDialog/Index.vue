<template>
  <!--选择链接弹窗-->
  <div class="link_dialog">
    <ElDialog
      :title="'跳转链接'"
      :visible.sync="isShowDialog"
      width="45%"
      @closed="handleClose"
    >
      <div class="custom-link-dialog">
        <!-- tab选择链接模块 -->
        <ElTabs v-model="linkDialogType">
          <ElTabPane label="商品" :name="NAVIGATOR_TYPE.GOODS">
            <GoodList
              ref="goodList"
              @selectChange="selectLinkItem"
              :isOneSelect="true"
            />
          </ElTabPane>
          <ElTabPane label="商品分类" :name="NAVIGATOR_TYPE.CATEGORY">
            <el-cascader
              :options="goodsCategoryOptions"
              v-model="category_id"
              placeholder="请选择商品分类"
              clearable
              :props="{
                checkStrictly: true,
                emitPath: false,
              }"
            >
            </el-cascader>
          </ElTabPane>
          <ElTabPane label="自定义" :name="NAVIGATOR_TYPE.URL">
            <div>
              <ElForm ref="form" label-width="120px">
                <!-- <ElFormItem label="H5跳转地址">
                  <ElInput
                    placeholder="请输入需要跳转的H5地址"
                    v-model="navigatorUrl"
                    clearable
                  >
                  </ElInput>
                </ElFormItem> -->
                <ElFormItem label="小程序跳转路径">
                  <ElInput
                    placeholder="请输入需要跳转的小程序路径，例：/pages/index/index"
                    v-model="miniPath"
                    clearable
                  >
                  </ElInput>
                </ElFormItem>
              </ElForm>
            </div>
          </ElTabPane>
        </ElTabs>
      </div>
      <template #footer>
        <span>
          <ElButton type="primary" @click="handleConfirm">{{
            "确 定"
          }}</ElButton>
        </span>
      </template>
    </ElDialog>
  </div>
</template>
<script>
import GoodList from "@@/components/GoodsList/Index.vue";
import { mapActions } from "vuex";
import { NAVIGATOR_TYPE } from "@@/components/CuComponents/utils/constant.js";
export default {
  components: { GoodList },
  data() {
    return {
      linkDialogType: NAVIGATOR_TYPE.GOODS,
      isShowDialog: false,
      navigatorUrl: "", // 跳转地址
      miniPath: "", // 小程序跳转路径
      NAVIGATOR_TYPE,
      category_id: "",
    };
  },
  computed: {
    isShowLinkDialog() {
      return this.$store.state.editor.isShowLinkDialog;
    },
    selectIndex() {
      return this.$store.state.editor.selectIndex;
    },
    selectComInfo() {
      return this.$store.getters["editor/selectComInfo"];
    },
    selectingItemIndex() {
      return this.$store.state.editor.selectingItemIndex;
    },
    selectingNavigator() {
      return this.$store.state.editor.selectingNavigator;
    },
    goodsCategoryOptions() {
      // return this.$store.state.goodsManage.goodsCategoryOptions;
      return [];
    },
  },
  watch: {
    selectingNavigator(val) {
      if (val?.type) {
        this.linkDialogType = val.type;
      }
      if (val?.type === NAVIGATOR_TYPE.URL) {
        this.navigatorUrl = val.value || ""; // H5跳转地址
        this.miniPath = val.miniPath || ""; // 小程序跳转地址
      }
      if (val?.type === NAVIGATOR_TYPE.CATEGORY) {
        this.category_id = val.category_id;
      } else {
        this.category_id = "";
      }
    },
    isShowDialog(val) {
      this.$store.commit("editor/setIsShowLinkDialog", val);
    },
    isShowLinkDialog(val) {
      this.isShowDialog = val;
    },
  },
  created() {
    this.isShowDialog = this.isShowLinkDialog;
  },
  methods: {
    ...mapActions({
      updateEditorJsonList: "editor/updateEditorJsonList",
    }),
    handleClose() {
      this.$store.commit("editor/setSelectingNavigator", null);
      this.$store.commit("editor/setIsShowLinkDialog", false);
    },
    // 确定
    handleConfirm() {
      if (
        this.linkDialogType === NAVIGATOR_TYPE.URL &&
        (this.navigatorUrl || this.miniPath)
      ) {
        // if (
        //   !this.navigatorUrl
        //   // &&
        //   // this.navigatorUrl.toLocaleLowerCase().slice(0, 4) !== "http"
        // ) {
        //   return this.$message.error("请输入有效的H5地址！");
        // }
        if (this.miniPath && this.miniPath.charAt(0) !== "/") {
          return this.$message.error("请输入有效的小程序路径！");
        }
        this.updateEditorJsonList({
          index: this.selectIndex,
          val: {
            ...this.selectComInfo.list[this.selectingItemIndex],
            navigator: {
              type: NAVIGATOR_TYPE.URL,
              value: this.navigatorUrl,
              miniPath: this.miniPath,
            },
          },
          type: "update",
          updateIndex: this.selectingItemIndex,
        });
      }
      if (this.linkDialogType === NAVIGATOR_TYPE.CATEGORY) {
        if (!this.category_id) {
          return this.$message.error("请选择商品分类！");
        }
        this.updateEditorJsonList({
          index: this.selectIndex,
          val: {
            ...this.selectComInfo.list[this.selectingItemIndex],
            navigator: {
              type: NAVIGATOR_TYPE.CATEGORY,
              value: this.navigatorUrl,
              miniPath: this.miniPath,
              category_id: this.category_id,
            },
          },
          type: "update",
          updateIndex: this.selectingItemIndex,
        });
        this.category_id;
      }

      this.handleClose();
    },
    // 弹窗选择跳转链接
    selectLinkItem(navigator) {
      this.updateEditorJsonList({
        index: this.selectIndex,
        val: {
          ...this.selectComInfo.list[this.selectingItemIndex],
          navigator,
        },
        type: "update",
        updateIndex: this.selectingItemIndex,
      });
      this.$store.commit("editor/setSelectingNavigator", navigator);
    },
  },
};
</script>
<style lang="scss">
// 选择链接弹窗
.link_dialog .el-dialog__body {
  padding: 10px 20px;
}
.custom-link-dialog {
  .infinite-list {
    height: 400px;
  }
  .custom-link-item {
    cursor: pointer;
    font-size: 14px;
    color: #4a4a4a;
    line-height: 40px;
    border-bottom: 1px solid #f2f2f2;
    &.lessons_mode {
      line-height: 16px;
      padding: 10px;
      margin: 5px 0;
    }
    .price {
      font-size: 12px;
      color: #ff5454;
    }
  }

  .lessons_img_box {
    margin-right: 10px;
    img {
      width: 120px;
      height: 80px;
    }
  }
}
</style>

<template>
  <div id="editPage">
    <!-- 保存按钮 -->
    <div id="save-area">
      <div>当前页面：{{ confirmForm.Description }}</div>
      <div>
        <ElButton class="width-button" plain @click="gotoBack">返回</ElButton>
        <ElButton type="primary" class="width-button" @click="getJsonPageFile"
          >保存</ElButton
        >
      </div>
    </div>
    <!-- 主体 -->
    <div id="mian-content">
      <!-- 组件列表 -->
      <div id="com-list">
        <ElScrollbar style="height: 100%" wrapStyle="overflow-x: hidden;">
          <ComponentsList />
        </ElScrollbar>
      </div>

      <!--组件预览区域-->
      <div id="device-content">
        <ElScrollbar style="height: 100%" wrapStyle="overflow-x: hidden;">
          <DeviceView />
        </ElScrollbar>
      </div>

      <!--组件属性编辑区域-->
      <div id="custom-edit">
        <ElScrollbar style="height: 100%" wrapStyle="overflow-x: hidden;">
          <AttrView />
        </ElScrollbar>
      </div>
    </div>
    <!-- 选择链接弹窗 -->
    <LinkDialog />
    <!-- 商品选择 -->
    <GoodsDialog />
    <!-- 直播选择 -->
    <LiveDialog />
  </div>
</template>
<script>
/**
 * 考虑到这玩意要拓展 能拆的东西尽量拆出去，不要在这个页面出现太长的 模块/数据/逻辑
 * ./components/CuComponents 存放自定义组件
 * ./components/ComponentsList 左侧组件
 */
// 额外组件
import LinkDialog from "./components/LinkDialog/Index.vue"; // 选择链接
import GoodsDialog from "./components/GoodsDialog/Index.vue"; // 选择商品
import LiveDialog from "./components/LiveDialog/Index.vue"; // 选择商品
import ComponentsList from "./components/ComponentsList/Index.vue"; // 组件列表
import AttrView from "./components/AttrView/Index.vue"; // 组件编辑
import DeviceView from "./components/DeviceView/Index.vue"; // 组件编辑
import { getQueryObj } from "@/utils/index.js";
export default {
  name: "PageEditor",
  components: {
    LinkDialog,
    ComponentsList,
    AttrView,
    GoodsDialog,
    DeviceView,
    LiveDialog,
  },
  data() {
    return {
      // 默认渲染组件数组
      editId: "", //编辑id
      categoryList: [],
      qrCodeImg: "", //二维码
      copyUrl: "",
      codeDialogVisible: false,
    };
  },
  computed: {
    selectIndex() {
      return this.$store.state.editor.selectIndex;
    },
    confirmForm() {
      return this.$store.state.editor.confirmForm;
    },
    editorJson() {
      return this.$store.state.editor.editorJson;
    },
    selectingItemIndex() {
      return this.$store.state.editor.selectingItemIndex;
    },
    selectComInfo() {
      return this.$store.getters["editor/selectComInfo"];
    },
    goodsCategoryOptions() {
      // return this.$store.state.goodsManage.goodsCategoryOptions;
      return [];
    },
  },
  mounted() {
    const urlQuery = getQueryObj(location.href);
    this.editId = urlQuery.pageId || "/pages/index/index"; //自定义首页 路径 和后台约束好
    this.$store.dispatch("editor/getEditorJson", "/pages/index/index");
    // 获取全部分类
    // this.$store.dispatch("goodsManage/GetGoodsCategoryListOptionsAction");
  },
  watch: {
    // 处理分类数据 方便查询  最多三层
    goodsCategoryOptions(val) {
      if (val && val.length) {
        let newHash = {};
        val.forEach((element) => {
          newHash[element.value] = element;
          if (element.children?.length) {
            element.children.forEach((c) => {
              newHash[c.value] = c;
              if (c.children?.length) {
                c.children.forEach((c2) => {
                  newHash[c2.value] = c2;
                });
              }
            });
          }
        });
        this.$store.commit("editor/setCategoryHash", newHash);
      }
    },
  },
  methods: {
    // 上传组件上传完成时自动触发事件，获取json链接
    getJsonPageFile() {
      this.$prompt("请输入页面名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: this.confirmForm.Description,
        inputPlaceholder: this.confirmForm.Description,
        inputValidator: (val) => {
          if (!val) {
            return "请输入页面名称";
          } else if (val.length > 10) {
            return "页面名称不能大于10个字符";
          } else {
            return true;
          }
        },
      })
        .then(({ value }) => {
          const query = {
            value: JSON.stringify({
              templateName: value,
              jsonData: this.editorJson.map((element) => ({ ...element })),
            }),
            path: this.editId,
            title: value,
          };
          console.log(query);
          // this.$http.SiteTemplate.SetSiteTemplateApi(query).then(([, res]) => {
          //   if (res) this.$message.success("保存成功！");
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    // 返回页面
    gotoBack() {
      this.$confirm("不保存修改直接返回上个页面吗？", "系统提示")
        .then(() => {
          history.back();
        })
        .catch();
    },
  },
};
</script>
<style lang="scss">
@import "./style/common.scss";
#editPage {
  width: 100%;
  min-width: 1260px;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  .flex {
    display: flex;
  }
  .header {
    margin-bottom: 0;
  }
  > .el-row {
    > .el-col {
      height: 100%;
    }
  }
  // 主体
  #mian-content {
    width: 100%;
    height: calc(100% - 53px);
    display: flex;
  }
  #device-content {
    background-color: #f9f9f9;
    height: 100%;
    position: relative;
    flex-grow: 1;
    border-right: 1px solid #e5e5e5;
  }
  #com-list {
    width: 255px;
    flex-shrink: 0;
    border-right: 1px solid #e5e5e5;
  }
  #custom-edit {
    width: 550px;
    flex-shrink: 0;
    height: 100%;
  }
}

// 保存
#save-area {
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  padding: 10px;
  z-index: 11;
  .width-button {
    width: 100px;
  }
}
</style>

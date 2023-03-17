// 弹窗的mxin 示例
// 方便组件内使用弹窗不用每次都重复写这些属性去控制展开/关闭
{
  // 组件外
  // <EditDialog :show.sync="dialogVisible" @close="close" />
  // 组件内
  /* <el-dialog title="title" :visible.sync="visible" width="30%" @close="handleClose">
       <span>cc</span>
       <span slot="footer">
         <el-button @click="handleClose">取消</el-button>
         <el-button type="primary" @click="handleClose">保存</el-button>
       </span>
     </el-dialog> */
}
export default {
  data() {
    return {
      // 控制弹窗是否展开
      visible: false,
    };
  },
  props: {
    // 标题
    title: {
      type: String,
      default: "",
    },
    // 外部 :show.sync 绑定 用来外部控制弹窗是否显示
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    // 监听
    show(val) {
      this.visible = val;
    },
    visible(val) {
      if (!val) {
        this.handleClose();
      }
    },
  },
  methods: {
    // 关闭方法
    handleClose(val = false) {
      this.$emit("update:show", false);
      this.$emit("close", val === true ? true : false); // 防止把原生事件判断为true 必须传入true才抛出true
    },
  },
};

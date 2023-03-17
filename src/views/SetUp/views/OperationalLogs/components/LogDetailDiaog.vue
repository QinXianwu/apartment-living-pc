<template>
  <el-dialog
    title="操作日志详细"
    :visible.sync="visible"
    width="650px"
    @close="handleClose(false)"
  >
    <div class="content">
      <el-form ref="form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="操作模块：">
              {{ logData.title }} /
              {{ $CONST.SYS_ACTION_TYPE_TEXT[logData.businessType] }}
            </el-form-item>
            <el-form-item label="登录信息：">
              {{ logData.operName }} / {{ logData.operIp }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请求地址：">
              {{ logData.operUrl }}
            </el-form-item>
            <el-form-item label="请求方式：">
              {{ logData.requestMethod }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="操作方法：">
              {{ logData.method }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="请求参数：">
              {{ logData.operParam }}</el-form-item
            >
          </el-col>
          <el-col :span="24">
            <el-form-item label="返回参数：">
              {{ logData.jsonResult }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作状态：">
              {{ $CONST.SYS_ACTION_STATE_TEXT[logData.status] }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作时间：">
              {{ logData.operTime }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="异常信息："
              v-if="logData.status === $CONST.SYS_ACTION_STATE.FAIL"
            >
              {{ logData.errorMsg }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer">
      <el-button @click="handleClose(false)"> 取消 </el-button>
    </span>
  </el-dialog>
</template>
<script>
import dialogMixin from "@/mixins/dialogMixin";
export default {
  name: "LogDetailDiaog",
  mixins: [dialogMixin],
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible() {
      this.logData = this.editInfo || {};
    },
  },
  data() {
    return {
      logData: {},
    };
  },
  computed: {},
  mounted() {
    //
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.tree-border {
  margin-top: 5px;
  border: 1px solid #e5e6e7;
  background: #ffffff none;
  border-radius: 4px;
}
</style>

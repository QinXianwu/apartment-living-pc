<template>
  <el-dialog
    width="800px"
    title="调度日志详细"
    :visible.sync="visible"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <div class="content">
      <el-form ref="form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="日志序号：">
              {{ logInfo.jobLogId }}
            </el-form-item>
            <el-form-item label="任务名称：">
              {{ logInfo.jobName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务分组：">
              {{ logInfo.jobGroup }}
            </el-form-item>
            <el-form-item label="执行时间：">
              {{ logInfo.createTime }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="调用方法：">
              {{ logInfo.invokeTarget }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="日志信息：">
              {{ logInfo.jobMessage }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="执行状态：">
              {{ $CONST.JOB_STATE_TEXT[logInfo.status] }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="异常信息："
              v-if="logInfo.status === $CONST.JOB_STATE.OFF"
            >
              {{ logInfo.exceptionInfo }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer">
      <el-button @click="handleClose(false)"> 关闭 </el-button>
    </span>
  </el-dialog>
</template>
<script>
import dialogMixin from "@/mixins/dialogMixin";

export default {
  name: "DispatchLogDiaog",
  mixins: [dialogMixin],
  components: {},
  props: {
    logInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      if (val) {
        //
      }
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {},
  methods: {},
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped></style>

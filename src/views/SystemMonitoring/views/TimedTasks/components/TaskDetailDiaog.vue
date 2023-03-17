<template>
  <el-dialog
    title="查看任务详情"
    :visible.sync="visible"
    width="650px"
    @close="handleClose(false)"
  >
    <div class="content">
      <el-form ref="form" label-width="120px" v-loading="isLoadingTask">
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务编号：">{{ taskData.jobId }}</el-form-item>
            <el-form-item label="任务名称：">
              {{ taskData.jobName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务分组：">
              {{ $CONST.JOB_GROUP_TEXT[taskData.jobGroup] }}
            </el-form-item>
            <el-form-item label="创建时间：">
              {{ taskData.createTime }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="cron表达式：">
              {{ taskData.cronExpression }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下次执行时间：">
              {{ taskData.nextValidTime }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="调用目标方法：">
              {{ taskData.invokeTarget }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务状态：">
              {{ $CONST.JOB_STATE_TEXT[taskData.status] }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否并发：">
              {{ $CONST.CONCURRENCY_TEXT[taskData.concurrent] }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执行策略：">
              {{ $CONST.EXECUTE_POLICY_TEXT[taskData.misfirePolicy] }}
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
  name: "TaskDetailDiaog",
  mixins: [dialogMixin],
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      this.init();
      if (val) {
        this.getTaskInfo();
      }
    },
  },
  data() {
    return {
      taskData: {},
      isLoading: false,
      isLoadingTask: false,
    };
  },
  computed: {},
  mounted() {
    //
  },
  methods: {
    init() {
      //
    },
    // 获取任务详情
    async getTaskInfo() {
      if (this.isLoadingTask || !this.editInfo?.jobId) return;
      this.isLoadingTask = true;
      const [, res] = await this.$http.SystemMonitoring.GetScheduleTaskDetail({
        jobId: this.editInfo?.jobId || "",
      });
      this.isLoadingTask = false;
      if (!res) return this.$message.error(res?.msg || "获取任务详情异常");
      this.taskData = { ...this.taskData, ...res };
    },
  },
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

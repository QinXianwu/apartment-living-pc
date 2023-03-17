<template>
  <el-dialog
    :title="`${editInfo && editInfo.jobId ? '编辑' : '新增'}任务`"
    :visible.sync="visible"
    width="650px"
    @close="handleClose(false)"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="150px"
      v-loading="isLoadingTask"
    >
      <el-form-item label="任务名称:" prop="jobName">
        <el-input
          class="input-medium"
          v-model="formData.jobName"
          placeholder="请输入任务名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="任务分组" prop="jobGroup">
        <el-select
          class="input-medium"
          placeholder="请选择任务分组"
          v-model="formData.jobGroup"
        >
          <el-option
            v-for="item in $CONST.JOB_GROUP_OPTIONS()"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="invokeTarget">
        <span slot="label">
          调用方法
          <el-tooltip placement="top">
            <div slot="content">
              <p>Bean调用示例：ryTask.ryParams('ry')</p>
              <p>
                Class类调用示例：com.ruoyi.quartz.task.RyTask.ryParams('ry')
              </p>
              <p>参数说明：支持字符串，布尔类型，长整型，浮点型，整型</p>
            </div>
            <i class="el-icon-question"></i>
          </el-tooltip>
        </span>
        <el-input
          v-model="formData.invokeTarget"
          placeholder="请输入调用目标字符串"
          class="input-medium"
        />
      </el-form-item>
      <el-form-item label="cron表达式" prop="cronExpression">
        <el-input
          :value="cronExpression"
          placeholder="请输入cron执行表达式"
          class="input-medium"
          @input="(val) => $emit('update:cronExpression', val)"
        >
          <template slot="append">
            <el-button type="primary" @click="handleShowCron">
              生成表达式
              <i class="el-icon-time el-icon--right"></i>
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="执行策略" prop="misfirePolicy">
        <el-radio-group v-model="formData.misfirePolicy" size="small">
          <el-radio-button
            v-for="item in $CONST.EXECUTE_POLICY_OPTIONS()"
            :key="item.value"
            :label="item.value"
            >{{ item.label }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否并发" prop="concurrent">
        <el-radio-group v-model="formData.concurrent" size="small">
          <el-radio-button
            v-for="item in $CONST.CONCURRENCY_OPTIONS()"
            :key="item.value"
            :label="item.value"
            >{{ item.label }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          clearable
          class="input-medium"
          placeholder="请选择任务状态"
          v-model="formData.status"
        >
          <el-option
            v-for="item in $CONST.JOB_STATE_OPTIONS()"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" :loading="isLoading" @click="handleSubmit">
        保存
      </el-button>
      <el-button @click="handleClose(false)"> 取消 </el-button>
    </span>
  </el-dialog>
</template>
<script>
import dialogMixin from "@/mixins/dialogMixin";
export default {
  name: "UpdateTaskDiaog",
  mixins: [dialogMixin],
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
    cronExpression: {
      type: String,
      default: "",
    },
  },
  watch: {
    visible(val) {
      this.init();
      if (val) {
        this.getTaskInfo();
      }
    },
    cronExpression(val) {
      if (val) {
        this.formData.cronExpression = val;
      }
    },
  },
  data() {
    const validatecronExpression = (rule, value, callback) => {
      if (!this.cronExpression) callback(new Error("请输入cron执行表达式"));
      else callback();
    };
    return {
      formData: {},
      isLoading: false,
      isLoadingTask: false,
      rules: {
        jobName: [
          {
            required: true,
            message: "请输入任务名称",
            trigger: "blur",
          },
        ],
        invokeTarget: [
          {
            required: true,
            message: "请输入调用目标字符串",
            trigger: "blur",
          },
        ],
        cronExpression: [
          { validator: validatecronExpression, trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  mounted() {
    //
  },
  methods: {
    init() {
      this.formData = {
        jobGroup: this.$CONST.JOB_GROUP.DEFAULT,
        misfirePolicy: this.$CONST.EXECUTE_POLICY.EXECUTE_IMMEDIATELY,
        concurrent: this.$CONST.CONCURRENCY.FORBID,
        status: this.$CONST.JOB_STATE.ON,
      };
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
      this.formData = { ...this.formData, ...res };
    },
    handleShowCron() {
      this.$emit("buildExpression");
    },
    // 处理提交
    async handleSubmit() {
      // 表单校验
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) {
          return;
        }
      } catch (error) {
        return;
      }
      this.isLoading = true;
      const id = this.editInfo?.jobId || "";
      const [, res] = await this.$http.SystemMonitoring[
        id ? "UpdateScheduleTask" : "AddScheduleTask"
      ]({ ...this.formData });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || `${id ? "编辑" : "新增"}任务${res ? "成功" : "失败"}`
      );
      if (res) this.handleClose(true);
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

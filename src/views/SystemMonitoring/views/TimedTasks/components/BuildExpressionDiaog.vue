<template>
  <el-dialog
    width="800px"
    title="Cron表达式生成器"
    :visible.sync="visible"
    @close="handleClose(false)"
  >
    <div class="content">
      <Crontab
        :expression="expression"
        @fill="(val) => $emit('update:cronExpression', val)"
        @hide="handleClose(false)"
      />
    </div>
  </el-dialog>
</template>
<script>
import dialogMixin from "@/mixins/dialogMixin";
import Crontab from "./Crontab";

export default {
  name: "AddAssignUserDiaog",
  mixins: [dialogMixin],
  components: { Crontab },
  props: {
    cronExpression: {
      type: String,
      default: "",
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.expression = this.cronExpression;
      }
    },
  },
  data() {
    return {
      expression: "",
    };
  },
  computed: {},
  methods: {
    handleSubmit() {
      //
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped></style>

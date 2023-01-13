<template>
  <div class="RulesForm">
    <div class="title">{{ title }}</div>
    <div class="content">
      <el-form ref="form" label-width="120px">
        <el-form-item :label="formLabel">
          <Tinymce ref="Editor" v-model="rulesData" :height="500" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
export default {
  name: "RulesForm",
  components: { Tinymce },
  props: {
    rule: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "规则设置",
    },
    formLabel: {
      type: String,
      default: "规则",
    },
  },
  data() {
    return {
      rulesData: "",
      initRules: true,
    };
  },
  computed: {},
  watch: {
    rulesData(val) {
      this.$emit("update:rule", val);
    },
    rule(val) {
      if (val && this.initRules) {
        this.rulesData = val;
        this.initRules = false;
      }
    },
  },
  methods: {},
  mounted() {
    this.rulesData = this.rule;
  },
};
</script>
<style lang="scss" scoped>
.RulesForm {
  width: 1200px;
  .title {
    font-size: 14px;
    font-weight: bold;
    color: $main-font-color;
  }
  .content {
    padding: 20px 0;
  }
}
</style>

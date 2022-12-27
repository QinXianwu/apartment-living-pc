<template>
  <div class="ActivityRules">
    <div class="title">签到规则设置</div>
    <div class="content">
      <el-form ref="form" label-width="120px">
        <el-form-item label="签到规则:">
          <Tinymce ref="Editor" v-model="rulesData" :height="500" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
export default {
  name: "ActivityRules",
  components: { Tinymce },
  props: {
    rule: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      rulesData: "",
    };
  },
  computed: {},
  watch: {
    rulesData(val) {
      this.$emit("update:rule", val);
    },
  },
  methods: {},
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.ActivityRules {
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

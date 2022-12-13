<template>
  <el-dialog
    :title="`${isEdit ? '编辑' : '新增'}分类`"
    :visible.sync="visible"
    width="700px"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="180px"
      v-loading="isLoadingCategory"
    >
      <el-form-item label="分类层级" prop="catLevel">
        <el-select
          class="input-medium"
          v-model="formData.catLevel"
          :disabled="isEdit"
        >
          <el-option
            v-for="item in $CONST.CATEGORY_LEVEL_OPTIONS()"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="上级分类"
        prop="parentCid"
        v-if="formData.catLevel !== $CONST.CATEGORY_LEVEL.FIRST"
      >
        <el-cascader
          v-model="formData.parentCid"
          class="input-medium"
          :key="cascaderKey"
          :options="categoryOptions || []"
          :props="{
            emitPath: false,
            checkStrictly: true,
          }"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="分类名称" prop="name">
        <el-input
          class="input-medium"
          v-model="formData.name"
          placeholder="请输入分类名称"
        />
      </el-form-item>
      <el-form-item label="上传图标" prop="icon">
        <Uploader
          :list.sync="iconList"
          tip="建议尺寸：1000 x 600像素，小于1M，支持jpg、png、jpeg格式"
        />
      </el-form-item>
      <el-form-item label="分类排序" prop="sort">
        <el-input
          class="input-medium"
          v-model="formData.sort"
          placeholder="请输入分类排序"
        />
      </el-form-item>
      <el-form-item label="热门推荐排序" prop="hotSort">
        <el-input
          class="input-medium"
          v-model="formData.hotSort"
          placeholder="请输入热门推荐排序"
        />
      </el-form-item>
      <el-form-item label="导航栏显示" prop="navigationShow">
        <el-switch
          v-model="formData.navigationShow"
          :active-value="$CONST.CATEGORY_NAV_STATE.SHOW"
          :inactive-value="$CONST.CATEGORY_NAV_STATE.HIDE"
        />
      </el-form-item>
      <el-form-item label="热门推荐分类" prop="hotShow">
        <el-switch
          v-model="formData.hotShow"
          :active-value="$CONST.CATEGORY_HOT_TYPE.YES"
          :inactive-value="$CONST.CATEGORY_HOT_TYPE.NOT"
        />
      </el-form-item>
      <el-form-item label="启用状态" prop="status">
        <el-switch
          v-model="formData.status"
          :active-value="$CONST.CATEGORY_STATE.ON"
          :inactive-value="$CONST.CATEGORY_STATE.OFF"
        />
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
import { mapGetters } from "vuex";
import Uploader from "@/components/Uploader";
import dialogMixin from "@/mixins/dialogMixin";

export default {
  name: "UpdateCategoryDiaog",
  mixins: [dialogMixin],
  components: { Uploader },
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      this.cascaderKey++;
      this.init();
      if (val) {
        this.$store.dispatch("goods/GetCategoryAllAction");
        this.getCategoryInfo();
      }
    },
    "formData.catLevel"() {
      if (!this.isLoadingCategory) this.$set(this.formData, "parentCid", "");
    },
  },
  data() {
    return {
      iconList: [],
      formData: {},
      cascaderKey: 0,
      isLoading: false,
      isLoadingCategory: false,
      rules: {
        name: [
          {
            required: true,
            message: "请输入分类名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      categoryAllOptions: "goods/CategoryAllOptions",
    }),
    isEdit({ editInfo }) {
      return !!editInfo?.id;
    },
    categoryOptions({ formData, categoryAllOptions }) {
      if (
        !formData?.catLevel ||
        formData?.catLevel === this.$CONST.CATEGORY_LEVEL.FIRST
      )
        return [];
      else if (formData?.catLevel === this.$CONST.CATEGORY_LEVEL.SECOND) {
        // 只能选择一级
        return categoryAllOptions.map((item) => ({
          label: item.label,
          value: item.value,
        }));
      }
      return categoryAllOptions.map((item) => {
        const first_options = {
          label: item.label,
          value: item.value,
        };
        first_options.disabled = true;
        if (!item.children?.length) return first_options;
        first_options.children = [];
        item.children.forEach((secondItem) => {
          const second_options = {
            label: secondItem.label,
            value: secondItem.value,
          };
          second_options.disabled = false;
          first_options.children.push(second_options);
        });
        return first_options;
      });
    },
  },
  methods: {
    init() {
      this.iconList = [];
      if (this.editInfo?.id) {
        this.formData = { ...this.editInfo };
      } else {
        this.formData = {
          name: "",
          catLevel: "",
          parentCid: "",
          status: this.$CONST.CATEGORY_STATE.ON,
          hotShow: this.$CONST.CATEGORY_HOT_TYPE.YES,
          navigationShow: this.$CONST.CATEGORY_NAV_STATE.OFF,
        };
      }
    },
    // 获取分类详情
    async getCategoryInfo() {
      if (this.isLoadingCategory || !this.editInfo?.id) return;
      this.isLoadingCategory = true;
      const [, res] = await this.$http.GoodsCategory.GetCategoryById({
        id: this.editInfo?.id || "",
      });
      if (!res) this.$message.error(res?.msg || "获取分类详情异常");
      this.formData = {
        ...this.formData,
        ...(res || {}),
      };
      this.iconList = this.formData?.icon ? [{ url: this.formData?.icon }] : [];
      this.$nextTick(() => (this.isLoadingCategory = false));
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
      const id = this.editInfo?.id || "";
      const [, res] = await this.$http.GoodsCategory[
        id ? "UpdateCategory" : "AddCategory"
      ]({
        id,
        ...this.formData,
        icon: this.iconList?.length ? this.iconList[0].url : "",
      });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || `${id ? "编辑" : "新增"}分类${res ? "成功" : "失败"}`
      );
      if (res) {
        this.$store.dispatch("goods/GetCategoryAllAction", true);
        this.handleClose(true);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>

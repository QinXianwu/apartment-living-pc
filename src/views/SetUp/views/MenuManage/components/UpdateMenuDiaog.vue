<template>
  <el-dialog
    width="700px"
    :title="dialogTitle"
    :visible.sync="visible"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="170px"
      v-loading="isLoadingMenu"
    >
      <el-form-item label="上级菜单" prop="parentId">
        <el-cascader
          class="input-medium"
          :options="menuOptions"
          placeholder="选择上级菜单"
          :show-all-levels="false"
          :disabled="isAddSubMenu"
          v-model="formData.parentId"
          v-loading="isLoadingMenuOptions"
          :props="{
            value: 'menuId',
            label: 'menuName',
            checkStrictly: true,
            emitPath: false,
          }"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="菜单类型" prop="menuType">
        <el-radio-group v-model="formData.menuType">
          <el-radio
            :key="item.value"
            :label="item.value"
            v-for="item in $CONST.MENU_TYPE_OPTIONS()"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称" prop="menuName">
        <el-input
          class="input-medium"
          v-model="formData.menuName"
          placeholder="请输入菜单名称"
        />
      </el-form-item>
      <el-form-item label="显示排序" prop="orderNum">
        <el-input-number
          :min="0"
          class="input-medium"
          controls-position="right"
          placeholder="请输入显示排序"
          v-model="formData.orderNum"
        />
      </el-form-item>
      <el-form-item
        prop="path"
        v-if="formData.menuType !== $CONST.MENU_TYPE.BUTTON"
      >
        <span slot="label">
          <el-tooltip
            content="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头"
            placement="top"
          >
            <i class="el-icon-question"></i>
          </el-tooltip>
          路由地址
        </span>
        <el-input
          class="input-medium"
          v-model="formData.path"
          placeholder="请输入路由地址"
        />
      </el-form-item>
      <el-collapse
        accordion
        class="more-config"
        @change="(val) => (allocationName = val)"
      >
        <el-collapse-item name="allocationConfig">
          <template slot="title">
            <div class="collapse-title">
              <span>{{
                allocationName === "allocationConfig" ? "收起" : "展开"
              }}</span>
              <span>更多配置</span>
            </div>
          </template>
          <el-form-item
            prop="isFrame"
            v-if="formData.menuType !== $CONST.MENU_TYPE.BUTTON"
          >
            <span slot="label">
              <el-tooltip
                content="选择是外链则路由地址需要以`http(s)://`开头"
                placement="top"
              >
                <i class="el-icon-question"></i>
              </el-tooltip>
              是否外链
            </span>
            <el-radio-group v-model="formData.isFrame">
              <el-radio :label="$CONST.MENU_BACKLINKS.YES">是</el-radio>
              <el-radio :label="$CONST.MENU_BACKLINKS.NOT">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            prop="component"
            v-if="formData.menuType === $CONST.MENU_TYPE.MENU"
          >
            <span slot="label">
              <el-tooltip
                content="访问的组件路径，如：`system/user/index`，默认在`views`目录下"
                placement="top"
              >
                <i class="el-icon-question"></i>
              </el-tooltip>
              组件路径
            </span>
            <el-input
              v-model="formData.component"
              placeholder="请输入组件路径"
            />
          </el-form-item>
          <el-form-item
            prop="perms"
            v-if="formData.menuType !== $CONST.MENU_TYPE.DIRECTORY"
          >
            <el-input
              maxlength="100"
              v-model="formData.perms"
              placeholder="请输入权限标识"
            />
            <span slot="label">
              <el-tooltip
                content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)"
                placement="top"
              >
                <i class="el-icon-question"></i>
              </el-tooltip>
              权限字符
            </span>
          </el-form-item>
          <el-form-item
            prop="query"
            v-if="formData.menuType === $CONST.MENU_TYPE.MENU"
          >
            <el-input
              v-model="formData.query"
              placeholder="请输入路由参数"
              maxlength="255"
            />
            <span slot="label">
              <el-tooltip
                content='访问路由的默认传递参数，如：`{"id": 1, "name": "ry"}`'
                placement="top"
              >
                <i class="el-icon-question"></i>
              </el-tooltip>
              路由参数
            </span>
          </el-form-item>
          <el-form-item
            prop="isCache"
            v-if="formData.menuType === $CONST.MENU_TYPE.MENU"
          >
            <span slot="label">
              <el-tooltip
                content="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致"
                placement="top"
              >
                <i class="el-icon-question"></i>
              </el-tooltip>
              是否缓存
            </span>
            <el-radio-group v-model="formData.isCache">
              <el-radio :label="$CONST.MENU_CACHE.YES">缓存</el-radio>
              <el-radio :label="$CONST.MENU_CACHE.NOT">不缓存</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            prop="visible"
            v-if="formData.menuType !== $CONST.MENU_TYPE.BUTTON"
          >
            <span slot="label">
              <el-tooltip
                content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问"
                placement="top"
              >
                <i class="el-icon-question"></i>
              </el-tooltip>
              显示状态
            </span>
            <el-radio-group v-model="formData.visible">
              <el-radio
                v-for="item in $CONST.MENU_SHOW_STATE_OPTIONS()"
                :key="item.value"
                :label="item.value"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item
            prop="status"
            v-if="formData.menuType !== $CONST.MENU_TYPE.BUTTON"
          >
            <span slot="label">
              <el-tooltip
                content="选择停用则路由将不会出现在侧边栏，也不能被访问"
                placement="top"
              >
                <i class="el-icon-question"></i>
              </el-tooltip>
              菜单状态
            </span>
            <el-radio-group v-model="formData.status">
              <el-radio
                v-for="item in $CONST.MENU_STATE_OPTIONS()"
                :key="item.value"
                :label="item.value"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
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
import { handleTree } from "@/utils";
import dialogMixin from "@/mixins/dialogMixin";

export default {
  name: "UpdateMenuDiaog",
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
        this.getMenuOptions();
        this.getMenuInfo();
      }
    },
  },
  data() {
    return {
      formData: {},
      allocationName: "",
      menuOptions: [],
      isLoading: false,
      isAddSubMenu: false,
      isLoadingMenu: false,
      isLoadingMenuOptions: false,
      mainMenu: { menuId: 0, menuName: "主类目", children: [] },
      rules: {
        parentId: [
          { required: true, message: "请选择上级菜单", trigger: "blur" },
        ],
        menuName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
        orderNum: [
          { required: true, message: "请输入菜单顺序", trigger: "blur" },
        ],
        path: [{ required: true, message: "请输入路由地址", trigger: "blur" }],
      },
    };
  },
  computed: {
    dialogTitle({ editInfo, isAddSubMenu }) {
      const title = isAddSubMenu
        ? "新增子"
        : editInfo?.menuId
        ? "编辑"
        : "新增";
      return `${title}菜单`;
    },
  },
  methods: {
    init() {
      const parentId = this.editInfo?.parentId || "";
      // 是否为新增子菜单
      this.isAddSubMenu =
        typeof parentId === "number" &&
        parentId !== this.mainMenu.menuId &&
        !this.editInfo?.menuId;
      this.formData = {
        parentId: this.editInfo?.parentId || "",
        menuType: this.$CONST.MENU_TYPE.DIRECTORY,
        isFrame: this.$CONST.MENU_BACKLINKS.NOT,
        isCache: this.$CONST.MENU_CACHE.YES,
        visible: this.$CONST.MENU_SHOW_STATE.SHOW,
        status: this.$CONST.MENU_STATE.ON,
      };
    },
    async getMenuOptions() {
      if (this.isLoadingMenuOptions) return;
      this.isLoadingMenuOptions = true;
      const [, res] = await this.$http.MenuManage.GetMenuList();
      this.isLoadingMenuOptions = false;
      this.mainMenu.children = res?.length ? handleTree(res, "menuId") : [];
      this.menuOptions = [this.mainMenu];
    },
    async getMenuInfo() {
      if (this.isLoadingMenu || !this.editInfo?.menuId) return;
      this.isLoadingMenu = true;
      const [, res] = await this.$http.MenuManage.GetMenuInfo({
        menuId: this.editInfo?.menuId || "",
      });
      this.isLoadingMenu = false;
      if (!res) {
        this.$message.error(res?.msg || "获取菜单信息异常");
        return;
      }
      this.formData = { ...res };
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
      const id = this.editInfo?.menuId || "";
      const query = { ...this.formData };

      const [, res] = await this.$http.MenuManage[
        id ? "UpdateMenu" : "AddMenu"
      ]({ ...query });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || `${id ? "编辑" : "新增"}菜单${res ? "成功" : "失败"}`
      );
      if (res) this.handleClose(true);
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.more-config {
  border: none;

  ::v-deep {
    .el-collapse-item__wrap,
    .el-collapse-item__header,
    .el-collapse-item__content {
      border: none;
    }
    .el-collapse-item__header {
      width: 155px;
      display: flex;
      justify-content: center;
      line-height: 20px;
      height: 20px;
      margin-bottom: 10px;
    }
  }
  .collapse-title {
    width: 100%;
    text-align: right;
    color: $--color-info;
    margin: 0 2px 0 0px;
  }
}
.select-all {
  padding: 0 20px;
  text-align: right;
}
</style>

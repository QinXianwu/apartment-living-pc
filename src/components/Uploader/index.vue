<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="up_box">
    <template v-if="showDefaultMode">
      <!-- START 按钮模式 -->
      <template v-if="mode === 'btn'">
        <!-- 文件列表 -->
        <div class="up_list">
          <ul class="el-upload-list el-upload-list--text">
            <li
              class="el-upload-list__item is-success"
              v-for="(item, index) in list"
              :key="index"
            >
              <a class="el-upload-list__item-name">
                <i class="el-icon-document"></i>{{ item.filename }}
              </a>
              <label class="el-upload-list__item-status-label">
                <i class="el-icon-upload-success el-icon-circle-check"></i>
              </label>
              <i class="el-icon-close" @click="handleDelete(index)"></i>
            </li>
          </ul>
          <el-button type="primary" @click="handleClickUpload" size="mini">
            {{ btnText }}
          </el-button>
        </div>
      </template>
      <!-- END 按钮模式 -->

      <!-- START 照片模式 -->
      <template v-if="!mode || mode === 'pic'">
        <div class="up_imgs">
          <draggable
            v-model="list"
            class="up_imgs-box"
            filter=".no"
            :disabled="!isOperation"
            @end="onUpdate"
            :move="onMove"
          >
            <transition-group>
              <div
                class="up_imgs-img"
                v-for="(item, index) in list"
                :key="item.url"
              >
                <el-image class="up_imgs-img-main" :src="item.url" :fit="fit" />
                <div v-if="isOperation" class="up_imgs-mask">
                  <i class="el-icon-zoom-in" @click="previewFn(item.url)"></i>
                  <i class="el-icon-delete" @click="handleDelete(index)"></i>
                </div>
              </div>
              <div
                v-if="list.length < count && isOperation"
                class="up_imgs-img no"
                @click="handleClickUpload"
                key="select_box"
              >
                <i class="el-icon-plus"></i>
              </div>
            </transition-group>
          </draggable>
        </div>
      </template>
      <!-- END 照片模式 -->
      <!-- 上传提示 -->
      <div class="up_tip" v-if="tip">
        {{ tip }}
      </div>
    </template>

    <input
      ref="mp-upload"
      style="display: none"
      type="file"
      name="file"
      :multiple="multiple"
      @change="onFileChange($event)"
    />
    <el-dialog append-to-body :visible.sync="previewSrcVisible" width="40%">
      <el-image fit="contain" class="dialog_img" :src="previewSrc" />
    </el-dialog>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import { simpleCloneDeep } from "@/utils/index";
export default {
  name: "Uploader",
  components: { draggable },
  props: {
    //  数量限制 -1为无限制
    count: {
      type: [Number, String],
      default: 1,
    },
    // 大小限制 单位MB
    sizeLimmit: {
      type: [Number, String],
      default: 1,
    },
    // 是否显示默认展示效果
    showDefaultMode: {
      type: Boolean,
      default: true,
    },
    // 展示效果 文件列表 btn 图片列表pic 默认pic
    mode: {
      type: String,
      default: "pic",
    },
    // 图片fit
    fit: {
      type: String,
      default: "contain",
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: true,
    },
    // 同步文件列表 外面要用 :list.sync
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    // 上传之前事件
    beforeUpload: {
      type: Function,
    },
    // 按钮文本
    btnText: {
      type: String,
      default: "上传文件",
    },
    // 上传提示
    tip: {
      type: String,
      default: "",
    },
    // 是否可以操作
    isOperation: {
      type: Boolean,
      default: true,
    },
    // 随机文件名
    isRandomName: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: false, // 防止双击 点击时立刻设置为true 校验错误/上传结束都改成false
      previewSrcVisible: false,
      previewSrc: "",
    };
  },
  methods: {
    onMove(e) {
      if (!e.relatedContext.element) return false;
      return true;
    },
    onUpdate() {
      this.$emit("update:list", this.list); //更新数组
    },
    previewFn(src) {
      this.previewSrcVisible = true;
      this.previewSrc = src;
    },
    //  文件变化
    onFileChange(e) {
      const uploadInput = e.target; //上传文件用的输入框
      const fileList = uploadInput.files; // 获取上传图片的input元素的文件
      const calLimmit = Number(this.sizeLimmit * 1024 * 1024); //换算成kb
      //   数量校验
      if (
        this.count !== -1 &&
        fileList.length + this.list.length > this.count
      ) {
        this.isLoading = false;
        return this.$notify({
          title: "警告",
          message: `上传文件总数【${Number(fileList.length)}】系统限制为【${
            this.count
          }】`,
          type: "warning",
        });
      }
      //   大小校验
      if (fileList[0].size > calLimmit) {
        this.isLoading = false;
        return this.$notify({
          title: "警告",
          message: `文件大小【${Number(
            fileList[0].size / (1024 * 1024)
          ).toFixed(2)}MB】系统限制为【${this.sizeLimmit}MB】`,
          type: "warning",
        });
      }
      // 校验有没有外部的上传之前方法
      if (this.beforeUpload && typeof this.beforeUpload === "function") {
        // 有的话执行
        if (!this.beforeUpload()) {
          this.isLoading = false;
          return;
        }
      }
      this.upload(fileList);
      //  触发上传后马上清空input的值
      // uploadInput.value = "";
    },
    // 上传方法 外面调用也行
    async upload(fileList) {
      this.isLoading = true;
      const [, Data] = await this.$http.FileSys.UploadSingleImage({
        flag: 1,
        fileList,
      });
      this.isLoading = false;
      if (!Data?.msg) return;
      this.$emit("success", [{ url: Data.msg }] || []); //直接抛出
      this.$emit("update:list", this.list.concat([{ url: Data.msg }] || [])); //更新数组
    },
    // 点击上传
    handleClickUpload() {
      if (this.isLoading) return this.$message.info("文件上传中，请稍后..");
      this.$refs["mp-upload"].click();
    },
    // 删除文件
    handleDelete(i) {
      // 复制一个文件数组  修改后同步出去
      const copy = simpleCloneDeep(this.list);
      copy.splice(i, 1);
      this.$emit("update:list", copy);
    },
  },
};
</script>

<style lang="scss" scoped>
.up_box {
  display: inline-block;
  padding: 10px 0;
  > ul {
    margin-bottom: 10px;
  }
}
.up_list,
.up_imgs {
  padding-bottom: 10px;
}
.up_imgs {
  display: flex;
  flex-wrap: wrap;
  &-box {
    > span {
      display: flex;
      flex-wrap: wrap;
    }
  }
  &-img {
    position: relative;
    width: 88px;
    height: 88px;
    line-height: 88px;
    text-align: center;
    border: 1px solid #eee;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 8px;
    margin-right: 10px;
    margin-bottom: 10px;
    &.no {
      border: 1px dashed #cccccc;
    }
    &-main {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &.no:hover {
      border-color: $--color-primary;
    }
  }
  &-mask {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #ffffff;
    background: rgba($color: #000000, $alpha: 0.6);
    z-index: 2;
    border-radius: 8px;
    > i + i {
      margin-left: 10px;
    }
  }
  &-mask:hover {
    opacity: 1;
  }
}

.up_tip {
  color: #aaaaaa;
  font-size: 12px;
  line-height: 18px;
  margin-top: 0;
}
.dialog_img {
  width: 100%;
}
</style>

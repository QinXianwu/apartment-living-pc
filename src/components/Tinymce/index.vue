<template>
  <div
    class="tinymce-container"
    :style="{ width: containerWidth }"
    :class="{ fullscreen: fullscreen }"
  >
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container">
      <!-- <EditorImage
        color=" rgb(25,179,130)"
        class="editor-upload-btn"
        @successCBK="imageSuccessCBK"
      /> -->
    </div>
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/zh/feature/component/rich-editor.html#%E5%B8%B8%E8%A7%81%E5%AF%8C%E6%96%87%E6%9C%AC
 */
// import editorImage from "./components/EditorImage";
import plugins from "./plugins";
import toolbar from "./toolbar";
let TinymceCase = window.tinymce; // 全局加载的 tinymce.min.js
export default {
  name: "Tinymce",
  // components: { editorImage },
  props: {
    id: {
      type: String,
      default: function () {
        return (
          "vue-tinymce-" +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + "")
        );
      },
    },
    value: {
      type: String,
      default: "",
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    menubar: {
      type: String,
      default: "file edit insert view format table",
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360,
    },
    width: {
      type: [Number, String],
      required: false,
      default: "auto",
    },
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        en: "en",
        zh: "zh_CN",
      },
      uploadTimeOut: null,
      removeFn: null,
    };
  },
  computed: {
    containerWidth() {
      const width = this.width;
      if (/^[\d]+(\.[\d]+)?$/.test(width)) {
        return `${width}px`;
      }
      return width;
    },
  },
  watch: {
    value(val) {
      // if (!this.hasChange && this.hasInit) {
      this.$nextTick(() => {
        TinymceCase.get(this.tinymceId).setContent(val || "");
      });
      // }
    },
  },
  mounted() {
    this.hasMounted = true;
    this.initTinymce();
  },
  activated() {
    if (this.hasMounted) {
      this.hasMounted = false;
    } else {
      this.initTinymce();
    }
  },
  deactivated() {
    this.destroyTinymce();
  },
  destroyed() {
    this.destroyTinymce();
  },
  methods: {
    // 动态加载tinymce资源
    loadTinymceJs() {
      return new Promise((resolve, reject) => {
        if (TinymceCase) {
          return resolve();
        }
        const src =
          this.$store.state.app.SysGlobal.ConfigInfo?.CommonStatic +
          "/js/tinymce/tinymce.min.js";
        const TinymceJsScript = document.createElement("script");
        TinymceJsScript.addEventListener("load", () => {
          TinymceCase = window.tinymce;
          resolve();
        });
        TinymceJsScript.addEventListener("error", (e) => {
          reject(e);
        });
        TinymceJsScript.src = src;
        document.documentElement.appendChild(TinymceJsScript);
      });
    },
    initTinymce() {
      this.loadTinymceJs().then(() => {
        TinymceCase.init({
          selector: `#${this.tinymceId}`,
          convert_urls: false,
          height: this.height,
          body_class: "panel-body ",
          object_resizing: false,
          toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
          menubar: this.menubar,
          plugins: plugins,
          fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt", // 第二步
          end_container_on_empty_block: true,
          powerpaste_word_import: "clean",
          code_dialog_height: 450,
          code_dialog_width: 1000,
          advlist_bullet_styles: "square",
          advlist_number_styles: "default",
          imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
          default_link_target: "_blank",
          link_title: false,
          language: "zh_CN",
          nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
          paste_data_images: true, // 是否启动拖拽上传
          images_file_types: "jpeg,jpg,png,gif,bmp,webp", // 允许拖拽的图片类型
          init_instance_callback: (editor) => {
            if (this.value) {
              editor.setContent(this.value);
            }
            this.hasInit = true;
            editor.on("NodeChange Change KeyUp SetContent", () => {
              this.hasChange = true;
              this.$emit("input", editor.getContent());
            });
          },
          // images_upload_handler: (blobInfo, success) => {
          //   if (this.uploadTimeOut) {
          //     this.removeFn && this.removeFn();
          //     clearTimeout(this.uploadTimeOut);
          //   }
          //   let fileInfo = blobInfo.blob();
          //   console.log(fileInfo);

          //   // 定义一个上传方法
          //   var upload = async () => {
          //     const [, Data] = await this.$http.FileSys.UploadImageApi([
          //       fileInfo,
          //     ]);
          //     if (Data?.length) {
          //       success(Data[0].url);
          //     } else {
          //       // 上传失败后，把src标记为 uploadFail ，然后在删除
          //       success("uploadFail");

          //       setTimeout(() => {
          //         let errorImg = document.querySelectorAll(
          //           'img[src="uploadFail"]'
          //         );
          //         errorImg.forEach((item) => {
          //           item.parentNode.removeChild(item);
          //         });
          //       }, 100);
          //     }
          //   };

          //   if (fileInfo.name === "image.png") {
          //     this.uploadTimeOut = setTimeout(() => upload(), 30);

          //     this.removeFn = (function (url, cb) {
          //       return function () {
          //         cb && cb(url);
          //         let imgNode = document.querySelector(
          //           'img[src="' + url + '"]'
          //         );
          //         imgNode &&
          //           imgNode.parentNode &&
          //           imgNode.parentNode.removeChild(imgNode);
          //         this.removeFn = null;
          //       };
          //     })(blobInfo.blobUri(), success);
          //   } else {
          //     upload();
          //   }
          // },
          setup(editor) {
            editor.on("FullscreenStateChanged", (e) => {
              this.fullscreen = e.state;
            });
          },
        });
      });
    },
    destroyTinymce() {
      const tinymce = TinymceCase.get(this.tinymceId);

      if (this.fullscreen) {
        tinymce.execCommand("mceFullScreen");
      }

      if (tinymce) {
        tinymce.destroy();
      }
    },
    setContent(value) {
      TinymceCase.get(this.tinymceId).setContent(value);
    },
    getContent() {
      TinymceCase.get(this.tinymceId).getContent();
    },
    setChange(bool) {
      this.hasChange = bool;
    },
    imageSuccessCBK(arr) {
      arr.forEach((v) => {
        TinymceCase.get(this.tinymceId).insertContent(
          `<img class="wscnph" src="${v.url}" >`
        );
      });
    },
  },
};
</script>

<style>
.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
.mce-fullscreen {
  z-index: 9999 !important;
}
</style>

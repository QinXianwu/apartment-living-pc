export default {
  props: {},
  data() {
    return {};
  },
  watch: {},
  methods: {
    /**
     * @data 文件数据
     * @tipText 提示语
     * @fileName 文件名称
     * @fileType 文件类型
     */
    async onExportDownloadFile({ data, tipText, fileName, fileType }) {
      if (!data) return;
      try {
        await this.$confirm(tipText || "是否进行下载？", "提示", {
          confirmButtonText: "去下载",
          cancelButtonText: "取消",
          type: "success",
        });
        const date = this.$options.filters.formatDate(
          Date.now(),
          "yyyy-MM-dd hh:mm:ss"
        );
        const dateType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8";
        this.DownloadFile({
          data: data,
          FileName: `${fileName || ""}_${date}`,
          type: fileType || dateType,
        });
      } catch (e) {
        console.error(e);
        // e;
      }
    },
    /**
     * @desc 下载文件
     * @data 二进制文件
     * @FileName 文件名称
     */

    DownloadFile({ data, FileName, type }) {
      if (!data) return;
      // console.log("下载文件", data);
      // 用返回二进制数据创建一个Blob实例
      const blob = new Blob([data], {
        type: type || "",
      });
      // 通过URL.createObjectURL生成文件路径
      const url = window.URL.createObjectURL(blob);

      // 创建a标签
      const ele = document.createElement("a");
      ele.style.display = "none";

      // 设置href属性为文件路径，download属性可以设置文件名称
      ele.href = url;
      ele.download = FileName || "文件";

      // 将a标签添加到页面并模拟点击
      document.querySelectorAll("body")[0].appendChild(ele);
      ele.click();

      // 移除a标签
      ele.remove();
    },
  },
};

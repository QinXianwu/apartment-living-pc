import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("文件相关接口网络请求出错", error);
});

// 上传文件   线上接口
const UploadImage = ({ flag, fileList }) => {
  let formData = new FormData();
  formData.append("flag", flag);
  for (let index = 0; index < fileList.length; index++) {
    formData.append("fileName" + index, fileList[index].name);
    formData.append("", fileList[index]);
  }
  return catchAsyncFun(
    apiFetch({
      url: apiPrefix + "/system/cos/upload/uploadForTencent",
      params: { flag, multipartFile: formData },
      isLoading: true,
      isQueryAll: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
};

// 上传单个文件
const UploadSingleImage = ({ flag, fileList }) => {
  const blob = new Blob([fileList[0]], {
    type: fileList[0].type || "",
  });
  return catchAsyncFun(
    apiFetch({
      url: apiPrefix + "/system/cos/upload/uploadForTencent",
      params: { flag, multipartFile: blob },
      isLoading: true,
      isQueryAll: true,
      isReturnAll: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
};

export default {
  UploadImageApi: UploadImage, // 上传图片接口
  UploadSingleImage,
};

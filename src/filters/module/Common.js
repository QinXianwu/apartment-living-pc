import { isPhone } from "@/utils/validate";
export default {
  // 格式化图片显示
  formatImage(val, isArray) {
    // 是否返回数组 isArray
    if (!val) return;
    try {
      let List = JSON.parse(val);
      let Arr = List.map((item) => item.url);
      return isArray ? Arr : Arr[0];
    } catch (error) {
      return isArray ? [] : "";
    }
  },
  formatMobile(val) {
    if (!val) return "";
    if (!isPhone(val)) return val;
    return val.replace(/^(.{3})(.*)(.{4})$/, "$1 $2 $3");
  },
};

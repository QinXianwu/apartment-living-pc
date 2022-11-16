import { isPhone } from "@/utils/validate";
export default {
  formatMobile(val) {
    if (!val) return "";
    if (!isPhone(val)) return val;
    return val.replace(/^(.{3})(.*)(.{4})$/, "$1 $2 $3");
  },
};

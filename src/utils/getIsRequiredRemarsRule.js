/**
 * 根据服务端返回的变量，生成是否需要验证 备注|说明 的必填rule
 * 挂在在Vue原型上，可以直接 this.$getIsRequiredRemarsRule 执行
 * @param {String} remarkFormKey 备注|说明在表单中的key
 */
export default function getIsRequiredRemarsRule(
  remarkFormKey,
  message = "请输入备注!"
) {
  const rule = {};
  if (
    Number(
      this.$store.state.app.McatGlobal?.AppInfo?.Application?.ExtendInfo
        ?.IsRemarsRequired
    ) === 1
  ) {
    rule[remarkFormKey] = {
      required: true,
      message,
      trigger: "blur",
    };
  }
  return rule;
}

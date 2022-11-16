import store from "@/store";
export default function hasPermission(permissionId) {
  if (!permissionId) return true; //没有绑定id的时候默认显示
  const { permissionHash } = store.state.permission;
  return (
    permissionHash.has(permissionId) || !!process.env.VUE_APP_NO_PERMISSION
  );
}

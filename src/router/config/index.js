// import hasPermission from "@/permission/hasPermission";
import Page401 from "@/views/ErrorPage/401";

export function filterAsyncRoutes(routes) {
  const res = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children);
    }
    // 如果没有设置 tmp?.meta?.PermissionId 则不可访问
    // 若设置 tmp?.meta?.notPassPermissionVerify 为 true 则不进行校验
    if (!tmp?.meta?.PermissionId && !tmp?.meta?.notPassPermissionVerify) {
      // 无权限
      tmp.hidden = true; // 隐藏
      tmp.component = Page401; // 无权限
    }

    // 配置 PermissionIds以及tmp?.meta?.notPassPermissionVerify 为 true
    // const PermissionIds = tmp?.meta?.PermissionIds?.length
    //   ? tmp.meta.PermissionIds
    //   : [];
    // if (tmp?.path === "FastDeals") {
    //   console.log(tmp);
    // }
    // if (PermissionIds.length && tmp?.meta?.notPassPermissionVerify) {
    //   let isPush = false;
    //   try {
    //     PermissionIds.forEach((PermissionId) => {
    //       if (hasPermission(PermissionId)) {
    //         isPush = true;
    //         throw new Error();
    //       }
    //     });
    //   } catch (error) {
    //     //
    //   }
    //   if (isPush) res.push(tmp);
    // } else res.push(tmp);
    res.push(tmp);
  });
  return res;
}

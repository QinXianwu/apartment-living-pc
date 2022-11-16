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
    res.push(tmp);
  });
  return res;
}

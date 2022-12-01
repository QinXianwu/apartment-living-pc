const getters = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  menuSlider: (state) => state.menu.menuSlider,
  menuIdList: (state) => state.menu.menuIdList,
  // 租户信息
  tenantInfo: (state) => {
    const { TenantName, TenantId } =
      state.app.SysGlobal.AppInfo?.TenantInfo || {};
    return {
      id: TenantId,
      name: TenantName,
      logo: state.app.SysGlobal.AppInfo?.AppLogo || "",
    };
  },
};
export default getters;

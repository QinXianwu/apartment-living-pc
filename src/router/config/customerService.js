import CONST from "@/constants/index";
import NoticeManage from "@/views/CustomerService/views/NoticeManage/index.vue";

export const generateServiceSiteList = (arr) => {
  const list = arr?.length ? arr : [];
  return list.map((item) => ({
    path: `NoticeManage/${item.id}`,
    component: NoticeManage,
    name: `NoticeManage-${item.id}`,
    meta: {
      agentCode: item.id,
      title: item.title,
    },
  }));
};

const siteList = CONST.SITE_OPTIONS()
  .map((item) => {
    if (item.label !== "全部") {
      return { id: item.value, title: item.label };
    }
  })
  .filter((item) => item && item.id);

export default generateServiceSiteList(siteList);

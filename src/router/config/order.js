import CONST from "@/constants/index";
import PERMISSION_ID from "@/permission/PERMISSION_ID";
import ChildrenView from "@/layouts/ChildrenView/index";
import TicketsList from "@/views/Order/views/TicketsList/index.vue";
import AfterSales from "@/views/Order/views/AfterSales/index.vue";
import AfterSalesLogistics from "@/views/Order/views/AfterSalesLogistics/index.vue";
export const generateOrderSiteList = (arr) => {
  const list = arr?.length ? arr : [];
  return list.map((item, index) => ({
    path: item?.path || `Site-${index}`,
    name: item?.name || `Site-${index}`,
    component: ChildrenView,
    redirect: "/404",
    meta: {
      title: item?.title || `站点-${index}`,
    },
    children: [
      {
        path: `TicketsList/${item.id}`,
        component: TicketsList,
        name: `TicketsList-${item.id}`,
        meta: {
          title: "打票及回填",
          agentCode: item.id,
          PermissionId: PERMISSION_ID.Order_Ticketing,
        },
      },
      {
        path: `AfterSales/${item.id}`,
        component: AfterSales,
        name: `AfterSales-${item.id}`,
        meta: {
          title: "取车票报销凭证",
          agentCode: item.id,
        },
      },
      {
        path: `AfterSalesLogistics/${item.id}`,
        component: AfterSalesLogistics,
        name: `AfterSalesLogistics-${item.id}`,
        meta: {
          title: "取报销凭证快递",
          agentCode: item.id,
        },
      },
    ],
  }));
};

const siteList = CONST.SITE_OPTIONS()
  .map((item) => {
    if (item.label !== "全部") {
      return { id: item.value, title: item.label };
    }
  })
  .filter((item) => item && item.id);
// console.log(siteList);

export default generateOrderSiteList(siteList);

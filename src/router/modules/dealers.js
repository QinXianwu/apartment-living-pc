// import PERMISSION_ID from "@/permission/PERMISSION_ID";
import MainLayout from "@/layouts/MainLayout/index";
import DealersList from "@/views/Dealers/views/DealersList/index.vue";
import Order from "@/views/Dealers/views/Order/index.vue";

export default {
  path: "/Dealers",
  component: MainLayout,
  redirect: "/Dealers/DealersList",
  alwaysShow: true,
  meta: {
    title: "分销中心",
    icon: "dealers",
    affix: true,
    // PermissionId: PERMISSION_ID.Dealers,
  },
  children: [
    {
      path: "DealersList",
      component: DealersList,
      name: "DealersList",
      meta: {
        title: "分销商",
        // PermissionId: PERMISSION_ID.Dealers_DealersList,
      },
    },
    {
      path: "Order",
      component: Order,
      name: "Order",
      meta: {
        title: "分销订单",
        // PermissionId: PERMISSION_ID.Dealers_Order,
      },
    },
  ],
};

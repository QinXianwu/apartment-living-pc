import MainLayout from "@/layouts/MainLayout/index";
import CustomerServiceChildren from "../config/customerService";

export default {
  path: "/CustomerService",
  component: MainLayout,
  redirect: "/404",
  alwaysShow: true,
  meta: {
    title: "联系客服",
    icon: "customer_service",
    affix: true,
  },
  children: CustomerServiceChildren,
};

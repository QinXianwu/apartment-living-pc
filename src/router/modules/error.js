import MainLayout from "@/layouts/MainLayout/index";
import Page401 from "@/views/ErrorPage/401";
import Page404 from "@/views/ErrorPage/404";
export default {
  path: "/error",
  component: MainLayout,
  redirect: "/noRedirect",
  name: "ErrorPages",
  hidden: true,
  meta: {
    title: "Error Pages",
    icon: "404",
  },
  children: [
    {
      path: "401",
      component: Page401,
      name: "Page401",
      meta: { title: "401", noCache: true },
    },
    {
      path: "404",
      component: Page404,
      name: "Page404",
      meta: { title: "404", noCache: true },
    },
  ],
};

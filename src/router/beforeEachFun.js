import store from "@/store/index";

//进入路由前
export default async (to, from, next) => {
  const { auth = true } = to.meta;
  const isLogin = Boolean(store.state.authorization.state); //true用户已登录， false用户未登录
  if (auth && !isLogin && to.path !== "/Authorization/Login") {
    return next({ path: "/Authorization/Login" });
  }
  next();
};

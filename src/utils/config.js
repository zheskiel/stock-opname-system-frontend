import store from "../store";

export const config = {
  pageSize: 5,
};

export const isLogin = () => {
  return store.getState().auth.isAuth;
};

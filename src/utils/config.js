import store from "../store";

export const config = {
  pageSize: 5,
};

export const isLogin = () => {
  return store.getState().auth.isAuth;
};

export const isEligible = (routeName) => {
  let permissions = store.getState().auth.data.permissions;

  return permissions.includes(routeName);
};

import { lazy } from "react";

const AuthContainer = lazy(() => import("../containers/Auth"));
const IndexContainer = lazy(() => import("../containers/Index"));

const PublicRoutes = [
  {
    path: "/login",
    component: AuthContainer,
    restricted: true,
    exact: true,
  },
  {
    path: "/",
    component: IndexContainer,
    exact: true,
  },
];

export default PublicRoutes;

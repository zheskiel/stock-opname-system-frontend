import { lazy } from "react";

const MasterContainer = lazy(() => import("../containers/Master"));
const DashboardContainer = lazy(() => import("../containers/Dashboard"));

const PrivateRoutes = [
  {
    path: "/master",
    component: MasterContainer,
    exact: true,
  },
  {
    path: "/dashboard",
    component: DashboardContainer,
    exact: true,
  },
];

export default PrivateRoutes;

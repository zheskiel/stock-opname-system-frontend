import { lazy } from "react";

const MasterContainer = lazy(() => import("../containers/Master"));
const TemplatesContainer = lazy(() => import("../containers/Templates"));
const TemplatesViewContainer = lazy(() =>
  import("../containers/Templates/view")
);
const DashboardContainer = lazy(() => import("../containers/Dashboard"));

const PrivateRoutes = [
  {
    path: "/master",
    component: MasterContainer,
    exact: true,
  },
  {
    path: "/templates",
    component: TemplatesContainer,
    exact: true,
  },
  {
    path: "/template/:id/view",
    component: TemplatesViewContainer,
    exact: true,
  },
  {
    path: "/dashboard",
    component: DashboardContainer,
    exact: true,
  },
];

export default PrivateRoutes;

import { lazy } from "react";

const MasterContainer = lazy(() => import("../containers/Master"));
const TemplatesContainer = lazy(() => import("../containers/Templates"));
const TemplatesViewContainer = lazy(() =>
  import("../containers/Templates/view")
);
const TemplatesEditContainer = lazy(() =>
  import("../containers/Templates/Edit")
);

const FormContainer = lazy(() => import("../containers/Form"));
const FormEditContainer = lazy(() => import("../containers/Form/Edit"));
const FormsContainer = lazy(() => import("../containers/Forms"));

const DashboardContainer = lazy(() => import("../containers/Dashboard"));

const PrivateRoutes = [
  {
    path: "/master",
    component: MasterContainer,
    exact: true,
  },
  {
    path: "/form/:managerId/:staffId/details/:templateId/edit",
    component: FormEditContainer,
    exact: true,
  },
  {
    path: "/form/:managerId/:staffId/details",
    component: FormContainer,
    exact: true,
  },
  {
    path: "/forms",
    component: FormsContainer,
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
    path: "/template/:id/edit",
    component: TemplatesEditContainer,
    exact: true,
  },
  {
    path: "/dashboard",
    component: DashboardContainer,
    exact: true,
  },
];

export default PrivateRoutes;

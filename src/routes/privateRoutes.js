import { lazy } from "react";

const MasterContainer = lazy(() => import("../containers/Master"));
const TemplatesContainer = lazy(() => import("../containers/Templates"));
const TemplatesViewContainer = lazy(() =>
  import("../containers/Templates/view")
);
const TemplatesEditContainer = lazy(() =>
  import("../containers/Templates/Edit")
);
const TemplatesCreateContainer = lazy(() =>
  import("../containers/Templates/Create")
);

const FormContainer = lazy(() => import("../containers/Form"));
const FormEditContainer = lazy(() => import("../containers/Form/Edit"));
const FormCreateContainer = lazy(() => import("../containers/Form/Create"));
const FormsContainer = lazy(() => import("../containers/Forms"));

const DashboardContainer = lazy(() => import("../containers/Dashboard"));

const HierarchyContainer = lazy(() => import("../containers/Hierarchy"));

const PrivateRoutes = [
  {
    path: "/master",
    name: "master",
    component: MasterContainer,
    exact: true,
  },
  {
    path: "/hierarchy",
    name: "hierarchy",
    component: HierarchyContainer,
    exact: true,
  },
  {
    path: "/form/create",
    name: "form.create",
    component: FormCreateContainer,
    exact: true,
  },
  {
    path: "/form/:managerId/:staffId/details/:templateId/edit",
    name: "form.edit",
    component: FormEditContainer,
    exact: true,
  },
  {
    path: "/form/:managerId/:staffId/details",
    name: "form.details",
    component: FormContainer,
    exact: true,
  },
  {
    path: "/forms",
    name: "forms",
    component: FormsContainer,
    exact: true,
  },
  {
    path: "/templates",
    name: "templates",
    component: TemplatesContainer,
    exact: true,
  },
  {
    path: "/template/create",
    name: "template.create",
    component: TemplatesCreateContainer,
    exact: true,
  },
  {
    path: "/template/:id/view",
    name: "template.view",
    component: TemplatesViewContainer,
    exact: true,
  },
  {
    path: "/template/:id/edit",
    name: "template.edit",
    component: TemplatesEditContainer,
    exact: true,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardContainer,
    exact: true,
  },
];

export default PrivateRoutes;

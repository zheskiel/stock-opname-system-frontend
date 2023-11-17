import { lazy } from "react";

const DashboardContainer = lazy(() => import("../containers/Dashboard"));
const HierarchyContainer = lazy(() => import("../containers/Hierarchy"));
const MasterContainer = lazy(() => import("../containers/Master"));
const FormContainer = lazy(() => import("../containers/Form"));
const FormEditContainer = lazy(() => import("../containers/Form/Edit"));
const FormCreateContainer = lazy(() => import("../containers/Form/Create"));
const FormsContainer = lazy(() => import("../containers/Forms"));
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
const ReportContainer = lazy(() => import("../containers/Reports"));
const CompareFormsContainer = lazy(() =>
  import("../containers/Reports/CompareForms")
);

const CombinedFormsContainer = lazy(() =>
  import("../containers/Reports/CombinedForms")
);
const FinalForm = lazy(() => import("../containers/Reports/FinalForm"));
const TestingForms = lazy(() => import("../containers/Testing/Forms"));

export const PrivateRoutes = [
  {
    regex: "/report",
    path: "/report",
    name: "report",
    component: ReportContainer,
    exact: true,
  },
  {
    regex: "/report/{0}/outlet/{1}/final",
    path: "/report/:managerId/outlet/:outletId/final",
    name: "final",
    component: FinalForm,
    exact: true,
  },
  {
    regex: "/report/{0}/outlet/{1}/compare",
    path: "/report/:managerId/outlet/:outletId/compare",
    name: "compare",
    component: CompareFormsContainer,
    exact: true,
  },
  {
    regex: "/report/{0}/outlet/{1}/combined",
    path: "/report/:managerId/outlet/:outletId/combined",
    name: "combined",
    component: CombinedFormsContainer,
    exact: true,
  },

  {
    regex: "/testing/forms",
    path: "/testing/forms",
    name: "combined",
    component: TestingForms,
    exact: true,
  },

  {
    regex: "/master",
    path: "/master",
    name: "master",
    component: MasterContainer,
    exact: true,
  },
  {
    regex: "/hierarchy",
    path: "/hierarchy",
    name: "hierarchy",
    component: HierarchyContainer,
    exact: true,
  },
  {
    regex: "/form/create",
    path: "/form/create",
    name: "form.create",
    component: FormCreateContainer,
    exact: true,
  },
  {
    regex: "/form/manager/{0}/staff/{1}/details/{2}/edit",
    path: "/form/manager/:managerId/staff/:staffId/details/:templateId/edit",
    name: "form.edit",
    component: FormEditContainer,
    exact: true,
  },
  {
    regex: "/form/manager/{0}/staff/{1}/details",
    path: "/form/manager/:managerId/staff/:staffId/details",
    name: "form.details",
    component: FormContainer,
    exact: true,
  },
  {
    regex: "/forms",
    path: "/forms",
    name: "forms",
    component: FormsContainer,
    exact: true,
  },
  {
    regex: "/templates",
    path: "/templates",
    name: "templates",
    component: TemplatesContainer,
    exact: true,
  },
  {
    regex: "/template/create",
    path: "/template/create",
    name: "template.create",
    component: TemplatesCreateContainer,
    exact: true,
  },
  {
    regex: "/template/{0}/view",
    path: "/template/:id/view",
    name: "template.view",
    component: TemplatesViewContainer,
    exact: true,
  },
  {
    regex: "/template/{0}/edit",
    path: "/template/:id/edit",
    name: "template.edit",
    component: TemplatesEditContainer,
    exact: true,
  },
  {
    regex: "/dashboard",
    path: "/dashboard",
    name: "dashboard",
    component: DashboardContainer,
    exact: true,
  },
];

export default PrivateRoutes;

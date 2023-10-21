export const config = {
  pageSize: 5,
};

export const sideBarRoutes = [
  {
    url: "dashboard",
    name: "dashboard",
    content: "Dashboard",
  },
  {
    url: "dashboard",
    name: "dashboard",
    content: "Stock Opname",
    children: [
      {
        url: "dashboard",
        name: "dashboard",
        content: "Calendar",
      },
      {
        url: "report",
        name: "report",
        content: "Report",
      },
    ],
  },
  {
    url: "master",
    name: "master",
    content: "Master Data",
  },
  {
    url: "templates",
    name: "templates",
    content: "Templates",
    children: [
      {
        url: "templates",
        name: "templates",
        content: "list",
      },
      {
        url: "template/create",
        name: "template.create",
        content: "Create",
      },
    ],
  },
  {
    url: "forms",
    name: "forms",
    content: "Forms",
    children: [
      {
        url: "forms",
        name: "forms",
        content: "list",
      },
      {
        url: "form/create",
        name: "form.create",
        content: "Create",
      },
    ],
  },
  {
    url: "hierarchy",
    name: "hierarchy",
    content: "Hierarchy",
  },
];

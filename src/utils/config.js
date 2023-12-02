import React from "react";
import {
  FaHome,
  FaRegCopy,
  FaDatabase,
  FaRegFileAlt,
  FaNetworkWired,
  FaCalendarCheck,
} from "react-icons/fa";

export const config = {
  pageSize: 5,
};

export const sideBarRoutes = [
  {
    url: "dashboard",
    name: "dashboard",
    content: "Dashboard",
    icon: <FaHome />,
  },
  {
    url: "dashboard",
    name: "dashboard",
    content: "Stock Opname",
    icon: <FaCalendarCheck />,
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
    icon: <FaDatabase />,
  },
  {
    url: "templates",
    name: "templates",
    content: "Templates",
    icon: <FaRegCopy />,
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
    icon: <FaRegFileAlt />,
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
    icon: <FaNetworkWired />,
  },
];

import React, { Component } from "react";
import Link from "../../components/Link";

import { isEligible } from "../../utils/config";

const sideBarRoutes = [
  {
    url: "dashboard",
    name: "dashboard",
    content: "Dashboard",
  },
  {
    url: "dashboard",
    name: "dashboard",
    content: "Calendar",
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
  },
  {
    url: "forms",
    name: "forms",
    content: "Forms",
  },
  {
    url: "hierarchy",
    name: "hierarchy",
    content: "Hierarchy",
  },
];

class SidebarSection extends Component {
  render() {
    let RouteFormatted = () => {
      return sideBarRoutes.map((route, index) => {
        let result = isEligible(route.name) ? (
          <li key={index} className="nav-item">
            <Link
              className="nav-link d-flex align-items-center gap-2"
              href={`/${route.url}`}
            >
              {route.content}
            </Link>
          </li>
        ) : null;

        return result;
      });
    };

    return (
      <div className="sidebar border border-right col-md-3 col-lg-2 p-0">
        <div
          className="offcanvas-md offcanvas-end"
          tabIndex="-1"
          id="sidebarMenu"
          aria-labelledby="sidebarMenuLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="sidebarMenuLabel">
              Company name
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              data-bs-target="#sidebarMenu"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3">
            <ul className="nav flex-column">
              <RouteFormatted />

              <li className="nav-item accordion accordion-flush">
                <div className="accordion-item">
                  <a
                    className="nav-link d-flex align-items-center gap-2 accordion-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#product-collapse"
                    aria-expanded="false"
                    aria-controls="product-collapse"
                  >
                    Products
                  </a>
                  <div
                    id="product-collapse"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                  >
                    <ul>
                      <li>
                        <a
                          className="nav-link d-flex align-items-center gap-2"
                          href="#"
                        >
                          Products 1
                        </a>
                      </li>
                      <li>
                        <a
                          className="nav-link d-flex align-items-center gap-2"
                          href="#"
                        >
                          Products 2
                        </a>
                      </li>
                      <li>
                        <a
                          className="nav-link d-flex align-items-center gap-2"
                          href="#"
                        >
                          Products 3
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="#"
                >
                  Customers
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="#"
                >
                  Reports
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="#"
                >
                  Integrations
                </a>
              </li>
            </ul>

            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
              <span>Saved reports</span>
              <a
                className="link-secondary"
                href="#"
                aria-label="Add a new report"
              >
                +
              </a>
            </h6>
            <ul className="nav flex-column mb-auto">
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="#"
                >
                  Current month
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="#"
                >
                  Last quarter
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="#"
                >
                  Social engagement
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="#"
                >
                  Year-end sale
                </a>
              </li>
            </ul>

            <hr className="my-3" />

            <ul className="nav flex-column mb-auto">
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="#"
                >
                  Settings
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="#"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SidebarSection;

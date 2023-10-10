import React, { Component } from "react";
import Link from "../../components/Link";

class SidebarSection extends Component {
  render() {
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
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center gap-2"
                  href={`/dashboard`}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center gap-2"
                  href={`/dashboard`}
                >
                  Calendar
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center gap-2"
                  href={`/master`}
                >
                  Master Data
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center gap-2"
                  href={`/templates`}
                >
                  Templates
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center gap-2"
                  href={`/forms`}
                >
                  Forms
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center gap-2"
                  href={`/hierarchy`}
                >
                  Hierarchy
                </Link>
              </li>

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

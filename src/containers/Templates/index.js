import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

// Components
import Loader from "../../components/Loader";
import Link from "../../components/Link";

// Containers
import LayoutContainer from "../Layout";

// Sections
import PaginationSection from "../../sections/Pagination";
import MainSection from "../../sections/Main";

// Actions
import { fetchTemplatesData, resetTemplatesData } from "../../redux/actions";

// Helpers
import {
  checkUrlIsEligible,
  buildLinkUrl,
  getUserRole,
  isManagerial,
} from "../../utils/helpers";

// Styling
import "../../assets/scss/templates.scss";

const initialState = {
  isMounted: false,
  templates: [],
};

class TemplatesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleFetchData = this.handleFetchData.bind(this);
  }

  componentDidMount() {
    new Promise((resolve) => resolve())
      .then(() => this.handleFetchData())
      .then(() => {
        setTimeout(() => this.setState({ isMounted: true }), 500);
      });
  }

  componentWillUnmount() {
    this.props.resetTemplatesData();
  }

  handleFetchData = async (page = 1) => {
    let { fetchTemplatesData, templates, auth } = this.props;
    let { current_page } = templates;

    // Dont do fetch, when user at the same page
    if (page == current_page) return;

    let params = {
      role: auth.user.role,
      page,
    };

    fetchTemplatesData(params);

    // window.scrollTo(0, 0);
  };

  render() {
    const { isMounted } = this.state;
    const { templates, auth } = this.props;
    const { data: listItems } = templates;

    const { user } = auth;

    const { total, current_page, per_page, last_page } = templates;
    const newProps = {
      totalCount: total,
      pageNumber: current_page,
      pageSize: per_page,
      handlePagination: this.handleFetchData,
    };

    const hasPagination = (lastPage) => {
      return lastPage > 1 ? <PaginationSection {...newProps} /> : null;
    };

    const AccordionDoms = ({ svItems }) => {
      return (
        <div className="outlet-section">
          {Object.values(svItems).map((item, i) => {
            let { outlet, items } = item;
            let svItem = items[0].supervisor;
            let selectedOutlet = outlet[0];

            return (
              <React.Fragment key={i}>
                <h6>Outlet - {selectedOutlet.name}</h6>

                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${`collapse-${svItem.slug}`}`}
                    aria-expanded="true"
                    aria-controls={`collapse-${svItem.slug}`}
                  >
                    {svItem.name}
                  </button>
                </h2>

                <div
                  id={`collapse-${svItem.slug}`}
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    <Content items={items} />
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      );
    };

    const ContentPerManager = () => {
      return Object.values(listItems).map((listItem, index) => {
        const { manager, newItems } = listItem;

        return (
          <React.Fragment key={index}>
            <h3>{manager.name}</h3>

            <div className="content-manager-section">
              <div className="accordion mb-3">
                <div className="accordion-item">
                  {Object.values(newItems).map((items, x) => {
                    let svItems = items;

                    return <AccordionDoms key={x} svItems={svItems} />;
                  })}
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      });
    };

    const ContentDefault = () => {
      return listItems.length > 0 ? (
        <>
          {Object.values(listItems).map((listItem, index) => {
            const { newItems } = listItem;
            const newItemsValue = Object.values(newItems);

            return (
              <React.Fragment key={index}>
                <div className="accordion mb-3">
                  <div className="accordion-item">
                    {Object.values(newItemsValue).map((items, x) => {
                      let svItems = items;

                      return <AccordionDoms key={x} svItems={svItems} />;
                    })}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </>
      ) : (
        <div className="d-flex flex-row justify-content-center align-items-center text-center">
          <div>
            <p>No Templates Created</p>
            <p>{isManagerial() ? "Create Now" : "Ask manager to create one"}</p>
          </div>
        </div>
      );
    };

    const Content = ({ items }) => {
      return (
        <>
          <div className="row">
            {items &&
              items.map((item) => {
                let ViewName = `template.view`;
                let { linkParams: ViewParams, eligible: ViewEligible } =
                  buildLinkUrl(ViewName, [item.id]);

                let EditName = `template.edit`;
                let { linkParams: EditParams, eligible: EditEligible } =
                  buildLinkUrl(EditName, [item.id]);

                return (
                  <div className="col-sm-6 mb-3" key={item.id}>
                    <div className="card">
                      <div className="card-body">
                        <div>
                          <h6 className="card-title" title={item.title}>
                            {item.title}
                          </h6>
                        </div>

                        {/* <div>
                          <h6 className="card-title">
                            <div>{item.supervisor.name}</div>
                          </h6>
                        </div> */}

                        <p className="templates-text card-text">
                          Status: Published
                          <span className="templates-status position-absolute p-2 bg-success border border-light rounded-circle">
                            <span className="visually-hidden"></span>
                          </span>
                          <span className="float-end">
                            Total items: {item.details_count}
                          </span>
                        </p>

                        {ViewEligible && (
                          <Link
                            className="btn btn-primary me-2"
                            href={ViewParams.url}
                          >
                            View
                          </Link>
                        )}

                        {EditEligible && (
                          <Link
                            className="btn btn-warning me-2"
                            href={EditParams.url}
                          >
                            Edit
                          </Link>
                        )}

                        {/* <a href="#" className="btn btn-danger me">
                        Delete
                      </a> */}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {hasPagination(last_page)}
        </>
      );
    };

    const ContentSection = () => {
      if (!listItems || !isMounted)
        return (
          <div className="templates-container card-container">
            <Loader />
          </div>
        );

      const isAdmin = user.role === "superadmin" || user.role === "admin";

      return (
        <div className="templates-container card-container">
          {isAdmin ? <ContentPerManager /> : <ContentDefault />}
        </div>
      );
    };

    let { linkParams, eligible } = buildLinkUrl("template.create");

    return (
      <LayoutContainer>
        <MainSection>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h4 className="h4">Templates</h4>

            {eligible && (
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group">
                  <Link className="btn btn-sm btn-info" href={linkParams.url}>
                    Create
                  </Link>
                </div>
              </div>
            )}
          </div>

          <ContentSection />
        </MainSection>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.data,
    templates: state.templates.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTemplatesData: (params) => {
    return new Promise((resolve) => {
      dispatch(fetchTemplatesData(params)).then(() => resolve());
    });
  },
  resetTemplatesData: () => {
    dispatch(resetTemplatesData());
  },
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TemplatesContainer);

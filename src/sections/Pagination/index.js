import React, { Component } from "react";

import { calculatePagination } from "../../utils/helpers";

import "../../assets/scss/pagination.scss";

class PaginationSection extends Component {
  render() {
    const { totalCount, pageNumber, pageSize, handlePagination } = this.props;

    const currentPage = pageNumber;

    const pagination = calculatePagination(totalCount, pageNumber, pageSize);

    if (!pagination) return <></>;

    const firstPage = pagination[0];
    const lastPage = Math.ceil(totalCount / pageSize);

    const processBtn = (arrow, isEligible, page) => {
      let anchorClass = "page-link";
      let activeClass = isEligible ? " active" : "";

      return (
        <li>
          <a
            className={`${anchorClass}${activeClass} ${
              isEligible ? "" : "disabled"
            }`}
            disabled={isEligible ? "" : "disabled"}
            onClick={() => (isEligible ? handlePagination(page) : null)}
          >
            {arrow === "prev" ? "<" : ">"}
          </a>
        </li>
      );
    };

    const NavButton = ({ type }) => {
      const isEligible =
        type === "prev" ? currentPage > firstPage : currentPage < lastPage;

      const page = type === "prev" ? pageNumber - 1 : pageNumber + 1;

      return processBtn(type, isEligible, page);
    };

    const PageBtn = () => {
      return pagination.map((page, index) => {
        let anchorClass = "page-link";
        let activeClass = page == currentPage ? " active" : "";

        return (
          <li className="page-item" key={index}>
            <a
              className={`${anchorClass}${activeClass}`}
              onClick={() => (!isNaN(page) ? handlePagination(page) : null)}
            >
              {page}
            </a>
          </li>
        );
      });
    };

    return (
      <div className="pagination-section">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <NavButton type="prev" />

            <PageBtn />

            <NavButton type="next" />
          </ul>
        </nav>
      </div>
    );
  }
}

export default PaginationSection;

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

    const PrevBtn = () => {
      const isEligible = currentPage > firstPage;

      return processBtn("prev", isEligible, pageNumber - 1);
    };

    const NextBtn = () => {
      const isEligible = currentPage < lastPage;

      return processBtn("next", isEligible, pageNumber + 1);
    };

    const PageBtn = () => {
      return pagination.map((page, index) => {
        let anchorClass = "page-link";
        let activeClass = page == currentPage ? " active" : "";

        return (
          <li className="page-item" key={index}>
            <a
              className={`${anchorClass}${activeClass}`}
              onClick={() => handlePagination(page)}
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
            <PrevBtn />
            <PageBtn />
            <NextBtn />
          </ul>
        </nav>
      </div>
    );
  }
}

export default PaginationSection;

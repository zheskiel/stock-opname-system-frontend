import React, { Component } from "react";

import { FaAngleUp, FaAngleDown } from "react-icons/fa";

// Helpers
import { buildDesktopDataItems } from "../../utils/helpers";

class ViewDesktop extends Component {
  render() {
    const { items, arrs } = this.props;
    const dataItems = buildDesktopDataItems(items, arrs);

    return (
      <table className="table table-striped table-sm desktop-main-data">
        <thead>
          <tr>
            {arrs.map((arr) => {
              let { keyItems } = this.props;
              let { isDesc } = keyItems[arr.key];
              let newIsDesc = !isDesc;

              return (
                <th
                  scope="col"
                  width={arr.width}
                  key={arr.title}
                  onClick={() => {
                    let { keyItems, orderList, handleFetchData, currentPage } =
                      this.props;

                    let { sort, isDesc } = keyItems[arr.key];
                    let newIsDesc = !isDesc;
                    let newOrder = orderList[isDesc ? 0 : 1];

                    arr.key !== "actions" &&
                      arr.key !== "units" &&
                      handleFetchData(currentPage, sort, newOrder, newIsDesc);
                  }}
                >
                  {arr.key !== "actions" && arr.key !== "units" && (
                    <>{newIsDesc ? <FaAngleUp /> : <FaAngleDown />}</>
                  )}

                  {arr.title}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>{dataItems}</tbody>
      </table>
    );
  }
}

export default ViewDesktop;

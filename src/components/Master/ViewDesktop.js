import React, { Component } from "react";

import { FaAngleUp, FaAngleDown } from "react-icons/fa";

class ViewDesktop extends Component {
  render() {
    const { items, arrs } = this.props;

    const dataItems =
      items &&
      Object.values(items).map((item) => {
        const DefaultItem = ({ arr, item }) => {
          return <td key={`inner-${arr.title}-${item.id}`}>{item[arr.key]}</td>;
        };

        const CustomItem = ({ arr, item }) => {
          let itemUnits = Object.entries(item.units);

          return (
            <td key={`inner-${arr.title}-${item.id}`} className="unit-section">
              {itemUnits.length > 0 &&
                itemUnits.map((unit, index) => {
                  return (
                    <div key={index} className="unit-container">
                      <div className="unit-detail">
                        <span>{unit[0]}</span>
                        <span>
                          {unit[1].value} {unit[1].sku}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </td>
          );
        };

        return (
          <tr key={item.product_id}>
            {arrs.map((arr, index) => {
              let params = { arr, item };
              let entities = {
                default: DefaultItem,
                custom: CustomItem,
              };

              let Entity =
                arr.key != "units" ? entities.default : entities.custom;

              return <Entity key={index} {...params} />;
            })}
          </tr>
        );
      });

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

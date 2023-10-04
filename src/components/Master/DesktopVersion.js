import React, { Component } from "react";

class DesktopVersion extends Component {
  render() {
    const { items } = this.props;

    const dataItems =
      items &&
      Object.values(items).map((item) => {
        let itemUnits = Object.entries(item.units);
        return (
          <tr key={item.product_id}>
            <td>{item.product_id}</td>
            <td>{item.category}</td>
            <td>{item.category_type}</td>
            <td>{item.subcategory}</td>
            <td className="unit-section">
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
          </tr>
        );
      });

    return (
      <table className="table table-striped table-sm desktop-main-data">
        <thead>
          <tr>
            <th scope="col" width="5%">
              Product ID
            </th>
            <th scope="col" width="20%">
              Category
            </th>
            <th scope="col" width="10%">
              Category Type
            </th>
            <th scope="col" width="15%">
              SUB Category
            </th>
            <th scope="col" width="15%">
              Units
            </th>
          </tr>
        </thead>

        <tbody>{dataItems}</tbody>
      </table>
    );
  }
}

export default DesktopVersion;

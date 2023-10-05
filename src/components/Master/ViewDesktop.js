import React, { Component } from "react";

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
            {arrs.map((arr) => {
              let params = { arr, item };

              return arr.key != "units" ? (
                <DefaultItem {...params} />
              ) : (
                <CustomItem {...params} />
              );
            })}
          </tr>
        );
      });

    return (
      <table className="table table-striped table-sm desktop-main-data">
        <thead>
          <tr>
            {arrs.map((arr) => {
              return (
                <th scope="col" width={arr.width} key={arr.title}>
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

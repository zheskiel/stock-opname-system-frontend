import React, { Component } from "react";

class DesktopView extends Component {
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
            <td
              key={`inner-${arr.title}-${item.id}`}
              className="unit-section badges-section"
            >
              {itemUnits.length > 0 &&
                itemUnits.map((unit, index) => {
                  return (
                    <div key={index} className="unit-container">
                      <div className="unit-detail">
                        <span className="badge bg-primary">{unit[1].unit}</span>
                      </div>
                    </div>
                  );
                })}
            </td>
          );
        };

        return (
          <tr key={item.id}>
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
              return (
                <th scope="col" width={arr.width} key={arr.title}>
                  {arr.title}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {items && items.length > 0 ? (
            dataItems
          ) : (
            <tr>
              <td className="text-center p-4" colSpan={arrs.length}>
                No Items
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default DesktopView;

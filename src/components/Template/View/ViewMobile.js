import React, { Component } from "react";

class MobileView extends Component {
  render() {
    const { items, arrs } = this.props;

    return (
      <div className="division-table">
        {items &&
          Object.values(items).map((item) => {
            const DefaultItem = ({ arr, item }) => {
              return (
                <div
                  className="division-section"
                  key={`inner-${arr.title}-${item.id}`}
                >
                  <span className="division-title">{arr.title}</span>
                  <span>{item[arr.key]}</span>
                </div>
              );
            };

            const CustomItem = ({ arr, item }) => {
              let itemUnits = Object.entries(item.units);

              return (
                <div
                  className="division-section"
                  key={`inner-${arr.title}-${item.id}`}
                >
                  <span className="division-title">{arr.title}</span>
                  <span className="units-section">
                    {itemUnits.length > 0 &&
                      itemUnits.map((unit, index) => {
                        return (
                          <div key={index}>
                            {unit[0]} -- {unit[1].value} {unit[1].sku}
                          </div>
                        );
                      })}
                  </span>
                </div>
              );
            };

            return (
              <div className="division-container" key={item.product_id}>
                {arrs.map((arr) => {
                  let params = { arr, item };
                  let entities = {
                    default: DefaultItem,
                    custom: CustomItem,
                  };

                  let Entity =
                    arr.key != "units" ? entities.default : entities.custom;

                  return (
                    <Entity key={`inner-${arr.title}-${item.id}`} {...params} />
                  );
                })}
              </div>
            );
          })}
      </div>
    );
  }
}

export default MobileView;

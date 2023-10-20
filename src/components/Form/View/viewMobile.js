import React, { Component } from "react";

// Helpers
import { getEntity } from "../../../utils/helpers";

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
                  <span className="units-section badges-section">
                    {itemUnits.length > 0 &&
                      itemUnits.map((unit, index) => {
                        return (
                          <div key={index} className="badge bg-primary">
                            {unit[1].unit}
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

                  let Entity = getEntity(entities, params);

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

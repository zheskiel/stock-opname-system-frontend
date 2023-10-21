import React, { Component } from "react";

// Helpers
import {
  getEntity,
  DefaultMobileItem as DefaultItem,
  CustomMobileItem as CustomItem,
} from "../../../utils/helpers";

class MobileView extends Component {
  render() {
    const { items, arrs } = this.props;

    return (
      <div className="division-table">
        {items &&
          Object.values(items).map((item) => {
            return (
              <div className="division-container" key={item.product_id}>
                {arrs.map((arr) => {
                  let params = { arr, item, type: "badge" };
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

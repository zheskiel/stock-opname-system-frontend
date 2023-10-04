import React, { Component } from "react";

class MobileVersion extends Component {
  render() {
    const { items } = this.props;

    return (
      <div className="division-table">
        {items &&
          Object.values(items).map((item) => {
            let itemUnits = Object.entries(item.units);

            return (
              <div className="division-container" key={item.product_id}>
                <div className="division-section">
                  <span className="division-title">Product ID</span>
                  <span>{item.product_id}</span>
                </div>
                <div className="division-section">
                  <span className="division-title">Category</span>
                  <span>{item.category}</span>
                </div>

                <div className="division-section">
                  <span className="division-title">Category Type</span>
                  <span>{item.category_type}</span>
                </div>

                <div className="division-section">
                  <span className="division-title">Sub Category</span>
                  <span>{item.subcategory}</span>
                </div>

                <div className="division-section">
                  <span className="division-title">Units</span>
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
              </div>
            );
          })}
      </div>
    );
  }
}

export default MobileVersion;

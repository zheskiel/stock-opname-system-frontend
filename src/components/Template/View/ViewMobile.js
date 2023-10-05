import React, { Component } from "react";

class MobileView extends Component {
  render() {
    const { items, arrs } = this.props;

    return (
      <div className="division-table">
        {items &&
          Object.values(items).map((item) => {
            return (
              <div key={item.id} className="division-container">
                {arrs.map((arr) => {
                  return (
                    <div
                      className="division-section"
                      key={`inner-${arr.title}-${item.id}`}
                    >
                      <span className="division-title">{arr.title}</span>
                      <span>{item[arr.key]}</span>
                    </div>
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

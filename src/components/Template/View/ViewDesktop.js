import React, { Component } from "react";

class DesktopView extends Component {
  render() {
    const { items, arrs } = this.props;

    const dataItems =
      items &&
      Object.values(items).map((item) => {
        return (
          <tr key={item.id}>
            {arrs.map((arr) => {
              return (
                <td key={`inner-${arr.title}-${item.id}`}>{item[arr.key]}</td>
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

export default DesktopView;

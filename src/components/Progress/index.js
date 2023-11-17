import React, { Component } from "react";

// Styling
import "../../assets/scss/progress.scss";

class Progress extends Component {
  render() {
    const steps = [
      { name: "Report", id: "report" },
      { name: "Combined Forms", id: "combined" },
      { name: "Compare Forms", id: "compare" },
      { name: "Final Form", id: "final" },
    ];

    const { active } = this.props;

    return (
      <ul id="progressbar">
        {steps.map((step, index) => (
          <li key={step.id} className={active === step.id ? "active" : ""}>
            <div className="number">{index + 1}</div>
            <strong>{step.name}</strong>
          </li>
        ))}
      </ul>
    );
  }
}

export default Progress;

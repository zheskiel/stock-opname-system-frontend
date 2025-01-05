import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import PrivateRouteState from "../../../src/routes/states/PrivateRouteState";
import { isLogin, isEligible } from "../../../src/utils/helpers";

jest.mock("../../../src/utils/helpers", () => ({
  isLogin: jest.fn(),
  isEligible: jest.fn(),
}));

describe("PrivateRouteState", () => {
  const TestComponent = () => <div>Test Component</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component when isLogin and isEligible return true", () => {
    isLogin.mockReturnValue(true);
    isEligible.mockReturnValue(true);

    const { getByText } = render(
      <Router>
        <PrivateRouteState component={TestComponent} name="dashboard" />
      </Router>
    );

    expect(getByText("Test Component")).toBeInTheDocument();
  });

  it("redirects to / when isLogin returns false", () => {
    isLogin.mockReturnValue(false);
    isEligible.mockReturnValue(true);

    const { container } = render(
      <Router>
        <PrivateRouteState component={TestComponent} name="dashboard" />
      </Router>
    );

    expect(container.innerHTML).not.toContain("Test Component");
  });

  it("redirects to / when isEligible returns false", () => {
    isLogin.mockReturnValue(true);
    isEligible.mockReturnValue(false);

    const { container } = render(
      <Router>
        <PrivateRouteState component={TestComponent} name="dashboard" />
      </Router>
    );

    expect(container.innerHTML).not.toContain("Test Component");
  });
});

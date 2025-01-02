import { screen, render } from "@testing-library/react";

import Target from "../testing";

it("should render correctly", () => {
  render(<Target />);

  const textLabel = "Testing";
  const elem = screen.getByTestId("target-1");

  expect(elem).toBeInTheDocument();
  expect(elem).toHaveTextContent(textLabel);
});

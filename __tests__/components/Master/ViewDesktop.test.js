import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import ViewDesktop from "../../../src/components/Master/ViewDesktop";
import { buildDesktopDataItems } from "../../../src/utils/helpers";

// Mock the helper function
jest.mock("../../../src/utils/helpers", () => ({
  buildDesktopDataItems: jest.fn(),
}));

describe("ViewDesktop Component", () => {
  const mockHandleFetchData = jest.fn();

  const defaultProps = {
    items: {},
    arrs: [
      { key: "name", title: "Name", width: "20%" },
      { key: "price", title: "Price", width: "20%" },
    ],
    keyItems: {
      name: { sort: "name", isDesc: false },
      price: { sort: "price", isDesc: true },
    },
    orderList: ["asc", "desc"],
    handleFetchData: mockHandleFetchData,
    currentPage: 1,
  };

  beforeEach(() => {
    buildDesktopDataItems.mockImplementation(() => {
      return (
        <tr>
          <td>Item 1</td>
          <td>$10</td>
        </tr>
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders table headers and data items correctly", () => {
    render(<ViewDesktop {...defaultProps} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();
  });

  test("calls handleFetchData when a header is clicked", () => {
    render(<ViewDesktop {...defaultProps} />);

    const nameHeader = screen.getByText("Name");
    fireEvent.click(nameHeader);

    expect(mockHandleFetchData).toHaveBeenCalledTimes(1);
    expect(mockHandleFetchData).toHaveBeenCalledWith(
      1, // currentPage
      "name", // sort key
      "desc", // new order
      true // new isDesc
    );
  });

  test("renders up and down arrows based on sort order", () => {
    render(<ViewDesktop {...defaultProps} />);

    expect(screen.getByText("Name").querySelector("svg")).toBeInTheDocument(); // Up arrow for 'name'
    expect(screen.getByText("Price").querySelector("svg")).toBeInTheDocument(); // Down arrow for 'price'
  });
});

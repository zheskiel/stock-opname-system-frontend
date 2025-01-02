import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import DesktopView from "../../../src/components/Template/View/ViewDesktop";
import { buildDesktopDataItems } from "../../../src/utils/helpers";

// Mock the helper function
jest.mock("../../../src/utils/helpers", () => ({
  buildDesktopDataItems: jest.fn(),
}));

describe("DesktopView Component", () => {
  const mockHandleFetchData = jest.fn();

  const defaultProps = {
    items: [{ id: 1, name: "Item 1" }],
    arrs: [
      { key: "name", title: "Name", width: "50%" },
      { key: "price", title: "Price", width: "50%" },
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
    render(<DesktopView {...defaultProps} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();
  });

  test("displays 'No Items' when items are empty", () => {
    render(<DesktopView {...defaultProps} items={[]} />);

    expect(screen.getByText("No Items")).toBeInTheDocument();
  });

  test("calls handleFetchData when a header is clicked", () => {
    render(<DesktopView {...defaultProps} />);

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
});

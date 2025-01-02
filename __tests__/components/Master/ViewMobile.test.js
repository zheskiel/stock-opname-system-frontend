import React from "react";
import { render, screen } from "@testing-library/react";
import ViewMobile from "../../../src/components/Master/ViewMobile";

import {
  getEntity,
  DefaultMobileItem as DefaultItem,
  CustomMobileItem as CustomItem,
} from "../../../src/utils/helpers";

// Mock the helper functions
jest.mock("../../../src/utils/helpers", () => ({
  getEntity: jest.fn(),
  DefaultMobileItem: jest.fn(() => <div>Default Item</div>),
  CustomMobileItem: jest.fn(() => <div>Custom Item</div>),
}));

describe("ViewMobile Component", () => {
  const defaultProps = {
    items: {
      1: { product_id: 1, name: "Item 1" },
      2: { product_id: 2, name: "Item 2" },
    },
    arrs: [
      { key: "name", title: "Name", type: "default" },
      { key: "price", title: "Price", type: "custom" },
    ],
  };

  beforeEach(() => {
    getEntity.mockImplementation((entities, { arr }) => {
      return arr.type === "default" ? entities.default : entities.custom;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders division containers and items correctly", () => {
    render(<ViewMobile {...defaultProps} />);

    expect(screen.getAllByText("Default Item")).toHaveLength(2);
    expect(screen.getAllByText("Custom Item")).toHaveLength(2);
  });

  test("calls getEntity with correct parameters", () => {
    render(<ViewMobile {...defaultProps} />);

    expect(getEntity).toHaveBeenCalledTimes(4); // 2 items * 2 arrs
    expect(getEntity).toHaveBeenCalledWith(
      { default: DefaultItem, custom: CustomItem },
      expect.objectContaining({
        arr: { key: "name", title: "Name", type: "default" },
      })
    );
  });
});

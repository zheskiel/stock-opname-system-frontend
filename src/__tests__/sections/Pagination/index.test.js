import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaginationSection from "../../../sections/Pagination";

import { calculatePagination } from "../../../utils/helpers";

// Mock the helper function
jest.mock("../../../utils/helpers", () => ({
  calculatePagination: jest.fn(),
}));

describe("PaginationSection Component", () => {
  const mockHandlePagination = jest.fn();

  const defaultProps = {
    handlePagination: mockHandlePagination,
    totalCount: 50,
    pageNumber: 1,
    pageSize: 10,
  };

  beforeEach(() => {
    calculatePagination.mockImplementation(
      (totalCount, pageNumber, pageSize) => {
        const pages = [];
        const totalPages = Math.ceil(totalCount / pageSize);

        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }

        return pages;
      }
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with required props", () => {
    render(<PaginationSection {...defaultProps} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(7); // 5 pages + 2 nav buttons
    expect(screen.getByText("<")).toBeInTheDocument();
    expect(screen.getByText(">")).toBeInTheDocument();
  });

  test("calls handlePagination when a page number is clicked", () => {
    render(<PaginationSection {...defaultProps} />);

    const page2 = screen.getByText("2");
    fireEvent.click(page2);

    expect(mockHandlePagination).toHaveBeenCalledTimes(1);
    expect(mockHandlePagination).toHaveBeenCalledWith(2);
  });

  test('disables "Previous" button on the first page', () => {
    render(<PaginationSection {...defaultProps} />);

    const prevButton = screen.getByText("<");
    expect(prevButton).toHaveClass("disabled");
    fireEvent.click(prevButton);

    expect(mockHandlePagination).not.toHaveBeenCalled();
  });

  test('disables "Next" button on the last page', () => {
    render(<PaginationSection {...defaultProps} pageNumber={5} />);

    const nextButton = screen.getByText(">");
    expect(nextButton).toHaveClass("disabled");
    fireEvent.click(nextButton);

    expect(mockHandlePagination).not.toHaveBeenCalled();
  });

  test('navigates to the next page when "Next" is clicked', () => {
    render(<PaginationSection {...defaultProps} pageNumber={2} />);

    const nextButton = screen.getByText(">");
    fireEvent.click(nextButton);

    expect(mockHandlePagination).toHaveBeenCalledTimes(1);
    expect(mockHandlePagination).toHaveBeenCalledWith(3);
  });

  test('navigates to the previous page when "Previous" is clicked', () => {
    render(<PaginationSection {...defaultProps} pageNumber={3} />);

    const prevButton = screen.getByText("<");
    fireEvent.click(prevButton);

    expect(mockHandlePagination).toHaveBeenCalledTimes(1);
    expect(mockHandlePagination).toHaveBeenCalledWith(2);
  });

  test("does not render if calculatePagination returns null", () => {
    calculatePagination.mockImplementation(() => null);

    const { container } = render(<PaginationSection {...defaultProps} />);
    expect(container.firstChild).toBeNull();
  });
});

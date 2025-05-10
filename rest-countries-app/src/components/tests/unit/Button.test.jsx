import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "../../Button";
import { FaArrowRight } from "react-icons/fa";

describe("Button component", () => {
  test("renders button with correct label visually", () => {
    render(<Button id="test-btn" title="Click Me" />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveTextContent("Click Me");
  });

  test("applies provided id", () => {
    render(<Button id="custom-id" title="Submit" />);
    expect(screen.getByRole("button")).toHaveAttribute("id", "custom-id");
  });

  test("renders left icon if provided", () => {
    render(<Button title="Next" leftIcon={<FaArrowRight data-testid="left-icon" />} />);
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
  });

  test("renders right icon if provided", () => {
    render(<Button title="Next" rightIcon={<FaArrowRight data-testid="right-icon" />} />);
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  test("merges container class correctly", () => {
    render(
      <Button
        title="Styled"
        containerClass="bg-blue-500 text-white px-6"
      />
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("bg-blue-500 text-white px-6");
  });
});

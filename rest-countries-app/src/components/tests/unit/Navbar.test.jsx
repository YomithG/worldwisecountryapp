import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../../Navbar";

describe("Navbar", () => {
  test("renders the site title", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText("WorldWise")).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText("Countries")).toBeInTheDocument();
    expect(screen.getByText("Currency")).toBeInTheDocument();
  });

  test("links have correct paths", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText("Countries").closest("a")).toHaveAttribute("href", "/countries");
    expect(screen.getByText("Currency").closest("a")).toHaveAttribute("href", "/currency");
  });
});

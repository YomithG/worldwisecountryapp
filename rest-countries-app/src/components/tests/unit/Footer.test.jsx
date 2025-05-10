import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../../Footer2";

describe("Footer", () => {
  test("renders brand logo and tagline", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByAltText("WorldWise Logo")).toBeInTheDocument();
    expect(
      screen.getByText(/Explore the world one country at a time/i)
    ).toBeInTheDocument();
  });

  test("renders quick links", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText("Explore Countries")).toBeInTheDocument();
    expect(screen.getByText("Regional Highlights")).toBeInTheDocument();
    expect(screen.getByText("Currency Insights")).toBeInTheDocument();
    expect(screen.getByText("Languages Guide")).toBeInTheDocument();
    expect(screen.getByText("About WorldWise")).toBeInTheDocument();
  });

  test("renders contact details", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText("123 Global Lane, World City, Earth 10100")).toBeInTheDocument();
    expect(screen.getByText("+1 (800) 123-4567")).toBeInTheDocument();
    expect(screen.getByText("hello@worldwise.com")).toBeInTheDocument();
  });

  test("renders footer rights", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/WorldWise. All rights reserved/i)).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Countries from "../../../pages/Countries";

// Mock fetch response
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve(
          Array.from({ length: 13 }, (_, i) => ({
            cca3: `C${i}`,
            name: { common: `Country ${i}` },
            capital: [`Capital ${i}`],
            region: "TestRegion",
            population: 1000000 + i,
            languages: { test: "TestLang" },
            flags: { png: "https://flagcdn.com/w320/test.png" },
          }))
        ),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Countries integration", () => {
  test("displays spinner and then renders countries", async () => {
    render(
      <MemoryRouter>
        <Countries />
      </MemoryRouter>
    );

    // Look for bouncing spinner by class instead
    expect(document.querySelector(".animate-bounce")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("Country 0")).toBeInTheDocument());
  });

  test("filters countries by search input", async () => {
    render(
      <MemoryRouter>
        <Countries />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Country 0"));

    const input = screen.getByPlaceholderText("Search countries...");
    fireEvent.change(input, { target: { value: "Country 1" } });

    expect(screen.getByText("Country 1")).toBeInTheDocument();
  });

  test("renders pagination controls when countries > page size", async () => {
    render(
      <MemoryRouter>
        <Countries />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Country 0"));
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /previous/i })).toBeInTheDocument();
  });
});

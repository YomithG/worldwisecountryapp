import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CurrencyPage from "../../../pages/Currency";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            name: { common: "France" },
            currencies: {
              EUR: { name: "Euro", symbol: "€" },
            },
          },
          {
            name: { common: "Japan" },
            currencies: {
              JPY: { name: "Japanese yen", symbol: "¥" },
            },
          },
        ]),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("CurrencyPage", () => {
  test("renders and shows countries after fetch", async () => {
    render(
      <MemoryRouter>
        <CurrencyPage />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("France"));
    expect(screen.getByText("Euro")).toBeInTheDocument();
    expect(screen.getByText("Japan")).toBeInTheDocument();
  });

  test("filters by country name", async () => {
    render(
      <MemoryRouter>
        <CurrencyPage />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("France"));
    const countryInput = screen.getByPlaceholderText("Search by country");
    fireEvent.change(countryInput, { target: { value: "Japan" } });

    expect(screen.getByText("Japan")).toBeInTheDocument();
    expect(screen.queryByText("France")).not.toBeInTheDocument();
  });

  test("filters by currency code", async () => {
    render(
      <MemoryRouter>
        <CurrencyPage />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("France"));
    const currencyInput = screen.getByPlaceholderText("Currency code (e.g. usd)");
    fireEvent.change(currencyInput, { target: { value: "JPY" } });

    expect(screen.getByText("Japan")).toBeInTheDocument();
    expect(screen.queryByText("France")).not.toBeInTheDocument();
  });
});

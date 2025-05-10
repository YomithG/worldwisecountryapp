import React from "react";
import { render, screen } from "@testing-library/react";
import CountryCard from "../../CountryCard";

const mockCountry = {
  name: { common: "France" },
  capital: ["Paris"],
  region: "Europe",
  population: 67390000,
  currencies: { EUR: { name: "Euro", symbol: "€" } },
  flags: { png: "https://flagcdn.com/w320/fr.png" },
};

describe("CountryCard", () => {
  test("renders country name, flag, and basic info", () => {
    render(<CountryCard country={mockCountry} />);

    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.getByAltText("France")).toHaveAttribute("src", mockCountry.flags.png);

    // Look for parent elements containing the correct info
    expect(screen.getByText(/Capital:/).parentElement).toHaveTextContent("Capital: Paris");
    expect(screen.getByText(/Region:/).parentElement).toHaveTextContent("Region: Europe");
    expect(screen.getByText(/Population:/).parentElement).toHaveTextContent("Population: 67,390,000");
    expect(screen.getByText(/Currency:/).parentElement).toHaveTextContent("Currency: EUR");
  });

  test("renders N/A when currencies are missing", () => {
    const noCurrencyCountry = { ...mockCountry, currencies: null };
    render(<CountryCard country={noCurrencyCountry} />);
    expect(screen.getByText(/Currency:/).parentElement).toHaveTextContent("Currency: N/A");
  });
});

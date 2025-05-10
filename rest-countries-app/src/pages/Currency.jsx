import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Footer from "../components/Footer2";

const ITEMS_PER_PAGE = 15;

const CurrencyPage = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [searchCurrencyCode, setSearchCurrencyCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    let filtered = [...countries];
    if (searchCountry.trim() !== "") {
      filtered = filtered.filter((country) =>
        country.name?.common?.toLowerCase().includes(searchCountry.toLowerCase())
      );
    }
    if (searchCurrencyCode.trim() !== "") {
      filtered = filtered.filter((country) => {
        if (!country.currencies) return false;
        return Object.keys(country.currencies)
          .join(",")
          .toLowerCase()
          .includes(searchCurrencyCode.toLowerCase());
      });
    }
    setFilteredCountries(filtered);
    setCurrentPage(1);
  }, [searchCountry, searchCurrencyCode, countries]);

  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCountries = filteredCountries.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white dark:bg-[#121212] text-black dark:text-white font-sans min-h-screen pt-16 pb-20 transition-colors duration-300">
      <h2 className="text-4xl font-bold mb-6 text-center text-blue-800 dark:text-blue-300 drop-shadow">
        World Currencies
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
        Search by country name or currency code to view currency details.
      </p>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
        <div className="text-left">
          <label className="block text-md font-semibold text-blue-800 dark:text-blue-300">
            Filter Currency By
          </label>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto md:justify-end">
          <input
            type="text"
            value={searchCurrencyCode}
            onChange={(e) => setSearchCurrencyCode(e.target.value)}
            placeholder="Currency code (e.g. usd)"
            className="w-full sm:w-56 rounded-full bg-white dark:bg-[#1e1e1e] text-blue-800 dark:text-white font-medium ring-1 ring-blue-300 dark:ring-blue-500 focus:ring-2 focus:ring-blue-500 outline-none px-4 py-2 shadow-md placeholder:text-blue-400 focus:shadow-lg focus:shadow-blue-400"
          />
          <div className="relative w-full sm:w-56">
            <input
              type="text"
              value={searchCountry}
              onChange={(e) => {
                setSearchCountry(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by country"
              className="w-full rounded-full bg-white dark:bg-[#1e1e1e] text-blue-800 dark:text-white font-medium ring-1 ring-blue-300 dark:ring-blue-500 focus:ring-2 focus:ring-blue-500 outline-none pl-10 pr-4 py-2 shadow-md placeholder:text-blue-400 focus:shadow-lg focus:shadow-blue-400"
            />
            <FaSearch className="absolute left-4 top-[50%] transform -translate-y-1/2 text-blue-400 opacity-70" />
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentCountries.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
            No matching countries found.
          </p>
        ) : (
          currentCountries.map((country) => {
            const name = country.name?.common || "Unknown";
            const currencies = country.currencies
              ? Object.entries(country.currencies)
              : [];

            return (
              <div
                key={name}
                className="rounded-xl bg-white dark:bg-[#1e1e1e] border border-blue-100 dark:border-blue-900 shadow-md hover:shadow-blue-300 dark:hover:shadow-blue-700 transition duration-300 p-5"
              >
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{name}</h3>
                {currencies.length > 0 ? (
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {currencies.map(([code, { name: currencyName, symbol }]) => (
                      <li key={code}>
                        <span className="font-medium text-blue-800 dark:text-blue-300">{currencyName}</span>{" "}
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ({code}) {symbol && ` - ${symbol}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">No currency data available</p>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center flex-wrap gap-2 text-sm mb-24">
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-full font-semibold transition duration-200 ${
                  currentPage === page
                    ? "bg-blue-700 text-white shadow-md"
                    : "bg-white dark:bg-[#222] border border-blue-300 text-blue-700 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-800"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CurrencyPage;

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../components/Footer2";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRegion, setFilterRegion] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const countriesPerPage = 12;

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setTimeout(async () => {
        const url =
          filterRegion === "All"
            ? "https://restcountries.com/v3.1/all"
            : `https://restcountries.com/v3.1/region/${filterRegion.toLowerCase()}`;
        const res = await fetch(url);
        const data = await res.json();
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      }, 1000); 
    };
  
    fetchCountries();
  }, [filterRegion]);

  useEffect(() => {
    const results = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCountries(results);
    setCurrentPage(1);
  }, [searchQuery, countries]);

  const indexOfLast = currentPage * countriesPerPage;
  const indexOfFirst = indexOfLast - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  const getFlagUrl = (country) =>
    country?.flags?.png ||
    "https://upload.wikimedia.org/wikipedia/commons/a/a4/No_image_available.svg";

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white font-sans mt-20">
      <h2 className="text-4xl font-bold mb-6 text-center text-blue-800 drop-shadow-lg">
        Explore Nations in Style
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Discover country details including population, capital, region and languages.
      </p>

      {/* Filters */}
      <div className="mt-10 mb-12 px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <h1 className="text-2xl font-bold text-blue-700 text-center md:text-left">
          Countries Around The World
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search countries..."
              autoComplete="off"
              name="text"
              className="w-full pl-12 pr-4 py-2 rounded-full bg-white text-blue-800 font-medium ring-1 ring-blue-300 focus:ring-2 focus:ring-blue-500 outline-none duration-300 placeholder:text-blue-400 shadow-md focus:shadow-lg focus:shadow-blue-400"
            />
            <FaSearch className="absolute left-4 top-[50%] transform -translate-y-1/2 text-blue-400 opacity-70" />
          </div>

          {/* Region Filter */}
          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="px-4 py-2 rounded-full bg-white text-blue-400 font-medium ring-1 ring-blue-300 focus:ring-2 focus:ring-blue-500 outline-none duration-300 placeholder:text-blue-400 shadow-md focus:shadow-lg focus:shadow-blue-400"
          >
            <option value="All">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Antarctic">Antarctic</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center mt-20 mb-32">
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        </div>
      ) : (
        <>
          {/* Country Cards */}
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
            {currentCountries.length > 0 ? (
              currentCountries.map((country) => (
                <Link to={`/country/${country.cca3}`} key={country.cca3}>
                 <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-blue-100 hover:shadow-blue-300 hover:-translate-y-2 transform transition duration-300">

                    <img
                      src={getFlagUrl(country)}
                      alt={country.name.common}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-800">
                        {country.name.common}
                      </h4>
                      <p className="text-gray-600 mt-2">
                        <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
                      </p>
                      <p className="text-gray-600">
                        <strong>Region:</strong> {country.region}
                      </p>
                      <p className="text-gray-600">
                        <strong>Population:</strong>{" "}
                        {country.population.toLocaleString()}
                      </p>
                      <p className="text-gray-600">
                        <strong>Languages:</strong>{" "}
                        {Object.values(country.languages || {}).join(", ")}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-600 text-center text-lg col-span-full">
                No countries found
              </p>
            )}
          </div>
{/* Pagination */}
{totalPages > 1 && (
  <div className="mt-12 flex justify-center items-center flex-wrap gap-2 text-sm mb-24">
    {/* Previous */}
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="px-4 py-2 rounded-full border border-blue-300 text-blue-700 bg-white hover:bg-blue-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }).map((_, i) => {
      const page = i + 1;
      const isActive = currentPage === page;
      return (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-4 py-2 rounded-full font-semibold transition duration-200 ${
            isActive
              ? "bg-blue-700 text-white shadow-md border border-blue-700"
              : "bg-white text-blue-700 border border-blue-300 hover:bg-blue-50"
          }`}
        >
          {page}
        </button>
      );
    })}

    {/* Next */}
    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="px-4 py-2 rounded-full border border-blue-300 text-blue-700 bg-white hover:bg-blue-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
)}


        </>
      )}

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}

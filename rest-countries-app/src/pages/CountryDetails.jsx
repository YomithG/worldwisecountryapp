// Additions are commented with NEW

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer2";
import { TiLocationArrow } from "react-icons/ti";
import { BiUndo } from "react-icons/bi";
import Button from "../components/Button";

const CountryDetails = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const data = await res.json();
        setCountry(data[0]);

        if (data[0].borders?.length > 0) {
          const borderCodes = data[0].borders.join(",");
          const borderRes = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes}`);
          const borderData = await borderRes.json();
          setBorderCountries(borderData);
        } else {
          setBorderCountries([]);
        }
      } catch (err) {
        console.error("Error fetching country:", err);
      }
    };
    fetchCountry();
  }, [code]);

  if (!country) {
    return <div className="p-8 text-center text-blue-600 font-medium">Loading country details...</div>;
  }

  const nativeName = country.name?.nativeName
    ? Object.values(country.name.nativeName)[0]?.common
    : "N/A";

  const currencies = country.currencies
    ? Object.values(country.currencies).map((c) => `${c.name} (${c.symbol || "—"})`).join(", ")
    : "N/A";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const timezones = country.timezones?.join(", ") || "N/A";
  const googleMapLink = country.maps?.googleMaps || "#";
  const openStreetMapLink = country.maps?.openStreetMaps || "#"; // NEW
  const coatOfArms = country.coatOfArms?.png;
  const tld = country.tld?.join(", ") || "N/A"; // NEW
  const callingCode = `${country.idd?.root || ""}${country.idd?.suffixes?.[0] || ""}`; // NEW
  const area = country.area?.toLocaleString() + " km²" || "N/A"; // NEW
  const drivingSide = country.car?.side || "N/A"; // NEW
  const gini = country.gini ? Object.values(country.gini)[0] + "%" : "N/A"; // NEW
  const startOfWeek = country.startOfWeek || "N/A"; // NEW

  return (
    <div className="min-h-screen bg-white px-6 font-sans">
      <h2 className="text-4xl font-bold mt-8 mb-4 text-center text-blue-800 drop-shadow">
        {country.name.common}
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Explore the world and get key insights about this nation.
      </p>

      <div className="max-w-5xl mx-auto bg-blue-50 shadow-lg rounded-xl p-6 md:p-10 flex flex-col md:flex-row gap-10 mb-12">
        {/* Flag & Coat of Arms */}
        <div className="md:w-1/2 flex flex-col items-center gap-6">
          <img
            src={country.flags?.png}
            alt={`${country.name.common} Flag`}
            className="w-full max-w-xs rounded-md shadow"
          />
          {coatOfArms && (
            <div className="text-center">
              <h4 className="text-sm font-medium mb-1 text-blue-700">Coat of Arms</h4>
              <img
                src={coatOfArms}
                alt={`${country.name.common} Coat of Arms`}
                className="w-32 h-32 object-contain mx-auto"
              />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="md:w-1/2 space-y-4 text-gray-800">
          <p><strong>Official Name:</strong> {country.name.official}</p>
          <p><strong>Native Name:</strong> {nativeName}</p>
          <p><strong>Top Level Domain:</strong> {tld}</p>
          <p><strong>Calling Code:</strong> {callingCode}</p>
          <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Subregion:</strong> {country.subregion || "N/A"}</p>
          <p><strong>Area:</strong> {area}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Languages:</strong> {languages}</p>
          <p><strong>Currencies:</strong> {currencies}</p>
          <p><strong>Timezones:</strong> {timezones}</p>
          <p><strong>Driving Side:</strong> {drivingSide}</p>
          <p><strong>Start of Week:</strong> {startOfWeek}</p>
          <p><strong>Gini Index:</strong> {gini}</p>

          <div className="mt-4">
            <strong>Border Countries:</strong>{" "}
            {borderCountries.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {borderCountries.map((b) => (
                  <Link
                    key={b.cca3}
                    to={`/country/${b.cca3}`}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200"
                  >
                    {b.name.common}
                  </Link>
                ))}
              </div>
            ) : (
              <span className="text-sm text-gray-600 ml-2">None</span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button onClick={() => navigate(-1)}>
              <Button
                id="Back"
                title="Back"
                leftIcon={<BiUndo />}
                containerClass="bg-yellow-300 flex-center gap-1"
              />
            </button>
            <a href={googleMapLink} target="_blank" rel="noopener noreferrer">
              <Button
                id="GoogleMap"
                title="Google Maps"
                leftIcon={<TiLocationArrow />}
                containerClass="bg-green-600 flex-center gap-1"
              />
            </a>
            <a href={openStreetMapLink} target="_blank" rel="noopener noreferrer">
              <Button
                id="OpenStreetMap"
                title="OpenStreetMap"
                leftIcon={<TiLocationArrow />}
                containerClass="bg-purple-600 text-white flex-center gap-1"
              />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CountryDetails;

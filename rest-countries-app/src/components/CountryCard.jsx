export default function CountryCard({ country }) {
    return (
      <div className="bg-white p-4 rounded shadow-md">
        <img src={country.flags.png} alt={country.name.common} className="w-full h-32 object-cover rounded" />
        <h2 className="text-lg font-bold mt-2">{country.name.common}</h2>
        <p><strong>Capital:</strong> {country.capital?.[0]}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Currency:</strong> {country.currencies ? Object.keys(country.currencies).join(", ") : "N/A"}</p>
      </div>
    );
  }
  
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="backdrop-blur-md bg-white/30 text-blue-900 px-6 py-4 shadow-lg border-b border-blue-200">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-tight text-blue-800">
        WorldWise
      </h1>
      <ul className="flex space-x-6 text-sm font-medium">
        <li>
          <Link
            to="/countries"
            className="px-3 py-2 rounded-full hover:bg-blue-100 transition duration-300"
          >
            Countries
          </Link>
        </li>
        <li>
          <Link
            to="/currency"
            className="px-3 py-2 rounded-full hover:bg-blue-100 transition duration-300"
          >
            Currency
          </Link>
        </li>
      </ul>
    </div>
  </nav>
    );  
}

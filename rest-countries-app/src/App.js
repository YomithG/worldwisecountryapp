import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Countries from "./pages/Countries";
import Currency from "./pages/Currency";
import CountryDetails from "./pages/CountryDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/currency" element={<Currency />} />
        <Route path="/country/:code" element={<CountryDetails/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

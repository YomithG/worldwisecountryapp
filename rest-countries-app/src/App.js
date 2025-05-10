import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Countries from "./pages/Countries";
import Currency from "./pages/Currency";
import CountryDetails from "./pages/CountryDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/currency" element={<Currency />} />
        <Route path="/country/:code" element={<CountryDetails/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

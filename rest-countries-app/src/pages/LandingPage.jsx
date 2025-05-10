import React from "react";
import { Link } from "react-router-dom";
import worldImage from "../assets/world2.jpg";


const LandingPage = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${worldImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          Discover the World with{" "}
          <span className="text-blue-400">WorldWise</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-xl mx-auto">
          Explore countries, currencies, cultures and more. Your gateway to
          global insight.
        </p>
        <Link
          to="/countries"
          className="mt-10 inline-block relative px-8 py-3 rounded-full font-semibold text-lg overflow-hidden group transition duration-300 shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          <span className="relative z-10">Get Started</span>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

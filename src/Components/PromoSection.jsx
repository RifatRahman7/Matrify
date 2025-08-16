import React from "react";
import { FaHeart, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router";

const PromoSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative p-5 w-full max-w-5xl mx-auto py-10 flex items-center justify-center my-8 roboto">
      {/* Blurred background */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-green-200/40 via-white/60 to-blue-200/40 blur-xl rounded-3xl"
        style={{ filter: "blur(32px)" }}
      ></div>
      {/* Glassmorphism card */}
      <div className="w-full max-w-3xl bg-white/40 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 px-8 py-12 flex flex-col items-center">
        <FaHeart className="text-pink-500 text-5xl mb-4 drop-shadow" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-4 tracking-tight">
          Find Your Perfect Match on Matrify!
        </h2>
        <p className="text-gray-700 text-center text-lg md:text-xl mb-8">
          Join thousands of happy couples who found love and companionship through Matrify. 
          <br className="hidden md:block" />
          Safe, secure, and designed for real connections.
        </p>
        <button
          onClick={() => navigate("/biodatas")}
          className="flex cursor-pointer items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg text-lg transition"
        >
          <FaUserPlus className="text-xl" />
          See Biodatas
        </button>
      </div>
    </div>
  );
};

export default PromoSection;
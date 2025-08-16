import React from "react";
import { useNavigate } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 roboto">
      <div className="relative max-w-md w-full mx-auto">
        {/* Blurred background */}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200/40 via-white/60 to-green-200/40 blur-xl rounded-3xl"
          style={{ filter: "blur(32px)" }}
        ></div>
        {/* Glassmorphism card */}
        <div className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 px-8 py-12 flex flex-col items-center">
          <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4 drop-shadow" />
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight text-center">
            Oops! Page Not Found
          </h1>
          <p className="text-gray-600 text-center mb-6">
            The page you are looking for doesn&apos;t exist or has been moved.<br />
            Please check the URL or return to the homepage.
          </p>
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer mt-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
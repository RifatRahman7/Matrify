import React from "react";

const Loader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 bg-opacity-60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:bg-opacity-80">
    <div className="bg-white/40 dark:bg-slate-900/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700 px-8 py-8 flex flex-col items-center">
      {/* Dual color spinning ring */}
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-t-green-500 border-b-blue-500 border-l-transparent border-r-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-2 border-white/60 dark:border-gray-500"></div>
      </div>
      <div className="text-lg font-semibold text-gray-700 dark:text-gray-100 tracking-wide">
        Loading...
      </div>
    </div>
  </div>
);

export default Loader;

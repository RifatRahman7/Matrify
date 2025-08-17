import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaFilter,
  FaUser,
  FaMapMarkerAlt,
  FaBriefcase,
  FaIdBadge,
  FaArrowRight,
} from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router";
import Loader from "./Loader";

const divisions = [
  "Dhaka",
  "Chattagram",
  "Rangpur",
  "Barisal",
  "Khulna",
  "Mymensingh",
  "Sylhet",
];

export default function BiodatasPage() {
  const [biodatas, setBiodatas] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 6;
  const [filters, setFilters] = useState({
    minAge: 18,
    maxAge: 40,
    type: "",
    division: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchBiodatas();
    // eslint-disable-next-line
  }, [filters, page]);

  const fetchBiodatas = async () => {
    try {
      const { minAge, maxAge, type, division } = filters;
      const res = await axios.get("https://matrify-server.vercel.app/biodatas", {
        params: { minAge, maxAge, type, division, page, limit },
      });
      setBiodatas(res.data.biodatas || []);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error("Failed to fetch biodatas", error);
    }
  };

  return (
    <div className="min-h-screen roboto flex flex-col 
      bg-gradient-to-br from-green-50 via-white to-blue-50 
      dark:bg-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-gray-900 dark:text-gray-100">

      <Navbar />
      <div className="flex flex-col lg:flex-row flex-grow p-4 gap-8 max-w-7xl mx-auto w-full">

        {/* Filter Sidebar */}
        <div className="w-full lg:w-72 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg 
          rounded-2xl shadow-xl p-6 space-y-6 h-fit md:sticky top-24 
          border border-gray-100 dark:border-slate-700">

          <h2 className="text-xl font-bold flex items-center gap-2 text-primary-700 dark:text-green-400">
            <FaFilter className="text-green-500" /> Filter
          </h2>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Biodata Type
            </label>
            <select
              onChange={(e) => {
                setPage(1);
                setFilters({ ...filters, type: e.target.value });
              }}
              className="mt-1 w-full p-2 border border-gray-200 dark:border-slate-700 
              rounded-lg text-sm bg-white dark:bg-slate-800 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-600"
              value={filters.type}
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Division
            </label>
            <select
              onChange={(e) => {
                setPage(1);
                setFilters({ ...filters, division: e.target.value });
              }}
              className="mt-1 w-full p-2 border border-gray-200 dark:border-slate-700 
              rounded-lg text-sm bg-white dark:bg-slate-800 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-600"
              value={filters.division}
            >
              <option value="">All</option>
              {divisions.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Age Range
            </label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="number"
                placeholder="Min"
                value={filters.minAge}
                onChange={(e) =>
                  setFilters({ ...filters, minAge: e.target.value })
                }
                className="w-1/2 p-2 border border-gray-200 dark:border-slate-700 
                rounded-lg text-sm bg-white dark:bg-slate-800 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-600"
                min={18}
                max={filters.maxAge}
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxAge}
                onChange={(e) =>
                  setFilters({ ...filters, maxAge: e.target.value })
                }
                className="w-1/2 p-2 border border-gray-200 dark:border-slate-700 
                rounded-lg text-sm bg-white dark:bg-slate-800 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-600"
                min={filters.minAge}
                max={80}
              />
            </div>
          </div>
        </div>

        {/* Biodata Cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {biodatas.length === 0 && (
            <div className="col-span-full text-center text-gray-600 dark:text-gray-300 text-lg py-16">
              <Loader />
            </div>
          )}
          {biodatas.map((biodata) => (
            <div
              key={biodata._id}
              className="relative group bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg 
    rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700 
    p-8 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-green-100/40 dark:from-green-900/20 
      via-transparent to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none" />

              <img
                src={biodata.profileImage}
                alt="Profile"
                className="w-28 h-28 rounded-full mx-auto object-cover shadow-lg 
      border-4 border-green-200 dark:border-green-700 group-hover:border-green-400 transition"
              />
              <h3 className="text-2xl mt-4 font-bold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-2">
                <FaUser className="text-green-500" />
                {biodata.name}
              </h3>

              {/* Keep only green + gray for badges */}
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <span className="flex items-center gap-1 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-800/60 px-3 py-1 rounded-full">
                  <FaIdBadge /> ID: {biodata.biodataId}
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/40 px-3 py-1 rounded-full">
                  <FaMapMarkerAlt /> {biodata.permanentDivision}
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <span className="flex items-center gap-1 text-sm font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/40 px-3 py-1 rounded-full">
                  Age: {biodata.age}
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-800/60 px-3 py-1 rounded-full">
                  <FaBriefcase /> {biodata.occupation}
                </span>
              </div>

              <button
                onClick={() => navigate(`/biodatas/${biodata.biodataId}`)}
                className="flex cursor-pointer items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 
  hover:from-green-600 hover:to-blue-600 text-white font-semibold px-5 py-2 rounded-full 
  shadow-md text-sm transition mt-5"
              >
                <FaArrowRight className="text-sm" />
                View Profile
              </button>


            </div>
          ))}

        </div>
      </div>

      {/* Pagination Controls */}
      {total > limit && (
        <div className="w-full flex justify-center mt-8 mb-6">
          <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-slate-900/80 
            px-4 py-2 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">

            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-3 py-1 cursor-pointer rounded-lg text-sm font-semibold 
              text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-40"
            >
              Prev
            </button>
            {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded-lg text-sm cursor-pointer font-semibold 
                  ${page === i + 1
                    ? "bg-green-500 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
                  }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page === Math.ceil(total / limit)}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3 py-1 rounded-lg text-sm cursor-pointer font-semibold 
              text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

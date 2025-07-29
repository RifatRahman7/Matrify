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
      console.log(res.data);
      setBiodatas(res.data.biodatas || []);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error("Failed to fetch biodatas", error);
    }
  };
  console.log(biodatas);
  return (
    <div className="min-h-screen roboto flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navbar />
      <div className="flex flex-col lg:flex-row flex-grow p-4 gap-8 max-w-7xl mx-auto w-full">
        {/* Filter Sidebar */}
        <div className="w-full lg:w-72 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 space-y-6 h-fit md:sticky top-24 border border-gray-100">
          <h2 className="text-xl font-bold flex items-center gap-2 text-primary-700">
            <FaFilter className="text-green-500" /> Filter
          </h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Biodata Type
            </label>
            <select
              onChange={(e) => {
                setPage(1);
                setFilters({ ...filters, type: e.target.value });
              }}
              className="mt-1 w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-200"
              value={filters.type}
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Division
            </label>
            <select
              onChange={(e) => {
                setPage(1);
                setFilters({ ...filters, division: e.target.value });
              }}
              className="mt-1 w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-200"
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">
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
                className="w-1/2 p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-200"
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
                className="w-1/2 p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-200"
                min={filters.minAge}
                max={80}
              />
            </div>
          </div>
        </div>

        {/* Biodata Cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {biodatas.length === 0 && (
            <div className="col-span-full text-center text-gray-600 text-lg py-16">
              Loading Biodatas...
            </div>
          )}
          {biodatas.map((biodata) => (
            <div
              key={biodata._id}
              className="relative group bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 p-8 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-green-100/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none" />
              <img
                src={biodata.profileImage}
                alt="Profile"
                className="w-28 h-28 rounded-full mx-auto object-cover shadow-lg border-4 border-green-200 group-hover:border-green-400 transition"
              />
              <h3 className="text-2xl mt-4 font-bold text-gray-800 flex items-center justify-center gap-2">
                <FaUser className="text-green-500" />
                {biodata.name}
              </h3>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <span className="flex items-center gap-1 text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                  <FaIdBadge /> ID: {biodata.biodataId}
                </span>
                <span className="flex items-center gap-1 text-sm text-pink-600 font-semibold bg-pink-50 px-3 py-1 rounded-full">
                  <FaMapMarkerAlt /> {biodata.permanentDivision}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <span className="flex items-center gap-1 text-sm text-green-700 font-semibold bg-green-50 px-3 py-1 rounded-full">
                  Age: {biodata.age}
                </span>
                <span className="flex items-center gap-1 text-sm text-yellow-700 font-semibold bg-yellow-50 px-3 py-1 rounded-full">
                  <FaBriefcase /> {biodata.occupation}
                </span>
              </div>
              <button
                onClick={() => navigate(`/biodatas/${biodata.biodataId}`)}
                className="mt-6 flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-2 rounded-full text-base font-semibold shadow-lg cursor-pointer transition-all duration-200 hover:scale-100 hover:shadow-xl"
              >
                View Profile <FaArrowRight className="ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      {total > limit && (
        <div className="w-full flex justify-center mt-8">
          <div className="inline-flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-xl shadow-lg border border-gray-200">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-3 py-1 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-40"
            >
              Prev
            </button>
            {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded-lg text-sm font-semibold ${page === i + 1
                    ? "bg-green-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page === Math.ceil(total / limit)}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3 py-1 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-40"
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

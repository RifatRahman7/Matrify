import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  FaFilter,
  FaUser,
  FaMapMarkerAlt,
  FaBriefcase,
  FaIdBadge,
} from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const divisions = [
  'Dhaka',
  'Chattagram',
  'Rangpur',
  'Barisal',
  'Khulna',
  'Mymensingh',
  'Sylhet',
];

export default function BiodatasPage() {
  const [biodatas, setBiodatas] = useState([]);
  const [filters, setFilters] = useState({
    minAge: 18,
    maxAge: 40,
    type: '',
    division: '',
  });

  useEffect(() => {
    fetchBiodatas();
    // eslint-disable-next-line
  }, [filters]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const fetchBiodatas = async () => {
    const { minAge, maxAge, type, division } = filters;
    const res = await axios.get('http://localhost:3000/biodatas', {
      params: { minAge, maxAge, type, division },
    });
    setBiodatas(res.data);
  };

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
              onChange={(e) =>
                setFilters({ ...filters, type: e.target.value })
              }
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
              onChange={(e) =>
                setFilters({ ...filters, division: e.target.value })
              }
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
            <div className="col-span-full text-center text-gray-400 text-lg py-16">
              No biodata found for selected filters.
            </div>
          )}
          {biodatas.map((biodata, idx) => (
            <div
              key={biodata._id}
              data-aos="fade-up"
              data-aos-delay={idx * 80}
              className="bg-white/90 rounded-2xl shadow-lg p-7 text-center border border-gray-100 transition-all duration-200 hover:scale-105 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-green-100/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none" />
              <img
                src={biodata.profileImage}
                alt="Profile"
                className="w-28 h-28 rounded-full mx-auto object-cover shadow-lg border-4 border-green-100 group-hover:border-green-300 transition"
              />
              <h3 className="text-2xl mt-4 font-bold text-gray-800 flex items-center justify-center gap-2">
                <FaUser className="text-green-500" />
                {biodata.biodataType}
              </h3>
              <p className="text-gray-500 text-sm flex justify-center gap-1 items-center mt-1">
                <FaIdBadge className="text-blue-400" /> <span className="font-medium">ID:</span> {biodata.biodataId}
              </p>
              <p className="text-gray-500 text-sm flex justify-center gap-1 items-center mt-1">
                <FaMapMarkerAlt className="text-pink-400" /> {biodata.permanentDivision}
              </p>
              <p className="text-gray-600 text-base font-semibold mt-2">
                Age: <span className="text-green-600">{biodata.age}</span>
              </p>
              <p className="text-gray-500 text-sm flex justify-center gap-1 items-center mt-1">
                <FaBriefcase className="text-yellow-500" /> {biodata.occupation}
              </p>
              <button className="mt-5 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 cursor-pointer rounded-full text-base font-semibold shadow hover:from-green-600 hover:to-blue-600 transition-all duration-200 hover:scale-105">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
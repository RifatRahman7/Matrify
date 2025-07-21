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
  }, [filters]);

  const fetchBiodatas = async () => {
    const { minAge, maxAge, type, division } = filters;
    const res = await axios.get('http://localhost:3000/biodatas', {
      params: { minAge, maxAge, type, division },
    });
    setBiodatas(res.data);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-col lg:flex-row flex-grow p-4 gap-6">
        {/* Filter Sidebar (Top on Mobile, Side on Desktop) */}
        <div className="w-full lg:w-64 bg-white/60 backdrop-blur-md rounded-xl shadow-lg p-4 space-y-4 h-fit md:sticky top-24">
          <h2 className="text-lg font-bold flex items-center gap-2 text-gray-700">
            <FaFilter /> Filter
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Biodata Type
            </label>
            <select
              onChange={(e) =>
                setFilters({ ...filters, type: e.target.value })
              }
              className="mt-1 w-full p-2 border rounded-md text-sm"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Division
            </label>
            <select
              onChange={(e) =>
                setFilters({ ...filters, division: e.target.value })
              }
              className="mt-1 w-full p-2 border rounded-md text-sm"
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
            <label className="block text-sm font-medium text-gray-700">
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
                className="w-1/2 p-2 border rounded-md text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxAge}
                onChange={(e) =>
                  setFilters({ ...filters, maxAge: e.target.value })
                }
                className="w-1/2 p-2 border rounded-md text-sm"
              />
            </div>
          </div>
        </div>

        {/* Biodata Cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {biodatas.map((biodata) => (
            <div
              key={biodata._id}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:scale-105 transition-transform duration-300"
            >
              <img
                src={biodata.profileImage}
                alt="Profile"
                className="w-28 h-28 rounded-full mx-auto object-cover shadow"
              />
              <h3 className="text-xl mt-3 font-semibold text-gray-800 flex items-center justify-center gap-2">
                <FaUser className="text-green-500" />
                {biodata.biodataType}
              </h3>
              <p className="text-gray-500 text-sm flex justify-center gap-1 items-center">
                <FaIdBadge /> ID: {biodata.biodataId}
              </p>
              <p className="text-gray-500 text-sm flex justify-center gap-1 items-center">
                <FaMapMarkerAlt /> {biodata.permanentDivision}
              </p>
              <p className="text-gray-500 text-sm">Age: {biodata.age}</p>
              <p className="text-gray-500 text-sm flex justify-center gap-1 items-center">
                <FaBriefcase /> {biodata.occupation}
              </p>
              <button className="mt-4 bg-green-600 text-white px-5 py-2 rounded-full text-sm hover:bg-green-700 transition">
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

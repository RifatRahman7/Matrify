import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUser, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaBriefcase, FaIdBadge } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

const ViewBiodata = () => {
  const { user } = useContext(AuthContext);
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user's biodata
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/api/biodata/${user.email}`)
        .then((res) => {
          setBiodata(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email]);

  // Handle Make Premium
  const handleMakePremium = async () => {
    const result = await Swal.fire({
      title: "Make Biodata Premium?",
      text: "Are you sure you want to send your biodata for premium approval?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send for approval",
    });
    if (result.isConfirmed) {
      try {
        await axios.post("http://localhost:3000/api/biodata/premium-request", {
          contactEmail: user.email,
        });
        Swal.fire({
          title: "Request Sent!",
          text: "Your biodata has been sent for premium approval.",
          icon: "success",
          confirmButtonColor: "#16a34a",
        });
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "Failed to send request. Please try again.",
          icon: "error",
        });
      }
    }
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Loading...</div>;
  }

  if (!biodata) {
    return (
      <div className="text-center text-lg text-gray-500">
        No biodata found. Please create your biodata first.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <img
            src={biodata.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-green-200 shadow mb-2"
          />
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaUser className="text-green-500" />
            {biodata.name}
          </h2>
          <span className="text-base text-gray-600">{biodata.biodataType}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <FaIdBadge className="text-blue-400" />
              <span className="font-semibold">Date of Birth:</span>
              <span>{biodata.dob}</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <FaBriefcase className="text-yellow-500" />
              <span className="font-semibold">Occupation:</span>
              <span>{biodata.occupation}</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-semibold">Height:</span>
              <span>{biodata.height}</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-semibold">Weight:</span>
              <span>{biodata.weight}</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-semibold">Age:</span>
              <span>{biodata.age}</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-semibold">Race:</span>
              <span>{biodata.race}</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-semibold">Father's Name:</span>
              <span>{biodata.fatherName}</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-semibold">Mother's Name:</span>
              <span>{biodata.motherName}</span>
            </div>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2">
              <FaMapMarkerAlt className="text-pink-400" />
              <span className="font-semibold">Permanent Division:</span>
              <span>{biodata.permanentDivision}</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-semibold">Present Division:</span>
              <span>{biodata.presentDivision}</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-semibold">Expected Partner Age:</span>
              <span>{biodata.expectedPartnerAge}</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-semibold">Expected Partner Height:</span>
              <span>{biodata.expectedPartnerHeight}</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-semibold">Expected Partner Weight:</span>
              <span>{biodata.expectedPartnerWeight}</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <FaEnvelope className="text-blue-600" />
              <span className="font-semibold">Contact Email:</span>
              <span>{biodata.contactEmail}</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <FaPhoneAlt className="text-green-600" />
              <span className="font-semibold">Mobile:</span>
              <span>{biodata.mobile}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleMakePremium}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300"
          >
            Make Biodata Premium
          </button>
        </div>
        {biodata.isPremium && (
          <div className="mt-4 text-center">
            <span className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-1 rounded-full font-semibold shadow">
              Premium Biodata
            </span>
          </div>
        )}
        {biodata.premiumRequest && !biodata.isPremium && (
          <div className="mt-4 text-center">
            <span className="inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-1 rounded-full font-semibold shadow">
              Premium Request Pending
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBiodata;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  FaUser, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaBriefcase, FaIdBadge
} from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const BiodataDetailsPage = () => {
  const { biodataId } = useParams();
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/biodatas/${biodataId}`)
      .then((res) => {
        setBiodata(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [biodataId]);

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Loading...</div>;
  }

  if (!biodata) {
    return (
      <div className="text-center text-lg text-gray-500">
        Biodata not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 py-10">
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
                <span className="font-semibold">Biodata ID:</span>
                <span>{biodata.biodataId}</span>
              </div>
              <div className="mb-2 flex items-center gap-2">
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BiodataDetailsPage;
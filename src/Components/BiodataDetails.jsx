import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import {
  FaUser, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaBriefcase, FaIdBadge, FaHeart
} from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import Loader from "./Loader";

const BiodataDetailsPage = () => {
  const { biodataId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [biodata, setBiodata] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://matrify-server.vercel.app/users/${user.email}`)
        .then(res => setDbUser(res.data))
        .catch(() => setDbUser(null));
    }
  }, [user?.email]);

  useEffect(() => {
    axios
      .get(`https://matrify-server.vercel.app/biodatas/${biodataId}`)
      .then((res) => {
        setBiodata(res.data);
        setLoading(false);
        axios 
          .get("https://matrify-server.vercel.app/biodatas", {
            params: { type: res.data.biodataType },
          })
          .then((simRes) => {
            const filtered = simRes.data.filter(
              (b) => b.biodataId !== res.data.biodataId
            );
            setSimilar(filtered.slice(0, 3));
          });
      })
      .catch(() => setLoading(false));
  }, [biodataId]);

  const handleAddToFavourites = async () => {
    if (!user?.email) {
      Swal.fire("Login Required", "Please login to add to favourites.", "info");
      return;
    }
    try {
      await axios.post("https://matrify-server.vercel.app/favourites", {
        userEmail: user.email,
        biodataId: biodata.biodataId,
      });
      Swal.fire("Added!", "Biodata added to your favourites.", "success");
    } catch {
      Swal.fire("Error", "Failed to add to favourites.", "error");
    }
  };

  const handleRequestContact = () => {
    navigate(`/checkout/${biodata.biodataId}`);
  };

  const isPremium = dbUser?.isPremium || dbUser?.role === "admin";

  if (loading) return <Loader />;

  if (!biodata) {
    return (
      <div className="text-center text-lg text-gray-400 dark:text-gray-300">
        Biodata not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-slate-950 text-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 py-10">
        <div className="w-full max-w-2xl bg-white text-gray-900 dark:bg-slate-950/80 backdrop-blur-lg dark:border dark:border-slate-700 shadow-2xl rounded-2xl p-8 dark:text-gray-100">
          <div className="flex flex-col items-center mb-6">
            <img
              src={biodata.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 shadow mb-2"
            />
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaUser className="text-green-400" />
              {biodata.name}
            </h2>
            <span className="text-base text-gray-400">{biodata.biodataType}</span>
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
              {isPremium ? (
                <>
                  <div className="mb-2 flex items-center gap-2">
                    <FaEnvelope className="text-blue-400" />
                    <span className="font-semibold">Contact Email:</span>
                    <span>{biodata.contactEmail}</span>
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <FaPhoneAlt className="text-green-400" />
                    <span className="font-semibold">Mobile:</span>
                    <span>{biodata.mobile}</span>
                  </div>
                </>
              ) : (
                <div className="mb-2 flex flex-col gap-2">
                  <span className="text-sm text-gray-400 italic">
                    Contact information is only visible to premium members.
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <button
              onClick={handleAddToFavourites}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition duration-200 cursor-pointer"
            >
              <FaHeart /> Add to Favourites
            </button>
            {!isPremium && (
              <button
                onClick={handleRequestContact}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition duration-200 cursor-pointer"
              >
                Request Contact Information
              </button>
            )}
          </div>
        </div>

        {similar.length > 0 && (
          <div className="w-full max-w-2xl mt-10">
            <h3 className="text-xl font-bold mb-4 text-gray-100">Similar Biodatas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {similar.map((sim) => (
                <div
                  key={sim._id}
                  className="bg-slate-900/70 backdrop-blur-lg rounded-xl shadow p-4 flex flex-col items-center"
                >
                  <img
                    src={sim.profileImage}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-green-500 shadow mb-2"
                  />
                  <div className="font-bold text-gray-100">{sim.name}</div>
                  <div className="text-sm text-gray-400">{sim.occupation}</div>
                  <div className="text-sm text-gray-500">{sim.permanentDivision}</div>
                  <button
                    onClick={() => navigate(`/biodatas/${sim.biodataId}`)}
                    className="mt-3 text-sm bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-1 rounded-full shadow hover:from-green-600 hover:to-blue-600 transition cursor-pointer"
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BiodataDetailsPage;

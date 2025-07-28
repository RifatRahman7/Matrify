import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaMapMarkerAlt, FaBriefcase, FaIdBadge } from "react-icons/fa";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
const PremiumMembers = () => {
    const [premiumBiodatas, setPremiumBiodatas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:3000/premium-approved")
            .then((res) => {
                setPremiumBiodatas(res.data.slice(-6).reverse());
            });
    }, []);

    return (
        <div className="max-w-6xl mx-auto py-10 roboto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
                <Typewriter
                    words={['Premium Members']}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={1500}
                />
            </h2>
            <h2 className="text-lg md:text-xl text-center text-gray-700 mb-8">
                Meet our exclusive premium members who have enhanced profiles for better visibility and connections.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {premiumBiodatas.map((biodata, idx) => (
                    <motion.div
                        key={biodata.biodataId}
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.12, type: "spring" }}
                        className="bg-white/90 rounded-2xl shadow-2xl border border-white/30 p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300"
                    >
                        <img
                            src={biodata.profileImage}
                            alt={biodata.name}
                            className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400 shadow mb-4"
                        />
                        <div className="flex items-center gap-2 mb-2">
                            <FaIdBadge className="text-blue-400" />
                            <span className="font-semibold text-gray-700">ID:</span>
                            <span className="font-mono">{biodata.biodataId}</span>
                        </div>
                        <div className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
                            <FaUser className="text-green-500" />
                            {biodata.name}
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                            {biodata.biodataType}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                            <FaMapMarkerAlt className="text-red-600" />
                            {biodata.permanentDivision}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                            <span className="font-semibold">Age:</span>
                            {biodata.age}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
                            <FaBriefcase className="text-yellow-500" />
                            {biodata.occupation}
                        </div>
                        <button
                            onClick={() => navigate(`/biodatas/${biodata.biodataId}`)}
                            className="mt-auto cursor-pointer bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition"
                        >
                            View Profile
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PremiumMembers;
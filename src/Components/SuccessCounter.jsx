import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { FaUsers, FaVenus, FaMars, FaHeart } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const CounterCard = ({ icon, label, value, color }) => (
    <div className="flex flex-col items-center justify-center bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 p-8 min-w-[180px] hover:scale-105 transition-transform duration-200 cursor-pointer">
        <div className={`text-4xl mb-2 ${color}`}>{icon}</div>
        <div className="text-3xl font-extrabold text-gray-800 mb-1">
            <CountUp end={value} duration={2} separator="," />
        </div>
        <div className="text-gray-700 font-semibold text-lg">{label}</div>
    </div>
);

const SuccessCounter = () => {
    const [stats, setStats] = useState({
        total: 0,
        male: 0,
        female: 0,
        marriages: 0,
    });

    useEffect(() => {
        axios.get("http://localhost:3000/admin/stats").then((res) => {
            setStats({
                total: res.data.totalBiodata,
                male: res.data.maleBiodata,
                female: res.data.femaleBiodata,
                marriages: res.data.marriages || 4,
            });
        });
    }, []);

    return (
        <div className="relative w-full max-w-5xl mx-auto py-12 roboto">
            <div
                className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200/40 via-white/60 to-green-200/40 blur-xl rounded-3xl"
                style={{ filter: "blur(32px)" }}
            ></div>

            <div className="flex justify-center mb-8">
                <div className="bg-green-100/30 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 px-6 py-6 inline-block">
                    <div className="text-3xl md:text-4xl font-bold text-center text-gray-800">
                       <Typewriter
                        words={[' Matrify Success in Numbers']}
                        loop={0}
                        cursor
                        cursorStyle="_"
                        typeSpeed={80}
                        deleteSpeed={50}
                        delaySpeed={1500}
                    />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center p-10">
                <CounterCard
                    icon={<FaUsers />}
                    label="Total Biodatas"
                    value={stats.total}
                    color="text-blue-600"
                />
                <CounterCard
                    icon={<FaMars />}
                    label="Boys Biodata"
                    value={stats.male}
                    color="text-green-600"
                />
                <CounterCard
                    icon={<FaVenus />}
                    label="Girls Biodata"
                    value={stats.female}
                    color="text-pink-500"
                />
                <CounterCard
                    icon={<FaHeart />}
                    label="Marriages Completed"
                    value={stats.marriages}
                    color="text-red-500"
                />
            </div>
        </div>
    );
};

export default SuccessCounter;
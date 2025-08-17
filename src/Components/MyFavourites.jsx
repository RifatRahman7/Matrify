import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { FaTrash } from "react-icons/fa";
import Loader from "./Loader";

const MyFavourites = () => {
    const { user } = useContext(AuthContext);
    const [favs, setFavs] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`https://matrify-server.vercel.app/favourites/${user.email}`)
                .then(res => setFavs(res.data));
        }
    }, [user?.email]);

    const handleDelete = async (biodataId) => {
        await axios.delete(`https://matrify-server.vercel.app/favourites/${user.email}/${biodataId}`);
        setFavs(favs.filter(f => f.biodataId !== biodataId));
    };

    return (
        <div className="max-w-3xl mx-auto dark:bg-slate-950/80 dark:text-gray-100 backdrop-blur-lg dark:border dark:border-slate-800 p-6 rounded-2xl shadow-2xl mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">My Favourites</h2>

            {/* Table for md and up */}
            <div className="overflow-x-auto hidden md:block">
                <table className="min-w-full text-sm rounded-xl overflow-hidden">
                    <thead>
                        <tr className="bg-gradient-to-r from-green-900 to-blue-900 text-gray-100">
                            <th className="px-4 py-3 text-left font-semibold">Name</th>
                            <th className="px-4 py-3 text-left font-semibold">Biodata ID</th>
                            <th className="px-4 py-3 text-left font-semibold">Permanent Address</th>
                            <th className="px-4 py-3 text-left font-semibold">Occupation</th>
                            <th className="px-4 py-3 text-center font-semibold">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favs.map(f => (
                            <tr key={f.biodataId} className="dark:hover:bg-slate-800 transition">
                                <td className="px-4 py-3 font-medium">{f.name}</td>
                                <td className="px-4 py-3">{f.biodataId}</td>
                                <td className="px-4 py-3">{f.permanentDivision}</td>
                                <td className="px-4 py-3">{f.occupation}</td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => handleDelete(f.biodataId)}
                                        className="text-red-500 hover:text-red-700 p-2 rounded-full transition cursor-pointer"
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {favs.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-gray-400"><Loader/></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Card system for small devices */}
            <div className="block md:hidden space-y-4">
                {favs.length === 0 && (
                    <div className="text-center py-8 text-gray-400">No favourites found.</div>
                )}
                {favs.map(f => (
                    <div
                        key={f.biodataId}
                        className="bg-slate-900 rounded-xl shadow p-4 flex flex-col gap-2 border border-slate-800"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div>
                                <div className="font-semibold">{f.name}</div>
                                <div className="text-xs text-gray-400">Biodata ID: {f.biodataId}</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 text-sm">
                            <div>
                                <span className="font-semibold">Permanent Address: </span>
                                {f.permanentDivision}
                            </div>
                            <div>
                                <span className="font-semibold">Occupation: </span>
                                {f.occupation}
                            </div>
                        </div>
                        <div className="flex justify-end mt-2">
                            <button
                                onClick={() => handleDelete(f.biodataId)}
                                className="text-red-500 hover:text-red-700 p-2 rounded-full transition cursor-pointer"
                                title="Delete"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyFavourites;

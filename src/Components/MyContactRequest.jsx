import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaCheckCircle, FaHourglassHalf, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

const statusBadge = (status) => {
    if (status === "approved") {
        return (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-800 text-green-200 font-semibold text-xs">
                <FaCheckCircle /> Approved
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-800 text-yellow-200 font-semibold text-xs">
            <FaHourglassHalf /> Pending
        </span>
    );
};

const MyContactRequest = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`https://matrify-server.vercel.app/contact-requests/${user.email}`)
                .then(res => setRequests(res.data));
        }
    }, [user?.email]);

    // Delete request
    const handleDelete = async (id) => {
        await axios.delete(`https://matrify-server.vercel.app/contact-requests/${id}`);
        setRequests(requests.filter(r => r._id !== id));
    };

    return (
        <div className="max-w-3xl mx-auto dark:bg-slate-950/80 dark:text-gray-100 backdrop-blur-lg dark:border dark:border-slate-800 p-6 rounded-2xl shadow-2xl mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">My Contact Requests</h2>

            {/* Table for md and up */}
            <div className="overflow-x-auto hidden md:block">
                <table className="min-w-full text-sm rounded-xl overflow-hidden">
                    <thead>
                        <tr className="bg-gradient-to-r from-green-900 to-blue-900 text-gray-100">
                            <th className="px-4 py-3 text-left font-semibold">Name</th>
                            <th className="px-4 py-3 text-left font-semibold">Biodata ID</th>
                            <th className="px-4 py-3 text-center font-semibold">Status</th>
                            <th className="px-4 py-3 text-center font-semibold">Mobile</th>
                            <th className="px-4 py-3 text-center font-semibold">Email</th>
                            <th className="px-4 py-3 text-center font-semibold">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(r => (
                            <tr key={r._id} className=" dark:hover:bg-slate-800 transition">
                                <td className="px-4 py-3">{r.name || "-"}</td>
                                <td className="px-4 py-3">{r.biodataId}</td>
                                <td className="px-4 py-3 text-center">{statusBadge(r.status)}</td>
                                <td className="px-4 py-3 text-center">
                                    {r.status === "approved" ? (
                                        <span className="font-semibold text-green-400">{r.mobile}</span>
                                    ) : (
                                        <span className="text-gray-500">-</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {r.status === "approved" ? (
                                        <span className="font-semibold text-blue-400">{r.contactEmail}</span>
                                    ) : (
                                        <span className="text-gray-500">-</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => handleDelete(r._id)}
                                        className="text-red-500 hover:text-red-700 p-2 rounded-full transition cursor-pointer"
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {requests.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-500"> No contact Requests...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Card system for small devices */}
            <div className="block md:hidden space-y-4">
                {requests.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No requests found.</div>
                )}
                {requests.map(r => (
                    <div
                        key={r._id}
                        className="bg-slate-900 rounded-xl shadow p-4 flex flex-col gap-2 border border-slate-700"
                    >
                        <div className="flex flex-col gap-1">
                            <div className="font-semibold text-gray-100">{r.name || "-"}</div>
                            <div className="text-xs text-gray-400">Biodata ID: {r.biodataId}</div>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center mt-1">
                            {statusBadge(r.status)}
                        </div>
                        <div className="flex flex-col gap-1 text-sm mt-2">
                            <div className="flex items-center gap-2">
                                <FaPhoneAlt className="text-green-400" />
                                <span className="font-semibold">Mobile:</span>
                                {r.status === "approved" ? (
                                    <span className="font-semibold text-green-400">{r.mobile}</span>
                                ) : (
                                    <span className="text-gray-500">-</span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="text-blue-400" />
                                <span className="font-semibold">Email:</span>
                                {r.status === "approved" ? (
                                    <span className="font-semibold text-blue-400">{r.contactEmail}</span>
                                ) : (
                                    <span className="text-gray-500">-</span>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end mt-2">
                            <button
                                onClick={() => handleDelete(r._id)}
                                className="text-red-500 hover:text-red-700 p-2 rounded-full transition"
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

export default MyContactRequest;

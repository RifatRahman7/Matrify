import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "./Loader";

const ApprovedPremium = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://matrify-server.vercel.app/premium-requests")
            .then(res => setRequests(res.data))
            .finally(() => setLoading(false));
    }, []);

    const handleApprove = async (biodataId) => {
        const result = await Swal.fire({
            title: "Approve Premium?",
            text: "Are you sure you want to make this biodata premium?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve"
        });
        if (result.isConfirmed) {
            await axios.patch(`https://matrify-server.vercel.app/premium-requests/approve/${biodataId}`);
            setRequests(prev => prev.filter(r => r.biodataId !== biodataId));
            Swal.fire("Success!", "Biodata is now premium.", "success");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] roboto">
            <div className="w-full max-w-3xl bg-white/80 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Premium Approval Requests</h2>
                {loading ? (
                    <Loader />
                ) : requests.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">No premium requests found.</div>
                ) : (
                    <>
                        {/* Table for md and up */}
                        <div className="overflow-x-auto hidden md:block">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead>
                                    <tr className="bg-gradient-to-r from-green-100 to-blue-100">
                                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Name</th>
                                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Email</th>
                                        <th className="px-4 py-2 text-center font-semibold text-gray-700">Biodata Id</th>
                                        <th className="px-4 py-2 text-center font-semibold text-gray-700">Make Premium</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map(r => (
                                        <tr key={r.biodataId} className="hover:bg-blue-50 transition">
                                            <td className="px-4 py-2">{r.name}</td>
                                            <td className="px-4 py-2">{r.contactEmail}</td>
                                            <td className="px-4 py-2 text-center">{r.biodataId}</td>
                                            <td className="px-4 py-2 text-center">
                                                <button
                                                    onClick={() => handleApprove(r.biodataId)}
                                                    className="px-3 py-1 cursor-pointer rounded bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold hover:from-yellow-500 hover:to-yellow-700 transition"
                                                >
                                                    Make Premium
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Card system for small devices */}
                        <div className="block md:hidden space-y-4 divide-y divide-gray-200">
                            {requests.map(r => (
                                <div
                                    key={r.biodataId}
                                    className="bg-white/90 rounded-xl shadow-lg p-4 flex flex-col gap-2 border border-gray-100"
                                >
                                    <div className="font-bold text-gray-800 text-lg">{r.name}</div>
                                    <div className="text-sm text-gray-600 mb-1">{r.contactEmail}</div>
                                    <div className="text-sm text-gray-500 mb-2">Biodata ID: {r.biodataId}</div>
                                    <button
                                        onClick={() => handleApprove(r.biodataId)}
                                        className="px-3 py-2 cursor-pointer rounded bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold hover:from-yellow-500 hover:to-yellow-700 transition"
                                    >
                                        Make Premium
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ApprovedPremium;
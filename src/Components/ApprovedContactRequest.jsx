import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "./Loader";

const ApprovedContactRequest = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://matrify-server.vercel.app/admin/contact-requests")
            .then(res => setRequests(res.data))
            .finally(() => setLoading(false));
    }, []);

    const handleApprove = async (id) => {
        const result = await Swal.fire({
            title: "Approve Contact Request?",
            text: "Are you sure you want to approve this contact request?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve"
        });
        if (result.isConfirmed) {
            await axios.patch(`https://matrify-server.vercel.app/admin/contact-requests/approve/${id}`);
            setRequests(prev => prev.filter(r => r._id !== id));
            Swal.fire("Success!", "Contact request approved.", "success");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] roboto">
            <div className="w-full max-w-3xl bg-white/80 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Request Approvals</h2>
                {loading ? (
                   <Loader />
                ) : requests.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">No pending contact requests found.</div>
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
                                        <th className="px-4 py-2 text-center font-semibold text-gray-700">Approve</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map(r => (
                                        <tr key={r._id} className="hover:bg-blue-50 transition">
                                            <td className="px-4 py-2">{r.name}</td>
                                            <td className="px-4 py-2">{r.contactEmail}</td>
                                            <td className="px-4 py-2 text-center">{r.biodataId}</td>
                                            <td className="px-4 py-2 text-center">
                                                <button
                                                    onClick={() => handleApprove(r._id)}
                                                    className="px-3 py-1 cursor-pointer rounded bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold hover:from-green-600 hover:to-blue-600 transition"
                                                >
                                                    Approve
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
                                    key={r._id}
                                    className="bg-white/90 rounded-xl shadow-lg p-4 flex flex-col gap-2 border border-gray-100"
                                >
                                    <div className="font-bold text-gray-800 text-lg">{r.name}</div>
                                    <div className="text-sm text-gray-600 mb-1">{r.contactEmail}</div>
                                    <div className="text-sm text-gray-500 mb-2">Biodata ID: {r.biodataId}</div>
                                    <button
                                        onClick={() => handleApprove(r._id)}
                                        className="px-3 py-2 cursor-pointer rounded bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold hover:from-green-600 hover:to-blue-600 transition"
                                    >
                                        Approve
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

export default ApprovedContactRequest;
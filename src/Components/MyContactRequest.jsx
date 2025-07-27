import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

const statusBadge = (status) => {
  if (status === "approved") {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-xs">
        <FaCheckCircle /> Approved
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-xs">
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
        .get(`http://localhost:3000/contact-requests/${user.email}`)
        .then(res => setRequests(res.data));
    }
  }, [user?.email]);

  // Delete request
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/contact-requests/${id}`);
    setRequests(requests.filter(r => r._id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-lg border border-white/30 p-6 rounded-2xl shadow-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">My Contact Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-green-100 to-blue-100">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Biodata ID</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-700">Mobile</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-700">Email</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-700">Delete</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r._id} className="hover:bg-blue-50 transition">
                <td className="px-4 py-3">{r.name || "-"}</td>
                <td className="px-4 py-3">{r.biodataId}</td>
                <td className="px-4 py-3 text-center">{statusBadge(r.status)}</td>
                <td className="px-4 py-3 text-center">
                  {r.status === "approved" ? (
                    <span className="font-semibold text-green-700">{r.mobile}</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {r.status === "approved" ? (
                    <span className="font-semibold text-blue-700">{r.contactEmail}</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-full transition"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500">No requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContactRequest;
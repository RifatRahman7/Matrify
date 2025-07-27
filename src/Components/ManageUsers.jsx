import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserShield, FaCrown } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { MdAdminPanelSettings } from "react-icons/md";
import { LuCrown } from "react-icons/lu";
const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch users from backend
    useEffect(() => {
        axios
            .get("http://localhost:3000/users")
            .then((res) => setUsers(res.data))
            .catch(() => setUsers([]))
            .finally(() => setLoading(false));
    }, []);

    // Make Admin with SweetAlert2 confirmation
    const handleMakeAdmin = async (email) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to make this user an admin?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin"
        });
        if (result.isConfirmed) {
            try {
                await axios.patch(`http://localhost:3000/users/admin/${email}`);
                setUsers((prev) =>
                    prev.map((u) =>
                        u.email === email ? { ...u, role: "admin" } : u
                    )
                );
                Swal.fire({
                    title: "Success!",
                    text: "User promoted to admin.",
                    icon: "success",
                    confirmButtonColor: "#16a34a"
                });
            } catch {
                toast.error("Failed to make admin.");
            }
        }
    };

    // Make Premium with SweetAlert2 confirmation
    const handleMakePremium = async (email) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to make this user premium?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#fbbf24",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make premium"
        });
        if (result.isConfirmed) {
            try {
                await axios.patch(`http://localhost:3000/users/premium/${email}`);
                setUsers((prev) =>
                    prev.map((u) =>
                        u.email === email ? { ...u, isPremium: true } : u
                    )
                );
                Swal.fire({
                    title: "Success!",
                    text: "User promoted to premium.",
                    icon: "success",
                    confirmButtonColor: "#fbbf24"
                });
            } catch {
                toast.error("Failed to make premium.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] roboto">
            <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Manage Users</h2>
                {loading ? (
                    <div className="text-center text-gray-500">Loading users...</div>
                ) : (
                    <>
                        {/* Table for md and up */}
                        <div className="overflow-x-auto hidden md:block">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead>
                                    <tr className="bg-gradient-to-r from-green-100 to-blue-100">
                                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Name</th>
                                        <th className="px-4 py-2 text-left font-semibold text-gray-700">Email</th>
                                        <th className="px-4 py-2 text-center font-semibold text-gray-700">Role</th>
                                        <th className="px-4 py-2 text-center font-semibold text-gray-700">Premium</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u) => (
                                        <tr key={u.email} className="hover:bg-blue-50 transition">
                                            <td className="px-4 py-2 flex items-center gap-2">
                                                <img
                                                    src={u.photoURL || "https://i.ibb.co/p9Q5WT4/matrimony-1.png"}
                                                    alt={u.name}
                                                    className="w-8 h-8 rounded-full border-2 border-green-200 shadow"
                                                />
                                                <span className="font-medium">{u.name}</span>
                                            </td>
                                            <td className="px-4 py-2">{u.email}</td>
                                            <td className="px-4 py-2 text-center">
                                                {u.role === "admin" ? (
                                                    <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
                                                        <FaUserShield /> Admin
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={() => handleMakeAdmin(u.email)}
                                                        className="px-3 py-1 cursor-pointer rounded bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold hover:from-green-600 hover:to-blue-600 transition"
                                                        disabled={u.role === "admin"}
                                                    >
                                                        <MdAdminPanelSettings className="inline-block mr-1" />
                                                        Make Admin
                                                    </button>
                                                )}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                {u.isPremium ? (
                                                    <span className="inline-flex items-center gap-1 text-yellow-600 font-semibold">
                                                        <FaCrown /> Premium
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={() => handleMakePremium(u.email)}
                                                        className="px-3 py-1 cursor-pointer rounded bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold hover:from-yellow-500 hover:to-yellow-700 transition"
                                                        disabled={u.isPremium}
                                                    >
                                                        <LuCrown className="inline-block mr-1" />
                                                        Make Premium
                                                    </button>
                                                )}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {users.length === 0 && (
                                <div className="text-center text-gray-500 py-8">No users found.</div>
                            )}
                        </div>

                        {/* Card system for small devices */}
                        <div className="block md:hidden space-y-4">
                            {users.length === 0 && (
                                <div className="text-center text-gray-500 py-8">No users found.</div>
                            )}
                            {users.map((u) => (
                                <div
                                    key={u.email}
                                    className="bg-white/90 rounded-xl shadow p-4 flex flex-col gap-2 border border-gray-100"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <img
                                            src={u.photoURL || "https://i.ibb.co/p9Q5WT4/matrimony-1.png"}
                                            alt={u.name}
                                            className="w-10 h-10 rounded-full border-2 border-green-200 shadow"
                                        />
                                        <div>
                                            <div className="font-semibold text-gray-800">{u.name}</div>
                                            <div className="text-xs text-gray-500">{u.email}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 items-center">
                                        <div>
                                            <span className="font-semibold">Role: </span>
                                            {u.role === "admin" ? (
                                                <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
                                                    <FaUserShield /> Admin
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handleMakeAdmin(u.email)}
                                                    className="px-3 py-1 cursor-pointer rounded bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold hover:from-green-600 hover:to-blue-600 transition text-xs"
                                                    disabled={u.role === "admin"}
                                                >
                                                    Make Admin
                                                </button>
                                            )}
                                        </div>
                                        <div>
                                            <span className="font-semibold">Premium: </span>
                                            {u.isPremium ? (
                                                <span className="inline-flex items-center gap-1 text-yellow-600 font-semibold">
                                                    <FaCrown /> Premium
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handleMakePremium(u.email)}
                                                    className="px-3 py-1 cursor-pointer rounded bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold hover:from-yellow-500 hover:to-yellow-700 transition text-xs"
                                                    disabled={u.isPremium}
                                                >
                                                    Make Premium
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
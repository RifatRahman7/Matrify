import React, { useContext, useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
    User,
    Edit,
    LogOut,
    Heart,
    Mail,
    Menu,
    X,
    Home
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import DashboardHome from "./DBHome";
import { FcApprove } from "react-icons/fc";
import { FaDiagramSuccessor } from "react-icons/fa6";

const userRoutes = [
    { name: "Dashboard Home", path: "/dashboard/user-dashboard", icon: <Home className="w-5 h-5 mr-2" /> },
    { name: "Edit Biodata", path: "/dashboard/edit-biodata", icon: <Edit className="w-5 h-5 mr-2" /> },
    { name: "View Biodata", path: "/dashboard/view-biodata", icon: <User className="w-5 h-5 mr-2" /> },
    { name: "My Contact Request", path: "/dashboard/contact-request", icon: <Mail className="w-5 h-5 mr-2" /> },
    { name: "Favourite Biodatas", path: "/dashboard/favourites", icon: <Heart className="w-5 h-5 mr-2" /> },
    { name: "Got Married", path: "/dashboard/got-married", icon: <Heart className="w-5 h-5 mr-2" /> },
];

const adminRoutes = [
    { name: "Dashboard Home", path: "/dashboard/admin-dashboard", icon: <Home className="w-5 h-5 mr-2" /> },
    { name: "Manage Users", path: "/dashboard/manage", icon: <User className="w-5 h-5 mr-2" /> },
    { name: "Approved Premium", path: "/dashboard/approvedPremium", icon: <FcApprove className="text-black w-5 h-5 mr-2" /> },
    { name: "Approved Contact Request", path: "/dashboard/approvedContactRequest", icon: <Mail className="w-5 h-5 mr-2" /> },
    { name: "Success Story", path: "/dashboard/success-story", icon: <FaDiagramSuccessor className="w-5 h-5 mr-2" /> },
];

const DashboardLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logOut, user, loading } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [dbUser, setDbUser] = useState(null);
    const [dbUserLoading, setDbUserLoading] = useState(true);

    // Fetch user from MongoDB
    useEffect(() => {
        if (user?.email) {
            setDbUserLoading(true);
            axios
                .get(`https://matrify-server.vercel.app/users/${user.email}`)
                .then(res => setDbUser(res.data))
                .catch(() => setDbUser(null))
                .finally(() => setDbUserLoading(false));
        } else {
            setDbUserLoading(false); 
        }
    }, [user?.email]);

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout",
        });
        if (result.isConfirmed) {
            await logOut();
            Swal.fire({
                title: "Logged out!",
                text: "You have been logged out successfully.",
                icon: "success",
                confirmButtonColor: "#16a34a",
                timer: 1500,
                showConfirmButton: false,
            });
            navigate("/login");
        }
    };

    // Use dbUser for name/photo/email
    const displayName = dbUser?.name || user?.displayName || "User";
    const displayPhoto = dbUser?.photoURL || user?.photoURL || "https://i.ibb.co/p9Q5WT4/matrimony-1.png";
    const displayEmail = dbUser?.email || user?.email || "";
    const isAdmin = dbUser?.role === "admin" || dbUser?.isAdmin;
    const sidebarRoutes = isAdmin ? adminRoutes : userRoutes;

    if (loading || dbUserLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl roboto text-gray-700">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50 roboto">
            <Navbar />

            {/* Mobile Hamburger */}
            <div className="md:hidden flex justify-between items-center px-4 py-3 border-b bg-white shadow">
                <h2 className="font-bold text-lg text-gray-800">Dashboard</h2>
                <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-md bg-green-500 text-white">
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            <div className="flex flex-1 max-w-7xl mx-auto w-full py-6 px-2 md:px-6 gap-8">
                {/* Desktop Sidebar */}
                <aside className="w-64 min-w-[220px] hidden md:flex flex-col bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-6 space-y-2 h-fit sticky top-28">
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src={displayPhoto}
                            alt="User"
                            className="w-16 h-16 rounded-full border-4 border-green-200 shadow mb-2"
                        />
                        <span className="font-bold text-lg text-gray-800">{displayName}</span>
                        <span className="text-xs text-gray-500">{displayEmail}</span>
                    </div>
                    {sidebarRoutes.map((route) => (
                        <Link
                            key={route.path}
                            to={route.path}
                            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${location.pathname === route.path
                                ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
                                : "text-gray-800 hover:bg-white/80 hover:shadow-md hover:text-green-700"
                                }`}
                        >
                            {route.icon}
                            {route.name}
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="flex items-center cursor-pointer px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg transition-all duration-200 hover:from-green-600 hover:to-blue-600 mt-4"
                    >
                        <LogOut className="w-5 h-5 mr-2" />
                        Logout
                    </button>
                </aside>

                {/* Mobile Sidebar Drawer */}
                {isSidebarOpen && (
                    <div className="fixed inset-0 bg-black/40 z-50 flex">
                        <div className={`
              bg-white w-64 p-6 flex flex-col space-y-4 h-full
              transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"}
            `}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-800">Dashboard</h3>
                                <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-gray-100 rounded-full">
                                    <X className="w-5 h-5 text-gray-700" />
                                </button>
                            </div>
                            <div className="flex flex-col items-center mb-4">
                                <img
                                    src={displayPhoto}
                                    alt="User"
                                    className="w-14 h-14 rounded-full border-4 border-green-200 shadow mb-2"
                                />
                                <span className="font-bold text-base text-gray-800">{displayName}</span>
                                <span className="text-xs text-gray-500">{displayEmail}</span>
                            </div>
                            {sidebarRoutes.map((route) => (
                                <Link
                                    key={route.path}
                                    to={route.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${location.pathname === route.path
                                        ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
                                        : "text-gray-800 hover:bg-gray-100"
                                        }`}
                                >
                                    {route.icon}
                                    {route.name}
                                </Link>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="flex items-center cursor-pointer px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg hover:from-green-600 hover:to-blue-600 mt-auto"
                            >
                                <LogOut className="w-5 h-5 mr-2" />
                                Logout
                            </button>
                        </div>
                        <div className="flex-1" onClick={() => setIsSidebarOpen(false)} />
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1 bg-white/60 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-6 min-h-[400px]">
                    {location.pathname === "/dashboard" ? (
                        isAdmin ? (
                            <AdminDashboard />
                        ) : (
                            <DashboardHome />
                        )
                    ) : (
                        <Outlet />
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayout;
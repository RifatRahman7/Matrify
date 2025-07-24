import React, { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  User,
  Edit,
  LogOut,
  Heart,
  Mail,
  Home
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

// Define your dashboard routes here
const routes = [
     {
    name: "Home",
    path: "/",
    icon: <Home className="w-5 h-5 mr-2" />,
  },
  {
    name: "Edit Biodata",
    path: "/dashboard/edit-biodata",
    icon: <Edit className="w-5 h-5 mr-2" />,
  },
  {
    name: "View Biodata",
    path: "/dashboard/view-biodata",
    icon: <User className="w-5 h-5 mr-2" />,
  },
  {
    name: "My Contact Request",
    path: "/dashboard/contact-request",
    icon: <Mail className="w-5 h-5 mr-2" />,
  },
  {
    name: "Favourite Biodatas",
    path: "/dashboard/favourites",
    icon: <Heart className="w-5 h-5 mr-2" />,
  },
];

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logOut, user } = useContext(AuthContext);

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50 roboto">
      <Navbar />

      <div className="flex flex-1 max-w-7xl mx-auto w-full py-8 px-2 md:px-6 gap-8">
        {/* Sidebar */}
        <aside className="w-64 min-w-[220px] hidden md:flex flex-col bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-6 space-y-2 h-fit sticky top-28">
          <div className="flex flex-col items-center mb-6">
            <img
              src={user?.photoURL || "https://i.ibb.co/p9Q5WT4/matrimony-1.png"}
              alt="User"
              className="w-16 h-16 rounded-full border-4 border-green-200 shadow mb-2"
            />
            <span className="font-bold text-lg text-gray-800">{user?.displayName || "User"}</span>
            <span className="text-xs text-gray-500">{user?.email}</span>
          </div>
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === route.path
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
            className="flex items-center px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg transition-all duration-200 hover:from-green-600 hover:to-blue-600 mt-4"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </aside>

        {/* Mobile Sidebar */}
        <aside className="md:hidden w-full mb-6">
          <div className="flex flex-row gap-2 overflow-x-auto">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
                  location.pathname === route.path
                    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
                    : "text-gray-800 bg-white/80 hover:bg-white/90 hover:text-green-700"
                }`}
              >
                {route.icon}
                {route.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 rounded-full font-medium bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg transition-all duration-200 hover:from-green-600 hover:to-blue-600"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white/60 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-6 min-h-[400px]">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
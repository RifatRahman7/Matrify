import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { Edit, User, Mail, Heart } from "lucide-react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const quickLinks = [
  {
    name: "Edit Biodata",
    path: "/dashboard/edit-biodata",
    icon: <Edit className="w-6 h-6 text-green-600" />,
    color: "from-green-100 to-green-50"
  },
  {
    name: "View Biodata",
    path: "/dashboard/view-biodata",
    icon: <User className="w-6 h-6 text-blue-600" />,
    color: "from-blue-100 to-blue-50"
  },
  {
    name: "My Contact Request",
    path: "/dashboard/contact-request",
    icon: <Mail className="w-6 h-6 text-pink-600" />,
    color: "from-pink-100 to-pink-50"
  },
  {
    name: "Favourite Biodatas",
    path: "/dashboard/favourites",
    icon: <Heart className="w-6 h-6 text-yellow-600" />,
    color: "from-yellow-100 to-yellow-50"
  },
];

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/users/${user.email}`)
        .then(res => setDbUser(res.data))
        .catch(() => setDbUser(null));
    }
  }, [user?.email]);

  const displayName = dbUser?.name || user?.displayName || "User";
  const displayPhoto = dbUser?.photoURL || user?.photoURL || "https://i.ibb.co/p9Q5WT4/matrimony-1.png";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl pb-3 font-bold">User Dashboard</h1>
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-8 text-center">
        <img
          src={displayPhoto}
          alt="User"
          className="w-20 h-20 rounded-full border-4 border-green-200 shadow mx-auto mb-4"
        />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome, {displayName}!
        </h2>
        <p className="text-gray-600 mb-6">
          Manage your biodata, requests, and favourites from your dashboard.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          {quickLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 bg-gradient-to-br ${link.color} rounded-xl shadow p-4 hover:scale-105 transition`}
            >
              <span className="bg-white/80 rounded-full p-2 shadow">{link.icon}</span>
              <span className="font-semibold text-gray-800">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
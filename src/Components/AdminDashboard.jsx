import React, { useEffect, useState } from "react";
import { FaUsers, FaMars, FaVenus, FaCrown, FaDollarSign } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router";
import { LogOut } from "lucide-react";
import axios from "axios";

const StatCard = ({ icon, label, value, color }) => (
  <div className={`flex items-center gap-4 bg-white/80 backdrop-blur-lg rounded-xl shadow-xl border border-white/40 p-6`}>
    <div className={`text-3xl ${color}`}>{icon}</div>
    <div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  </div>
);

const adminRoutes = [
  { name: "Manage Users", path: "/dashboard/admin/manage-users" },
  { name: "Approved Premium", path: "/dashboard/admin/approved-premium" },
  { name: "Approved Contact Request", path: "/dashboard/admin/approved-contact-request" },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0,
    premium: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [total, male, female, premium, revenue] = await Promise.all([
          axios.get("http://localhost:3000/admin/biodata-count"),
          axios.get("http://localhost:3000/admin/biodata-count?type=Male"),
          axios.get("http://localhost:3000/admin/biodata-count?type=Female"),
          axios.get("http://localhost:3000/admin/premium-count"),
          axios.get("http://localhost:3000/admin/total-revenue"),
        ]);
        setStats({
          total: total.data.count,
          male: male.data.count,
          female: female.data.count,
          premium: premium.data.count,
          revenue: revenue.data.revenue,
        });
      } catch (err) {
        // fallback: show 0s
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Loading admin stats...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row items-start roboto justify-center min-h-[60vh] w-full">
      {/* Sidebar */}
      
      {/* Main Content */}
      <div className="flex-1 w-full max-w-4xl bg-white/80 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Admin Dashboard</h2>
        <div className="text-center text-gray-500 mt-4 mb-4">
          Welcome, Admin! Here you can manage users, approve requests, and monitor platform stats.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          <StatCard icon={<FaUsers />} label="Total Biodatas" value={stats.total} color="text-blue-600" />
          <StatCard icon={<FaCrown />} label="Premium Biodatas" value={stats.premium} color="text-yellow-500" />
          <StatCard icon={<FaMars />} label="Male Biodatas" value={stats.male} color="text-green-600" />
          <StatCard icon={<FaVenus />} label="Female Biodatas" value={stats.female} color="text-pink-500" />
          <StatCard icon={<FaDollarSign />} label="Total Revenue (USD)" value={stats.revenue} color="text-green-700" />
        </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;
import React, { useEffect, useState } from "react";
import { FaUsers, FaMars, FaVenus, FaCrown, FaDollarSign } from "react-icons/fa";
import axios from "axios";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import Loader from "./Loader";

const StatCard = ({ icon, label, value, color }) => (
  <div className={`flex items-center gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-xl shadow-xl border border-white/40 dark:border-slate-700 p-6`}>
    <div className={`text-3xl ${color}`}>{icon}</div>
    <div>
      <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</div>
      <div className="text-gray-600 dark:text-gray-300">{label}</div>
    </div>
  </div>
);

const COLORS = ["#3b82f6", "#f59e42", "#10b981", "#ec4899"];

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index, name
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.15;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={14}
      fontWeight={600}
      style={{ textShadow: "0 1px 4px #000" }}
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0,
    premium: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("https://matrify-server.vercel.app/admin/stats");
        setStats({
          total: res.data.totalBiodata,
          male: res.data.maleBiodata,
          female: res.data.femaleBiodata,
          premium: res.data.premiumBiodata,
          revenue: res.data.totalRevenue,
        });
      } catch (err) {
        // fallback: show 0s
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh] bg-slate-950"><Loader /></div>;
  }

  const pieData = [
    { name: "Total", value: stats.total },
    { name: "Premium", value: stats.premium },
    { name: "Male", value: stats.male },
    { name: "Female", value: stats.female },
  ];

  return (
    <div className="flex flex-col items-center min-h-[60vh] w-full dark:bg-slate-900/80 p-4 rounded-2xl">
      <div className="w-full max-w-5xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border border-white/30 dark:border-slate-700 shadow-2xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Admin Dashboard</h2>
        <div className="text-center text-sm text-gray-500 dark:text-gray-300 mt-4 mb-4">
          Welcome, Admin! Here you can manage users, approve requests, and monitor platform stats.
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          {/* Stat Cards */}
          <div className="flex-1 text-sm grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 md:mb-0">
            <StatCard icon={<FaUsers />} label="Total Biodatas" value={stats.total} color="text-blue-400" />
            <StatCard icon={<FaCrown />} label="Premium Biodatas" value={stats.premium} color="text-yellow-400" />
            <StatCard icon={<FaMars />} label="Male Biodatas" value={stats.male} color="text-green-400" />
            <StatCard icon={<FaVenus />} label="Female Biodatas" value={stats.female} color="text-pink-400" />
            <StatCard icon={<FaDollarSign />} label="Total Revenue (USD)" value={stats.revenue} color="text-green-500" />
          </div>

          {/* Pie Chart */}
          <div className="flex-1 w-full max-w-xs md:max-w-sm mx-auto">
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4 text-center">Biodata Distribution</h3>
            <div className="bg-white/60 dark:bg-slate-900/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 dark:border-slate-700 p-4">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    isAnimationActive={true}
                    animationDuration={1200}
                    cornerRadius={12}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(30,30,30,0.95)",
                      borderRadius: "12px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                      color: "#fff",
                    }}
                  />
                  <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ color: "#fff" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

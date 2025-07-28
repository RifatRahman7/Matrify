import React, { useEffect, useState } from "react";
import { FaUsers, FaMars, FaVenus, FaCrown, FaDollarSign } from "react-icons/fa";
import axios from "axios";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const StatCard = ({ icon, label, value, color }) => (
  <div className={`flex items-center gap-4 bg-white/80 backdrop-blur-lg rounded-xl shadow-xl border border-white/40 p-6`}>
    <div className={`text-3xl ${color}`}>{icon}</div>
    <div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-gray-600">{label}</div>
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
      fill="#333"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={14}
      fontWeight={600}
      style={{ textShadow: "0 1px 4px #fff" }}
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
        const res = await axios.get("http://localhost:3000/admin/stats");
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
    return <div className="text-center text-lg text-gray-500">Loading admin stats...</div>;
  }

  // Pie chart data
  const pieData = [
    { name: "Total", value: stats.total },
    { name: "Premium", value: stats.premium },
    { name: "Male", value: stats.male },
    { name: "Female", value: stats.female },
  ];

  return (
    <div className="flex flex-col items-center roboto min-h-[60vh] w-full">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Admin Dashboard</h2>
        <div className="text-center text-gray-500 mt-4 mb-4">
          Welcome, Admin! Here you can manage users, approve requests, and monitor platform stats.
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          {/* Stat Cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 md:mb-0">
            <StatCard icon={<FaUsers />} label="Total Biodatas" value={stats.total} color="text-blue-600" />
            <StatCard icon={<FaCrown />} label="Premium Biodatas" value={stats.premium} color="text-yellow-500" />
            <StatCard icon={<FaMars />} label="Male Biodatas" value={stats.male} color="text-green-600" />
            <StatCard icon={<FaVenus />} label="Female Biodatas" value={stats.female} color="text-pink-500" />
            <StatCard icon={<FaDollarSign />} label="Total Revenue (USD)" value={stats.revenue} color="text-green-700" />
          </div>
          <div className="flex-1 w-full max-w-xs md:max-w-sm mx-auto">
            <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">Biodata Distribution</h3>
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-4">
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
                      background: "rgba(255,255,255,0.95)",
                      borderRadius: "12px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      color: "#333",
                    }}
                  />
                  <Legend verticalAlign="bottom" iconType="circle" />
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
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import AdminDashboard from "./AdminDashboard";
import DBHome from "./DBHome";

const DashboardHomeRouter = () => {
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://matrify-server.vercel.app/users/${user.email}`)
        .then(res => {
          setDbUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          setDbUser(null);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
      </div>
    );
  }

  if (!dbUser) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-lg text-red-500">User not found.</div>
      </div>
    );
  }

  if (dbUser.role === "admin") {
    return <AdminDashboard />;
  } else {
    return <DBHome />;
  }
};

export default DashboardHomeRouter;
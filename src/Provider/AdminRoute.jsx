import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [fetching, setFetching] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    if (user?.email) {
      setFetching(true);
      fetch(`https://matrify-server.vercel.app/users/${user.email}`)
        .then(res => res.json())
        .then(data => {
          if (isMounted) setDbUser(data);
        })
        .catch(() => {
          if (isMounted) setDbUser(null);
        })
        .finally(() => {
          if (isMounted) setFetching(false);
        });
    }
    return () => { isMounted = false; };
  }, [user]);

  if (loading || fetching || (user && !dbUser)) {
    return <div className="text-center py-20 text-lg text-gray-500">Loading...</div>;
  }

  if (!user || dbUser?.role !== "admin") {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
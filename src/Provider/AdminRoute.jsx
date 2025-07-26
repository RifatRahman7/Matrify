import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [dbUser, setDbUser] = React.useState(null);
  const location = useLocation();

  React.useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/users/${user.email}`)
        .then(res => res.json())
        .then(data => setDbUser(data));
    }
  }, [user]);

  if (loading || (user && !dbUser)) {
    return <div className="text-center py-20 text-lg text-gray-500">Loading...</div>;
  }

  if (!user || dbUser?.role !== "admin") {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
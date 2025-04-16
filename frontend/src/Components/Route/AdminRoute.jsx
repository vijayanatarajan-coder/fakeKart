import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      const access_token = sessionStorage.getItem("googleToken");

      if (!access_token) {
        setLoading(false);
        return;
      }

      try {
        const googleRes = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
        );
        const email = googleRes.data.email;

        const backendRes = await axios.get(
          `http://localhost:8000/api/user/${email}`
        );
        const userRole = backendRes.data?.user?.role;

        setRole(userRole);
      } catch (err) {
        console.error("Error in AdminRoute:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  if (loading) return null;

  if (!role || role.toLowerCase() !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;

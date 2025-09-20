import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Make an API call to check if user is logged in
    axios.get("/api/auth/verify-token", { withCredentials: true })
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>; // optional loader

  if (!authenticated) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;

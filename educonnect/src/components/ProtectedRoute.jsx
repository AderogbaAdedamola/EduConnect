
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, accessToken } = useAuth();
  const location = useLocation();

  // if (!user || !accessToken) {
   
  //   return <Navigate to="/login" state={{ from: location }} replace />
  // }

  return children;
}



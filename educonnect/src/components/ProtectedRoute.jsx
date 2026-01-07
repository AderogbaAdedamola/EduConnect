


import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/signup" replace />;
  }
  return children;
};

export default ProtectedRoute;


// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   if (!user) return <Navigate to="/login" replace />;
//   return children;
// };

// export default ProtectedRoute
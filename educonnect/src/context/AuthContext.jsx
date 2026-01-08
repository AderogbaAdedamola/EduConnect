
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // Just a simple reset function — no backend call here
  const clearAuth = () => {
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);



// // src/context/AuthContext.jsx
// import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // user state available globally
//   const navigate = useNavigate();

//   // Silent login on app load
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return navigate("/login");

//     fetch("https://yourbackend.com/auth/me", {
//       headers: { "Authorization": `Bearer ${token}` },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Token invalid or expired");
//         return res.json();
//       })
//       .then((data) => {
//         localStorage.setItem("token", data.accessToken); // update token if refreshed
//         setUser(data.user); // store user globally
//       })
//       .catch(() => {
//         localStorage.removeItem("token");
//         navigate("/login");
//       });
//   }, []);

//   const login = (userData, token) => {
//     localStorage.setItem("token", token);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

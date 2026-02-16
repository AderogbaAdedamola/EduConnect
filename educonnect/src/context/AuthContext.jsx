
import { createContext, useContext, useState, useEffect } from "react"
import { setAuthToken } from "../api/port"
import { applyTheme, getInitialTheme } from "../utilities/theme"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>{
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {}
  });
  const [accessToken, setAccessToken] = useState(null)
  setAuthToken(accessToken)
  const [theme, setTheme] = useState(getInitialTheme())
  const [darkMode, setDarkMode] = useState(theme === "dark" ? true : false)
  const [isCreatingQues, setIsCreatingQues] = useState(false)


  const clearAuth = () => {
    setUser(null);
    setAccessToken(null);
    setAuthToken(null)
  };

  useEffect(() =>{
    if(user){
      localStorage.setItem("user", JSON.stringify(user))
      setAuthToken(accessToken)
    }else{
      localStorage.removeItem("user")
      clearAuth()
    }
  }, [user, accessToken])

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <AuthContext.Provider value={{ 
      user,
      setUser,
      accessToken,
      setAccessToken,
      clearAuth,
      darkMode,
      setDarkMode,
      theme,
      setTheme,
      isCreatingQues,
      setIsCreatingQues,
      }}>
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

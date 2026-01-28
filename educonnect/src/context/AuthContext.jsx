
import { createContext, useContext, useState, useEffect } from "react"
import { setAuthToken } from "../api/port"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>{
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {}
  });
  const [accessToken, setAccessToken] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [isCreatingQues, setIsCreatingQues] = useState(false)
  setAuthToken(accessToken)


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

 // Read DARKMODE from the system
  // useEffect(() =>{
  //   document.documentElement.classList.toggle(
  //       "dark",
  //       localStorage.theme === "dark" ||
  //         (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
  //     )
  //     setDarkMode(
  //       localStorage.theme === "dark" ||
  //         (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matchees)
  //       )
  // },[])

  // //Toggle Theme
  // const toggleTheme =() =>{
  // // Read CURRENT state from DOM, not React state
  //   const currentIsDark = document.documentElement.classList.contains('dark');
  //   const newDarkMode = !darkMode;
    
  //   if(newDarkMode){
  //     localStorage.setItem("theme", "dark");
  //     document.documentElement.classList.add('dark');
  //     setDarkMode(true)
  //     console.log("dark mode ON");
  //   } else {
  //     localStorage.setItem("theme", "light");
  //     document.documentElement.classList.remove('dark');
  //     setDarkMode(false)
  //     console.log("light mode ON");
  //   }     
  //   }

  // useEffect(() => {
  //   const root = document.documentElement;
  //   if (theme === 'dark') {
  //     root.classList.add('dark');
  //   } else {
  //     root.classList.remove('dark');
  //   }
  //   localStorage.setItem('theme', theme);
  // }, [theme]);

  // // Listen for system changes (only when no explicit choice)
  // useEffect(() => {
  //   const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
  //   const handleChange = () => {
  //     if (!localStorage.getItem('theme')) {
  //       setTheme(mediaQuery.matches ? 'dark' : 'light');
  //     }
  //   };
    
  //   mediaQuery.addEventListener('change', handleChange);
  //   return () => mediaQuery.removeEventListener('change', handleChange);
  // }, []);

  return (
    <AuthContext.Provider value={{ 
      user,
      setUser,
      accessToken,
      setAccessToken,
      clearAuth,
      darkMode,
      setDarkMode,
      isCreatingQues,
      setIsCreatingQues,
      // toggleTheme
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

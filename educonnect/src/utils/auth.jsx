
import { jwtDecode } from "jwt-decode";


export const isAuthenticated = () => {
//   const token = localStorage.getItem("token");
 const token = localStorage.getItem("token");

  if (!token) return false

  
    try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return false;
    }
  } catch (error) {
    // invalid token
    localStorage.removeItem("token");
    return false;
  }
  
  return true // true if token exists and has not expired
};



  

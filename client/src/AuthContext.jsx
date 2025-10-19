/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_URL = "http://localhost:3000/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // adding log in
  const login = async (formObj) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formObj),
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message)
      };
      setUser(result.data.user);
      return result.data.user;
    } catch (err) {
      alert(err.message);
    }
  };
  //sign up function
  const signup = async (formObj) => {
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formObj),
        credentials: "include",
      });

      const result = await res.json();
      console.log("Signup response from backend:", result);

      if (!result.data || !result.data.user) {
        throw new Error("Unexpected response format: user not found");
      }

      setUser(result.data.user);
      return result.data.user;
    } catch (err) {
      alert(err.message);
      return null;
    }
  };

  // logout function
  const logout = () => {
    setUser(null);
    
  };
  
  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};




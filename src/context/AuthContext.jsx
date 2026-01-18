import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../api/axiosInstanse";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  //  LOGIN
  const login = (userData, tokenBody, refreshToken) => {
    localStorage.setItem("accessToken", tokenBody);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(userData));

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${tokenBody}`;
    setUser(userData);
    navigate("/");
  };

  //  LOGOUT
  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (err) {
      console.warn("Logout failed");
    } finally {
      localStorage.clear();
      setUser(null);
      navigate("/login");
    }
  };

  //  REFRESH
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!savedUser || !refreshToken) {
      setLoading(false);
      return;
    }

    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);

    const refreshAccessToken = async () => {
      try {
        if (!accessToken) {
          const res = await axios.post(`${BASE_URL}/auth/refreshtoken`, {
            refreshToken,
          });
          const { tokenBody, refreshToken: newRefresh } = res.data;

          if (tokenBody) {
            localStorage.setItem("accessToken", tokenBody);
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${tokenBody}`;
          }

          if (newRefresh) localStorage.setItem("refreshToken", newRefresh);
        } else {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
        }
      } catch (err) {
        console.error("Auto refresh failed:", err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    refreshAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

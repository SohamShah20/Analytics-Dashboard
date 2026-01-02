import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../api/client";
import { logUsage } from "../api/usage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore auth on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const tenantId = localStorage.getItem("tenantId");

    if (token && tenantId) {
      setUser({});
    }

    setLoading(false);
  }, []);

  const login = async (email, password, tenantId) => {
    localStorage.setItem("tenantId", tenantId);

    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem("token", data.token);
    setUser({ email });

    // 🔹 Optional but valuable
    logUsage("LOGIN_SUCCESS");
  };

  const logout = async () => {
    // 🔹 Log usage before clearing auth
    logUsage("LOGOUT");

    localStorage.removeItem("token");
    localStorage.removeItem("tenantId");

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

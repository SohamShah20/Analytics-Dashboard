import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../api/client";
import { logUsage } from "../api/usage";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const decodeUserFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      userId: decoded.userId,
      role: decoded.role,
      tenantId: decoded.tenantId,
    };
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore auth on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const tenantId = localStorage.getItem("tenantId");

    if (token && tenantId) {
      const decodedUser = decodeUserFromToken(token);
      setUser(decodedUser);
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
    setUser(decodeUser);

    try {
      logUsage("LOGIN_SUCCESS");
    } catch (e) {
      console.warn("Login analytics failed (ignored)");
    }
  };

  const logout = async () => {
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

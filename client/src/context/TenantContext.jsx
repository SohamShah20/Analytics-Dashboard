import { createContext, useEffect, useState, useContext } from "react";
import { apiFetch } from "../api/client";
import { useAuth } from "./AuthContext";

const TenantContext = createContext(null);

export const TenantProvider = ({ user, children }) => {
  const [tenant, setTenant] = useState(null);

  // Fetch tenant info (safe for ALL users)
  useEffect(() => {
    if (!user) {
      // Logged out → clear tenant
      setTenant(null);
      return;
    }

    apiFetch("/tenant/me")
      .then(setTenant)
      .catch(() => {
        setTenant(null);
      });
  }, [user]); // 🔥 THIS is the fix

  // Apply branding when tenant loads
  useEffect(() => {
    if (tenant?.primaryColor) {
      document.documentElement.style.setProperty(
        "--primary-color",
        tenant.primaryColor
      );
    } else {
      document.documentElement.style.setProperty(
        "--primary-color",
        "#2563eb"
      );
    }
  }, [tenant]);

  return (
    <TenantContext.Provider value={{ tenant, setTenant }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);

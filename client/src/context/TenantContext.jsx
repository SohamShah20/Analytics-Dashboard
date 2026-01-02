import { createContext, useEffect, useState, useContext } from "react";
import { apiFetch } from "../api/client";

const TenantContext = createContext(null);

export const TenantProvider = ({ children }) => {
  const [tenant, setTenant] = useState(null);

  // Fetch tenant info (safe for ALL users)
  useEffect(() => {
    apiFetch("/tenant/me")
      .then(setTenant)
      .catch((err) => {
        console.warn("Tenant fetch failed (ignored):", err.message);
      });
  }, []);

  // Apply branding when tenant loads
  useEffect(() => {
    if (tenant?.primaryColor) {
      document.documentElement.style.setProperty(
        "--primary-color",
        tenant.primaryColor
      );
    }
  }, [tenant]);

  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);

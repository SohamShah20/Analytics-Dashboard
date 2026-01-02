import { createContext, useEffect, useState, useContext } from "react";
import { apiFetch } from "../api/client";

const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    apiFetch("/admin/tenants/me")
      .then(setTenant)
      .catch(() => {});
  }, []);

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

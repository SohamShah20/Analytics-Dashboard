import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTenant } from "../context/TenantContext";
import { API_BASE } from "../api/config.js";

export default function Navbar() {
  const { logout, user } = useAuth();
  const { tenant } = useTenant();

  return (
    <header
      style={{
        background: "white",
        borderBottom: "1px solid var(--border-color)",
        padding: "0.75rem 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {/* Logo */}
      {tenant?.logoUrl && (
        <img
          src={`${API_BASE}${tenant.logoUrl}`}
          alt="Tenant Logo"
          style={{ height: 32 }}
        />
      )}

      {/* Tenant name */}
      <strong>{tenant?.name || "Dashboard"}</strong>

      {/* Navigation */}
      <nav style={{ display: "flex", gap: "1rem", marginLeft: "2rem" }}>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/insights">Insights</NavLink>

        {user?.role === "admin" && (
          <NavLink to="/settings">Settings</NavLink>
        )}
      </nav>

      {/* Logout */}
      <div style={{ marginLeft: "auto" }}>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
}

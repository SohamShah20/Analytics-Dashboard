import { useState } from "react";
import { apiFetch } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function AdminTenantCreate() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    tenantId: "",
    tenantName: "",
    adminEmail: "",
    adminPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // Platform admin only
  if (user?.tenantId !== "platform") return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createTenant = async () => {
    setLoading(true);
    try {
      await apiFetch("/admin/tenants", {
        method: "POST",
        body: JSON.stringify(form),
      });

      alert("Tenant created successfully");
      setForm({
        tenantId: "",
        tenantName: "",
        adminEmail: "",
        adminPassword: "",
      });
    } catch (err) {
      alert("Failed to create tenant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Create Tenant (Platform Admin)</h3>

      <input
        name="tenantId"
        placeholder="Tenant ID (e.g. acme)"
        value={form.tenantId}
        onChange={handleChange}
      />

      <input
        name="tenantName"
        placeholder="Tenant Name"
        value={form.tenantName}
        onChange={handleChange}
      />

      <input
        name="adminEmail"
        placeholder="Admin Email"
        value={form.adminEmail}
        onChange={handleChange}
      />

      <input
        name="adminPassword"
        type="password"
        placeholder="Admin Password"
        value={form.adminPassword}
        onChange={handleChange}
      />

      <button onClick={createTenant} disabled={loading}>
        {loading ? "Creating..." : "Create Tenant"}
      </button>
    </div>
  );
}

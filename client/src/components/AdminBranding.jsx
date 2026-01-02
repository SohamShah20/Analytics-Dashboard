import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";
import { useTenant } from "../context/TenantContext";
import { useAuth } from "../context/AuthContext";
import { logUsage } from "../api/usage";

export default function AdminBranding() {
    const { tenant, setTenant } = useTenant();
    const { user } = useAuth();

    const [primaryColor, setPrimaryColor] = useState("#2563eb");
    const [logoFile, setLogoFile] = useState(null);
    const [saving, setSaving] = useState(false);

    // Initialize from tenant once loaded
    useEffect(() => {
        if (tenant?.primaryColor) {
            setPrimaryColor(tenant.primaryColor);
        }
    }, [tenant]);

    // Only admins
    if (user?.role !== "admin") return null;

    const uploadLogo = async () => {
        if (!logoFile) return;

        const formData = new FormData();
        formData.append("logo", logoFile);

        await fetch("http://localhost:4000/admin/tenant/logo", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "x-tenant-id": tenant.tenantId,
            },
            body: formData,
        });
    };

    const saveBranding = async () => {
        setSaving(true);
        try {
            // Update color
            const updated = await apiFetch("/admin/tenant/branding", {
                method: "PUT",
                body: JSON.stringify({ primaryColor }),
            });

            // Upload logo if selected
            await uploadLogo();

            // ✅ Update tenant in memory
            setTenant(updated);

            // ✅ Apply branding immediately
            document.documentElement.style.setProperty(
                "--primary-color",
                updated.primaryColor
            );

            logUsage("TENANT_BRANDING_UPDATED");
            alert("Branding updated");
        } catch (err) {
            alert("Failed to update branding");
        } finally {
            setSaving(false);
        }
    };


    return (
        <div
            className="card"
            style={{
                border: "1px solid #ddd",
                padding: "1rem",
                marginBottom: "1rem",
            }}
        >
            <h3>Tenant Branding (Admin)</h3>

            {/* Primary Color */}
            <label>
                Primary Color
                <br />
                <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                />
            </label>

            <br />
            <br />

            {/* Logo Upload */}
            <label>
                Upload Logo
                <br />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogoFile(e.target.files[0])}
                />
            </label>

            {tenant?.logoUrl && (
                <div style={{ marginTop: "0.5rem" }}>
                    <small>Current logo:</small>
                    <br />
                    <img
                        src={`http://localhost:4000${tenant.logoUrl}`}
                        alt="Tenant Logo"
                        style={{ height: 40 }}
                    />
                </div>
            )}

            <br />

            <button onClick={saveBranding} disabled={saving}>
                {saving ? "Saving..." : "Save Branding"}
            </button>
        </div>
    );
}

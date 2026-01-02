import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import { AuthProvider } from "./context/AuthContext";
import { TenantProvider } from "./context/TenantContext";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Insights from "./pages/Insights";
import Blog from "./pages/Blog";
import Navbar from "./components/Navbar";
import AdminBranding from "./components/AdminBranding";
import { logUsage } from "./api/usage";
import AdminTenantCreate from "./components/AdminTenantCreate";


/**
 * Admin-only wrapper
 */
function AdminOnly({ children }) {
  const { user } = useAuth();
  if (user?.role !== "admin") return null;
  return children;
}

/**
 * Main authenticated layout
 */
function AppLayout() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route
            path="/blog"
            element={
              <div className="content-grid">
                <Blog />
              </div>
            }
          />

          <Route
            path="/insights"
            element={
              <div className="content-grid">
                <Insights />
              </div>
            }
          />

          <Route
            path="/settings"
            element={
              <AdminOnly>
                <>
                  <AdminBranding />
                  <AdminTenantCreate />
                </>
              </AdminOnly>
            }
          />


          {/* Default route */}
          <Route path="*" element={<Navigate to="/blog" replace />} />
        </Routes>
      </main>
    </div>
  );
}

/**
 * Auth gate
 */
function AppContent() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      logUsage("LOGIN_SUCCESS");
    }
  }, [user]);

  if (!user) return <Login />;

  return (
    <TenantProvider user={user}>
      <AppLayout />
    </TenantProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

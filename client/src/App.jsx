import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { TenantProvider } from "./context/TenantContext";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Insights from "./pages/Insights";
import Blog from "./pages/Blog";
import Navbar from "./components/Navbar";
import AdminBranding from "./components/AdminBranding";

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
                <AdminBranding />
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

  if (!user) return <Login />;

  return <AppLayout />;
}

export default function App() {
  return (
    <AuthProvider>
      <TenantProvider>
        <AppContent />
      </TenantProvider>
    </AuthProvider>
  );
}

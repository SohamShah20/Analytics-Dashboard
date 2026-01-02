import { AuthProvider } from "./context/AuthContext";
import { TenantProvider } from "./context/TenantContext";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Insights from "./pages/Insights";
import Navbar from "./components/Navbar";

function AppContent() {
  const { user } = useAuth();

  if (!user) return <Login />;

  return (
    <>
      <Navbar />
      <Insights />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <TenantProvider>
        <AppContent/>
      </TenantProvider>
    </AuthProvider>
  );
}

export default App;
import { AuthProvider } from "./context/AuthContext";
import { TenantProvider } from "./context/TenantContext";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Insights from "./pages/Insights";

function AppContent() {
  const { user } = useAuth();

  return user ? <Insights /> : <Login />;
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
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Register from "./Register";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password, tenantId);
    } catch {
      setError("Login failed");
    }
  };

  if (showRegister) {
    return <Register onSuccess={() => setShowRegister(false)} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        placeholder="Tenant ID"
        value={tenantId}
        onChange={(e) => setTenantId(e.target.value)}
        required
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Login</button>

      <p style={{ cursor: "pointer" }} onClick={() => setShowRegister(true)}>
        New user? Register here
      </p>
    </form>
  );
}

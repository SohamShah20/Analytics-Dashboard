import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantId, setTenantId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login");
    await login(email, password, tenantId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Tenant ID" onChange={e => setTenantId(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

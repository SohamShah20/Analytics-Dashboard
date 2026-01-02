import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

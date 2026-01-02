const API_BASE = "http://localhost:4000";

export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const tenantId = localStorage.getItem("tenantId");

  const isAuthRoute = url.startsWith("/auth");

  const headers = {
    "Content-Type": "application/json",
    "x-tenant-id": tenantId,
    ...options.headers,
  };

  if (token && !isAuthRoute) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API error");
  }

  return res.json();
};

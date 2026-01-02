const API_BASE = "http://localhost:4000";

export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const tenantId = localStorage.getItem("tenantId");

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-tenant-id": tenantId,
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
};

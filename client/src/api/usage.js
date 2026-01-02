import { apiFetch } from "./client";

export const logUsage = async (action, metadata = {}) => {
  try {
    await apiFetch("/usage/log", {
      method: "POST",
      body: JSON.stringify({
        action,
        metadata,
      }),
    });
  } catch (err) {
    console.warn("Usage logging failed:", err.message);
  }
};

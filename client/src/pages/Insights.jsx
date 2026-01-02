import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";
import { logUsage } from "../api/usage";

export default function Insights() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    logUsage("PAGE_VIEW", { page: "Insights" });
    apiFetch("/insights").then(setReports);
  }, []);

  return (
  <div className="card">
    <h2>Weekly Insights</h2>

    {reports.length === 0 && (
      <p style={{ color: "#6b7280" }}>
        No insights generated yet.
      </p>
    )}

    {reports.map((r) => (
      <div
        key={r._id}
        style={{
          padding: "0.75rem",
          borderLeft: "4px solid var(--primary-color)",
          background: "#f9fafb",
          marginBottom: "0.75rem",
        }}
      >
        <p>{r.summary}</p>
        <small style={{ color: "#6b7280" }}>
          {new Date(r.generatedAt).toLocaleDateString()}
        </small>
      </div>
    ))}
  </div>
);

}

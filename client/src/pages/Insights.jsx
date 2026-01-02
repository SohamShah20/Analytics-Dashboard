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
    <div>
      <h2>Weekly Insights</h2>
      {reports.map((r) => (
        <div key={r._id}>
          <p>{r.summary}</p>
          <small>{new Date(r.generatedAt).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}

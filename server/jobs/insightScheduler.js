import cron from "node-cron";
import { runWeeklyInsights } from "./generateWeeklyInsights.js";

/**
 * Schedule weekly AI insight generation
 * Default: Every Sunday at 00:00
 */
export const startInsightScheduler = () => {
  const cronExpr = process.env.INSIGHTS_CRON || "0 0 * * 0";

  cron.schedule(cronExpr, async () => {
    console.log("Running scheduled weekly insights job...");
    try {
      await runWeeklyInsights();
      console.log("Weekly insights job completed");
    } catch (error) {
      console.error("Weekly insights job failed:", error.message);
    }
  });

  console.log("Insight scheduler started with cron:", cronExpr);
};

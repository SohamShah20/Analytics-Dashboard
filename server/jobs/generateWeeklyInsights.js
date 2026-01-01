import Tenant from "../models/Tenant.js";
import InsightReport from "../models/InsightReport.js";
import { aggregateUsage } from "../services/usageAggregator.js";
import { generateInsights } from "../services/insightGenerator.js";

export const runWeeklyInsights = async () => {
  const tenants = await Tenant.find();

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7);

  for (const tenant of tenants) {
    const usageData = await aggregateUsage(
      tenant.tenantId,
      startDate,
      endDate
    );

    if (usageData.totalEvents === 0) continue;

    const summary = await generateInsights(
      tenant.tenantId,
      usageData
    );

    await InsightReport.create({
      tenantId: tenant.tenantId,
      periodStart: startDate,
      periodEnd: endDate,
      summary,
    });
  }

  console.log("Weekly insights generated");
};
